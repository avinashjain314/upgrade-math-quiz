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

  // Current program day (1 to 100): Sequential journey! Always starts at Day 1 and advances Day-by-Day
  getCurrentProgramDay(user = null) {
    const student = user || this.currentUser;
    if (!student) return 1;

    // If Avinash Sir set a manual test override in Settings, respect it
    const manual = localStorage.getItem('umq_program_day_manual');
    if (manual && (this.isAdmin || student.phone === '9179799355' || student.phone === '9999999999')) {
      return parseInt(manual, 10);
    }

    // Determine the student's next unattempted day
    const attempted = student.attemptedDays || {};
    let nextDay = 1;
    while (nextDay <= 100 && (attempted[nextDay] || this.isDayAttemptedForUser(nextDay, student))) {
      nextDay++;
    }
    return Math.max(1, Math.min(100, nextDay));
  },

  // Checks whether the student has already completed a quiz today (in Indian Standard Time)
  hasCompletedQuizToday(user = null) {
    const student = user || this.currentUser;
    if (!student || !student.lastActiveDate) return false;

    try {
      const lastDate = new Date(student.lastActiveDate);
      if (isNaN(lastDate.getTime())) return false;

      // Convert both timestamps to IST calendar date string (YYYY-MM-DD)
      const istOffsetMs = 5.5 * 60 * 60 * 1000;
      const lastIst = new Date(lastDate.getTime() + (lastDate.getTimezoneOffset() * 60000) + istOffsetMs);
      const lastStr = `${lastIst.getFullYear()}-${String(lastIst.getMonth() + 1).padStart(2, '0')}-${String(lastIst.getDate()).padStart(2, '0')}`;

      const now = new Date();
      const nowIst = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + istOffsetMs);
      const todayStr = `${nowIst.getFullYear()}-${String(nowIst.getMonth() + 1).padStart(2, '0')}-${String(nowIst.getDate()).padStart(2, '0')}`;

      return (lastStr === todayStr && Number(student.quizzesCompleted) > 0);
    } catch (e) {
      return false;
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
    if (clean.length < 8) {
      return { success: false, message: 'Please enter a valid mobile number.' };
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

    const isCoaching = SheetSync.isCoachingStudent(clean);
    const res = await SheetSync.verifyStudent(clean);

    // If coaching student without real name filled, open registration modal
    const isNew = res.isNew || (!res.student || !res.student.name || res.student.name.startsWith('Student ('));
    if (isNew) {
      return { success: true, isNew: true, isCoaching: isCoaching, phone: clean, student: res.student };
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

  async updateProfile(newName, newLevel) {
    if (!this.currentUser) return { success: false, message: 'Not logged in.' };
    const cleanName = String(newName || '').trim();
    const cleanLevel = String(newLevel || '').trim();

    if (!cleanName || cleanName.length < 2) {
      return { success: false, message: 'Please enter a valid student name (at least 2 letters).' };
    }

    this.currentUser.name = cleanName;
    if (cleanLevel) this.currentUser.level = cleanLevel;
    SheetSync.saveLocalUser(this.currentUser);
    SheetSync.setCurrentUser(this.currentUser);

    const res = await SheetSync.updateStudentProfile({
      phone: this.currentUser.phone,
      name: cleanName,
      level: cleanLevel
    });

    return { success: true, student: this.currentUser, syncRes: res };
  },

  logout() {
    this.currentUser = null;
    this.isAdmin = false;
    SheetSync.clearCurrentUser();
  },

  // Check if a specific day was already attempted by THIS student
  isDayAttempted(dayNumber) {
    return this.isDayAttemptedForUser(dayNumber, this.currentUser);
  },

  isDayAttemptedForUser(dayNumber, user) {
    if (!user) return false;
    const cleanPhone = String(user.phone || '').trim().replace(/\D/g, '');

    // Check user's attemptedDays record
    if (user.attemptedDays && user.attemptedDays[dayNumber]) {
      return true;
    }
    // Cross-check history STRICTLY for this student's mobile number
    const history = SheetSync.getLocalHistory(cleanPhone);
    return history.some(h => Number(h.dayNumber) === Number(dayNumber));
  },

  // Determine access status for a day
  getDayStatus(dayNumber) {
    if (!this.currentUser) return { state: 'locked', canPlay: false, canReview: false, label: 'Please Login' };

    // 1. If already attempted: single attempt rule means it's closed (review solutions only)
    const isAttempted = this.isDayAttempted(dayNumber);
    if (isAttempted) {
      return { state: 'attempted', canPlay: false, canReview: true, label: 'Attempted' };
    }

    // 2. Admin has universal access
    if (this.currentUser.isAdmin || this.isAdmin || this.currentUser.phone === '9179799355' || this.currentUser.phone === '9999999999') {
      return { state: 'unlocked', canPlay: true, canReview: false, label: 'Admin Unlocked' };
    }

    // 3. Admin unlock override from Google Sheet (Column E)
    const override = String(this.currentUser.adminUnlockOverride || 'None').trim();
    const isAllUnlocked = (override === 'All Past Days' || override === 'ALL_UNLOCKED');
    const isSpecificUnlocked = override.split(',').map(s => s.trim().replace(/\D/g, '')).includes(String(dayNumber));
    if (isAllUnlocked || isSpecificUnlocked) {
      return { state: 'admin_unlocked', canPlay: true, canReview: false, label: 'Admin Unlocked' };
    }

    const currentActiveDay = this.getCurrentProgramDay();
    const completedToday = this.hasCompletedQuizToday();

    // 4. Current sequential day
    if (dayNumber === currentActiveDay) {
      if (completedToday) {
        return { state: 'daily_completed', canPlay: false, canReview: false, label: 'Unlocks Tomorrow' };
      } else {
        return { state: 'today', canPlay: true, canReview: false, label: "Today's Quiz" };
      }
    }

    // 5. Past unattempted days (< currentActiveDay) - only possible if manual or override gap
    if (dayNumber < currentActiveDay) {
      return { state: 'admin_locked', canPlay: false, canReview: false, label: 'Locked (Ask Avinash Sir)' };
    }

    // 6. Future days (> currentActiveDay)
    return { state: 'future_locked', canPlay: false, canReview: false, label: `Unlocks on Day ${dayNumber}` };
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Auth;
}
