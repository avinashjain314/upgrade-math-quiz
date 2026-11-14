/**
 * Master Application Controller
 * Upgrade Math Quiz by Avinash Sir
 * 
 * Includes:
 * - 3-Second Auto-Advance Countdown upon attempting any question
 * - Strict Daily Locking (Only today's quiz can be attempted; missed past days locked)
 * - Single Attempt Enforcement (one attempt per quiz per student)
 * - Admin Unlock Override from Google Sheet
 * - 30-Second Brain Gym & Focus Booster
 */

const App = {
  currentView: 'home',
  currentQuiz: null,
  focusTimerInterval: null,
  quizState: {
    day: 1,
    questions: [],
    currentIndex: 0,
    answers: [],
    score: 0,
    timerEnabled: true,
    timerSeconds: 50,
    timerInterval: null,
    autoAdvanceInterval: null,
    totalTimeSpent: 0,
    isComplete: false
  },

  init() {
    SoundEngine.init();
    SoundEngine.updateSoundUi();
    SoundEngine.updateBgmUi();
    RoughPad.init('roughpad-canvas');

    const user = Auth.init();
    if (!user) {
      this.switchView('auth');
    } else {
      // User is remembered! Stay logged into their account
      const status = String(user.accessStatus || '').toUpperCase().trim();
      if (status === 'ACTIVE' || Auth.isAdmin || user.isAdmin) {
        this.switchView('home');
      } else if (status === 'PENDING_APPROVAL') {
        this.switchView('home');
        this.openPaymentModal(user, true);
      } else if (status === 'NO_ACCESS' || status === 'NO ACCESS') {
        this.switchView('home');
        this.openPaymentModal(user, false);
      } else {
        this.switchView('home');
      }
    }

    this.renderHeaderUser();
    this.attachGlobalEvents();
  },

  switchView(viewName) {
    this.currentView = viewName;
    const views = ['auth', 'home', 'practice', 'roadmap', 'quiz', 'leaderboard', 'badges', 'settings'];
    views.forEach(v => {
      const el = document.getElementById(`view-${v}`);
      if (el) {
        if (v === viewName) {
          el.classList.remove('hidden');
          if (v === 'auth') {
            el.classList.add('flex');
          }
        } else {
          el.classList.add('hidden');
          if (v === 'auth') {
            el.classList.remove('flex');
          }
        }
      }
    });

    document.querySelectorAll('.nav-btn').forEach(btn => {
      if (btn.dataset.view === viewName) {
        btn.classList.add('text-indigo-400', 'bg-indigo-500/20');
        btn.classList.remove('text-slate-400');
      } else {
        btn.classList.remove('text-indigo-400', 'bg-indigo-500/20');
        btn.classList.add('text-slate-400');
      }
    });

    if (viewName === 'home') {
      this.renderHome();
    } else if (viewName === 'practice') {
      this.renderPracticeHub();
    } else if (viewName === 'roadmap') {
      this.renderRoadmap();
    } else if (viewName === 'leaderboard') {
      Leaderboard.render('leaderboard-content');
    } else if (viewName === 'badges') {
      this.renderBadges();
    } else if (viewName === 'settings') {
      this.renderSettings();
    }
  },

  renderHeaderUser() {
    const user = Auth.getCurrentUser();
    const userBadge = document.getElementById('header-user-badge');
    if (!userBadge) return;

    if (user) {
      userBadge.innerHTML = `
        <div class="flex items-center gap-2 cursor-pointer" onclick="App.switchView('settings')">
          <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
            ${user.name.charAt(0)}
          </div>
          <div class="hidden sm:block text-left">
            <p class="text-xs font-bold text-white leading-tight">${user.name}</p>
            <p class="text-[10px] text-amber-400 font-semibold">🔥 ${user.currentStreak || 0}d · ${user.totalScore || 0} pts</p>
          </div>
        </div>
      `;
    } else {
      userBadge.innerHTML = '';
    }
  },

  // -------------------------------------------------------------
  // HOME VIEW
  // -------------------------------------------------------------
  renderHome() {
    const user = Auth.getCurrentUser();
    this.renderHeaderUser();

    const today = Auth.getCurrentProgramDay();
    const isTodayAttempted = user ? Auth.isDayAttempted(today) : false;
    const titleInfo = getTitleForScore(user ? (user.totalScore || 0) : 0);
    const wisdom = getDailyWisdom(today);
    const growth = (typeof getHolisticDayGrowth === 'function') ? getHolisticDayGrowth(today) : null;

    // Welcome Card
    const welcomeContainer = document.getElementById('home-welcome-card');
    if (welcomeContainer) {
      if (user) {
        welcomeContainer.innerHTML = `
          <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/90 via-slate-900 to-slate-950 p-6 border border-indigo-500/30 shadow-2xl">
            <div class="absolute -right-6 -bottom-6 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl"></div>
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-2xl">${titleInfo.icon}</span>
                  <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    ${user.level}
                  </span>
                  <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    ${titleInfo.title}
                  </span>
                  <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    📅 Day ${today} of 100
                  </span>
                </div>
                <h2 class="text-2xl font-black text-white mt-2">Welcome, ${user.name}! 👋</h2>
                <p class="text-sm text-slate-300 mt-1 max-w-lg">
                  Daily discipline builds mathematical genius! Exactly 1 quiz per day on your personalized 100-day journey.
                </p>
              </div>
              <div class="flex gap-3">
                <div class="bg-slate-800/80 border border-slate-700/80 px-4 py-2.5 rounded-2xl text-center">
                  <p class="text-[11px] text-slate-400">Streak</p>
                  <p class="text-xl font-black text-amber-400 flex items-center justify-center gap-1">
                    <span>🔥</span> ${user.currentStreak || 0} <span class="text-xs text-slate-400 font-normal">days</span>
                  </p>
                </div>
                <div class="bg-slate-800/80 border border-slate-700/80 px-4 py-2.5 rounded-2xl text-center">
                  <p class="text-[11px] text-slate-400">Total Score</p>
                  <p class="text-xl font-black text-indigo-400">
                    ${(user.totalScore || 0).toLocaleString()} <span class="text-xs text-slate-400 font-normal">pts</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        `;
      } else {
        welcomeContainer.innerHTML = `
          <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950/90 via-slate-900 to-slate-950 p-6 border border-indigo-500/40 shadow-2xl">
            <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div class="space-y-2 text-center sm:text-left">
                <span class="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  <span>🚀</span> 100-Day Mathematical & Mindset Transformation
                </span>
                <h2 class="text-2xl sm:text-3xl font-black text-white">Upgrade Math Quiz by Avinash Sir 🎯</h2>
                <p class="text-sm text-slate-300 max-w-lg">
                  Every child starts on Day 1 on their enrollment date! Conquering 20 daily questions builds razor-sharp mental speed, English vocabulary, and unbreakable discipline.
                </p>
              </div>
              <button onclick="App.switchView('auth')" class="px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/30 transition transform hover:scale-105 active:scale-95 text-base whitespace-nowrap">
                👉 Enter Mobile to Start Day 1
              </button>
            </div>
          </div>
        `;
      }
    }

    // Today's Quiz Action Card
    const todayQuizContainer = document.getElementById('home-today-quiz-card');
    if (todayQuizContainer) {
      if (!user) {
        todayQuizContainer.innerHTML = `
          <div class="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="space-y-1.5 text-center md:text-left">
              <div class="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-bold">
                <span>⚡</span> Day 1 of 100 (Your Starting Challenge)
              </div>
              <h3 class="text-2xl font-black text-white">Day 1 Homework Quiz Ready!</h3>
              <p class="text-sm text-slate-300 max-w-md">
                20 Questions · 5 Easy (10pts) · 7 Medium (20pts) · 8 Hard (30pts) · Auto-advances in 3s · Only 1 Attempt Allowed!
              </p>
            </div>
            <div class="flex gap-3">
              <button onclick="App.switchView('auth')" class="px-8 py-4 bg-white text-indigo-950 hover:bg-slate-100 font-black rounded-2xl shadow-xl transition transform hover:scale-105 active:scale-95 text-base">
                <span>🚀 Login & Take Day 1 Quiz</span>
              </button>
            </div>
          </div>
        `;
      } else if (isTodayAttempted) {
        todayQuizContainer.innerHTML = `
          <div class="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/40 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="space-y-1.5 text-center md:text-left">
              <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold">
                <span>✓</span> Day ${today} Quiz Already Attempted
              </div>
              <h3 class="text-2xl font-black text-white">Great Job Today! 🌟</h3>
              <p class="text-sm text-slate-300 max-w-md">
                Each quiz can only be attempted once per student to maintain strict daily discipline. Tomorrow, Day ${Math.min(100, today + 1)} will unlock!
              </p>
            </div>
            <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button onclick="App.reviewPastDay(${today})" class="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl border border-slate-700 text-sm transition">
                📖 Review Today's Solutions
              </button>
            </div>
          </div>
        `;
      } else {
        todayQuizContainer.innerHTML = `
          <div class="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-600/20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="space-y-2 text-center md:text-left">
              <div class="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
                <span>⚡</span> Day ${today} of 100 (Today's Challenge)
              </div>
              <h3 class="text-2xl font-black">Today's Homework Quiz</h3>
              <p class="text-sm text-indigo-100 max-w-md">
                20 Questions · 5 Easy (10pts) · 7 Medium (20pts) · 8 Hard (30pts) · Auto-advances in 3s · Only 1 Attempt Allowed!
              </p>
            </div>
            <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button onclick="App.openFocusBooster()" class="px-5 py-4 bg-slate-900/80 hover:bg-slate-900 text-indigo-300 font-bold rounded-2xl border border-indigo-400/40 text-sm transition flex items-center justify-center gap-2">
                <span>🧠</span> Focus Booster
              </button>
              <button onclick="App.openQuizSetup(${today})" class="px-8 py-4 bg-white text-indigo-950 hover:bg-slate-100 font-black rounded-2xl shadow-xl transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 text-lg">
                <span>🚀 Start Quiz</span>
              </button>
            </div>
          </div>
        `;
      }
    }

    // AVINASH SIR'S HOLISTIC GROWTH HUB FOR KIDS (Vedic Math, Vocabulary, Facts, Thoughts, Focus)
    const trickContainer = document.getElementById('home-daily-trick-card');
    if (trickContainer) {
      const wordHtml = growth ? `
        <!-- Word of the Day -->
        <div class="bg-slate-950/80 border border-cyan-500/30 rounded-2xl p-5 space-y-3 shadow-lg flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>📖</span> Word of the Day
              </span>
              <span class="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-bold">
                ${growth.wordOfTheDay.category}
              </span>
            </div>
            <div class="flex items-baseline gap-2 mt-2">
              <h4 class="text-xl font-black text-white tracking-tight">${growth.wordOfTheDay.word}</h4>
              <span class="text-xs font-mono text-cyan-300/80">${growth.wordOfTheDay.phonetic}</span>
            </div>
            <p class="text-xs text-slate-300 mt-2 leading-relaxed">
              <strong class="text-cyan-200">Meaning:</strong> ${growth.wordOfTheDay.meaning}
            </p>
          </div>
          <div class="text-xs italic text-slate-400 bg-slate-900/70 p-3 rounded-xl border border-slate-800">
            "${growth.wordOfTheDay.example}"
          </div>
        </div>

        <!-- Mind-Blowing Science & Math Fact -->
        <div class="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-5 space-y-3 shadow-lg flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>${growth.mindFact.icon}</span> Mind-Blowing Fact
              </span>
              <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-bold">
                ${growth.mindFact.category}
              </span>
            </div>
            <h4 class="text-base font-black text-white mt-2">${growth.mindFact.title}</h4>
            <p class="text-xs text-slate-300 mt-2 leading-relaxed">
              ${growth.mindFact.fact}
            </p>
          </div>
          <div class="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <span>✨</span> Expand your curiosity every day!
          </div>
        </div>

        <!-- Powerful Character Thought -->
        <div class="bg-slate-950/80 border border-purple-500/30 rounded-2xl p-5 space-y-3 shadow-lg flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>🔥</span> Powerful Thought of the Day
            </span>
            <blockquote class="text-xs italic text-purple-100 mt-3 leading-relaxed border-l-2 border-purple-500 pl-3">
              "${growth.powerfulThought.quote}"
            </blockquote>
            <p class="text-xs font-bold text-amber-300 mt-2 text-right">
              — ${growth.powerfulThought.author}
            </p>
          </div>
          <div class="text-[11px] text-slate-400 bg-slate-900/70 p-2.5 rounded-xl border border-slate-800">
            <strong class="text-purple-300">Life Lesson:</strong> ${growth.powerfulThought.lesson}
          </div>
        </div>
      ` : '';

      trickContainer.innerHTML = `
        <div class="rounded-3xl bg-slate-900/90 border border-indigo-500/30 p-6 sm:p-8 shadow-2xl space-y-6">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-indigo-600 to-purple-600 flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/30">
                🌟
              </div>
              <div>
                <h3 class="text-xl font-black text-white">Avinash Sir's Holistic Growth Hub</h3>
                <p class="text-xs text-indigo-400 font-semibold">Vedic Math · English Vocabulary · Amazing Science Facts · Character Thoughts</p>
              </div>
            </div>
            <span class="text-xs font-bold px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
              📅 Day ${today} Challenge Edition
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Vedic Math Shortcut Card -->
            <div class="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-5 space-y-3 shadow-lg flex flex-col justify-between">
              <div>
                <div class="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <span>💡</span> Vedic Math Speed Hack
                </div>
                <h4 class="text-base font-black text-white mt-2">${wisdom.title}</h4>
                <p class="text-xs text-slate-300 mt-2 font-mono bg-slate-900/90 p-3 rounded-xl border border-slate-800 leading-relaxed">
                  ${wisdom.trick}
                </p>
              </div>
              <p class="text-xs italic text-amber-300/90 text-right">
                "${wisdom.quote}"
              </p>
            </div>

            ${wordHtml}
          </div>

          <!-- Focus & Memory Health Tip -->
          <div class="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 flex items-start sm:items-center gap-3">
            <span class="text-2xl shrink-0">🧘</span>
            <div>
              <strong class="text-indigo-300">Avinash Sir's Brain Focus & Memory Tip:</strong>
              <p class="mt-0.5 text-slate-300 leading-relaxed">${wisdom.focusTip}</p>
            </div>
          </div>
        </div>
      `;
    }
  },

  // -------------------------------------------------------------
  // ROADMAP VIEW (100 DAYS)
  // -------------------------------------------------------------
  renderRoadmap() {
    const user = Auth.getCurrentUser();
    const container = document.getElementById('roadmap-grid');
    if (!container) return;

    const today = Auth.getCurrentProgramDay();
    let html = '';

    for (let d = 1; d <= 100; d++) {
      const status = user ? Auth.getDayStatus(d) : { state: d === 1 ? 'today' : 'future_locked', label: d === 1 ? 'Start Here' : `Day ${d}` };
      let cardClass = '';
      let badgeHtml = '';
      let actionOnClick = '';
      let subtext = '';

      if (status.state === 'attempted') {
        cardClass = 'bg-slate-900/90 border-emerald-500/40 hover:border-emerald-400';
        badgeHtml = `<span class="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">✓ Attempted</span>`;
        actionOnClick = `App.reviewPastDay(${d})`;
        subtext = '⭐ View Solutions';
      } else if (status.state === 'today') {
        cardClass = 'bg-gradient-to-br from-indigo-900/80 to-slate-900 border-indigo-500 ring-2 ring-indigo-500/30 shadow-lg shadow-indigo-500/20 animate-pulse';
        badgeHtml = `<span class="text-[10px] bg-indigo-500 text-white px-2 py-0.5 rounded-full font-bold">Today</span>`;
        actionOnClick = user ? `App.openQuizSetup(${d})` : `App.switchView('auth')`;
        subtext = user ? '⚡ 20 Questions (Active)' : '👉 Click to Login & Play';
      } else if (status.state === 'admin_unlocked') {
        cardClass = 'bg-slate-900/90 border-amber-500/50 hover:border-amber-400 ring-1 ring-amber-500/30';
        badgeHtml = `<span class="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">🔓 Unlocked</span>`;
        actionOnClick = `App.openQuizSetup(${d})`;
        subtext = 'Special Access (Avinash Sir)';
      } else if (status.state === 'missed_locked') {
        cardClass = 'bg-slate-950/60 border-slate-900 text-slate-500 opacity-70';
        badgeHtml = `<span class="text-[10px] bg-rose-950/40 text-rose-400 border border-rose-900/40 px-2 py-0.5 rounded-full font-medium">🔒 Missed</span>`;
        actionOnClick = `alert("Day ${d} was missed and is locked! In this program, kids do each day's quiz on that day only to build discipline. If you need this day unlocked, ask Avinash Sir via the spreadsheet!")`;
        subtext = 'Locked (Ask Avinash Sir)';
      } else {
        // Future locked
        cardClass = 'bg-slate-950/30 border-slate-900/60 opacity-40';
        badgeHtml = `<span class="text-[10px] bg-slate-900 text-slate-600 px-2 py-0.5 rounded-full">🔒 Locked</span>`;
        actionOnClick = `alert("Day ${d} is in the future and will unlock on Day ${d}!")`;
        subtext = `Unlocks on Day ${d}`;
      }

      html += `
        <div onclick="${actionOnClick}" class="cursor-pointer rounded-2xl border p-4 transition duration-200 transform hover:-translate-y-1 flex flex-col justify-between h-32 ${cardClass}">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-400">Day</span>
            ${badgeHtml}
          </div>
          <div class="text-2xl font-black text-white text-center my-auto">
            ${d}
          </div>
          <div class="text-[10px] text-slate-400 text-center truncate">
            ${subtext}
          </div>
        </div>
      `;
    }

    container.innerHTML = html;
  },

  // -------------------------------------------------------------
  // FOCUS BOOSTER MODAL (BRAIN GYM)
  // -------------------------------------------------------------
  openFocusBooster() {
    const modal = document.getElementById('focus-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    this.startBreathingCycle();
  },

  closeFocusBooster() {
    clearInterval(this.focusTimerInterval);
    const modal = document.getElementById('focus-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  },

  startBreathingCycle() {
    clearInterval(this.focusTimerInterval);
    const textEl = document.getElementById('focus-instruction-text');
    const circle = document.getElementById('focus-breath-circle');
    let phase = 0; // 0: Inhale, 1: Hold, 2: Exhale

    const updatePhase = () => {
      if (phase === 0) {
        if (textEl) textEl.innerText = "Breathe In Slowly... 🌬️ (4s)";
        if (circle) circle.className = "w-36 h-36 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 transition-all duration-[4000ms] transform scale-125 shadow-2xl shadow-indigo-500/50 flex items-center justify-center text-3xl";
      } else if (phase === 1) {
        if (textEl) textEl.innerText = "Hold & Focus Your Mind... 💎 (4s)";
        if (circle) circle.className = "w-36 h-36 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 transition-all duration-[4000ms] transform scale-125 shadow-2xl shadow-cyan-400/50 flex items-center justify-center text-3xl";
      } else {
        if (textEl) textEl.innerText = "Exhale Tension & Relax... ✨ (4s)";
        if (circle) circle.className = "w-36 h-36 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-700 transition-all duration-[4000ms] transform scale-90 shadow-lg flex items-center justify-center text-3xl";
      }
      phase = (phase + 1) % 3;
    };

    updatePhase();
    this.focusTimerInterval = setInterval(updatePhase, 4000);
  },

  // -------------------------------------------------------------
  // QUIZ SETUP & SINGLE ATTEMPT VERIFICATION
  // -------------------------------------------------------------
  openQuizSetup(day) {
    const user = Auth.getCurrentUser();
    if (!user) return;

    const status = Auth.getDayStatus(day);
    if (status.state === 'attempted') {
      alert(`Day ${day} quiz has already been attempted! In this program, only 1 attempt is allowed. Opening solutions review.`);
      this.reviewPastDay(day);
      return;
    }
    if (status.state === 'missed_locked') {
      alert(`Day ${day} was missed and is locked.\n\nOnly Today's quiz is accessible to enforce daily discipline. If you need this day unlocked, ask Avinash Sir!`);
      return;
    }
    if (status.state === 'future_locked') {
      alert(`Day ${day} will unlock on Day ${day}!`);
      return;
    }

    this.quizState.day = day;
    const modal = document.getElementById('quiz-setup-modal');
    if (!modal) return;

    document.getElementById('setup-modal-day').innerText = `Day ${day} Quiz`;
    document.getElementById('setup-modal-track').innerText = user.level;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  },

  closeQuizSetup() {
    const modal = document.getElementById('quiz-setup-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  },

  startQuizFromSetup() {
    const timerCheckbox = document.getElementById('setup-timer-toggle');
    const timerEnabled = timerCheckbox ? timerCheckbox.checked : true;
    this.closeQuizSetup();
    this.startQuiz(this.quizState.day, timerEnabled);
  },

  // -------------------------------------------------------------
  // QUIZ GAMEPLAY & 3-SECOND AUTO ADVANCE
  // -------------------------------------------------------------
  startQuiz(day, timerEnabled = true) {
    const user = Auth.getCurrentUser();
    if (!user) return;

    SoundEngine.playClick();
    clearInterval(this.quizState.autoAdvanceInterval);

    const levelCode = user.level.toLowerCase().includes('senior') ? 'senior' : 'junior';
    const questions = QuestionEngine.generateDailyQuiz(day, levelCode);

    this.quizState = {
      day: day,
      questions: questions,
      currentIndex: 0,
      answers: [],
      score: 0,
      timerEnabled: timerEnabled,
      timerSeconds: 50,
      timerInterval: null,
      autoAdvanceInterval: null,
      totalTimeSpent: 0,
      isComplete: false,
      bonusRoundsCompleted: {}
    };

    this.switchView('quiz');
    this.renderCurrentQuestion();
    if (timerEnabled) {
      this.startQuestionTimer();
    } else {
      document.getElementById('quiz-timer-container').classList.add('opacity-40');
      document.getElementById('quiz-timer-text').innerText = 'Timer: OFF';
    }

    if (SoundEngine.bgmEnabled) {
      SoundEngine.startBgm();
    }
  },

  startQuestionTimer() {
    clearInterval(this.quizState.timerInterval);
    this.quizState.timerSeconds = 50;
    const timerText = document.getElementById('quiz-timer-text');
    const timerBar = document.getElementById('quiz-timer-bar');

    if (timerText) timerText.innerText = `${this.quizState.timerSeconds}s`;
    if (timerBar) timerBar.style.width = '100%';

    this.quizState.timerInterval = setInterval(() => {
      this.quizState.timerSeconds--;
      this.quizState.totalTimeSpent++;

      if (timerText) timerText.innerText = `${this.quizState.timerSeconds}s`;
      if (timerBar) {
        const pct = (this.quizState.timerSeconds / 50) * 100;
        timerBar.style.width = `${pct}%`;
        if (pct < 25) {
          timerBar.className = 'h-full bg-red-500 transition-all duration-1000';
        } else if (pct < 50) {
          timerBar.className = 'h-full bg-amber-500 transition-all duration-1000';
        } else {
          timerBar.className = 'h-full bg-indigo-500 transition-all duration-1000';
        }
      }

      if (this.quizState.timerSeconds <= 0) {
        clearInterval(this.quizState.timerInterval);
        this.selectAnswer(-1, true);
      }
    }, 1000);
  },

  renderCurrentQuestion() {
    clearInterval(this.quizState.autoAdvanceInterval);
    const qIdx = this.quizState.currentIndex;
    const q = this.quizState.questions[qIdx];
    if (!q) return;

    const totalQ = this.quizState.questions.length || 15;
    document.getElementById('quiz-day-badge').innerText = `Day ${this.quizState.day}`;
    document.getElementById('quiz-progress-text').innerText = `Question ${qIdx + 1} of ${totalQ}`;
    document.getElementById('quiz-progress-bar').style.width = `${((qIdx + 1) / totalQ) * 100}%`;
    document.getElementById('quiz-live-score').innerText = `${this.quizState.score} pts`;

    const diffBadge = document.getElementById('quiz-diff-badge');
    if (diffBadge) {
      if (q.difficulty === 'easy') {
        diffBadge.className = 'px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
        diffBadge.innerText = '🟢 Easy (10 pts)';
      } else if (q.difficulty === 'medium') {
        diffBadge.className = 'px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30';
        diffBadge.innerText = '🟡 Medium (20 pts)';
      } else {
        diffBadge.className = 'px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30';
        diffBadge.innerText = '🔴 Hard (30 pts)';
      }
    }

    document.getElementById('quiz-topic-text').innerText = q.topic || 'Math Problem';
    document.getElementById('quiz-question-text').innerText = q.questionText;

    const optionsGrid = document.getElementById('quiz-options-grid');
    optionsGrid.innerHTML = '';

    const optionLetters = ['A', 'B', 'C', 'D'];
    q.options.forEach((optText, i) => {
      const btn = document.createElement('button');
      btn.className = `option-btn w-full p-4 text-left rounded-2xl border border-slate-700/80 bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-semibold transition duration-150 transform hover:-translate-y-0.5 flex items-center gap-4`;
      btn.innerHTML = `
        <span class="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sm text-indigo-400 shrink-0">
          ${optionLetters[i]}
        </span>
        <span class="text-base">${optText}</span>
      `;
      btn.onclick = () => this.selectAnswer(i);
      optionsGrid.appendChild(btn);
    });

    document.getElementById('quiz-feedback-box').classList.add('hidden');
    document.getElementById('quiz-next-btn').classList.add('hidden');
  },

  selectAnswer(selectedIdx, isTimeout = false) {
    clearInterval(this.quizState.timerInterval);
    clearInterval(this.quizState.autoAdvanceInterval);

    const qIdx = this.quizState.currentIndex;
    const q = this.quizState.questions[qIdx];
    const isCorrect = (selectedIdx === q.correctIndex);

    let pointsAwarded = 0;
    if (isCorrect) {
      pointsAwarded = q.points;
      if (this.quizState.timerEnabled) {
        if (this.quizState.timerSeconds >= 35) pointsAwarded += 5; // Fast (first 15s)
        else if (this.quizState.timerSeconds >= 20) pointsAwarded += 3; // Good (first 30s)
        else pointsAwarded += 1; // Steady finish
      }
      this.quizState.score += pointsAwarded;
      SoundEngine.playCorrect();
    } else {
      SoundEngine.playIncorrect();
    }

    this.quizState.answers.push({
      question: q,
      selectedIdx: selectedIdx,
      isCorrect: isCorrect,
      isTimeout: isTimeout,
      pointsAwarded: pointsAwarded
    });

    // Color buttons
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.correctIndex) {
        btn.className = 'w-full p-4 text-left rounded-2xl border-2 border-emerald-500 bg-emerald-950/60 text-white font-bold flex items-center gap-4';
      } else if (i === selectedIdx && !isCorrect) {
        btn.className = 'w-full p-4 text-left rounded-2xl border-2 border-rose-500 bg-rose-950/60 text-white font-bold flex items-center gap-4';
      } else {
        btn.className = 'w-full p-4 text-left rounded-2xl border border-slate-800 bg-slate-950/40 text-slate-500 opacity-60 flex items-center gap-4';
      }
    });

    // Feedback
    const feedbackBox = document.getElementById('quiz-feedback-box');
    const feedbackText = document.getElementById('quiz-feedback-text');
    feedbackBox.classList.remove('hidden');

    if (isCorrect) {
      feedbackBox.className = 'p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 text-sm';
      feedbackText.innerHTML = `<strong>🎉 Correct! +${pointsAwarded} pts</strong><br>${q.explanation}`;
    } else if (isTimeout) {
      feedbackBox.className = 'p-4 rounded-2xl bg-rose-950/50 border border-rose-500/40 text-rose-200 text-sm';
      feedbackText.innerHTML = `<strong>⏰ Time's up!</strong> Correct Answer: <em>${q.correctAnswer}</em><br>${q.explanation}`;
    } else {
      feedbackBox.className = 'p-4 rounded-2xl bg-rose-950/50 border border-rose-500/40 text-rose-200 text-sm';
      feedbackText.innerHTML = `<strong>❌ Incorrect!</strong> Correct Answer: <em>${q.correctAnswer}</em><br>${q.explanation}`;
    }

    // 3-SECOND AUTO ADVANCE COUNTDOWN
    const nextBtn = document.getElementById('quiz-next-btn');
    nextBtn.classList.remove('hidden');
    let countdown = 3;
    const totalQ = this.quizState.questions.length || 15;
    const isLast = (qIdx === totalQ - 1);
    const isBonusTrigger = (qIdx === 4 && !this.quizState.bonusRoundsCompleted[1]) || (qIdx === 9 && !this.quizState.bonusRoundsCompleted[2]);
    const bonusRoundNum = (qIdx === 4) ? 1 : 2;

    const updateCountdownLabel = () => {
      let label = 'Next Question';
      if (isLast) {
        label = 'Finish & Open Mystery Chest';
      } else if (isBonusTrigger) {
        label = '🃏 Go to Wordwall Bonus Round';
      }
      nextBtn.innerHTML = `<span>${label} (${countdown}s)...</span> <span class="text-xs opacity-75">(Tap to advance) ➔</span>`;
    };

    updateCountdownLabel();

    this.quizState.autoAdvanceInterval = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        updateCountdownLabel();
      } else {
        clearInterval(this.quizState.autoAdvanceInterval);
        this.quizState.autoAdvanceInterval = null;
        if (isLast) {
          this.finishQuiz();
        } else if (isBonusTrigger) {
          this.openBonusRound(bonusRoundNum);
        } else {
          this.nextQuestion();
        }
      }
    }, 1000);
  },

  nextQuestion() {
    clearInterval(this.quizState.autoAdvanceInterval);
    this.quizState.autoAdvanceInterval = null;
    SoundEngine.playClick();

    const qIdx = this.quizState.currentIndex;
    const totalQ = this.quizState.questions.length || 15;

    // Check if this was question 5 or 10 and bonus round hasn't fired yet
    if (qIdx === 4 && !this.quizState.bonusRoundsCompleted[1]) {
      this.openBonusRound(1);
      return;
    }
    if (qIdx === 9 && !this.quizState.bonusRoundsCompleted[2]) {
      this.openBonusRound(2);
      return;
    }

    if (this.quizState.currentIndex < totalQ - 1) {
      this.quizState.currentIndex++;
      this.renderCurrentQuestion();
      if (this.quizState.timerEnabled) {
        this.startQuestionTimer();
      }
    } else {
      this.finishQuiz();
    }
  },

  // -------------------------------------------------------------
  // QUIZ COMPLETION
  // -------------------------------------------------------------
  async finishQuiz() {
    clearInterval(this.quizState.autoAdvanceInterval);
    this.quizState.isComplete = true;
    SoundEngine.playVictory();

    if (typeof confetti === 'function') {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }

    const user = Auth.getCurrentUser();
    const correctCount = this.quizState.answers.filter(a => a.isCorrect).length;
    const totalQ = this.quizState.questions.length || 15;
    const accuracy = Math.round((correctCount / totalQ) * 100);

    // Save to Google Sheet & Local Storage
    await SheetSync.submitQuiz({
      phone: user.phone,
      studentName: user.name,
      level: user.level,
      dayNumber: this.quizState.day,
      score: this.quizState.score,
      timeTakenSec: this.quizState.totalTimeSpent,
      questionsCorrect: correctCount,
      timerMode: this.quizState.timerEnabled
    });

    // Immediately update header profile pill with new score
    this.renderHeaderUser();

    document.getElementById('result-score-text').innerText = `${this.quizState.score} Points`;
    document.getElementById('result-accuracy-text').innerText = `${correctCount}/${totalQ} Correct (${accuracy}%)`;
    document.getElementById('result-day-text').innerText = `Day ${this.quizState.day} Completed!`;

    const wisdom = getDailyWisdom(this.quizState.day);
    document.getElementById('chest-trick-title').innerText = wisdom.title;
    document.getElementById('chest-trick-content').innerText = wisdom.trick;
    document.getElementById('chest-quote-text').innerText = wisdom.quote;

    document.getElementById('mystery-chest-unopened').classList.remove('hidden');
    document.getElementById('mystery-chest-opened').classList.add('hidden');

    const resultModal = document.getElementById('quiz-result-modal');
    resultModal.classList.remove('hidden');
    resultModal.classList.add('flex');
  },

  openMysteryChest() {
    SoundEngine.playChestOpen();
    if (typeof confetti === 'function') {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.5 } });
    }
    document.getElementById('mystery-chest-unopened').classList.add('hidden');
    document.getElementById('mystery-chest-opened').classList.remove('hidden');
  },

  closeResultModal() {
    const resultModal = document.getElementById('quiz-result-modal');
    resultModal.classList.add('hidden');
    resultModal.classList.remove('flex');
    this.switchView('home');
  },

  // -------------------------------------------------------------
  // REVIEW SOLUTIONS (PAST ATTEMPTED DAYS)
  // -------------------------------------------------------------
  reviewPastDay(day) {
    const user = Auth.getCurrentUser();
    if (!user) return;

    const levelCode = user.level.toLowerCase().includes('senior') ? 'senior' : 'junior';
    const questions = QuestionEngine.generateDailyQuiz(day, levelCode);

    const container = document.getElementById('review-questions-list');
    container.innerHTML = '';

    questions.forEach((q, i) => {
      const card = document.createElement('div');
      card.className = 'p-4 rounded-2xl border border-indigo-500/30 bg-slate-950/70 space-y-2';
      card.innerHTML = `
        <div class="flex items-center justify-between text-xs">
          <span class="font-bold text-slate-400">Question ${i + 1} (${q.topic})</span>
          <span class="font-bold text-emerald-400">Correct Answer: ${q.correctAnswer}</span>
        </div>
        <p class="text-sm font-semibold text-white">${q.questionText}</p>
        <div class="grid grid-cols-2 gap-2 text-xs pt-1">
          ${q.options.map(opt => `
            <div class="p-2 rounded-xl border ${opt === q.correctAnswer ? 'border-emerald-500/60 bg-emerald-950/40 text-emerald-300 font-bold' : 'border-slate-800 bg-slate-900/50 text-slate-400'}">
              ${opt}
            </div>
          `).join('')}
        </div>
        <p class="text-slate-300 text-xs mt-2 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
          <strong>Avinash Sir's Solution:</strong> ${q.explanation}
        </p>
      `;
      container.appendChild(card);
    });

    document.getElementById('quiz-result-modal').classList.add('hidden');
    document.getElementById('quiz-review-modal').classList.remove('hidden');
    document.getElementById('quiz-review-modal').classList.add('flex');
  },

  openReviewModal() {
    const container = document.getElementById('review-questions-list');
    container.innerHTML = '';

    this.quizState.answers.forEach((ans, i) => {
      const q = ans.question;
      const isCorrect = ans.isCorrect;

      const card = document.createElement('div');
      card.className = `p-4 rounded-2xl border ${isCorrect ? 'border-emerald-500/30 bg-emerald-950/20' : 'border-rose-500/30 bg-rose-950/20'} space-y-2`;
      card.innerHTML = `
        <div class="flex items-center justify-between text-xs">
          <span class="font-bold text-slate-400">Question ${i + 1} (${q.topic})</span>
          <span class="font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}">
            ${isCorrect ? '✓ Correct (+' + ans.pointsAwarded + ' pts)' : '✗ Incorrect'}
          </span>
        </div>
        <p class="text-sm font-semibold text-white">${q.questionText}</p>
        <div class="text-xs space-y-1">
          <p class="text-emerald-300"><strong>Correct Answer:</strong> ${q.correctAnswer}</p>
          ${!isCorrect && ans.selectedIdx >= 0 ? `<p class="text-rose-300"><strong>Your Answer:</strong> ${q.options[ans.selectedIdx]}</p>` : ''}
          <p class="text-slate-300 mt-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
            <strong>Explanation:</strong> ${q.explanation}
          </p>
        </div>
      `;
      container.appendChild(card);
    });

    document.getElementById('quiz-result-modal').classList.add('hidden');
    document.getElementById('quiz-review-modal').classList.remove('hidden');
    document.getElementById('quiz-review-modal').classList.add('flex');
  },

  closeReviewModal() {
    document.getElementById('quiz-review-modal').classList.add('hidden');
    document.getElementById('quiz-review-modal').classList.remove('flex');
    this.switchView('home');
  },

  // -------------------------------------------------------------
  // BADGES VIEW
  // -------------------------------------------------------------
  renderBadges() {
    const user = Auth.getCurrentUser();
    if (!user) return;

    const container = document.getElementById('badges-grid');
    if (!container) return;

    const streak = user.currentStreak || 0;
    const score = user.totalScore || 0;
    const quizzes = user.quizzesCompleted || 0;

    let html = '';
    BADGES.forEach(badge => {
      let isUnlocked = false;
      if (badge.reqType === 'streak' && streak >= badge.reqValue) isUnlocked = true;
      if (badge.reqType === 'score' && score >= badge.reqValue) isUnlocked = true;
      if (badge.reqType === 'quizzes' && quizzes >= badge.reqValue) isUnlocked = true;

      html += `
        <div class="rounded-2xl border p-4 flex items-center gap-4 transition ${isUnlocked ? 'bg-indigo-950/40 border-indigo-500/50 shadow-lg' : 'bg-slate-950/40 border-slate-900 opacity-50 grayscale'}">
          <div class="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-3xl shrink-0">
            ${badge.icon}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h4 class="font-bold text-sm text-white">${badge.title}</h4>
              ${isUnlocked ? '<span class="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded font-bold">Unlocked</span>' : ''}
            </div>
            <p class="text-xs text-slate-400 mt-1">${badge.description}</p>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  // -------------------------------------------------------------
  // SETTINGS & ADMIN
  // -------------------------------------------------------------
  renderSettings() {
    const user = Auth.getCurrentUser();
    if (!user) return;

    document.getElementById('settings-user-name').innerText = user.name;
    document.getElementById('settings-user-phone').innerText = user.phone;
    document.getElementById('settings-user-level').innerText = user.level;

    const scriptInput = document.getElementById('settings-script-url');
    if (scriptInput) {
      scriptInput.value = SheetSync.getScriptUrl();
    }

    const dayInput = document.getElementById('settings-program-day');
    if (dayInput) {
      dayInput.value = Auth.getCurrentProgramDay();
    }
  },

  saveSettings() {
    const scriptInput = document.getElementById('settings-script-url');
    if (scriptInput) {
      SheetSync.setScriptUrl(scriptInput.value);
    }
    const dayInput = document.getElementById('settings-program-day');
    if (dayInput) {
      Auth.setCurrentProgramDay(parseInt(dayInput.value, 10));
    }
    alert('Settings updated successfully!');
    this.renderHome();
  },

  // -------------------------------------------------------------
  // PAYMENT & MONETIZATION CONTROLLER
  // -------------------------------------------------------------
  currentPaymentStudent: null,
  approvalPollInterval: null,

  openPaymentModal(student, isPending = false) {
    this.currentPaymentStudent = student || Auth.getCurrentUser();
    if (!this.currentPaymentStudent) return;

    const cfg = SheetSync.getPaymentConfig();
    const cleanPhone = String(this.currentPaymentStudent.phone || '').trim().replace(/\D/g, '');

    // Populate Student Info
    const nameEl = document.getElementById('payment-student-name');
    if (nameEl) nameEl.innerText = this.currentPaymentStudent.name || 'Student';
    const phoneEl = document.getElementById('payment-student-phone');
    if (phoneEl) phoneEl.innerText = cleanPhone;

    // Pricing & Bank Info
    const feeEl = document.getElementById('payment-amount-display');
    if (feeEl) feeEl.innerText = cfg.fee || 200;
    const upiDisplayEl = document.getElementById('payment-upi-display');
    if (upiDisplayEl) upiDisplayEl.innerText = cfg.upiId;
    const bankNameEl = document.getElementById('payment-bank-name');
    if (bankNameEl) bankNameEl.innerText = cfg.name;
    const bankBankEl = document.getElementById('payment-bank-bank');
    if (bankBankEl) bankBankEl.innerText = cfg.bankName;
    const bankAccEl = document.getElementById('payment-bank-acc');
    if (bankAccEl) bankAccEl.innerText = cfg.accountNumber;
    const bankIfscEl = document.getElementById('payment-bank-ifsc');
    if (bankIfscEl) bankIfscEl.innerText = cfg.ifscCode;

    // Official Authentic QR Image
    const qrImg = document.getElementById('payment-qr-img');
    if (qrImg) {
      qrImg.src = cfg.qrImage || 'assets/avinash_sir_qr.jpg';
    }

    const submitSec = document.getElementById('payment-submit-section');
    const pendingSec = document.getElementById('payment-pending-section');

    if (isPending) {
      if (submitSec) submitSec.classList.add('hidden');
      if (pendingSec) pendingSec.classList.remove('hidden');
      const utrDisplay = document.getElementById('payment-submitted-utr-display');
      if (utrDisplay) utrDisplay.innerText = this.currentPaymentStudent.lastUtr || 'Submitted';
      this.startApprovalPolling();
    } else {
      if (submitSec) submitSec.classList.remove('hidden');
      if (pendingSec) pendingSec.classList.add('hidden');
      const utrInput = document.getElementById('payment-utr-input');
      if (utrInput) utrInput.value = '';
    }

    const modal = document.getElementById('payment-modal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  },

  closePaymentModal() {
    this.stopApprovalPolling();
    const modal = document.getElementById('payment-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
    // Do NOT wipe out student session! Keep user logged in.
    const user = Auth.getCurrentUser();
    if (user && user.accessStatus === 'ACTIVE') {
      this.switchView('home');
    }
  },

  logout() {
    this.stopApprovalPolling();
    const modal = document.getElementById('payment-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
    Auth.logout();
    this.switchView('auth');
  },

  copyUpiId() {
    const cfg = SheetSync.getPaymentConfig();
    navigator.clipboard.writeText(cfg.upiId).then(() => {
      const btn = document.getElementById('btn-copy-upi');
      if (btn) {
        const old = btn.innerHTML;
        btn.innerHTML = '✓ Copied!';
        btn.classList.add('bg-emerald-600');
        setTimeout(() => {
          btn.innerHTML = old;
          btn.classList.remove('bg-emerald-600');
        }, 2000);
      }
    });
  },

  copyAccountNumber() {
    const cfg = SheetSync.getPaymentConfig();
    navigator.clipboard.writeText(cfg.accountNumber).then(() => {
      const btn = document.getElementById('btn-copy-acc');
      if (btn) {
        const old = btn.innerHTML;
        btn.innerHTML = '✓ Copied';
        btn.classList.add('text-emerald-400');
        setTimeout(() => {
          btn.innerHTML = old;
          btn.classList.remove('text-emerald-400');
        }, 2000);
      }
    });
  },

  copyIfsc() {
    const cfg = SheetSync.getPaymentConfig();
    navigator.clipboard.writeText(cfg.ifscCode).then(() => {
      const btn = document.getElementById('btn-copy-ifsc');
      if (btn) {
        const old = btn.innerHTML;
        btn.innerHTML = '✓ Copied';
        btn.classList.add('text-emerald-400');
        setTimeout(() => {
          btn.innerHTML = old;
          btn.classList.remove('text-emerald-400');
        }, 2000);
      }
    });
  },

  copyBankDetails() {
    const cfg = SheetSync.getPaymentConfig();
    const text = `Beneficiary Name: ${cfg.name}\nBank Name: ${cfg.bankName}\nAccount Number: ${cfg.accountNumber}\nIFSC Code: ${cfg.ifscCode}\nAmount: ₹${cfg.fee}`;
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('btn-copy-bank');
      if (btn) {
        const old = btn.innerHTML;
        btn.innerHTML = '✓ Copied All Bank Details!';
        btn.classList.add('bg-emerald-700');
        setTimeout(() => {
          btn.innerHTML = old;
          btn.classList.remove('bg-emerald-700');
        }, 2000);
      }
    });
  },

  async submitPaymentUtr() {
    const utrInput = document.getElementById('payment-utr-input');
    const utrVal = utrInput ? utrInput.value.trim() : '';

    if (!utrVal || utrVal.length < 6) {
      alert('Please enter your 12-digit UTR or Transaction ID from your payment receipt.');
      return;
    }

    if (!this.currentPaymentStudent) {
      alert('Student session expired. Please re-enter your mobile number.');
      this.closePaymentModal();
      return;
    }

    await SheetSync.submitPayment({
      phone: this.currentPaymentStudent.phone,
      studentName: this.currentPaymentStudent.name,
      level: this.currentPaymentStudent.level,
      utr: utrVal
    });

    this.currentPaymentStudent.accessStatus = 'PENDING_APPROVAL';
    this.currentPaymentStudent.lastUtr = utrVal;

    const submitSec = document.getElementById('payment-submit-section');
    const pendingSec = document.getElementById('payment-pending-section');
    if (submitSec) submitSec.classList.add('hidden');
    if (pendingSec) pendingSec.classList.remove('hidden');

    const utrDisplay = document.getElementById('payment-submitted-utr-display');
    if (utrDisplay) utrDisplay.innerText = utrVal;

    this.startApprovalPolling();
    alert('Payment details submitted successfully! Avinash Sir has received an instant notification. We will notify you once approved.');
  },

  startApprovalPolling() {
    this.stopApprovalPolling();
    this.approvalPollInterval = setInterval(() => {
      this.checkPaymentApproval(true);
    }, 20000);
  },

  stopApprovalPolling() {
    if (this.approvalPollInterval) {
      clearInterval(this.approvalPollInterval);
      this.approvalPollInterval = null;
    }
  },

  async checkPaymentApproval(isSilent = false) {
    if (!this.currentPaymentStudent) return;
    const cleanPhone = String(this.currentPaymentStudent.phone).replace(/\D/g, '');

    const btn = document.getElementById('btn-check-approval');
    if (btn && !isSilent) {
      btn.innerText = 'Connecting to Google Sheet...';
    }

    const res = await SheetSync.verifyStudent(cleanPhone);

    if (btn && !isSilent) {
      btn.innerHTML = '<span>🔄</span> Check Approval Status Now';
    }

    // STRICT APPROVAL ENFORCEMENT:
    // Must be confirmed directly from the online Google Sheet (never local offline cache)!
    if (res.student) {
      const status = String(res.student.accessStatus || '').toUpperCase().trim();
      
      if (res.fromOnline && status === 'ACTIVE') {
        this.stopApprovalPolling();
        SoundEngine.playVictory();
        if (typeof confetti === 'function') {
          confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
        }
        res.student.accessStatus = 'ACTIVE';
        SheetSync.saveLocalUser(res.student);
        Auth.currentUser = res.student;

        const modal = document.getElementById('payment-modal');
        if (modal) {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
        }

        this.renderHeaderUser();
        this.switchView('home');
        alert('🎉 Payment verified by Avinash Sir in Google Sheet! Your 100-Day Math Quiz program is fully unlocked. Welcome aboard!');
        return;
      }
    }

    if (!isSilent) {
      if (!res.fromOnline) {
        alert("⚠️ Could not reach your Google Sheet to verify approval. Please check your internet connection.");
      } else {
        const curStatus = (res.student && res.student.accessStatus) ? res.student.accessStatus : 'PENDING_APPROVAL';
        alert("⏳ Status: Still awaiting Avinash Sir's approval in Google Sheet.\n\nGoogle Sheet Status: " + curStatus + "\n\nAvinash Sir opens the Google Sheet (Column D) and changes your status to 'ACTIVE'. Once he does that, click here again or wait a few seconds and the quiz will unlock!");
      }
    }
  },

  // -------------------------------------------------------------
  // GLOBAL EVENTS
  // -------------------------------------------------------------
  attachGlobalEvents() {
    const authForm = document.getElementById('auth-form');
    if (authForm) {
      authForm.onsubmit = async (e) => {
        e.preventDefault();
        const phone = document.getElementById('auth-phone').value;
        const submitBtn = authForm.querySelector('button[type="submit"]');
        const oldHtml = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span>Connecting to Google Sheet...</span>';
        }

        const res = await Auth.login(phone);

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = oldHtml;
        }

        if (!res.success) {
          alert(res.message);
          return;
        }

        if (res.isNew) {
          document.getElementById('reg-phone-display').innerText = res.phone;
          const coachingBanner = document.getElementById('reg-coaching-banner');
          if (coachingBanner) {
            if (res.isCoaching || SheetSync.isCoachingStudent(res.phone)) {
              coachingBanner.classList.remove('hidden');
              coachingBanner.classList.add('flex');
            } else {
              coachingBanner.classList.add('hidden');
              coachingBanner.classList.remove('flex');
            }
          }
          document.getElementById('reg-modal').classList.remove('hidden');
          document.getElementById('reg-modal').classList.add('flex');
        } else if (res.paymentRequired || res.pendingApproval) {
          this.openPaymentModal(res.student, !!res.pendingApproval);
        } else {
          this.switchView('home');
        }
      };
    }

    const regForm = document.getElementById('reg-form');
    if (regForm) {
      regForm.onsubmit = async (e) => {
        e.preventDefault();
        const phone = document.getElementById('auth-phone').value;
        const name = document.getElementById('reg-name').value;
        const level = document.querySelector('input[name="reg-level"]:checked').value;

        const regBtn = regForm.querySelector('button[type="submit"]');
        const oldRegHtml = regBtn ? regBtn.innerHTML : '';
        if (regBtn) {
          regBtn.disabled = true;
          regBtn.innerHTML = '<span>Saving to Google Sheet...</span>';
        }

        const res = await Auth.completeRegistration(phone, name, level);

        if (regBtn) {
          regBtn.disabled = false;
          regBtn.innerHTML = oldRegHtml;
        }
        if (res.success) {
          document.getElementById('reg-modal').classList.add('hidden');
          document.getElementById('reg-modal').classList.remove('flex');
          if (res.paymentRequired) {
            this.openPaymentModal(res.student, false);
          } else {
            this.switchView('home');
          }
        } else {
          alert(res.message);
        }
      };
    }
  },

  // -------------------------------------------------------------
  // WORDWALL SHUFFLE CARDS BONUS ROUND MINIGAME
  // -------------------------------------------------------------
  bonusState: {
    roundNum: 1,
    cards: [],
    slots: [0, 1, 2, 3, 4],
    isPickable: false,
    selectedId: null,
    countdownInterval: null,
    autoAdvanceInterval: null
  },

  openBonusRound(roundNum) {
    clearInterval(this.quizState.autoAdvanceInterval);
    clearInterval(this.quizState.timerInterval);
    this.quizState.bonusRoundsCompleted[roundNum] = true;

    this.bonusState.roundNum = roundNum;
    this.bonusState.isPickable = false;
    this.bonusState.selectedId = null;
    clearInterval(this.bonusState.countdownInterval);
    clearInterval(this.bonusState.autoAdvanceInterval);

    // Prepare 5 bonus cards
    const baseCards = (roundNum === 1) ? [
      { id: 0, label: '+50', points: 50, type: 'pts', bg: 'from-emerald-600 to-teal-700' },
      { id: 1, label: '+100', points: 100, type: 'pts', bg: 'from-emerald-500 to-green-700' },
      { id: 2, label: '+150', points: 150, type: 'pts', bg: 'from-cyan-600 to-blue-700' },
      { id: 3, label: '+200', points: 200, type: 'pts', bg: 'from-purple-600 to-pink-700' },
      { id: 4, label: 'x2 SPEED', points: 100, type: 'speed', bg: 'from-rose-600 to-red-700' }
    ] : [
      { id: 0, label: '+75', points: 75, type: 'pts', bg: 'from-emerald-600 to-teal-700' },
      { id: 1, label: '+100', points: 100, type: 'pts', bg: 'from-emerald-500 to-green-700' },
      { id: 2, label: '+150', points: 150, type: 'pts', bg: 'from-cyan-600 to-blue-700' },
      { id: 3, label: '+250', points: 250, type: 'pts', bg: 'from-purple-600 to-pink-700' },
      { id: 4, label: 'x2 SPEED', points: 150, type: 'speed', bg: 'from-rose-600 to-red-700' }
    ];

    // Fisher-Yates shuffle
    for (let i = baseCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [baseCards[i], baseCards[j]] = [baseCards[j], baseCards[i]];
    }
    this.bonusState.cards = baseCards;
    this.bonusState.slots = [0, 1, 2, 3, 4];

    // Reset UI
    const modal = document.getElementById('bonus-round-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    document.getElementById('bonus-won-pill').classList.add('hidden');
    document.getElementById('bonus-continue-btn').classList.add('hidden');

    const instruction = document.getElementById('bonus-instruction-text');
    let previewSeconds = 3;
    instruction.innerHTML = `Memorize the cards! Flipping in <span id="bonus-countdown" class="text-amber-400 font-extrabold text-base">${previewSeconds}</span>s...`;

    this.renderBonusCards(false);

    this.bonusState.countdownInterval = setInterval(() => {
      previewSeconds--;
      const countEl = document.getElementById('bonus-countdown');
      if (countEl) countEl.innerText = previewSeconds;

      if (previewSeconds <= 0) {
        clearInterval(this.bonusState.countdownInterval);
        this.flipAndShuffleBonusCards();
      }
    }, 1000);
  },

  renderBonusCards(isFlipped = false) {
    const grid = document.getElementById('bonus-cards-grid');
    grid.innerHTML = '';

    this.bonusState.cards.forEach((card) => {
      const cardEl = document.createElement('div');
      cardEl.id = `bonus-card-${card.id}`;
      cardEl.dataset.cardId = card.id;
      cardEl.className = 'bonus-scene w-28 sm:w-36 h-40 sm:h-48 select-none transition-transform duration-300';

      cardEl.innerHTML = `
        <div class="bonus-card-container relative w-full h-full rounded-2xl shadow-xl transition-all duration-500 ${isFlipped ? 'is-flipped' : ''}">
          <!-- Front Face (Points / Modifier Reward) -->
          <div class="bonus-card-face absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-b ${card.bg} border-2 border-white/40 p-3 flex flex-col items-center justify-between shadow-2xl text-white">
            <span class="text-[10px] font-black uppercase tracking-wider bg-black/30 px-2 py-0.5 rounded-full">
              ${card.type === 'speed' ? '⚡ MODIFIER' : '⭐ BONUS'}
            </span>
            <div class="text-center my-auto">
              <p class="text-2xl sm:text-3xl font-black drop-shadow tracking-tight">${card.label}</p>
              <p class="text-[11px] font-bold opacity-90">${card.type === 'speed' ? 'Speed' : 'Points'}</p>
            </div>
            <div class="w-2 h-2 rounded-full bg-white/60"></div>
          </div>

          <!-- Back Face (Dark Navy with Cyan Question Mark, styled like Wordwall) -->
          <div class="bonus-card-face bonus-card-back absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-indigo-950 border-2 border-slate-700/80 p-3 flex flex-col items-center justify-center shadow-2xl">
            <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-indigo-950/80 border border-cyan-500/40 flex items-center justify-center text-3xl sm:text-4xl font-black text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]">
              ?
            </div>
            <p class="text-[10px] font-bold text-slate-400 mt-2 tracking-widest uppercase">UPGRADE</p>
          </div>
        </div>
      `;

      cardEl.onclick = () => {
        if (this.bonusState.isPickable) {
          this.pickBonusCard(card.id);
        }
      };

      grid.appendChild(cardEl);
    });
  },

  flipAndShuffleBonusCards() {
    SoundEngine.playCardFlip();
    const instruction = document.getElementById('bonus-instruction-text');
    instruction.innerText = '👀 Keep your eyes on the cards! Shuffling...';

    // Flip all cards to face down (?)
    document.querySelectorAll('.bonus-card-container').forEach(c => c.classList.add('is-flipped'));

    setTimeout(() => {
      let swapsDone = 0;
      const totalSwaps = 5;

      const shuffleInterval = setInterval(() => {
        swapsDone++;
        SoundEngine.playCardShuffle();

        const grid = document.getElementById('bonus-cards-grid');
        const cardElements = Array.from(grid.children);
        if (cardElements.length < 2) return;

        const i = Math.floor(Math.random() * cardElements.length);
        let j = Math.floor(Math.random() * cardElements.length);
        while (j === i) j = Math.floor(Math.random() * cardElements.length);

        const cardA = cardElements[i];
        const cardB = cardElements[j];

        cardA.style.transform = 'scale(0.92) translateY(-8px)';
        cardB.style.transform = 'scale(0.92) translateY(8px)';

        setTimeout(() => {
          const nextA = cardA.nextSibling;
          if (nextA === cardB) {
            grid.insertBefore(cardB, cardA);
          } else {
            grid.insertBefore(cardA, cardB);
            if (nextA) grid.insertBefore(cardB, nextA);
          }
          cardA.style.transform = '';
          cardB.style.transform = '';
        }, 160);

        if (swapsDone >= totalSwaps) {
          clearInterval(shuffleInterval);
          setTimeout(() => {
            this.bonusState.isPickable = true;
            instruction.innerHTML = '👉 <strong class="text-amber-300 font-extrabold text-base">Pick a card</strong> to claim your bonus!';
            document.querySelectorAll('.bonus-card-container').forEach(c => c.classList.add('bonus-card-pickable'));
          }, 350);
        }
      }, 340);
    }, 550);
  },

  pickBonusCard(cardId) {
    if (!this.bonusState.isPickable) return;
    this.bonusState.isPickable = false;
    this.bonusState.selectedId = cardId;

    const selectedCard = this.bonusState.cards.find(c => c.id === cardId);
    if (!selectedCard) return;

    SoundEngine.playBonusWin();
    if (typeof confetti === 'function') {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.5 } });
    }

    const cardElements = document.querySelectorAll('.bonus-scene');
    cardElements.forEach(cardEl => {
      const cId = parseInt(cardEl.dataset.cardId, 10);
      const container = cardEl.querySelector('.bonus-card-container');
      container.classList.remove('bonus-card-pickable');

      if (cId === cardId) {
        container.classList.remove('is-flipped');
        container.classList.add('ring-4', 'ring-amber-400', 'scale-105');
      } else {
        setTimeout(() => {
          container.classList.remove('is-flipped');
          cardEl.classList.add('opacity-40');
        }, 350);
      }
    });

    const pointsWon = selectedCard.points;
    this.quizState.score += pointsWon;
    document.getElementById('quiz-live-score').innerText = `${this.quizState.score} pts`;

    const wonPill = document.getElementById('bonus-won-pill');
    wonPill.classList.remove('hidden');
    document.getElementById('bonus-points-awarded').innerText = `${selectedCard.label} (${pointsWon} Pts)`;

    const continueBtn = document.getElementById('bonus-continue-btn');
    const continueLabel = document.getElementById('bonus-continue-label');
    continueBtn.classList.remove('hidden');

    let countdown = 3;
    const nextQNum = this.quizState.currentIndex + 2;
    continueLabel.innerText = `Continue to Question ${nextQNum} (${countdown}s)... ➔`;

    this.bonusState.autoAdvanceInterval = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        continueLabel.innerText = `Continue to Question ${nextQNum} (${countdown}s)... ➔`;
      } else {
        clearInterval(this.bonusState.autoAdvanceInterval);
        this.continueAfterBonus();
      }
    }, 1000);
  },

  continueAfterBonus() {
    clearInterval(this.bonusState.autoAdvanceInterval);
    clearInterval(this.bonusState.countdownInterval);

    const modal = document.getElementById('bonus-round-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');

    this.quizState.currentIndex++;
    this.renderCurrentQuestion();
    if (this.quizState.timerEnabled) {
      this.startQuestionTimer();
    }
  },

  // -------------------------------------------------------------
  // PRACTICE ARENA (UNGRADED TOPIC MASTERY)
  // -------------------------------------------------------------
  practiceState: {
    topicKey: null,
    topicName: '',
    question: null,
    streak: 0,
    totalAnswered: 0
  },

  renderPracticeHub() {
    document.getElementById('practice-hub-container').classList.remove('hidden');
    document.getElementById('practice-player-container').classList.add('hidden');
  },

  startPracticeTopic(topicKey) {
    SoundEngine.playClick();
    this.practiceState.topicKey = topicKey;
    this.practiceState.streak = 0;
    this.practiceState.totalAnswered = 0;

    const topicTitles = {
      fractions: 'Fractions',
      decimals: 'Decimals',
      addition: 'Addition',
      subtraction: 'Subtraction',
      division: 'Division',
      multiplication: 'Multiplication',
      ratio: 'Ratio & Proportion',
      wordproblems: 'Word Problems',
      percentage: 'Percentage',
      bodmas: 'BODMAS'
    };
    this.practiceState.topicName = topicTitles[topicKey] || 'Math Practice';

    document.getElementById('practice-hub-container').classList.add('hidden');
    document.getElementById('practice-player-container').classList.remove('hidden');

    document.getElementById('practice-topic-badge').innerText = this.practiceState.topicName;
    document.getElementById('practice-streak-counter').innerText = '0';

    this.nextPracticeQuestion();
  },

  nextPracticeQuestion() {
    SoundEngine.playClick();
    const user = Auth.getCurrentUser();
    const levelCode = (user && user.level && user.level.toLowerCase().includes('senior')) ? 'senior' : 'junior';

    const q = QuestionEngine.generatePracticeQuestion(this.practiceState.topicKey, levelCode);
    this.practiceState.question = q;

    document.getElementById('practice-question-text').innerText = q.questionText;
    document.getElementById('practice-difficulty-badge').innerText = `🟢 ${q.difficulty.toUpperCase()} Level`;

    const optionsGrid = document.getElementById('practice-options-grid');
    optionsGrid.innerHTML = '';
    const optionLetters = ['A', 'B', 'C', 'D'];

    q.options.forEach((optText, i) => {
      const btn = document.createElement('button');
      btn.className = 'practice-option-btn w-full p-4 text-left rounded-2xl border border-slate-700/80 bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-semibold transition duration-150 transform hover:-translate-y-0.5 flex items-center gap-4';
      btn.innerHTML = `
        <span class="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sm text-indigo-400 shrink-0">
          ${optionLetters[i]}
        </span>
        <span class="text-base">${optText}</span>
      `;
      btn.onclick = () => this.selectPracticeAnswer(i);
      optionsGrid.appendChild(btn);
    });

    document.getElementById('practice-feedback-box').classList.add('hidden');
    document.getElementById('practice-next-btn').classList.add('hidden');
  },

  selectPracticeAnswer(selectedIdx) {
    const q = this.practiceState.question;
    if (!q) return;

    const isCorrect = (selectedIdx === q.correctIndex);
    this.practiceState.totalAnswered++;

    if (isCorrect) {
      this.practiceState.streak++;
      SoundEngine.playCorrect();
    } else {
      this.practiceState.streak = 0;
      SoundEngine.playIncorrect();
    }

    document.getElementById('practice-streak-counter').innerText = this.practiceState.streak;

    const optionButtons = document.querySelectorAll('.practice-option-btn');
    optionButtons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.correctIndex) {
        btn.className = 'w-full p-4 text-left rounded-2xl border-2 border-emerald-500 bg-emerald-950/60 text-white font-bold flex items-center gap-4';
      } else if (i === selectedIdx && !isCorrect) {
        btn.className = 'w-full p-4 text-left rounded-2xl border-2 border-rose-500 bg-rose-950/60 text-white font-bold flex items-center gap-4';
      } else {
        btn.className = 'w-full p-4 text-left rounded-2xl border border-slate-800 bg-slate-950/40 text-slate-500 opacity-60 flex items-center gap-4';
      }
    });

    const feedbackBox = document.getElementById('practice-feedback-box');
    const feedbackText = document.getElementById('practice-feedback-text');
    feedbackBox.classList.remove('hidden');

    if (isCorrect) {
      feedbackBox.className = 'p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 text-sm';
      feedbackText.innerHTML = `<strong>🎉 Excellent! Correct!</strong><br>${q.explanation}`;
    } else {
      feedbackBox.className = 'p-4 rounded-2xl bg-rose-950/50 border border-rose-500/40 text-rose-200 text-sm';
      feedbackText.innerHTML = `<strong>❌ Keep Learning!</strong> Correct Answer: <em>${q.correctAnswer}</em><br>${q.explanation}`;
    }

    document.getElementById('practice-next-btn').classList.remove('hidden');
  },

  exitPractice() {
    SoundEngine.playClick();
    this.renderPracticeHub();
  },

};

window.addEventListener('DOMContentLoaded', () => {
  App.init();
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = App;
}
