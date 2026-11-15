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
    OFFLINE_QUEUE: 'umq_offline_queue',
    REAL_LEADERBOARD_CACHE: 'umq_real_leaderboard_cache'
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

  // Official & Secure Payment Details for Avinash Sir
  PAYMENT_CONFIG: {
    fee: 200,
    name: 'Avinash Bamboria',
    mobileNumber: '9179799355',
    contactPhone: '9179799355',
    upiId: 'avinashjain314-3@okhdfcbank',
    paypalAccepted: true,
    qrImage: 'assets/avinash_sir_qr.jpg'
  },

  // Whitelist of Avinash Sir's Coaching Students (Always 100% Free Lifetime Access)
  // Fully supports Indian (10-digit) and International (Australia +61, New Zealand +64, US, etc.) formats
  COACHING_STUDENTS: [
    '8979317487',      // Student 1 (India)
    '8582047578',      // Student 2 (India)
    '61469606997',     // Student 3 (Australia)
    '64221910852',     // Student 4 (New Zealand)
    '64211489307',     // Student 5 (New Zealand)
    '6195393482',      // Student 6 (International)
    '642041151177',    // Student 7 (New Zealand - International)
    '02041151177',     // Student 7 (New Zealand - Local format)
    '64211452785',     // Student 8 (New Zealand - International)
    '0211452785',      // Student 8 (New Zealand - Local format)
    '1524055873',      // Student 9 (Coaching Student)
    '9179799355',      // Avinash Sir (Admin)
    '9999999999'       // Admin Passcode Demo
  ],

  phonesMatch(phoneA, phoneB) {
    if (!phoneA || !phoneB) return false;
    const a = String(phoneA).replace(/\D/g, '');
    const b = String(phoneB).replace(/\D/g, '');
    if (!a || !b) return false;
    if (a === b) return true;
    if (a.length >= 8 && b.length >= 8) {
      if (a.endsWith(b) || b.endsWith(a)) return true;
      const cleanA = a.replace(/^0+/, '');
      const cleanB = b.replace(/^0+/, '');
      if (cleanA.length >= 8 && cleanB.length >= 8) {
        if (cleanA.endsWith(cleanB) || cleanB.endsWith(cleanA)) return true;
      }
    }
    return false;
  },

  isCoachingStudent(phone) {
    if (!phone) return false;
    const clean = String(phone).replace(/\D/g, '');
    if (!clean || clean.length < 8) return false;

    return this.COACHING_STUDENTS.some(p => this.phonesMatch(clean, p));
  },

  getPaymentConfig() {
    return this.PAYMENT_CONFIG;
  },

  // Purges legacy cached dummy students from browser storage
  purgeLegacyDummyData() {
    try {
      // 1. Purge legacy leaderboard cache containing dummy students
      const cacheKey = this.STORAGE_KEYS.REAL_LEADERBOARD_CACHE;
      const rawCache = localStorage.getItem(cacheKey);
      if (rawCache) {
        if (rawCache.includes('Diya Patel') || rawCache.includes('Kabir Verma') || rawCache.includes('Ishaan Gupta') || rawCache.includes('Ananya Iyer')) {
          localStorage.removeItem(cacheKey);
        }
      }

      // 2. Clear manual program day overrides for regular students
      const currentUser = this.getCurrentUser();
      const cleanPhone = currentUser ? String(currentUser.phone || '').replace(/\D/g, '') : '';
      if (cleanPhone !== '9179799355' && cleanPhone !== '9999999999') {
        localStorage.removeItem('umq_program_day_manual');
      }

      // 3. Clean up any dummy students from LOCAL_USERS
      const dummyNames = ['diya patel', 'aarav sharma', 'kabir verma', 'ananya iyer', 'ishaan gupta'];
      const localUsers = this.getLocalUsers();
      let changed = false;
      for (const p in localUsers) {
        if (localUsers[p] && dummyNames.includes(String(localUsers[p].name || '').trim().toLowerCase())) {
          delete localUsers[p];
          changed = true;
        }
      }
      if (changed) {
        localStorage.setItem(this.STORAGE_KEYS.LOCAL_USERS, JSON.stringify(localUsers));
      }
    } catch (e) {}
  },

  getOfflineQueue() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.OFFLINE_QUEUE)) || [];
    } catch (e) {
      return [];
    }
  },

  // 1. VERIFY STUDENT BY MOBILE NUMBER
  async verifyStudent(phone) {
    this.purgeLegacyDummyData();
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
            
            // Sheet is authoritative for attempted days!
            // Only merge pending items from local offline queue that have not synced yet
            const offlineQueue = this.getOfflineQueue();
            const pendingDays = {};
            offlineQueue.forEach(item => {
              if (this.phonesMatch(item.phone, cleanPhone) && item.dayNumber) {
                pendingDays[item.dayNumber] = `Attempted (${item.score || 0} pts)`;
              }
            });
            resData.student.attemptedDays = {
              ...(resData.student.attemptedDays || {}),
              ...pendingDays
            };

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
    const isCoaching = this.isCoachingStudent(cleanPhone);
    const initialStatus = isCoaching ? 'ACTIVE' : 'NO_ACCESS';

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

  // 2.5 UPDATE STUDENT PROFILE (NAME & LEVEL TRACK)
  async updateStudentProfile(payload) {
    const profileData = payload || {};
    const cleanPhone = String(profileData.phone || '').trim().replace(/\D/g, '');
    const cleanName = String(profileData.name || '').trim();
    const cleanLevel = String(profileData.level || '').trim();
    const cleanStatus = profileData.status ? String(profileData.status).trim() : '';

    // Update locally first
    const users = this.getLocalUsers();
    if (users[cleanPhone]) {
      if (cleanName) users[cleanPhone].name = cleanName;
      if (cleanLevel) users[cleanPhone].level = cleanLevel;
      if (cleanStatus) users[cleanPhone].accessStatus = cleanStatus;
      users[cleanPhone].lastActiveDate = new Date().toISOString();
      this.saveLocalUser(users[cleanPhone]);
    }

    // Update currentUser if active
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.phone === cleanPhone) {
      if (cleanName) currentUser.name = cleanName;
      if (cleanLevel) currentUser.level = cleanLevel;
      if (cleanStatus) currentUser.accessStatus = cleanStatus;
      if (profileData.adminUnlockOverride !== undefined) currentUser.adminUnlockOverride = profileData.adminUnlockOverride;
      if (profileData.makeDayActive) {
        if (!currentUser.attemptedDays) currentUser.attemptedDays = {};
        delete currentUser.attemptedDays[profileData.makeDayActive];
      }
      this.setCurrentUser(currentUser);
    }

    if (users[cleanPhone]) {
      if (profileData.adminUnlockOverride !== undefined) users[cleanPhone].adminUnlockOverride = profileData.adminUnlockOverride;
      if (profileData.makeDayActive && users[cleanPhone].attemptedDays) {
        delete users[cleanPhone].attemptedDays[profileData.makeDayActive];
      }
      this.saveLocalUser(users[cleanPhone]);
    }

    // Sync online with Google Sheet
    const scriptUrl = this.getScriptUrl();
    if (scriptUrl && navigator.onLine) {
      const params = {
        action: 'update_profile',
        phone: cleanPhone,
        name: cleanName || '',
        level: cleanLevel || '',
        status: cleanStatus || ''
      };
      if (profileData.adminUnlockOverride !== undefined) {
        params.adminUnlockOverride = profileData.adminUnlockOverride;
      }
      if (profileData.makeDayActive) {
        params.makeDayActive = profileData.makeDayActive;
      }
      if (profileData.resetDay) {
        params.resetDay = profileData.resetDay;
      }

      try {
        const qs = new URLSearchParams(params).toString();
        const response = await fetch(`${scriptUrl}?${qs}&_nocache=${Date.now()}`, {
          method: 'GET',
          mode: 'cors'
        });
        if (response.ok) {
          const resData = await response.json();
          if (resData && resData.student) {
            if (users[cleanPhone]) {
              users[cleanPhone].adminUnlockOverride = resData.student.adminUnlockOverride;
              if (resData.student.attemptedDays) users[cleanPhone].attemptedDays = resData.student.attemptedDays;
              this.saveLocalUser(users[cleanPhone]);
            }
          }
          return { success: true, student: users[cleanPhone] || currentUser, remote: resData };
        }
      } catch (e) {
        console.warn('GET update_profile error:', e);
      }

      // Redundant POST
      try {
        fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params)
        }).catch(() => {});
      } catch (err) {}
    }

    return { success: true, student: users[cleanPhone] || currentUser };
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
    const totalQuestions = submission.totalQuestions || 15;
    const accuracyPercent = Math.round((submission.questionsCorrect / totalQuestions) * 100);
    const payload = {
      action: 'submit_quiz',
      phone: cleanPhone,
      studentName: submission.studentName,
      level: submission.level,
      dayNumber: submission.dayNumber,
      score: submission.score,
      accuracy: `${accuracyPercent}%`,
      timeTakenSec: submission.timeTakenSec,
      questionsCorrect: submission.questionsCorrect,
      timerMode: submission.timerMode
    };

    if (scriptUrl && navigator.onLine) {
      const qs = new URLSearchParams(payload).toString();
      const getUrl = `${scriptUrl}?${qs}&_nocache=${Date.now()}`;

      // 1. Ultra-reliable background delivery via navigator.sendBeacon
      try {
        if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
          navigator.sendBeacon(getUrl);
        }
      } catch (beaconErr) {}

      // 2. Immediate async fetch with CORS
      try {
        const res = await fetch(getUrl, {
          method: 'GET',
          mode: 'cors'
        });
        if (res.ok) {
          const syncData = await res.json();
          if (syncData && syncData.student) {
            if (users[cleanPhone]) {
              users[cleanPhone].totalScore = syncData.student.totalScore;
              users[cleanPhone].currentStreak = syncData.student.currentStreak;
              users[cleanPhone].quizzesCompleted = syncData.student.quizzesCompleted;
              users[cleanPhone].lastActiveDate = syncData.student.lastActiveDate;
              this.saveLocalUser(users[cleanPhone]);
            }
            if (typeof Auth !== 'undefined' && Auth.currentUser && Auth.currentUser.phone === cleanPhone) {
              Auth.currentUser.totalScore = syncData.student.totalScore;
              Auth.currentUser.currentStreak = syncData.student.currentStreak;
              Auth.currentUser.quizzesCompleted = syncData.student.quizzesCompleted;
              Auth.currentUser.lastActiveDate = syncData.student.lastActiveDate;
            }
          }
        }
      } catch (getErr) {
        // Fallback: send via no-cors GET and queue for retry
        try {
          fetch(getUrl, { mode: 'no-cors' }).catch(() => {});
        } catch (e) {}
        this.queueOfflineSubmission(payload);
      }

      // 3. Redundant POST for insurance
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

  // 5. SUBMIT PAYMENT (SCREENSHOT / UTR)
  async submitPayment(paymentData) {
    const cleanPhone = String(paymentData.phone).trim().replace(/\D/g, '');
    const payload = {
      action: 'payment_submitted',
      phone: cleanPhone,
      studentName: paymentData.studentName || 'Student',
      level: paymentData.level || 'Junior (Grade 1-4)',
      utr: String(paymentData.utr || '').trim(),
      amount: '200',
      screenshotData: paymentData.screenshotData || '',
      screenshotFileName: paymentData.screenshotFileName || ('payment_' + cleanPhone + '.jpg')
    };

    const users = this.getLocalUsers();
    if (users[cleanPhone]) {
      users[cleanPhone].accessStatus = 'PENDING_APPROVAL';
      users[cleanPhone].hasScreenshot = !!payload.screenshotData;
      users[cleanPhone].lastPaymentDate = new Date().toISOString();
      this.saveLocalUser(users[cleanPhone]);
      if (typeof Auth !== 'undefined' && Auth.currentUser && Auth.currentUser.phone === cleanPhone) {
        Auth.currentUser.accessStatus = 'PENDING_APPROVAL';
      }
    }

    const scriptUrl = this.getScriptUrl();
    if (scriptUrl && navigator.onLine) {
      // Send via POST with JSON body (handles Base64 screenshots cleanly to Google Drive)
      try {
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        });
      } catch (e) {
        console.warn('Payment submit POST warning:', e);
      }
    }

    return { success: true };
  },

  // 4. FETCH LEADERBOARD (Strictly Canonical: 100% Real Students from Google Sheet)
  async getLeaderboard(filterLevel = 'all') {
    this.purgeLegacyDummyData();
    const scriptUrl = this.getScriptUrl();
    const cleanFilter = String(filterLevel || 'all').trim().toLowerCase();

    // Helper to check if a student's level matches filter
    const matchesLevel = (levelStr) => {
      if (cleanFilter === 'all' || cleanFilter === '') return true;
      const cl = String(levelStr || '').toLowerCase();
      if (cleanFilter.includes('junior') || cleanFilter.includes('1-4')) {
        return cl.includes('junior') || cl.includes('1-4');
      }
      if (cleanFilter.includes('senior') || cleanFilter.includes('4-10')) {
        return cl.includes('senior') || cl.includes('4-10');
      }
      return cl.includes(cleanFilter);
    };

    // Filter helper to strictly reject dummy placeholder names
    const isRealStudent = (s) => {
      if (!s || !s.name) return false;
      const n = String(s.name).trim().toLowerCase();
      const dummyBlacklist = ['diya patel', 'aarav sharma', 'kabir verma', 'ananya iyer', 'ishaan gupta'];
      return !dummyBlacklist.includes(n);
    };

    if (scriptUrl && navigator.onLine) {
      try {
        const res = await fetch(`${scriptUrl}?action=leaderboard&level=${encodeURIComponent(cleanFilter)}&_nocache=${Date.now()}`, {
          method: 'GET',
          mode: 'cors',
          cache: 'no-store'
        });
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.leaderboard)) {
            // Strictly real students only
            const realSheetStudents = data.leaderboard.filter(isRealStudent);

            // Save real sheet rankings to localStorage cache for offline resilience
            try {
              localStorage.setItem(this.STORAGE_KEYS.REAL_LEADERBOARD_CACHE, JSON.stringify(realSheetStudents));
            } catch (e) {}

            let list = realSheetStudents.filter(s => matchesLevel(s.level));
            list.sort((a, b) => b.score - a.score || b.streak - a.streak);
            return list;
          }
        }
      } catch (err) {}
    }

    // Offline / Network Fallback: Use cached REAL leaderboard from Google Sheet
    try {
      const cached = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.REAL_LEADERBOARD_CACHE));
      if (Array.isArray(cached) && cached.length > 0) {
        const realCached = cached.filter(isRealStudent);
        let list = realCached.filter(s => matchesLevel(s.level));
        list.sort((a, b) => b.score - a.score || b.streak - a.streak);
        return list;
      }
    } catch (e) {}

    // Ultimate fallback if cache is empty: Show only real local registered students, ZERO dummy stars!
    const localUsers = this.getLocalUsers();
    const students = [];
    for (const p in localUsers) {
      const u = localUsers[p];
      if (u && u.name && !u.name.startsWith('Student (') && isRealStudent(u)) {
        students.push({
          name: u.name,
          level: u.level || 'Junior (Grade 1-4)',
          score: Number(u.totalScore) || 0,
          streak: Number(u.currentStreak) || 0,
          quizzes: Number(u.quizzesCompleted) || 0
        });
      }
    }
    const filtered = students.filter(s => matchesLevel(s.level));
    filtered.sort((a, b) => b.score - a.score || b.streak - a.streak);
    return filtered;
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

  setCurrentUser(user) {
    if (user) {
      localStorage.setItem(this.STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.STORAGE_KEYS.CURRENT_USER);
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
      const q = this.getOfflineQueue();
      if (!Array.isArray(q) || q.length === 0) return;

      const remaining = [];
      for (const item of q) {
        try {
          const qs = new URLSearchParams(item).toString();
          await fetch(`${scriptUrl}?${qs}&_nocache=${Date.now()}`, {
            method: 'GET',
            mode: 'no-cors'
          });
        } catch (e) {
          remaining.push(item);
        }
      }
      localStorage.setItem(this.STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify(remaining));
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
