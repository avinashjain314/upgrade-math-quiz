/**
 * Authentication & Access Controller
 * Enforces single attempt per day, strict today-only access,
 * and admin unlock overrides from Google Sheet.
 * 
 * Upgrade Math Quiz by Avinash Sir
 */

const Auth = {
  currentUser: null,
  isAdmin: false,

  init() {
    this.currentUser = SheetSync.getCurrentUser();
    return this.currentUser;
  },

  isLoggedIn() {
    return !!this.currentUser;
  },

  getCurrentUser() {
    return this.currentUser;
  },

  // Current program day (1 to 100) personalized to each student's journey from their enrollment date!
  getCurrentProgramDay(user = null) {
    // If admin set a manual test override in Settings, respect it
    const manual = localStorage.getItem('umq_program_day_manual');
    if (manual) {
      return parseInt(manual, 10);
    }

    const student = user || this.currentUser;
    if (!student) return 1;

    try {
      // 1. Determine student's start/registration date in IST
      let regDateStr = student.registrationDate;
      const cleanPhone = String(student.phone || '').replace(/\D/g, '');

      if (!regDateStr) {
        // Avinash Sir's account started on Nov 12, 2026
        if (cleanPhone === '9179799355' || cleanPhone === '9999999999') {
          regDateStr = '2026-11-12T00:00:00+05:30';
        } else {
          // If no registration date recorded, set to today so they start on Day 1
          regDateStr = new Date().toISOString();
          student.registrationDate = regDateStr;
          SheetSync.saveLocalUser(student);
        }
      }

      // Convert registration date to IST midnight
      const regDate = new Date(regDateStr);
      const istOffsetMs = 5.5 * 60 * 60 * 1000;
      const regIst = new Date(regDate.getTime() + (regDate.getTimezoneOffset() * 60000) + istOffsetMs);
      const regMidnight = new Date(regIst.getFullYear(), regIst.getMonth(), regIst.getDate());

      // Current date in IST midnight
      const now = new Date();
      const nowIst = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + istOffsetMs);
      const currentMidnight = new Date(nowIst.getFullYear(), nowIst.getMonth(), nowIst.getDate());

      // Difference in calendar days
      const diffMs = currentMidnight.getTime() - regMidnight.getTime();
      const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
      const calculatedDay = diffDays + 1; // Joined today -> Day 1! Joined yesterday -> Day 2!

      return Math.max(1, Math.min(100, calculatedDay));
    } catch (e) {
      return 1;
    }
  },

  setCurrentProgramDay(day) {
    if (day) {
      localStorage.setItem('umq_program_day_manual', Math.max(1, Math.min(100, day)));
    } else {
      localStorage.removeItem('umq_program_day_manual');
    }
  },

  async login(phone) {
    const clean = String(phone).replace(/\D/g, '');
    if (clean.length < 10) {
      return { success: false, message: 'Please enter a valid 10-digit mobile number.' };
    }

    // Admin passcode for Avinash Sir
    if (clean === '9999999999' || phone === 'admin100') {
      this.isAdmin = true;
      const adminUser = {
        phone: '9999999999',
        name: 'Avinash Sir (Admin)',
        level: 'Senior (Grade 4-10)',
        accessStatus: 'ACTIVE',
        adminUnlockOverride: 'All Past Days',
        totalScore: 99999,
        currentStreak: 100,
        quizzesCompleted: 100,
        attemptedDays: {},
        isAdmin: true
      };
      this.currentUser = adminUser;
      SheetSync.saveLocalUser(adminUser);
      return { success: true, isNew: false, student: adminUser, isAdmin: true };
    }

    const res = await SheetSync.verifyStudent(clean);
    if (res.isNew) {
      return { success: true, isNew: true, phone: clean, student: res.student };
    }
    if (res.student) {
      const status = String(res.student.accessStatus || '').toUpperCase().trim();
      
      if (status === 'BLOCKED') {
        return {
          success: false,
          blocked: true,
          message: 'Your account access is currently paused. Please contact Avinash Sir to resume.'
        };
      }
      if (status === 'NO_ACCESS' || status === 'NO ACCESS' || status === 'PENDING') {
        this.currentUser = res.student;
        SheetSync.saveLocalUser(res.student);
        return {
          success: true,
          paymentRequired: true,
          student: res.student,
          message: 'Account registered! Please pay ₹200 for full 100-day quiz access.'
        };
      }
      if (status === 'PENDING_APPROVAL') {
        this.currentUser = res.student;
        SheetSync.saveLocalUser(res.student);
        return {
          success: true,
          pendingApproval: true,
          student: res.student,
          message: 'Payment submitted! Avinash Sir is verifying your payment. Click "Check Status" anytime.'
        };
      }

      this.currentUser = res.student;
      SheetSync.saveLocalUser(res.student);
      return { success: true, isNew: false, student: res.student };
    }

    return { success: true, isNew: true, phone: clean };
  },

  async completeRegistration(phone, name, level) {
    if (!name || name.trim().length < 2) {
      return { success: false, message: 'Please enter a valid student name.' };
    }

    const res = await SheetSync.registerStudent({
      phone: phone,
      name: name.trim(),
      level: level
    });

    if (res.success) {
      this.currentUser = res.student;
      const requiresPayment = (res.student.accessStatus !== 'ACTIVE');
      return { success: true, student: res.student, paymentRequired: requiresPayment };
    }

    return { success: false, message: 'Registration failed. Please try again.' };
  },

  logout() {
    this.currentUser = null;
    this.isAdmin = false;
    SheetSync.clearCurrentUser();
  },

  // Check if a specific day was already attempted by THIS student
  isDayAttempted(dayNumber) {
    if (!this.currentUser) return false;
    const cleanPhone = String(this.currentUser.phone || '').trim().replace(/\D/g, '');

    // Check user's attemptedDays record
    if (this.currentUser.attemptedDays && this.currentUser.attemptedDays[dayNumber]) {
      return true;
    }
    // Cross-check history STRICTLY for this student's mobile number
    const history = SheetSync.getLocalHistory(cleanPhone);
    return history.some(h => Number(h.dayNumber) === Number(dayNumber));
  },

  // Determine access status for a day
  getDayStatus(dayNumber) {
    if (!this.currentUser) return { state: 'locked', reason: 'Please login' };

    const today = this.getCurrentProgramDay();
    const isAttempted = this.isDayAttempted(dayNumber);

    // 1. If already attempted: single attempt rule means it's closed (review solutions only)
    if (isAttempted) {
      return { state: 'attempted', canPlay: false, canReview: true, label: 'Attempted' };
    }

    // 2. Admin has universal access
    if (this.currentUser.isAdmin) {
      return { state: 'unlocked', canPlay: true, canReview: false, label: 'Admin Unlocked' };
    }

    // 3. Today's Quiz (Available to take!)
    if (dayNumber === today) {
      return { state: 'today', canPlay: true, canReview: false, label: 'Today\'s Quiz' };
    }

    // 4. Past Day (< Today) that was missed:
    if (dayNumber < today) {
      // Check if Avinash Sir unlocked it from Google Sheet via Admin_Unlock_Override dropdown
      const override = String(this.currentUser.adminUnlockOverride || 'None').trim();
      const isAllUnlocked = (override === 'All Past Days' || override === 'ALL_UNLOCKED');
      const isSpecificUnlocked = override.split(',').map(s => s.trim().replace(/\D/g, '')).includes(String(dayNumber));

      if (isAllUnlocked || isSpecificUnlocked) {
        return { state: 'admin_unlocked', canPlay: true, canReview: false, label: 'Admin Unlocked' };
      } else {
        // Missed and locked by default!
        return { state: 'missed_locked', canPlay: false, canReview: false, label: 'Missed & Locked' };
      }
    }

    // 5. Future Day (> Today)
    return { state: 'future_locked', canPlay: false, canReview: false, label: `Unlocks Day ${dayNumber}` };
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Auth;
}
