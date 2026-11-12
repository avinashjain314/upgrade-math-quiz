# Upgrade Math Quiz by Avinash Sir 📐✨

A 100-day gamified digital math homework web application engineered for **Avinash Sir's coaching students and new online subscribers**.

Designed for zero maintenance cost, 100% offline-resilient execution, and direct hosting on **GitHub Pages**.

---

## 🌟 Key Features & Daily Discipline Rules

1. **Strict 1-Quiz-Per-Day Discipline**:
   - Students can **only attempt today's quiz**.
   - All future quizzes are **LOCKED** 🔒.
   - Any quiz a student forgets/misses is **LOCKED** 🔒 by default — they cannot take past missed days on their own!
   - **One Attempt Only**: Once a day's quiz is attempted, it cannot be attempted again. Students can only click to review Avinash Sir's step-by-step solutions.

2. **Admin Unlock Override from Google Spreadsheet**:
   - Avinash Sir maintains full access control directly from the Google Sheet: [Upgrade_Digital_Quiz](https://docs.google.com/spreadsheets/d/1u_ITXVTH8Q-Du72M_uPwbYz15SMgHxIQxP5OUy6xIB4).
   - In the `Students_Access` sheet:
     - **100 Dedicated Columns**: `Day_1`, `Day_2`, ..., `Day_100`.
     - Automatically marks **`Attempted (score pts)`** when completed, or remains **`Not Attempted`** so Avinash Sir can see at a glance who completed each day!
     - **`Admin_Unlock_Override`**: Dropdown against any student's row. Set to `All Past Days` or specific days (e.g. `Day 5` or `1,2,5`) to unlock previous missed days for any student!

3. **3-Second Auto-Advance**:
   - As soon as a student attempts an answer, the app highlights correct/incorrect answers with explanation and a live **3-second countdown** (`Next Question (3s)... ➔`).
   - Automatically advances to the next question within 3 seconds to keep students focused and save time!
   - Students can also tap the button immediately to advance without waiting.

4. **100-Day Question Curriculum with Student Names**:
   - Uses real coaching student names in word problems: **Sara, Aanya, Aarav, Ardiya, Omar, Kalsoom, Ali, Adam, Yousuf, Avinash, Shrihaan, Shrinay**!
   - Exactly 20 daily questions per quiz:
     - **5 Easy** (Questions 1 - 5, 10 pts)
     - **7 Medium** (Questions 6 - 12, 20 pts)
     - **8 Hard** (Questions 13 - 20, 30 pts)
   - **Zero Question Repetition Guarantee**: Seeded procedural generation ensures 4,000 unique questions across both tracks with zero repeats.
   - Includes surprise science questions and universal truths to keep kids curious and refreshed.

5. **Brain Gym & 30-Second Focus Calmer**:
   - A dedicated pre-quiz focus breathing booster with visual circle expansion & contraction (4s Inhale, 4s Hold, 4s Exhale) to eliminate math anxiety and calibrate laser focus!
   - Daily Vedic math tricks for mental speed (multiplying by 11, 25, 99, percentage swaps, squaring numbers near 50, butterfly fractions) plus holistic memory and focus habits from Avinash Sir.

6. **Optional Timer & Transparent Scoring**:
   - Students afraid of timers can turn it **OFF** with zero penalty!
   - When the timer is **ON**, students receive up to **+5 Speed Bonus points** per question.
   - Base max points per quiz: $5 \times 10 + 7 \times 20 + 8 \times 30 = 430\text{ points}$.

7. **Gamification & Engagement**:
   - **Daily Mystery Treasure Chest**: Opens with celebratory confetti and Web Audio fanfare.
   - **Digital Rough Sheet / Scratchpad**: On-screen drawing canvas for rough calculations on mobile or tablet.
   - **Leaderboard with Top 3 Podium**: Crowned podium (🥇, 🥈, 🥉) with sticky "Your Rank" banner.

---

## 🚀 How to Host on GitHub Pages (Step-by-Step)

You can host this app completely **FREE** on GitHub Pages in under 2 minutes:

1. **Create a GitHub Repository**:
   - Go to [github.com](https://github.com) and click **New Repository**.
   - Name it `upgrade-math-quiz` (or any name you prefer).
   - Choose **Public** and click **Create repository**.

2. **Upload the Files**:
   - Click **Upload files** on GitHub.
   - Drag and drop all files from this folder:
     - `index.html`
     - `README.md`
     - `css/` (entire folder)
     - `js/` (entire folder)
     - `google-apps-script/` (entire folder)
   - Click **Commit changes**.

3. **Enable GitHub Pages**:
   - In your repository, click **Settings** (top right tab).
   - Click **Pages** in the left sidebar under *Code and automation*.
   - Under **Build and deployment > Branch**:
     - Select branch: `main` (or `master`)
     - Select folder: `/ (root)`
     - Click **Save**.
   - Within 30 seconds, your site is live at: `https://<your-username>.github.io/upgrade-math-quiz/`!
   - Share this link with your students!

---

## 📊 How to Connect Your Google Sheet

Avinash Sir's Sheet:
`https://docs.google.com/spreadsheets/d/1u_ITXVTH8Q-Du72M_uPwbYz15SMgHxIQxP5OUy6xIB4`

1. Open your Google Sheet in your web browser.
2. In the top menu, click **Extensions > Apps Script**.
3. Delete any code in the editor, and paste the entire code from:
   `google-apps-script/Code.gs`
4. Click **Save** (floppy disk icon or Ctrl+S).
5. Select `setupSheets` from the dropdown at the top and click **Run**.
   - This automatically creates the `Students_Access` sheet with:
     - Columns 1-10: Mobile Number, Student Name, Level, Status, Admin Unlock Override, Total Score, Streak, Quizzes Completed, Registration Date, Last Active Date.
     - Columns 11-110: **100 Dedicated Day Columns** (`Day_1` to `Day_100`)!
6. Click the blue **Deploy** button (top right) $\rightarrow$ **New deployment**.
   - Select type: **Web app**
   - Description: `Upgrade Math Quiz API v2`
   - Execute as: **Me**
   - Who has access: **Anyone** *(Required so the student web app can communicate with the sheet)*
7. Click **Deploy**, grant permissions, and copy the **Web App URL** (starts with `https://script.google.com/macros/s/.../exec`).
8. In the web app, go to **Settings (⚙️)**, paste this Web App URL, and click **Save Settings**!
   - Done! All student registrations and quiz submissions will now sync in real-time.

---

## 🧪 Quick Test Demo Credentials

- **Coaching Student Demo**: `9876543210` (Sara - Pre-enrolled with sample points)
- **Avinash Sir Admin Mode**: `9999999999` (Unlocks all 100 days for testing)
- Any new 10-digit mobile number will prompt the one-time registration modal.
