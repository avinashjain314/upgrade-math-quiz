/**
 * Gamification Badges, Titles, and Achievement Milestones
 * Upgrade Math Quiz by Avinash Sir
 */

const BADGES = [
  {
    id: 'first_quiz',
    title: 'First Step',
    icon: '🌱',
    description: 'Completed your very first daily quiz!',
    reqType: 'quizzes',
    reqValue: 1,
    tier: 'bronze'
  },
  {
    id: 'streak_3',
    title: 'Flame Starter',
    icon: '🔥',
    description: 'Maintained a 3-day homework quiz streak!',
    reqType: 'streak',
    reqValue: 3,
    tier: 'bronze'
  },
  {
    id: 'streak_7',
    title: 'Week Warrior',
    icon: '⚡',
    description: '7 days non-stop math discipline!',
    reqType: 'streak',
    reqValue: 7,
    tier: 'silver'
  },
  {
    id: 'streak_21',
    title: 'Habit Master',
    icon: '🏆',
    description: '21 consecutive days of math habit formation!',
    reqType: 'streak',
    reqValue: 21,
    tier: 'gold'
  },
  {
    id: 'streak_50',
    title: 'Halfway Hero',
    icon: '💎',
    description: '50-day streak achieved! Pure legend!',
    reqType: 'streak',
    reqValue: 50,
    tier: 'diamond'
  },
  {
    id: 'streak_100',
    title: 'Math Immortal',
    icon: '👑',
    description: 'Completed all 100 days of the upgrade program!',
    reqType: 'streak',
    reqValue: 100,
    tier: 'legendary'
  },
  {
    id: 'speed_demon',
    title: 'Speed Star',
    icon: '⏱️',
    description: 'Completed a 20-question quiz in under 5 minutes with timer!',
    reqType: 'speed',
    reqValue: 300,
    tier: 'gold'
  },
  {
    id: 'perfect_score',
    title: 'Bullseye 20/20',
    icon: '🎯',
    description: 'Scored a flawless 100% on any daily quiz!',
    reqType: 'perfect',
    reqValue: 1,
    tier: 'gold'
  },
  {
    id: 'century_points',
    title: 'Century Scorer',
    icon: '🌟',
    description: 'Accumulated over 1,000 total points!',
    reqType: 'score',
    reqValue: 1000,
    tier: 'silver'
  },
  {
    id: 'five_k_points',
    title: 'Grandmaster',
    icon: '🌌',
    description: 'Accumulated over 5,000 total points!',
    reqType: 'score',
    reqValue: 5000,
    tier: 'diamond'
  },
  {
    id: 'ten_k_points',
    title: 'Avinash Sir Protege',
    icon: '🎖️',
    description: 'Accumulated over 10,000 total points!',
    reqType: 'score',
    reqValue: 10000,
    tier: 'legendary'
  },
  {
    id: 'night_owl',
    title: 'Early Bird / Dedicated',
    icon: '🦉',
    description: 'Completed a quiz before 8 AM or after 8 PM!',
    reqType: 'special',
    reqValue: 1,
    tier: 'bronze'
  }
];

const STUDENT_TITLES = [
  { minScore: 0, title: 'Novice Mathematician', icon: '🐣' },
  { minScore: 500, title: 'Number Explorer', icon: '🧭' },
  { minScore: 1200, title: 'Calculation Cadet', icon: '🛡️' },
  { minScore: 2500, title: 'Problem Solver', icon: '🧠' },
  { minScore: 4500, title: 'Math Champ', icon: '🏅' },
  { minScore: 7500, title: 'Arithmetic Ace', icon: '⭐' },
  { minScore: 12000, title: 'Algebra & Geometry Wizard', icon: '🧙' },
  { minScore: 18000, title: 'Grand Math Master', icon: '👑' },
  { minScore: 25000, title: 'Avinash Sir Superstar', icon: '🚀' }
];

function getTitleForScore(score) {
  let titleObj = STUDENT_TITLES[0];
  for (const t of STUDENT_TITLES) {
    if (score >= t.minScore) {
      titleObj = t;
    }
  }
  return titleObj;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BADGES, STUDENT_TITLES, getTitleForScore };
}
