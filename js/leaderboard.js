/**
 * Leaderboard & Ranking System
 * Displays top performers with podium, filters, and user rank tracking.
 * 
 * Upgrade Math Quiz by Avinash Sir
 */

const Leaderboard = {
  currentFilter: 'all', // 'all', 'junior', 'senior'

  async render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="flex items-center justify-center p-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        <span class="ml-3 text-slate-400">Loading live rankings...</span>
      </div>
    `;

    const data = await SheetSync.getLeaderboard(this.currentFilter);
    const currentUser = Auth.getCurrentUser();

    // Find current user's rank
    let myRank = -1;
    if (currentUser) {
      myRank = data.findIndex(s => s.name.toLowerCase() === currentUser.name.toLowerCase()) + 1;
    }

    let html = `
      <div class="space-y-6">
        <!-- Filter Tabs -->
        <div class="flex p-1 bg-slate-800/80 rounded-xl max-w-md mx-auto text-sm">
          <button onclick="Leaderboard.setFilter('all')" class="flex-1 py-2 rounded-lg font-medium transition ${this.currentFilter === 'all' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}">
            🌟 All Grades
          </button>
          <button onclick="Leaderboard.setFilter('junior')" class="flex-1 py-2 rounded-lg font-medium transition ${this.currentFilter === 'junior' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}">
            🐣 Grade 1-4
          </button>
          <button onclick="Leaderboard.setFilter('senior')" class="flex-1 py-2 rounded-lg font-medium transition ${this.currentFilter === 'senior' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}">
            🚀 Grade 4-10
          </button>
        </div>
    `;

    // Top 3 Podium
    if (data.length >= 3) {
      const first = data[0];
      const second = data[1];
      const third = data[2];

      html += `
        <div class="flex items-end justify-center gap-3 pt-6 pb-2 px-2">
          <!-- 2nd Place -->
          <div class="flex flex-col items-center flex-1 max-w-[110px]">
            <div class="relative">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-400 to-slate-200 p-0.5 shadow-lg flex items-center justify-center text-2xl">
                🥈
              </div>
              <span class="absolute -bottom-2 -right-1 bg-slate-800 border border-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full text-slate-300">#2</span>
            </div>
            <p class="mt-2 text-xs font-semibold text-white truncate w-full text-center">${second.name}</p>
            <p class="text-[11px] text-amber-400 font-bold">${second.score} pts</p>
            <div class="w-full bg-slate-800/70 border-t-2 border-slate-400 h-16 rounded-t-xl mt-2 flex flex-col items-center justify-center">
              <span class="text-xs text-slate-400">🔥 ${second.streak}d</span>
            </div>
          </div>

          <!-- 1st Place (Champion) -->
          <div class="flex flex-col items-center flex-1 max-w-[125px]">
            <div class="relative">
              <span class="absolute -top-4 text-xl">👑</span>
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shadow-xl shadow-amber-500/20 flex items-center justify-center text-3xl">
                🥇
              </div>
              <span class="absolute -bottom-2 -right-1 bg-amber-500 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full text-slate-950">#1</span>
            </div>
            <p class="mt-2 text-sm font-bold text-white truncate w-full text-center">${first.name}</p>
            <p class="text-xs text-amber-300 font-extrabold">${first.score} pts</p>
            <div class="w-full bg-gradient-to-b from-amber-500/20 to-slate-800 border-t-2 border-amber-400 h-24 rounded-t-xl mt-2 flex flex-col items-center justify-center">
              <span class="text-xs text-amber-400 font-bold">🔥 ${first.streak}d</span>
              <span class="text-[10px] text-slate-400">${first.quizzes} quizzes</span>
            </div>
          </div>

          <!-- 3rd Place -->
          <div class="flex flex-col items-center flex-1 max-w-[110px]">
            <div class="relative">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-700 to-amber-500 p-0.5 shadow-lg flex items-center justify-center text-2xl">
                🥉
              </div>
              <span class="absolute -bottom-2 -right-1 bg-slate-800 border border-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full text-amber-500">#3</span>
            </div>
            <p class="mt-2 text-xs font-semibold text-white truncate w-full text-center">${third.name}</p>
            <p class="text-[11px] text-amber-400 font-bold">${third.score} pts</p>
            <div class="w-full bg-slate-800/70 border-t-2 border-amber-700 h-12 rounded-t-xl mt-2 flex flex-col items-center justify-center">
              <span class="text-xs text-slate-400">🔥 ${third.streak}d</span>
            </div>
          </div>
        </div>
      `;
    }

    // Full Ranking Table
    html += `
      <div class="bg-slate-900/60 rounded-2xl border border-slate-800/80 overflow-hidden divide-y divide-slate-800/50">
    `;

    data.forEach((student, idx) => {
      const rank = idx + 1;
      const isMe = currentUser && student.name.toLowerCase() === currentUser.name.toLowerCase();
      
      html += `
        <div class="flex items-center justify-between p-3.5 transition ${isMe ? 'bg-indigo-950/40 border-l-4 border-indigo-500' : 'hover:bg-slate-800/30'}">
          <div class="flex items-center gap-3 min-w-0">
            <span class="w-7 text-center font-bold text-sm ${rank <= 3 ? 'text-amber-400' : 'text-slate-500'}">
              #${rank}
            </span>
            <div class="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sm text-indigo-400 shrink-0">
              ${student.name.charAt(0)}
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <p class="font-medium text-sm text-white truncate">${student.name}</p>
                ${isMe ? '<span class="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.2 rounded font-semibold">You</span>' : ''}
              </div>
              <p class="text-xs text-slate-400 truncate">${student.level}</p>
            </div>
          </div>
          <div class="text-right shrink-0">
            <div class="text-sm font-bold text-amber-400">${student.score.toLocaleString()} <span class="text-[10px] text-slate-400 font-normal">pts</span></div>
            <div class="text-xs text-slate-400 flex items-center justify-end gap-1">
              <span>🔥 ${student.streak}d</span>
            </div>
          </div>
        </div>
      `;
    });

    html += `</div></div>`;

    // Sticky My Position Bar
    if (currentUser && myRank > 0) {
      const me = data[myRank - 1];
      html += `
        <div class="sticky bottom-0 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 border-t border-indigo-500/40 p-3 rounded-2xl shadow-2xl flex items-center justify-between mt-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-indigo-500 text-white font-bold flex items-center justify-center text-xs">
              #${myRank}
            </div>
            <div>
              <p class="text-xs font-semibold text-white">Your Rank: #${myRank} of ${data.length}</p>
              <p class="text-[11px] text-indigo-300">Keep solving daily to climb the leaderboard!</p>
            </div>
          </div>
          <div class="text-right">
            <span class="text-xs font-bold text-amber-400">${me.score} pts</span>
          </div>
        </div>
      `;
    }

    container.innerHTML = html;
  },

  setFilter(filter) {
    this.currentFilter = filter;
    this.render('leaderboard-content');
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Leaderboard;
}
