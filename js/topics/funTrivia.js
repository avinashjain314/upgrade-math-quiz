/**
 * Fun Surprise Elements: Universal Truths & Science Curiosities
 * Interspersed in daily quizzes to keep students excited and refreshed!
 * Upgrade Math Quiz by Avinash Sir
 */

const JUNIOR_TRIVIA = [
  {
    topic: 'Universal Truth',
    question: 'How many days are there in a standard leap year?',
    options: ['364 days', '365 days', '366 days', '367 days'],
    correct: '366 days',
    difficulty: 'easy',
    explanation: 'A normal calendar year has 365 days, but a leap year occurs every 4 years and adds 1 extra day in February (29 days), making 366 days!'
  },
  {
    topic: 'Science Fun',
    question: 'Which gas do green plants absorb from the air during photosynthesis to make food?',
    options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Helium'],
    correct: 'Carbon Dioxide',
    difficulty: 'easy',
    explanation: 'Plants take in carbon dioxide from the air and release fresh oxygen for us to breathe during photosynthesis!'
  },
  {
    topic: 'Universal Truth',
    question: 'In which direction does the Sun appear to rise every morning?',
    options: ['North', 'South', 'East', 'West'],
    correct: 'East',
    difficulty: 'easy',
    explanation: 'Due to Earth\'s rotation from west to east, the Sun always appears to rise in the East and set in the West.'
  },
  {
    topic: 'Science Fun',
    question: 'Which planet is popularly known as the "Red Planet" in our solar system?',
    options: ['Venus', 'Mars', 'Jupiter', 'Mercury'],
    correct: 'Mars',
    difficulty: 'easy',
    explanation: 'Mars appears reddish because its surface is covered with iron oxide (rust) dust!'
  },
  {
    topic: 'Universal Truth',
    question: 'How many colors make up a natural rainbow in the sky?',
    options: ['5', '6', '7', '8'],
    correct: '7',
    difficulty: 'easy',
    explanation: 'A rainbow has 7 colors remembered by the acronym VIBGYOR: Violet, Indigo, Blue, Green, Yellow, Orange, Red.'
  },
  {
    topic: 'Science Fun',
    question: 'At what temperature does pure water freeze into solid ice?',
    options: ['0°C', '10°C', '50°C', '100°C'],
    correct: '0°C',
    difficulty: 'easy',
    explanation: 'Pure water freezes into ice at 0 degrees Celsius (32°F) and boils at 100°C!'
  },
  {
    topic: 'Universal Truth',
    question: 'How many hours does it take for Earth to complete one full rotation on its axis?',
    options: ['12 hours', '24 hours', '36 hours', '48 hours'],
    correct: '24 hours',
    difficulty: 'easy',
    explanation: 'Earth completes one full spin on its axis in roughly 24 hours, giving us day and night.'
  },
  {
    topic: 'Science Fun',
    question: 'Which organ pumps blood throughout the entire human body?',
    options: ['Lungs', 'Brain', 'Heart', 'Stomach'],
    correct: 'Heart',
    difficulty: 'easy',
    explanation: 'The heart is a muscular pump that beats about 100,000 times a day to circulate oxygen-rich blood!'
  },
  {
    topic: 'Universal Truth',
    question: 'How many sides does a regular hexagon have?',
    options: ['5', '6', '7', '8'],
    correct: '6',
    difficulty: 'easy',
    explanation: 'A hexagon has 6 straight sides and 6 vertices (e.g. beehive honeycomb cells).'
  },
  {
    topic: 'Science Fun',
    question: 'Which is the largest animal currently living on Earth?',
    options: ['African Elephant', 'Blue Whale', 'Giraffe', 'Colossal Squid'],
    correct: 'Blue Whale',
    difficulty: 'easy',
    explanation: 'The Antarctic Blue Whale is the largest animal on Earth, weighing up to 200 tons (equal to 33 elephants)!'
  }
];

const SENIOR_TRIVIA = [
  {
    topic: 'Science Fun',
    question: 'What is the approximate speed of light travelling through a vacuum?',
    options: ['30,000 km/s', '150,000 km/s', '300,000 km/s', '1,000,000 km/s'],
    correct: '300,000 km/s',
    difficulty: 'medium',
    explanation: 'Light travels at approximately 300,000 km per second (about 3 × 10⁸ m/s). It takes only ~8 minutes for sunlight to reach Earth!'
  },
  {
    topic: 'Universal Truth',
    question: 'Which mathematical constant represents the ratio of a circle\'s circumference to its diameter?',
    options: ['Euler\'s number (e)', 'Pi (π)', 'Golden ratio (φ)', 'Square root of 2'],
    correct: 'Pi (π)',
    difficulty: 'easy',
    explanation: 'Pi (π ≈ 3.14159...) is the ratio of any circle\'s circumference to its diameter, discovered millennia ago.'
  },
  {
    topic: 'Science Fun',
    question: 'Which subatomic particle carries a negative electric charge in an atom?',
    options: ['Proton', 'Neutron', 'Electron', 'Positron'],
    correct: 'Electron',
    difficulty: 'medium',
    explanation: 'Electrons orbit the atomic nucleus and carry a negative charge (-1), while protons carry a positive charge (+1).'
  },
  {
    topic: 'Universal Truth',
    question: 'How many degrees are in the sum of the interior angles of any triangle on a flat plane?',
    options: ['90°', '180°', '270°', '360°'],
    correct: '180°',
    difficulty: 'easy',
    explanation: 'In Euclidean plane geometry, the three interior angles of any triangle always add up to exactly 180°.'
  },
  {
    topic: 'Science Fun',
    question: 'Which vitamin is synthesized in our skin when exposed to morning sunlight?',
    options: ['Vitamin A', 'Vitamin B12', 'Vitamin C', 'Vitamin D'],
    correct: 'Vitamin D',
    difficulty: 'easy',
    explanation: 'Sunlight UV-B rays trigger the conversion of 7-dehydrocholesterol in the skin to Vitamin D3, essential for bone health!'
  },
  {
    topic: 'Universal Truth',
    question: 'Which is the only even prime number in mathematics?',
    options: ['0', '1', '2', '4'],
    correct: '2',
    difficulty: 'easy',
    explanation: '2 is the only even prime number because all other even numbers are divisible by 2.'
  },
  {
    topic: 'Science Fun',
    question: 'Sound waves cannot travel through which of the following mediums?',
    options: ['Water', 'Steel', 'Air', 'A vacuum'],
    correct: 'A vacuum',
    difficulty: 'medium',
    explanation: 'Sound is a mechanical pressure wave requiring particles to vibrate. In a vacuum (empty space), there are no particles, so sound cannot travel!'
  },
  {
    topic: 'Science Fun',
    question: 'What is the chemical formula for ordinary table salt used in cooking?',
    options: ['H2O', 'NaCl', 'CO2', 'CaCO3'],
    correct: 'NaCl',
    difficulty: 'easy',
    explanation: 'Table salt is Sodium Chloride (NaCl), made of equal parts sodium (Na⁺) and chlorine (Cl⁻) ions.'
  },
  {
    topic: 'Universal Truth',
    question: 'What is the sum of opposite faces on a standard six-sided playing die?',
    options: ['6', '7', '8', '9'],
    correct: '7',
    difficulty: 'medium',
    explanation: 'On every standard die, opposite faces always sum to 7 (1+6=7, 2+5=7, 3+4=7).'
  },
  {
    topic: 'Science Fun',
    question: 'Which natural force pulls objects toward the center of the Earth?',
    options: ['Magnetism', 'Gravity', 'Centrifugal force', 'Frictional force'],
    correct: 'Gravity',
    difficulty: 'easy',
    explanation: 'Gravity is the universal attractive force proportional to mass, giving objects weight on Earth.'
  }
];

function getTriviaQuestion(day, questionIndex, level, rng) {
  const pool = level === 'junior' ? JUNIOR_TRIVIA : SENIOR_TRIVIA;
  const itemIndex = Math.floor(rng() * pool.length);
  const item = pool[itemIndex];
  
  // Create deterministic options shuffle
  const shuffledOptions = [...item.options].sort(() => rng() - 0.5);
  const correctIdx = shuffledOptions.indexOf(item.correct);

  return {
    day: day,
    questionIndex: questionIndex,
    topic: item.topic,
    difficulty: item.difficulty,
    questionText: item.question,
    options: shuffledOptions,
    correctIndex: correctIdx,
    correctAnswer: item.correct,
    explanation: item.explanation,
    isTrivia: true
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { JUNIOR_TRIVIA, SENIOR_TRIVIA, getTriviaQuestion };
}
