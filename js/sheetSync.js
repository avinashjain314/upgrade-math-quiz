/**
 * Google Sheets & Apps Script Sync Engine
 * Handles student verification, quiz submission, and leaderboard syncing.
 * Includes complete offline resilience & local storage fallback so the app NEVER crashes!
 * 
 * Upgrade Math Quiz by Avinash Sir
 */

const SheetSync = {
  // Avinash Sir's Google Sheet default configuration
  DEFAULT_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbwN52M3utnrlZ6LLMuYiujpjHGRl2W4zNDaapFYbWnDf4Ed3zYEPwXqz30_SmxTK_Y/exec', // Set by Avinash Sir in Settings or left empty for offline demo
  STORAGE_KEYS: {
    SCRIPT_URL: 'umq_script_url',
    CURRENT_USER: 'umq_current_user',
    LOCAL_USERS: 'umq_local_users',
    SUBMISSIONS: 'umq_submissions',
    OFFLINE_QUEUE: 'umq_offline_queue'
  },

  getScriptUrl() {
    return localStorage.getItem(this.STORAGE_KEYS.SCRIPT_URL) || this.DEFAULT_SCRIPT_URL;
  },

  setScriptUrl(url) {
    if (url) {
      localStorage.setItem(this.STORAGE_KEYS.SCRIPT_URL, url.trim());
    } else {
      localStorage.removeItem(this.STORAGE_KEYS.SCRIPT_URL);
    }
  },

  // Official, Hardcoded & Secure Payment Details for Avinash Sir
  PAYMENT_CONFIG: {
    fee: 200,
    name: 'Avinash Bamboria',
    upiId: 'avinashjain314-3@okhdfcbank',
    bankName: 'SBM Bank India Ltd',
    accountNumber: '20012521633258',
    ifscCode: 'STCB0000065',
    qrImage: 'assets/avinash_sir_qr.jpg'
  },

  // Whitelist of Avinash Sir's Coaching Students (Always 100% Free Lifetime Access)
  COACHING_STUDENTS: [
    '9876543210', // Demo Student (Sara)
    '9876543211', // Demo Student (Aarav)
    '9999999999'  // Avinash Sir (Admin)
    // Avinash Sir can add his 8-10 coaching student numbers here anytime
  ],

  isCoachingStudent(phone) {
    const clean = String(phone || '').trim().replace(/\D/g, '');
    return this.COACHING_STUDENTS.includes(clean);
  },

  getPaymentConfig() {
    return this.PAYMENT_CONFIG;
  },

  // 1. VERIFY STUDENT BY MOBILE NUMBER
  async verifyStudent(phone) {
    const cleanPhone = String(phone).trim().replace(/\D/g, '');
    const scriptUrl = this.getScriptUrl();
    const localUsers = this.getLocalUsers();
    const localUser = localUsers[cleanPhone] || null;

    // 1. Check online Google Sheet with cache-busting timestamp
    if (scriptUrl && navigator.onLine) {
      try {
        const cacheBuster = Date.now();
        const response = await fetch(`${scriptUrl}?action=verify&phone=${encodeURIComponent(cleanPhone)}&autoRegister=true&_nocache=${cacheBuster}`, {
          method: 'GET',
          mode: 'cors',
          cache: 'no-store'
        });
        if (response.ok) {
          const resData = await response.json();
          if (resData.found && resData.student) {
            // Coaching student whitelist override
            if (this.isCoachingStudent(cleanPhone)) {
              resData.student.accessStatus = 'ACTIVE';
            }
            // Merge with local attempted days if any
            if (localUser && localUser.attemptedDays) {
              resData.student.attemptedDays = { ...localUser.attemptedDays, ...(resData.student.attemptedDays || {}) };
            }
            this.saveLocalUser(resData.student);
            
            // Check if student was freshly auto-registered or hasn't provided a real name yet
            const isFreshStudent = !!resData.isNew || (!localUser && (!resData.student.name || resData.student.name.startsWith('Student (')));
            return { success: true, student: resData.student, isNew: isFreshStudent, fromOnline: true };
          } else {
            // Student row not yet found in Google Sheet
            // BUT if student already registered on this browser, DO NOT ask to register again!
            if (localUser) {
              if (this.isCoachingStudent(cleanPhone)) {
                localUser.accessStatus = 'ACTIVE';
              }
              return { success: true, student: localUser, isNew: false, fromOnline: false };
            }

            // Coaching demo student fallback
            if (this.isCoachingStudent(cleanPhone)) {
              const coachingDemo = {
                phone: cleanPhone,
                name: cleanPhone === '9999999999' ? 'Avinash Sir (Admin)' : 'Coaching Student',
                level: 'Junior (Grade 1-4)',
                accessStatus: 'ACTIVE',
                adminUnlockOverride: 'None',
                totalScore: 0,
                currentStreak: 0,
                quizzesCompleted: 0,
                attemptedDays: {},
                lastActiveDate: new Date().toISOString()
              };
              this.saveLocalUser(coachingDemo);
              return { success: true, student: coachingDemo, isNew: false, fromOnline: true };
            }

            // Truly a first-time new student who needs to register
            return { success: true, student: null, isNew: true, fromOnline: true };
          }
        }
      } catch (err) {
        console.warn('Google Sheet verify failed, using offline fallback:', err);
      }
    }

    // 2. Offline / Local fallback (when internet or sheet is unreachable)
    if (localUser) {
      if (this.isCoachingStudent(cleanPhone)) {
        localUser.accessStatus = 'ACTIVE';
      }
      return { success: true, student: localUser, isNew: false, fromOnline: false };
    }

    // 3. Demo coaching students fallback
    if (this.isCoachingStudent(cleanPhone)) {
      const demoStudent = {
        phone: cleanPhone,
        name: cleanPhone === '9999999999' ? 'Avinash Sir (Admin)' : 'Coaching Student',
        level: 'Junior (Grade 1-4)',
        accessStatus: 'ACTIVE',
        adminUnlockOverride: cleanPhone === '9999999999' ? 'All Past Days' : 'None',
        totalScore: 0,
        currentStreak: 0,
        quizzesCompleted: 0,
        attemptedDays: {},
        lastActiveDate: new Date().toISOString()
      };
      this.saveLocalUser(demoStudent);
      return { success: true, student: demoStudent, isNew: false, fromOnline: false };
    }

    return { success: true, student: null, isNew: true, fromOnline: false };
  },

  // 2. REGISTER NEW STUDENT
  async registerStudent(studentData) {
    const cleanPhone = String(studentData.phone).trim().replace(/\D/g, '');
    const isDemo = (cleanPhone === '9876543210' || cleanPhone === '9876543211' || cleanPhone === '9999999999');
    const initialStatus = isDemo ? 'ACTIVE' : 'NO_ACCESS';

    const payload = {
      action: 'register',
      phone: cleanPhone,
      name: studentData.name.trim(),
      level: studentData.level,
      notes: studentData.notes || 'Coaching App Student'
    };

    // Save locally immediately
    const localStudent = {
      phone: cleanPhone,
      name: payload.name,
      level: payload.level,
      accessStatus: initialStatus,
      adminUnlockOverride: 'None',
      totalScore: 0,
      currentStreak: 0,
      quizzesCompleted: 0,
      attemptedDays: {},
      registrationDate: new Date().toISOString(),
      lastActiveDate: new Date().toISOString()
    };
    this.saveLocalUser(localStudent);

    // Sync with Google Sheet if configured (both GET and POST with await)
    const scriptUrl = this.getScriptUrl();
    if (scriptUrl && navigator.onLine) {
      try {
        const qs = new URLSearchParams(payload).toString();
        const response = await fetch(`${scriptUrl}?${qs}&_nocache=${Date.now()}`, {
          method: 'GET',
          mode: 'cors'
        });
        if (response.ok) {
          const resData = await response.json();
          if (resData.student) {
            localStudent.accessStatus = resData.student.accessStatus || localStudent.accessStatus;
            localStudent.adminUnlockOverride = resData.student.adminUnlockOverride || localStudent.adminUnlockOverride;
            this.saveLocalUser(localStudent);
          }
        }
      } catch (e) {
        console.warn('GET register error:', e);
      }

      // Also fire POST for redundancy
      try {
        fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => {});
      } catch (err) {}
    }

    return { success: true, student: localStudent };
  },

  // 3. SUBMIT COMPLETED QUIZ
  async submitQuiz(submission) {
    const cleanPhone = String(submission.phone).trim().replace(/\D/g, '');
    
    // Save to local history
    const history = this.getLocalHistory();
    history.push({
      ...submission,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem(this.STORAGE_KEYS.SUBMISSIONS, JSON.stringify(history));

    // Update user stats locally
    const users = this.getLocalUsers();
    if (users[cleanPhone]) {
      if (!users[cleanPhone].attemptedDays) users[cleanPhone].attemptedDays = {};
      users[cleanPhone].attemptedDays[submission.dayNumber] = `Attempted (${submission.score} pts)`;
      users[cleanPhone].totalScore = (users[cleanPhone].totalScore || 0) + submission.score;
      users[cleanPhone].currentStreak = (users[cleanPhone].currentStreak || 0) + 1;
      users[cleanPhone].quizzesCompleted = (users[cleanPhone].quizzesCompleted || 0) + 1;
      users[cleanPhone].lastActiveDate = new Date().toISOString();
      this.saveLocalUser(users[cleanPhone]);

      // Keep Auth.currentUser in memory strictly in sync
      if (typeof Auth !== 'undefined' && Auth.currentUser && Auth.currentUser.phone === cleanPhone) {
        Auth.currentUser.totalScore = users[cleanPhone].totalScore;
        Auth.currentUser.currentStreak = users[cleanPhone].currentStreak;
        Auth.currentUser.quizzesCompleted = users[cleanPhone].quizzesCompleted;
        Auth.currentUser.attemptedDays = users[cleanPhone].attemptedDays;
      }
    }

    // Attempt online sync to Google Sheet
    const scriptUrl = this.getScriptUrl();
    const payload = {
      action: 'submit_quiz',
      phone: cleanPhone,
      studentName: submission.studentName,
      level: submission.level,
      dayNumber: submission.dayNumber,
      score: submission.score,
      accuracy: `${Math.round((submission.questionsCorrect / 20) * 100)}%`,
      timeTakenSec: submission.timeTakenSec,
      questionsCorrect: submission.questionsCorrect,
      timerMode: submission.timerMode
    };

    if (scriptUrl && navigator.onLine) {
      // 1. Send via GET query string (100% reliable execution in Google Apps Script doGet)
      try {
        const qs = new URLSearchParams(payload).toString();
        fetch(`${scriptUrl}?${qs}`, { mode: 'no-cors' }).catch(() => {});
      } catch (getErr) {}

      // 2. Also send via POST for redundancy
      try {
        fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        }).catch(() => {});
      } catch (postErr) {}
    } else {
      this.queueOfflineSubmission(payload);
    }

    return { success: true };
  },

  // 5. SUBMIT PAYMENT (UTR / TRANSACTION ID)
  async submitPayment(paymentData) {
    const cleanPhone = String(paymentData.phone).trim().replace(/\D/g, '');
    const payload = {
      action: 'payment_submitted',
      phone: cleanPhone,
      studentName: paymentData.studentName || 'Student',
      level: paymentData.level || 'Junior (Grade 1-4)',
      utr: String(paymentData.utr || '').trim(),
      amount: '200'
    };

    const users = this.getLocalUsers();
    if (users[cleanPhone]) {
      users[cleanPhone].accessStatus = 'PENDING_APPROVAL';
      users[cleanPhone].lastUtr = payload.utr;
      this.saveLocalUser(users[cleanPhone]);
      if (typeof Auth !== 'undefined' && Auth.currentUser && Auth.currentUser.phone === cleanPhone) {
        Auth.currentUser.accessStatus = 'PENDING_APPROVAL';
      }
    }

    const scriptUrl = this.getScriptUrl();
    if (scriptUrl && navigator.onLine) {
      try {
        const qs = new URLSearchParams(payload).toString();
        await fetch(`${scriptUrl}?${qs}&_nocache=${Date.now()}`, {
          method: 'GET',
          mode: 'cors'
        });
      } catch (e) {}

      try {
        fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => {});
      } catch (e) {}
    }

    return { success: true };
  },

  // 4. FETCH LEADERBOARD
  async getLeaderboard(filterLevel = 'all') {
    const scriptUrl = this.getScriptUrl();
    if (scriptUrl && navigator.onLine) {
      try {
        const res = await fetch(`${scriptUrl}?action=leaderboard&level=${encodeURIComponent(filterLevel)}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.leaderboard) {
            const currentUser = this.getCurrentUser();
            if (currentUser && currentUser.name) {
              const myEntry = data.leaderboard.find(s => s.name && s.name.toLowerCase() === currentUser.name.toLowerCase());
              if (myEntry) {
                myEntry.score = Math.max(Number(myEntry.score) || 0, Number(currentUser.totalScore) || 0);
                myEntry.streak = Math.max(Number(myEntry.streak) || 0, Number(currentUser.currentStreak) || 0);
                myEntry.quizzes = Math.max(Number(myEntry.quizzes) || 0, Number(currentUser.quizzesCompleted) || 0);
              } else if (Number(currentUser.totalScore) > 0) {
                data.leaderboard.push({
                  name: currentUser.name,
                  level: currentUser.level,
                  score: currentUser.totalScore,
                  streak: currentUser.currentStreak,
                  quizzes: currentUser.quizzesCompleted
                });
              }
              data.leaderboard.sort((a, b) => b.score - a.score || b.streak - a.streak);
            }
            return data.leaderboard;
          }
        }
      } catch (err) {}
    }

    // Fallback: Local students leaderboard + sample high scorers
    const localUsers = this.getLocalUsers();
    const students = [];

    // Add sample leaderboard stars for inspiring students
    const sampleStars = [
      { name: 'Diya Patel', level: 'Senior (Grade 4-10)', score: 3850, streak: 14, quizzes: 14 },
      { name: 'Aarav Sharma', level: 'Junior (Grade 1-4)', score: 3620, streak: 12, quizzes: 12 },
      { name: 'Kabir Verma', level: 'Senior (Grade 4-10)', score: 3100, streak: 10, quizzes: 10 },
      { name: 'Ananya Iyer', level: 'Junior (Grade 1-4)', score: 2980, streak: 9, quizzes: 9 },
      { name: 'Ishaan Gupta', level: 'Senior (Grade 4-10)', score: 2450, streak: 8, quizzes: 8 }
    ];

    for (const p in localUsers) {
      const u = localUsers[p];
      students.push({
        name: u.name,
        level: u.level,
        score: u.totalScore || 0,
        streak: u.currentStreak || 0,
        quizzes: u.quizzesCompleted || 0
      });
    }

    // Merge and filter
    const combined = [...students, ...sampleStars].filter(s => {
      if (filterLevel === 'all') return true;
      return s.level.toLowerCase().includes(filterLevel.toLowerCase());
    });

    combined.sort((a, b) => b.score - a.score || b.streak - a.streak);
    return combined;
  },

  // Storage Helpers
  getLocalUsers() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.LOCAL_USERS)) || {};
    } catch (e) {
      return {};
    }
  },

  saveLocalUser(user) {
    if (!user || !user.phone) return;
    const users = this.getLocalUsers();
    users[user.phone] = user;
    localStorage.setItem(this.STORAGE_KEYS.LOCAL_USERS, JSON.stringify(users));
    localStorage.setItem(this.STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  },

  getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.CURRENT_USER));
    } catch (e) {
      return null;
    }
  },

  clearCurrentUser() {
    localStorage.removeItem(this.STORAGE_KEYS.CURRENT_USER);
  },

  getLocalHistory(phone = null) {
    try {
      const all = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.SUBMISSIONS)) || [];
      if (!phone) return all;
      const clean = String(phone).trim().replace(/\D/g, '');
      return all.filter(h => String(h.phone || '').trim().replace(/\D/g, '') === clean);
    } catch (e) {
      return [];
    }
  },

  queueOfflineSubmission(payload) {
    try {
      const q = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.OFFLINE_QUEUE)) || [];
      q.push(payload);
      localStorage.setItem(this.STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify(q));
    } catch (e) {}
  },

  async processOfflineQueue() {
    const scriptUrl = this.getScriptUrl();
    if (!scriptUrl || !navigator.onLine) return;

    try {
      const q = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.OFFLINE_QUEUE)) || [];
      if (q.length === 0) return;

      while (q.length > 0) {
        const item = q.shift();
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });
      }
      localStorage.setItem(this.STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify([]));
    } catch (e) {}
  }
};

// Auto-trigger sync when coming online
window.addEventListener('online', () => {
  SheetSync.processOfflineQueue();
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SheetSync;
}
