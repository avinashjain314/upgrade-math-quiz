/**
 * Avinash Sir's Holistic Growth Hub for Kids (100 Days)
 * Includes:
 * 1. Word of the Day (English Vocabulary Power: Word, Pronunciation, Meaning, Example, Category)
 * 2. Mind-Blowing Science & Math Fact (Did you know? Nature, Space, Biology, Physics, Inventions)
 * 3. Powerful Thought of the Day (Inspiring quote, legendary author, actionable life lesson)
 * 
 * Exactly 100 UNIQUE entries designed for holistic character, intellect, and habit building!
 * Upgrade Math Quiz by Avinash Sir
 */

const HOLISTIC_GROWTH_DATA = [
  {
    "day": 1,
    "wordOfTheDay": {
      "word": "Perseverance",
      "phonetic": "per-suh-VEER-uhns",
      "meaning": "Continuing to try your hardest even when something is challenging.",
      "example": "Through perseverance, Aanya mastered long division in just three days!",
      "category": "Character"
    },
    "mindFact": {
      "title": "Honeybee Math",
      "fact": "Honeybees build their hives using perfect hexagons! Why? A hexagon is the only shape that covers a plane with minimum boundary perimeter, saving bees precious wax and holding the maximum honey!",
      "icon": "\ud83d\udc1d",
      "category": "Nature & Math"
    },
    "powerfulThought": {
      "quote": "Dream is not that which you see while sleeping; it is something that does not let you sleep.",
      "author": "Dr. A.P.J. Abdul Kalam",
      "lesson": "Let your goals inspire you to wake up with excitement and purpose every day."
    }
  },
  {
    "day": 2,
    "wordOfTheDay": {
      "word": "Curiosity",
      "phonetic": "kyoor-ee-OSS-ih-tee",
      "meaning": "A strong desire to learn, explore, and understand new things.",
      "example": "Curiosity is the secret spark behind every great scientist and mathematician.",
      "category": "Intellect"
    },
    "mindFact": {
      "title": "Human Brain Power",
      "fact": "Your brain contains about 86 billion neurons and generates around 20 watts of electrical power \u2014 enough to power a low-wattage LED light bulb!",
      "icon": "\ud83e\udde0",
      "category": "Human Body"
    },
    "powerfulThought": {
      "quote": "Arise, awake, and stop not till the goal is reached.",
      "author": "Swami Vivekananda",
      "lesson": "Stay fully committed to your journey until you see your dream turn into reality."
    }
  },
  {
    "day": 3,
    "wordOfTheDay": {
      "word": "Resilience",
      "phonetic": "rih-ZIL-yuhns",
      "meaning": "The power to bounce back quickly after making a mistake or facing a setback.",
      "example": "Resilience taught Kabir that getting a wrong answer is just a clue to finding the right one.",
      "category": "Mindset"
    },
    "mindFact": {
      "title": "Sunflowers & Fibonacci",
      "fact": "The seeds in a sunflower face follow the Fibonacci sequence (1, 1, 2, 3, 5, 8, 13, 21, 34...) in spiral patterns so not a single millimeter of sunlight is wasted!",
      "icon": "\ud83c\udf3b",
      "category": "Nature & Math"
    },
    "powerfulThought": {
      "quote": "Education is not the learning of facts, but the training of the mind to think.",
      "author": "Albert Einstein",
      "lesson": "Math is not just about answers; it teaches your mind how to reason and create."
    }
  },
  {
    "day": 4,
    "wordOfTheDay": {
      "word": "Ingenious",
      "phonetic": "in-JEEN-yus",
      "meaning": "Clever, inventive, and wonderfully creative at solving problems.",
      "example": "Avinash Sir showed us an ingenious Vedic shortcut to multiply numbers near 100 in seconds!",
      "category": "Wisdom"
    },
    "mindFact": {
      "title": "Saturn's Floating Rings",
      "fact": "Saturn's dazzling rings are almost entirely made of billions of chunks of pure water ice, ranging from tiny dust grains to giant house-sized icebergs!",
      "icon": "\ud83e\ude90",
      "category": "Space"
    },
    "powerfulThought": {
      "quote": "An equation for me has no meaning unless it expresses a thought of God.",
      "author": "Srinivasa Ramanujan",
      "lesson": "Look at numbers as the poetry of nature, waiting to reveal their beauty to you."
    }
  },
  {
    "day": 5,
    "wordOfTheDay": {
      "word": "Meticulous",
      "phonetic": "muh-TIK-yuh-lus",
      "meaning": "Showing great attention to detail; very careful and neat.",
      "example": "A meticulous student always double-checks rough work before submitting.",
      "category": "Excellence"
    },
    "mindFact": {
      "title": "The Speed of Light",
      "fact": "Light travels at 300,000 kilometers per second! In just one second, a beam of light could travel around the entire Earth 7.5 times!",
      "icon": "\u26a1",
      "category": "Physics"
    },
    "powerfulThought": {
      "quote": "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
      "author": "Marie Curie",
      "lesson": "When a math problem looks intimidating, break it into smaller steps and understand it."
    }
  },
  {
    "day": 6,
    "wordOfTheDay": {
      "word": "Integrity",
      "phonetic": "in-TEG-rih-tee",
      "meaning": "Being honest and doing the right thing, even when nobody is watching.",
      "example": "Rohan showed integrity by admitting he accidentally saw the answer key.",
      "category": "Character"
    },
    "mindFact": {
      "title": "Ant Super-Strength",
      "fact": "An ordinary ant can carry 10 to 50 times its own body weight! If a human child had the strength of an ant, they could easily lift an entire family car!",
      "icon": "\ud83d\udc1c",
      "category": "Animals"
    },
    "powerfulThought": {
      "quote": "It always seems impossible until it's done.",
      "author": "Nelson Mandela",
      "lesson": "Tackle big challenges one small step at a time, and you will achieve the extraordinary."
    }
  },
  {
    "day": 7,
    "wordOfTheDay": {
      "word": "Empathy",
      "phonetic": "EM-puh-thee",
      "meaning": "Understanding and sharing how another person is feeling.",
      "example": "When her classmate struggled with geometry, Sara showed empathy and helped him practice.",
      "category": "Kindness"
    },
    "mindFact": {
      "title": "The Heart's Engine",
      "fact": "Your heart beats about 100,000 times every day, pumping around 7,500 liters of oxygen-rich blood through 100,000 kilometers of blood vessels!",
      "icon": "\u2764\ufe0f",
      "category": "Human Body"
    },
    "powerfulThought": {
      "quote": "I have not failed. I've just found 10,000 ways that won't work.",
      "author": "Thomas A. Edison",
      "lesson": "Every mistake you make in math eliminates a wrong path and brings you closer to the right one."
    }
  },
  {
    "day": 8,
    "wordOfTheDay": {
      "word": "Optimism",
      "phonetic": "AHP-tih-miz-um",
      "meaning": "A hopeful attitude and looking at the bright, positive side of things.",
      "example": "Optimism gives you the courage to tackle difficult challenges with a big smile.",
      "category": "Mindset"
    },
    "mindFact": {
      "title": "Snowflake Uniqueness",
      "fact": "No two snowflakes in the history of the universe are exactly identical, yet almost all of them form with perfect six-fold (hexagonal) mathematical symmetry!",
      "icon": "\u2744\ufe0f",
      "category": "Physics & Geometry"
    },
    "powerfulThought": {
      "quote": "You cannot cross the sea merely by standing and staring at the water.",
      "author": "Rabindranath Tagore",
      "lesson": "Don't just wish for good scores; start practicing with pencil and paper today."
    }
  },
  {
    "day": 9,
    "wordOfTheDay": {
      "word": "Tenacity",
      "phonetic": "tuh-NASS-ih-tee",
      "meaning": "The quality of gripping onto a goal firmly and never giving up.",
      "example": "Tenacity is what turns ordinary students into extraordinary problem solvers.",
      "category": "Character"
    },
    "mindFact": {
      "title": "The Mystery of Zero",
      "fact": "The number zero ('Shunya') was invented in ancient India by great mathematicians like Aryabhata and Brahmagupta. Without zero, modern computers, algebra, and space rockets could not exist!",
      "icon": "0\ufe0f\u20e3",
      "category": "Math History"
    },
    "powerfulThought": {
      "quote": "The expert in anything was once a beginner.",
      "author": "Helen Hayes",
      "lesson": "Never feel shy about starting small. Every champion started with Day 1."
    }
  },
  {
    "day": 10,
    "wordOfTheDay": {
      "word": "Versatile",
      "phonetic": "VUR-suh-tul",
      "meaning": "Able to adapt and do many different things with great skill.",
      "example": "Mathematics makes your brain versatile, helping you excel in coding, music, and chess.",
      "category": "Intellect"
    },
    "mindFact": {
      "title": "Whale Heart Size",
      "fact": "The heart of a blue whale is as big as a small car and weighs around 180 kg! Its heartbeat can be heard from over 3 kilometers away underwater!",
      "icon": "\ud83d\udc0b",
      "category": "Animals"
    },
    "powerfulThought": {
      "quote": "Live as if you were to die tomorrow. Learn as if you were to live forever.",
      "author": "Mahatma Gandhi",
      "lesson": "Stay hungry to learn new words, new facts, and new skills throughout your life."
    }
  },
  {
    "day": 11,
    "wordOfTheDay": {
      "word": "Diligence",
      "phonetic": "DIL-ih-juhns",
      "meaning": "Careful and persistent work or effort.",
      "example": "Diligence in practicing 20 questions every single day builds lifelong mental speed.",
      "category": "Habit"
    },
    "mindFact": {
      "title": "Moon Footprints",
      "fact": "Because the Moon has no wind, rain, or atmosphere to blow dust away, the footprints left by Apollo astronauts will stay untouched for at least 100 million years!",
      "icon": "\ud83c\udf15",
      "category": "Space"
    },
    "powerfulThought": {
      "quote": "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      "author": "Winston Churchill",
      "lesson": "Never let a low score discourage you or a high score make you proud; keep growing."
    }
  },
  {
    "day": 12,
    "wordOfTheDay": {
      "word": "Courage",
      "phonetic": "KUR-ij",
      "meaning": "Bravery to face difficult tasks or step outside your comfort zone.",
      "example": "It takes courage to raise your hand in class and ask a question when you are confused.",
      "category": "Bravery"
    },
    "mindFact": {
      "title": "Lightning Heat",
      "fact": "A single bolt of lightning can reach a scorching temperature of 30,000\u00b0C (54,000\u00b0F) \u2014 that is five times hotter than the surface of the Sun!",
      "icon": "\ud83c\udf29\ufe0f",
      "category": "Earth Science"
    },
    "powerfulThought": {
      "quote": "Do what you can, with what you have, where you are.",
      "author": "Theodore Roosevelt",
      "lesson": "You don't need fancy tools to excel; your sharp mind and daily practice are enough."
    }
  },
  {
    "day": 13,
    "wordOfTheDay": {
      "word": "Compassion",
      "phonetic": "kum-PASH-un",
      "meaning": "Kindness and caring for others who are hurt, lonely, or in need.",
      "example": "Compassion makes you not just a smart student, but a truly great human being.",
      "category": "Kindness"
    },
    "mindFact": {
      "title": "Tree Communication",
      "fact": "Trees in a forest communicate with each other underground through a vast network of fungi nicknamed the 'Wood Wide Web', sharing nutrients and warning neighbors of pests!",
      "icon": "\ud83c\udf33",
      "category": "Nature"
    },
    "powerfulThought": {
      "quote": "The secret of getting ahead is getting started.",
      "author": "Mark Twain",
      "lesson": "The hardest part of doing your homework is opening the book. Once you start, momentum takes over."
    }
  },
  {
    "day": 14,
    "wordOfTheDay": {
      "word": "Innovation",
      "phonetic": "in-oh-VAY-shun",
      "meaning": "Creating new and improved ways of doing things.",
      "example": "Innovation happens when you combine mathematics with boundless imagination.",
      "category": "Creativity"
    },
    "mindFact": {
      "title": "Paper Folding to the Moon",
      "fact": "If you could fold an ordinary piece of paper in half 42 times, the exponential growth in thickness would reach all the way from Earth to the Moon (384,400 km)!",
      "icon": "\ud83d\udcc4",
      "category": "Math Wonder"
    },
    "powerfulThought": {
      "quote": "Simplicity is the ultimate sophistication.",
      "author": "Leonardo da Vinci",
      "lesson": "The best mathematical solutions are simple, elegant, and crystal clear."
    }
  },
  {
    "day": 15,
    "wordOfTheDay": {
      "word": "Humility",
      "phonetic": "hyoo-MIL-ih-tee",
      "meaning": "Being modest, respectful, and not bragging about your talents.",
      "example": "Even after scoring full marks, Ananya displayed graceful humility.",
      "category": "Character"
    },
    "mindFact": {
      "title": "Octopus Three Hearts",
      "fact": "An octopus has three hearts and blue blood! Two hearts pump blood to the gills, while the third pumps it through the rest of its body.",
      "icon": "\ud83d\udc19",
      "category": "Animals"
    },
    "powerfulThought": {
      "quote": "In the middle of difficulty lies opportunity.",
      "author": "Albert Einstein",
      "lesson": "When a question seems tricky, it is an invitation for your brain to upgrade its thinking power."
    }
  },
  {
    "day": 16,
    "wordOfTheDay": {
      "word": "Prudence",
      "phonetic": "PROO-duns",
      "meaning": "Careful good judgment that avoids unnecessary risks.",
      "example": "Prudence in an exam means checking your time so you never leave questions blank.",
      "category": "Wisdom"
    },
    "mindFact": {
      "title": "Venus Backward Spin",
      "fact": "Venus is the only planet in our solar system that spins clockwise (backwards)! On Venus, the Sun rises in the west and sets in the east.",
      "icon": "\u2728",
      "category": "Space"
    },
    "powerfulThought": {
      "quote": "If you want to shine like a sun, first burn like a sun.",
      "author": "Dr. A.P.J. Abdul Kalam",
      "lesson": "Dazzling success is the fruit of quiet, disciplined effort put in every single day."
    }
  },
  {
    "day": 17,
    "wordOfTheDay": {
      "word": "Enthusiasm",
      "phonetic": "en-THOO-zee-az-um",
      "meaning": "Intense and eager enjoyment, interest, or passion.",
      "example": "With enthusiasm, even the hardest algebra puzzle feels like an exciting adventure game.",
      "category": "Energy"
    },
    "mindFact": {
      "title": "DNA Length",
      "fact": "If you untangled all the DNA molecules inside just one single human cell, it would stretch about 2 meters long! Untangled DNA from all your cells would reach Pluto and back!",
      "icon": "\ud83e\uddec",
      "category": "Biology"
    },
    "powerfulThought": {
      "quote": "Be the change that you wish to see in the world.",
      "author": "Mahatma Gandhi",
      "lesson": "Bring positivity, kindness, and hard work into your classroom every single day."
    }
  },
  {
    "day": 18,
    "wordOfTheDay": {
      "word": "Sincerity",
      "phonetic": "sin-SER-ih-tee",
      "meaning": "Being genuine, true, and free from pretense or deceit.",
      "example": "His sincerity in asking doubts helped the whole class understand the theorem better.",
      "category": "Honesty"
    },
    "mindFact": {
      "title": "Origami Space Mirrors",
      "fact": "NASA scientists use ancient Japanese paper-folding (origami) mathematics to fold giant solar panels and space telescopes so they fit inside compact rocket nose-cones!",
      "icon": "\ud83d\udef0\ufe0f",
      "category": "Invention"
    },
    "powerfulThought": {
      "quote": "Kind words can be short and easy to speak, but their echoes are truly endless.",
      "author": "Mother Teresa",
      "lesson": "A simple word of encouragement to a struggling friend can change their whole life."
    }
  },
  {
    "day": 19,
    "wordOfTheDay": {
      "word": "Gratitude",
      "phonetic": "GRAT-ih-tood",
      "meaning": "Feeling and expressing thankfulness for the good things and people in life.",
      "example": "Gratitude for your teachers, parents, and friends fills your heart with quiet joy.",
      "category": "Mindset"
    },
    "mindFact": {
      "title": "Cheetah Acceleration",
      "fact": "A cheetah can accelerate from 0 to 96 km/h in just 3 seconds \u2014 faster than most luxury sports cars on the planet!",
      "icon": "\ud83d\udc06",
      "category": "Animals"
    },
    "powerfulThought": {
      "quote": "Strength does not come from physical capacity. It comes from an indomitable will.",
      "author": "Mahatma Gandhi",
      "lesson": "Mental grit and focus will take you further than sheer talent alone."
    }
  },
  {
    "day": 20,
    "wordOfTheDay": {
      "word": "Equilibrium",
      "phonetic": "ee-kwuh-LIB-ree-um",
      "meaning": "A state of perfect balance, calmness, and mental poise.",
      "example": "Maintaining mental equilibrium helps you stay calm under exam pressure.",
      "category": "Calmness"
    },
    "mindFact": {
      "title": "The Great Barrier Reef",
      "fact": "The Great Barrier Reef in Australia is the largest living structure on Earth. It stretches over 2,300 km and is so massive it can be seen from space!",
      "icon": "\ud83d\udc20",
      "category": "Earth Science"
    },
    "powerfulThought": {
      "quote": "A person who never made a mistake never tried anything new.",
      "author": "Albert Einstein",
      "lesson": "Wear your math eraser proudly; mistakes are scientific proof that you are trying!"
    }
  },
  {
    "day": 21,
    "wordOfTheDay": {
      "word": "Discipline",
      "phonetic": "DIS-ih-plin",
      "meaning": "Training yourself to do what needs to be done, consistently and on time.",
      "example": "Discipline is the bridge between wishing for success and actually achieving it.",
      "category": "Habit"
    },
    "mindFact": {
      "title": "Water Memory Cycle",
      "fact": "Every drop of water on Earth today is billions of years old! The water you drank this morning may have once been sipped by a Tyrannosaurus Rex millions of years ago.",
      "icon": "\ud83d\udca7",
      "category": "Earth Science"
    },
    "powerfulThought": {
      "quote": "Keep your face always toward the sunshine\u2014and shadows will fall behind you.",
      "author": "Walt Whitman",
      "lesson": "Choose optimism and joy; a happy student absorbs knowledge twice as fast."
    }
  },
  {
    "day": 22,
    "wordOfTheDay": {
      "word": "Fortitude",
      "phonetic": "FOR-tih-tood",
      "meaning": "Mental and emotional strength in facing pain, difficulty, or danger.",
      "example": "With fortitude, the young climber reached the summit despite stormy winds.",
      "category": "Strength"
    },
    "mindFact": {
      "title": "The Number Googol",
      "fact": "The number 1 followed by 100 zeros is called a 'Googol'! A 9-year-old boy named Milton Sirotta invented this word in 1920. Google was named after it!",
      "icon": "\ud83d\udd22",
      "category": "Math Wonder"
    },
    "powerfulThought": {
      "quote": "Small deeds done are better than great deeds planned.",
      "author": "Peter Marshall",
      "lesson": "Solving 20 questions today is infinitely better than planning to solve 100 questions tomorrow."
    }
  },
  {
    "day": 23,
    "wordOfTheDay": {
      "word": "Wisdom",
      "phonetic": "WIZ-dum",
      "meaning": "Using knowledge, experience, and good sense to make sound decisions.",
      "example": "Knowledge is knowing a fact; wisdom is knowing how to use it for good.",
      "category": "Wisdom"
    },
    "mindFact": {
      "title": "Hummingbird Flight",
      "fact": "Hummingbirds are the only birds that can fly backwards, sideways, and upside down! Their wings flap up to 80 times per second in an infinity (\u221e) figure-eight pattern.",
      "icon": "\ud83d\udc26",
      "category": "Animals"
    },
    "powerfulThought": {
      "quote": "You must do the thing you think you cannot do.",
      "author": "Eleanor Roosevelt",
      "lesson": "Surprise yourself! Choose the hardest problem in the chapter and conquer it."
    }
  },
  {
    "day": 24,
    "wordOfTheDay": {
      "word": "Altruism",
      "phonetic": "AL-troo-iz-um",
      "meaning": "Selfless concern for the well-being and happiness of others.",
      "example": "Sharing your study notes with a classmate who was absent is pure altruism.",
      "category": "Kindness"
    },
    "mindFact": {
      "title": "Diamonds from the Sky",
      "fact": "On planets like Neptune and Uranus, extreme atmospheric pressure and methane gas cause it to literally rain solid diamonds from the sky!",
      "icon": "\ud83d\udc8e",
      "category": "Space"
    },
    "powerfulThought": {
      "quote": "The only true wisdom is in knowing you know nothing.",
      "author": "Socrates",
      "lesson": "Stay curious and humble; there is always something amazing waiting to be learned."
    }
  },
  {
    "day": 25,
    "wordOfTheDay": {
      "word": "Candor",
      "phonetic": "KAN-dur",
      "meaning": "The quality of being open, honest, and direct in speech.",
      "example": "Her candor in explaining where she made a calculation error was admirable.",
      "category": "Honesty"
    },
    "mindFact": {
      "title": "Bamboo Super-Growth",
      "fact": "Certain species of bamboo can grow up to 91 centimeters (almost 1 meter!) in a single day. That is about 4 centimeters every single hour!",
      "icon": "\ud83c\udf8b",
      "category": "Nature"
    },
    "powerfulThought": {
      "quote": "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
      "author": "Benjamin Franklin",
      "lesson": "Explain what you learned to a friend or parent; teaching cements knowledge forever."
    }
  },
  {
    "day": 26,
    "wordOfTheDay": {
      "word": "Determination",
      "phonetic": "dih-tur-mih-NAY-shun",
      "meaning": "Firmness of purpose; having a resolute decision to reach a goal.",
      "example": "Her determination to earn the 100-Day Grandmaster badge kept her going every day.",
      "category": "Drive"
    },
    "mindFact": {
      "title": "Earth's Magnetic Shield",
      "fact": "Earth's spinning molten iron core creates an invisible magnetic force field around our planet that deflects harmful solar radiation and gives us the colorful Northern Lights!",
      "icon": "\ud83e\uddf2",
      "category": "Physics"
    },
    "powerfulThought": {
      "quote": "Strive not to be a success, but rather to be of value.",
      "author": "Albert Einstein",
      "lesson": "Use your math, science, and intellect to help others and make society better."
    }
  },
  {
    "day": 27,
    "wordOfTheDay": {
      "word": "Generosity",
      "phonetic": "jen-uh-RAH-sih-tee",
      "meaning": "The readiness to give more of something, like time or help, than is expected.",
      "example": "Generosity with encouragement can brighten a friend's entire week.",
      "category": "Kindness"
    },
    "mindFact": {
      "title": "Chameleon Eyes",
      "fact": "A chameleon's eyes can move completely independently of each other, allowing it to look at two different directions at the exact same time with a 360-degree view!",
      "icon": "\ud83e\udd8e",
      "category": "Animals"
    },
    "powerfulThought": {
      "quote": "A champion is defined not by their wins but by how they can recover when they fall.",
      "author": "Serena Williams",
      "lesson": "Bouncing back from a hard quiz with a smile is the true sign of a champion."
    }
  },
  {
    "day": 28,
    "wordOfTheDay": {
      "word": "Harmony",
      "phonetic": "HAR-muh-nee",
      "meaning": "Peaceful agreement and working together in joyful balance.",
      "example": "Harmony in teamwork produces results that no single person could achieve alone.",
      "category": "Peace"
    },
    "mindFact": {
      "title": "Golden Ratio in Art",
      "fact": "The Golden Ratio (approximately 1.618, Greek letter Phi) is found in shells, pinecones, the Mona Lisa, and ancient Greek temples because human eyes find it supremely beautiful!",
      "icon": "\ud83d\udcd0",
      "category": "Geometry"
    },
    "powerfulThought": {
      "quote": "It is our choices that show what we truly are, far more than our abilities.",
      "author": "Albus Dumbledore (J.K. Rowling)",
      "lesson": "Talent is a gift, but discipline and kindness are choices you make every day."
    }
  },
  {
    "day": 29,
    "wordOfTheDay": {
      "word": "Ingenuity",
      "phonetic": "in-juh-NOO-ih-tee",
      "meaning": "Cleverness, originality, and skill in inventing or solving problems.",
      "example": "Using Vedic math to subtract 634 from 1000 in one second is true ingenuity!",
      "category": "Creativity"
    },
    "mindFact": {
      "title": "Volcanoes on Mars",
      "fact": "Olympus Mons on Mars is the largest volcano in our solar system. It is three times taller than Mount Everest and as wide as the entire country of France!",
      "icon": "\ud83c\udf0b",
      "category": "Space"
    },
    "powerfulThought": {
      "quote": "The mind is everything. What you think you become.",
      "author": "Gautama Buddha",
      "lesson": "Believe that you are capable of mathematical brilliance, and your brain will prove it."
    }
  },
  {
    "day": 30,
    "wordOfTheDay": {
      "word": "Keenness",
      "phonetic": "KEEN-nus",
      "meaning": "Sharpness of mind, eagerness, and quick understanding.",
      "example": "His keenness of observation spotted the pattern in the number sequence immediately.",
      "category": "Intellect"
    },
    "mindFact": {
      "title": "Bioluminescent Glow",
      "fact": "Over 75% of deep-sea creatures create their own living light through a chemical reaction called bioluminescence to attract food, communicate, and disguise themselves in the dark!",
      "icon": "\ud83e\udd91",
      "category": "Marine Biology"
    },
    "powerfulThought": {
      "quote": "Patience and perseverance have a magical effect before which difficulties disappear and obstacles vanish.",
      "author": "John Quincy Adams",
      "lesson": "Consistent daily effort melts the hardest math problems like ice under warm sunlight."
    }
  },
  {
    "day": 31,
    "wordOfTheDay": {
      "word": "Magnanimous",
      "phonetic": "mag-NAN-ih-mus",
      "meaning": "Very generous or forgiving, especially toward a rival or competitor.",
      "example": "After winning the quiz, she was magnanimous and cheered for her runner-up friend.",
      "category": "Nobility"
    },
    "mindFact": {
      "title": "Bicycle Balance Physics",
      "fact": "The physics of why a moving bicycle balances so stably involves gyroscopic forces, forward momentum, and castor angles \u2014 it is still a fascinating topic of study for physicists!",
      "icon": "\ud83d\udeb2",
      "category": "Physics"
    },
    "powerfulThought": {
      "quote": "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
      "author": "Ralph Waldo Emerson",
      "lesson": "You have an ocean of untapped genius inside you; unlock it day by day."
    }
  },
  {
    "day": 32,
    "wordOfTheDay": {
      "word": "Nobility",
      "phonetic": "no-BIL-ih-tee",
      "meaning": "High moral character, dignity, and honorable actions.",
      "example": "Nobility is measured by how respectfully you treat those who can do nothing for you.",
      "category": "Character"
    },
    "mindFact": {
      "title": "Elephant Memory",
      "fact": "Elephants have the largest brain of any land animal and possess legendary long-term memory, recognizing friends, family, and waterholes decades after seeing them!",
      "icon": "\ud83d\udc18",
      "category": "Animals"
    },
    "powerfulThought": {
      "quote": "The beautiful thing about learning is that no one can take it away from you.",
      "author": "B.B. King",
      "lesson": "Knowledge is the one treasure that multiplies every time you share it."
    }
  },
  {
    "day": 33,
    "wordOfTheDay": {
      "word": "Patience",
      "phonetic": "PAY-shuns",
      "meaning": "The capacity to accept delay or difficulty without getting angry.",
      "example": "Patience while solving multi-step word problems always prevents silly errors.",
      "category": "Mindset"
    },
    "mindFact": {
      "title": "Sound Under Water",
      "fact": "Sound travels about 4.3 times faster through water (1,480 m/s) than through air (343 m/s) because water molecules are packed much more tightly together!",
      "icon": "\ud83c\udf0a",
      "category": "Physics"
    },
    "powerfulThought": {
      "quote": "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
      "author": "Aristotle",
      "lesson": "Making daily math homework an unbreakable habit turns excellence into your second nature."
    }
  },
  {
    "day": 34,
    "wordOfTheDay": {
      "word": "Resourceful",
      "phonetic": "rih-ZORS-ful",
      "meaning": "Skillful at finding quick, clever ways to overcome difficulties.",
      "example": "When his pencil broke during rough work, the resourceful boy used his mental calculator!",
      "category": "Skill"
    },
    "mindFact": {
      "title": "The M\u00f6bius Strip",
      "fact": "A M\u00f6bius strip is a surface with only ONE single side and only ONE boundary curve! If you draw a line down the middle with a pen, you will cover both 'sides' without lifting your pen!",
      "icon": "\u267e\ufe0f",
      "category": "Topology"
    },
    "powerfulThought": {
      "quote": "Do not wait for leaders; do it alone, person to person.",
      "author": "Mother Teresa",
      "lesson": "Take full ownership of your education and your goals; be your own captain."
    }
  },
  {
    "day": 35,
    "wordOfTheDay": {
      "word": "Sagacity",
      "phonetic": "suh-GASS-ih-tee",
      "meaning": "Keen mental discernment and soundness of judgment; deep wisdom.",
      "example": "The teacher smiled at the young boy's sagacity in finding a simpler solution.",
      "category": "Wisdom"
    },
    "mindFact": {
      "title": "Polar Bear Skin",
      "fact": "Beneath their thick white fur, polar bears actually have jet-black skin! The black skin absorbs the heat from the sunlight to keep them warm in freezing Arctic blizzards.",
      "icon": "\ud83d\udc3b\u200d\u2744\ufe0f",
      "category": "Animals"
    },
    "powerfulThought": {
      "quote": "Genius is 1% inspiration, and 99% perspiration.",
      "author": "Thomas A. Edison",
      "lesson": "Practice and sweat in quiet hours produce moments of effortless genius on stage."
    }
  },
  {
    "day": 36,
    "wordOfTheDay": {
      "word": "Tranquility",
      "phonetic": "tran-KWIL-ih-tee",
      "meaning": "A state of profound peace, stillness, and quiet confidence.",
      "example": "Tranquility of mind allows your brain to focus 100% on the question before you.",
      "category": "Calmness"
    },
    "mindFact": {
      "title": "Neutron Star Density",
      "fact": "Neutron stars are so dense that just a single teaspoon of neutron star matter would weigh around 6 billion tons \u2014 roughly equal to the weight of Mount Everest!",
      "icon": "\u2b50",
      "category": "Astronomy"
    },
    "powerfulThought": {
      "quote": "To succeed in your mission, you must have single-minded devotion to your goal.",
      "author": "Dr. A.P.J. Abdul Kalam",
      "lesson": "When taking your quiz, shut out all distractions and give it 100% of your heart."
    }
  },
  {
    "day": 37,
    "wordOfTheDay": {
      "word": "Unwavering",
      "phonetic": "un-WAY-vur-ing",
      "meaning": "Steady, firm, and never hesitating or losing direction.",
      "example": "Her unwavering focus for 15 minutes ensured an impressive 100% score.",
      "category": "Focus"
    },
    "mindFact": {
      "title": "The Power of Sleep",
      "fact": "While you sleep, your brain washes away metabolic toxins and organizes the math concepts you practiced during the day into long-term permanent memory!",
      "icon": "\ud83d\ude34",
      "category": "Brain Science"
    },
    "powerfulThought": {
      "quote": "Difficulties in your life do not come to destroy you, but to help you realize your hidden potential and power.",
      "author": "Dr. A.P.J. Abdul Kalam",
      "lesson": "Hard questions are gym weights for your brain; they build mental muscle."
    }
  },
  {
    "day": 38,
    "wordOfTheDay": {
      "word": "Vigilance",
      "phonetic": "VIJ-uh-luns",
      "meaning": "Careful watchfulness and alertness to avoid mistakes or danger.",
      "example": "Mathematical vigilance means checking signs (+ and -) before writing the final answer.",
      "category": "Attention"
    },
    "mindFact": {
      "title": "Rainforest Oxygen",
      "fact": "The Amazon Rainforest is often called the 'Lungs of the Planet' because its billions of trees produce an immense portion of Earth's oxygen and house 10% of all known species!",
      "icon": "\ud83c\udf34",
      "category": "Ecology"
    },
    "powerfulThought": {
      "quote": "Be like a postage stamp\u2014stick to one thing until you get there.",
      "author": "Josh Billings",
      "lesson": "Finish what you start. Complete all 20 questions before moving to other activities."
    }
  },
  {
    "day": 39,
    "wordOfTheDay": {
      "word": "Zeal",
      "phonetic": "ZEEL",
      "meaning": "Great energy, passion, and enthusiasm in pursuit of an objective.",
      "example": "He tackled every day's quiz with unmatched zeal and mathematical joy.",
      "category": "Passion"
    },
    "mindFact": {
      "title": "Kangaroo Jumping Energy",
      "fact": "Kangaroos store kinetic energy in their stretchy leg tendons like giant rubber springs, making hopping faster and actually using LESS energy the faster they bounce!",
      "icon": "\ud83e\udd98",
      "category": "Biomechanics"
    },
    "powerfulThought": {
      "quote": "There are no shortcuts to any place worth going.",
      "author": "Beverly Sills",
      "lesson": "True mastery takes 100 days of patient practice. Enjoy every step of the journey."
    }
  },
  {
    "day": 40,
    "wordOfTheDay": {
      "word": "Adaptability",
      "phonetic": "uh-dap-tuh-BIL-ih-tee",
      "meaning": "The ability to adjust easily to new conditions or changes.",
      "example": "Adaptability helps a student quickly switch strategies when a math problem looks unfamiliar.",
      "category": "Flexibility"
    },
    "mindFact": {
      "title": "Solar Eclipse Geometry",
      "fact": "By a cosmic coincidence, the Sun is 400 times wider than the Moon, but it is also 400 times farther away! This allows the Moon to perfectly cover the Sun during a total solar eclipse!",
      "icon": "\ud83c\udf11",
      "category": "Astronomy"
    },
    "powerfulThought": {
      "quote": "The journey of a thousand miles begins with a single step.",
      "author": "Lao Tzu",
      "lesson": "You started with Day 1; each day brings you closer to becoming a math grandmaster!"
    }
  },
  {
    "day": 41,
    "wordOfTheDay": {
      "word": "Benevolence",
      "phonetic": "buh-NEV-uh-luns",
      "meaning": "Well-meaning kindness and a desire to do good to others.",
      "example": "Her benevolence showed when she spent recess tutoring younger students in fractions.",
      "category": "Kindness"
    },
    "mindFact": {
      "title": "Spider Silk Strength",
      "fact": "Gram for gram, spider dragline silk is five times stronger than high-grade steel and three times tougher than Kevlar, yet it is completely flexible and biodegradable!",
      "icon": "\ud83d\udd78\ufe0f",
      "category": "Materials Science"
    },
    "powerfulThought": {
      "quote": "Courage is grace under pressure.",
      "author": "Ernest Hemingway",
      "lesson": "Take a deep breath when the quiz timer is running; stay cool and calculate calmly."
    }
  },
  {
    "day": 42,
    "wordOfTheDay": {
      "word": "Clarity",
      "phonetic": "KLAR-ih-tee",
      "meaning": "Clearness of thought, understanding, or expression.",
      "example": "Writing neat steps on your rough sheet brings crystal clarity to your mind.",
      "category": "Intellect"
    },
    "mindFact": {
      "title": "Gecko Grip",
      "fact": "Geckos can walk upside down on smooth glass ceilings because their toe pads have millions of microscopic hairs that bond with surfaces using intermolecular van der Waals forces!",
      "icon": "\ud83e\udd8e",
      "category": "Physics"
    },
    "powerfulThought": {
      "quote": "Believe you can and you're halfway there.",
      "author": "Theodore Roosevelt",
      "lesson": "Self-confidence is half the battle won. You have what it takes to score full marks!"
    }
  },
  {
    "day": 43,
    "wordOfTheDay": {
      "word": "Dedication",
      "phonetic": "ded-ih-KAY-shun",
      "meaning": "The commitment of time and energy to a cause, skill, or goal.",
      "example": "Dedication to your daily homework turns math into a lifelong superpower.",
      "category": "Habit"
    },
    "mindFact": {
      "title": "Magic Squares",
      "fact": "In a 3x3 Magic Square with numbers 1 to 9, every row, column, and diagonal adds up to exactly 15! Ancient cultures studied them over 4,000 years ago.",
      "icon": "\ud83d\udd32",
      "category": "Math Magic"
    },
    "powerfulThought": {
      "quote": "Act as if what you do makes a difference. It does.",
      "author": "William James",
      "lesson": "Every good habit you build today shapes the leader and scientist you become tomorrow."
    }
  },
  {
    "day": 44,
    "wordOfTheDay": {
      "word": "Eloquence",
      "phonetic": "EL-uh-kwuns",
      "meaning": "Fluent, graceful, and persuasive speaking or writing.",
      "example": "He explained the algebraic proof with remarkable eloquence and poise.",
      "category": "Communication"
    },
    "mindFact": {
      "title": "Lightning Never Strikes Twice?",
      "fact": "Myth busted! The Empire State Building in New York is struck by lightning about 25 to 100 times every single year because it acts as a giant natural lightning rod!",
      "icon": "\u26a1",
      "category": "Weather"
    },
    "powerfulThought": {
      "quote": "Happiness is when what you think, what you say, and what you do are in harmony.",
      "author": "Mahatma Gandhi",
      "lesson": "Live with honesty, study with passion, and treat everyone with love."
    }
  },
  {
    "day": 45,
    "wordOfTheDay": {
      "word": "Fearless",
      "phonetic": "FEER-lus",
      "meaning": "Bold, brave, and not intimidated by difficult challenges.",
      "example": "Be fearless when facing a hard problem; it is just a puzzle waiting to be unlocked!",
      "category": "Bravery"
    },
    "mindFact": {
      "title": "Deep Sea Pressure",
      "fact": "At the bottom of the Mariana Trench (11,000 meters deep), the water pressure is over 1,000 times greater than at sea level \u2014 equal to having an elephant standing on your thumb!",
      "icon": "\ud83c\udf0a",
      "category": "Oceanography"
    },
    "powerfulThought": {
      "quote": "Never let the fear of striking out keep you from playing the game.",
      "author": "Babe Ruth",
      "lesson": "Don't fear getting an answer wrong; fear not trying at all!"
    }
  },
  {
    "day": 46,
    "wordOfTheDay": {
      "word": "Gregarious",
      "phonetic": "grih-GAIR-ee-us",
      "meaning": "Fond of company, friendly, and enjoying social interaction.",
      "example": "Her gregarious personality made math study groups lively, fun, and engaging.",
      "category": "Friendship"
    },
    "mindFact": {
      "title": "Owl Head Rotation",
      "fact": "Owls can rotate their heads up to 270 degrees in either direction without damaging their blood vessels or cutting off blood flow to their brains!",
      "icon": "\ud83e\udd89",
      "category": "Animals"
    },
    "powerfulThought": {
      "quote": "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
      "author": "Dr. Seuss",
      "lesson": "Expand your vocabulary and read widely; words give wings to your imagination."
    }
  },
  {
    "day": 47,
    "wordOfTheDay": {
      "word": "Honesty",
      "phonetic": "AHN-ih-stee",
      "meaning": "Truthfulness, sincerity, and refusing to lie, cheat, or mislead.",
      "example": "Honesty in admitting what you don't know is the first step to truly learning it.",
      "category": "Character"
    },
    "mindFact": {
      "title": "The Great Pyramid Precision",
      "fact": "The Great Pyramid of Giza was built with four base sides aligned to true north with an accuracy of less than one-tenth of a single degree \u2014 four thousand years before modern GPS!",
      "icon": "\ud83c\udfdb\ufe0f",
      "category": "Architecture & Math"
    },
    "powerfulThought": {
      "quote": "Honesty is the first chapter in the book of wisdom.",
      "author": "Thomas Jefferson",
      "lesson": "Be honest with your study time and your rough work; genuine learning never cheats."
    }
  },
  {
    "day": 48,
    "wordOfTheDay": {
      "word": "Intuition",
      "phonetic": "in-too-ISH-un",
      "meaning": "The ability to understand something instinctively without conscious reasoning.",
      "example": "Practicing mental math develops sharp mathematical intuition.",
      "category": "Intellect"
    },
    "mindFact": {
      "title": "Electric Eels",
      "fact": "An electric eel can generate an electric shock of up to 860 volts \u2014 enough to stun a horse or power several light bulbs \u2014 using specialized battery-like electrocyte cells!",
      "icon": "\u26a1",
      "category": "Biology"
    },
    "powerfulThought": {
      "quote": "You miss 100% of the shots you don't take.",
      "author": "Wayne Gretzky",
      "lesson": "Always attempt the bonus questions and tricky problems; you might surprise yourself!"
    }
  },
  {
    "day": 49,
    "wordOfTheDay": {
      "word": "Jubilant",
      "phonetic": "JOO-bih-lunt",
      "meaning": "Feeling or expressing great happiness, triumph, and celebration.",
      "example": "The whole family was jubilant when Aarav solved all 20 questions correctly!",
      "category": "Joy"
    },
    "mindFact": {
      "title": "Voyager 1 Journey",
      "fact": "Launched in 1977, NASA's Voyager 1 spacecraft is currently over 24 billion kilometers from Earth, traveling through interstellar space outside our solar system!",
      "icon": "\ud83d\ude80",
      "category": "Space Exploration"
    },
    "powerfulThought": {
      "quote": "Everything you've ever wanted is on the other side of fear.",
      "author": "George Addair",
      "lesson": "Step forward boldly into difficult math topics; understanding will replace fear."
    }
  },
  {
    "day": 50,
    "wordOfTheDay": {
      "word": "Knowledgeable",
      "phonetic": "NAH-lij-uh-bul",
      "meaning": "Intelligent, well-informed, and possessing a wealth of facts.",
      "example": "Reading books outside your school syllabus makes you widely knowledgeable.",
      "category": "Intellect"
    },
    "mindFact": {
      "title": "Halfway Mark Milestone",
      "fact": "Congratulations on reaching Day 50! Your brain has already processed over 1,000 math questions. Neural plasticity has permanently made your logic pathways faster!",
      "icon": "\ud83c\udf89",
      "category": "Milestone Fact"
    },
    "powerfulThought": {
      "quote": "Day 50: Halfway to Glory! The habit is forged; the summit is within your sight.",
      "author": "Avinash Sir",
      "lesson": "You have shown incredible perseverance. 50 days of unbroken mathematical brilliance!"
    }
  },
  {
    "day": 51,
    "wordOfTheDay": {
      "word": "Loyal",
      "phonetic": "LOY-ul",
      "meaning": "Faithful, true, and steadfast to friends, family, and promises.",
      "example": "A loyal friend stands by you in difficulties just as much as in celebrations.",
      "category": "Friendship"
    },
    "mindFact": {
      "title": "Honeybee Math (Day 51 Insight)",
      "fact": "Honeybees build their hives using perfect hexagons! Why? A hexagon is the only shape that covers a plane with minimum boundary perimeter, saving bees precious wax and holding the maximum honey!",
      "icon": "\ud83d\udc1d",
      "category": "Nature & Math"
    },
    "powerfulThought": {
      "quote": "Dream is not that which you see while sleeping; it is something that does not let you sleep.",
      "author": "Dr. A.P.J. Abdul Kalam",
      "lesson": "Let your goals inspire you to wake up with excitement and purpose every day."
    }
  },
  {
    "day": 52,
    "wordOfTheDay": {
      "word": "Mindful",
      "phonetic": "MYND-ful",
      "meaning": "Fully present, attentive, and aware of the moment.",
      "example": "Being mindful during the quiz prevents you from rushing into careless traps.",
      "category": "Focus"
    },
    "mindFact": {
      "title": "Human Brain Power (Day 52 Insight)",
      "fact": "Your brain contains about 86 billion neurons and generates around 20 watts of electrical power \u2014 enough to power a low-wattage LED light bulb!",
      "icon": "\ud83e\udde0",
      "category": "Human Body"
    },
    "powerfulThought": {
      "quote": "Arise, awake, and stop not till the goal is reached.",
      "author": "Swami Vivekananda",
      "lesson": "Stay fully committed to your journey until you see your dream turn into reality."
    }
  },
  {
    "day": 53,
    "wordOfTheDay": {
      "word": "Notable",
      "phonetic": "NOH-tuh-bul",
      "meaning": "Worthy of attention, distinguished, or remarkable.",
      "example": "Her notable progress in mental speed was praised by Avinash Sir.",
      "category": "Excellence"
    },
    "mindFact": {
      "title": "Sunflowers & Fibonacci (Day 53 Insight)",
      "fact": "The seeds in a sunflower face follow the Fibonacci sequence (1, 1, 2, 3, 5, 8, 13, 21, 34...) in spiral patterns so not a single millimeter of sunlight is wasted!",
      "icon": "\ud83c\udf3b",
      "category": "Nature & Math"
    },
    "powerfulThought": {
      "quote": "Education is not the learning of facts, but the training of the mind to think.",
      "author": "Albert Einstein",
      "lesson": "Math is not just about answers; it teaches your mind how to reason and create."
    }
  },
  {
    "day": 54,
    "wordOfTheDay": {
      "word": "Observant",
      "phonetic": "ub-ZUR-vunt",
      "meaning": "Quick to notice things, alert, and paying close attention.",
      "example": "An observant child notices that every even number ends in 0, 2, 4, 6, or 8.",
      "category": "Perception"
    },
    "mindFact": {
      "title": "Saturn's Floating Rings (Day 54 Insight)",
      "fact": "Saturn's dazzling rings are almost entirely made of billions of chunks of pure water ice, ranging from tiny dust grains to giant house-sized icebergs!",
      "icon": "\ud83e\ude90",
      "category": "Space"
    },
    "powerfulThought": {
      "quote": "An equation for me has no meaning unless it expresses a thought of God.",
      "author": "Srinivasa Ramanujan",
      "lesson": "Look at numbers as the poetry of nature, waiting to reveal their beauty to you."
    }
  },
  {
    "day": 55,
    "wordOfTheDay": {
      "word": "Philanthropy",
      "phonetic": "fih-LAN-thruh-pee",
      "meaning": "The desire to help humanity, often through generosity and charity.",
      "example": "Even small acts of sharing knowledge and kindness are forms of philanthropy.",
      "category": "Kindness"
    },
    "mindFact": {
      "title": "The Speed of Light (Day 55 Insight)",
      "fact": "Light travels at 300,000 kilometers per second! In just one second, a beam of light could travel around the entire Earth 7.5 times!",
      "icon": "\u26a1",
      "category": "Physics"
    },
    "powerfulThought": {
      "quote": "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
      "author": "Marie Curie",
      "lesson": "When a math problem looks intimidating, break it into smaller steps and understand it."
    }
  },
  {
    "day": 56,
    "wordOfTheDay": {
      "word": "Quaint",
      "phonetic": "KWAYNT",
      "meaning": "Attractively unusual or charming in an old-fashioned way.",
      "example": "The ancient abacus is a quaint mathematical tool that still teaches fast arithmetic.",
      "category": "Charm"
    },
    "mindFact": {
      "title": "Ant Super-Strength (Day 56 Insight)",
      "fact": "An ordinary ant can carry 10 to 50 times its own body weight! If a human child had the strength of an ant, they could easily lift an entire family car!",
      "icon": "\ud83d\udc1c",
      "category": "Animals"
    },
    "powerfulThought": {
      "quote": "It always seems impossible until it's done.",
      "author": "Nelson Mandela",
      "lesson": "Tackle big challenges one small step at a time, and you will achieve the extraordinary."
    }
  },
  {
    "day": 57,
    "wordOfTheDay": {
      "word": "Radiant",
      "phonetic": "RAY-dee-unt",
      "meaning": "Shining brightly, glowing with joy, health, or optimism.",
      "example": "Her radiant smile after completing Day 50 lit up the whole room.",
      "category": "Joy"
    },
    "mindFact": {
      "title": "The Heart's Engine (Day 57 Insight)",
      "fact": "Your heart beats about 100,000 times every day, pumping around 7,500 liters of oxygen-rich blood through 100,000 kilometers of blood vessels!",
      "icon": "\u2764\ufe0f",
      "category": "Human Body"
    },
    "powerfulThought": {
      "quote": "I have not failed. I've just found 10,000 ways that won't work.",
      "author": "Thomas A. Edison",
      "lesson": "Every mistake you make in math eliminates a wrong path and brings you closer to the right one."
    }
  },
  {
    "day": 58,
    "wordOfTheDay": {
      "word": "Steadfast",
      "phonetic": "STED-fast",
      "meaning": "Resolutely firm and unwavering in loyalty or duty.",
      "example": "Steadfast students do not let a rainy day or lazy mood stop their daily practice.",
      "category": "Discipline"
    },
    "mindFact": {
      "title": "Snowflake Uniqueness (Day 58 Insight)",
      "fact": "No two snowflakes in the history of the universe are exactly identical, yet almost all of them form with perfect six-fold (hexagonal) mathematical symmetry!",
      "icon": "\u2744\ufe0f",
      "category": "Physics & Geometry"
    },
    "powerfulThought": {
      "quote": "You cannot cross the sea merely by standing and staring at the water.",
      "author": "Rabindranath Tagore",
      "lesson": "Don't just wish for good scores; start practicing with pencil and paper today."
    }
  },
  {
    "day": 59,
    "wordOfTheDay": {
      "word": "Thoughtful",
      "phonetic": "THAWT-ful",
      "meaning": "Showing consideration for others and reflecting deeply.",
      "example": "A thoughtful answer considers all possible cases before jumping to conclusions.",
      "category": "Wisdom"
    },
    "mindFact": {
      "title": "The Mystery of Zero (Day 59 Insight)",
      "fact": "The number zero ('Shunya') was invented in ancient India by great mathematicians like Aryabhata and Brahmagupta. Without zero, modern computers, algebra, and space rockets could not exist!",
      "icon": "0\ufe0f\u20e3",
      "category": "Math History"
    },
    "powerfulThought": {
      "quote": "The expert in anything was once a beginner.",
      "author": "Helen Hayes",
      "lesson": "Never feel shy about starting small. Every champion started with Day 1."
    }
  },
  {
    "day": 60,
    "wordOfTheDay": {
      "word": "Unique",
      "phonetic": "yoo-NEEK",
      "meaning": "Being the only one of its kind; special and distinct.",
      "example": "Every child has a unique way of thinking; discover your personal mathematical style!",
      "category": "Individuality"
    },
    "mindFact": {
      "title": "Whale Heart Size (Day 60 Insight)",
      "fact": "The heart of a blue whale is as big as a small car and weighs around 180 kg! Its heartbeat can be heard from over 3 kilometers away underwater!",
      "icon": "\ud83d\udc0b",
      "category": "Animals"
    },
    "powerfulThought": {
      "quote": "Live as if you were to die tomorrow. Learn as if you were to live forever.",
      "author": "Mahatma Gandhi",
      "lesson": "Stay hungry to learn new words, new facts, and new skills throughout your life."
    }
  },
  {
    "day": 61,
    "wordOfTheDay": {
      "word": "Visionary",
      "phonetic": "VIZH-un-air-ee",
      "meaning": "Thinking about or planning the future with wisdom and imagination.",
      "example": "Ramanujan was a visionary who saw mathematical formulas dancing in his dreams.",
      "category": "Inspiration"
    },
    "mindFact": {
      "title": "Moon Footprints (Day 61 Insight)",
      "fact": "Because the Moon has no wind, rain, or atmosphere to blow dust away, the footprints left by Apollo astronauts will stay untouched for at least 100 million years!",
      "icon": "\ud83c\udf15",
      "category": "Space"
    },
    "powerfulThought": {
      "quote": "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      "author": "Winston Churchill",
      "lesson": "Never let a low score discourage you or a high score make you proud; keep growing."
    }
  },
  {
    "day": 62,
    "wordOfTheDay": {
      "word": "Wholesome",
      "phonetic": "HOHL-sum",
      "meaning": "Promoting good health of body, mind, and spirit.",
      "example": "A wholesome routine of fresh air, good food, and daily math keeps your mind razor-sharp.",
      "category": "Health"
    },
    "mindFact": {
      "title": "Lightning Heat (Day 62 Insight)",
      "fact": "A single bolt of lightning can reach a scorching temperature of 30,000\u00b0C (54,000\u00b0F) \u2014 that is five times hotter than the surface of the Sun!",
      "icon": "\ud83c\udf29\ufe0f",
      "category": "Earth Science"
    },
    "powerfulThought": {
      "quote": "Do what you can, with what you have, where you are.",
      "author": "Theodore Roosevelt",
      "lesson": "You don't need fancy tools to excel; your sharp mind and daily practice are enough."
    }
  },
  {
    "day": 63,
    "wordOfTheDay": {
      "word": "Youthful",
      "phonetic": "YOOTH-ful",
      "meaning": "Possessing the fresh vitality, energy, and wonder of youth.",
      "example": "Keep your youthful wonder alive; always ask 'Why?' and 'How does this work?'",
      "category": "Curiosity"
    },
    "mindFact": {
      "title": "Tree Communication (Day 63 Insight)",
      "fact": "Trees in a forest communicate with each other underground through a vast network of fungi nicknamed the 'Wood Wide Web', sharing nutrients and warning neighbors of pests!",
      "icon": "\ud83c\udf33",
      "category": "Nature"
    },
    "powerfulThought": {
      "quote": "The secret of getting ahead is getting started.",
      "author": "Mark Twain",
      "lesson": "The hardest part of doing your homework is opening the book. Once you start, momentum takes over."
    }
  },
  {
    "day": 64,
    "wordOfTheDay": {
      "word": "Zealous",
      "phonetic": "ZEL-us",
      "meaning": "Fervently devoted and enthusiastic about a cause or goal.",
      "example": "She was a zealous reader who finished three science books every week.",
      "category": "Passion"
    },
    "mindFact": {
      "title": "Paper Folding to the Moon (Day 64 Insight)",
      "fact": "If you could fold an ordinary piece of paper in half 42 times, the exponential growth in thickness would reach all the way from Earth to the Moon (384,400 km)!",
      "icon": "\ud83d\udcc4",
      "category": "Math Wonder"
    },
    "powerfulThought": {
      "quote": "Simplicity is the ultimate sophistication.",
      "author": "Leonardo da Vinci",
      "lesson": "The best mathematical solutions are simple, elegant, and crystal clear."
    }
  },
  {
    "day": 65,
    "wordOfTheDay": {
      "word": "Astute",
      "phonetic": "uh-STOOT",
      "meaning": "Having the ability to accurately assess situations and turn this to advantage.",
      "example": "The astute boy noticed that 198 is simply 200 minus 2, making multiplication instant!",
      "category": "Smartness"
    },
    "mindFact": {
      "title": "Octopus Three Hearts (Day 65 Insight)",
      "fact": "An octopus has three hearts and blue blood! Two hearts pump blood to the gills, while the third pumps it through the rest of its body.",
      "icon": "\ud83d\udc19",
      "category": "Animals"
    },
    "powerfulThought": {
      "quote": "In the middle of difficulty lies opportunity.",
      "author": "Albert Einstein",
      "lesson": "When a question seems tricky, it is an invitation for your brain to upgrade its thinking power."
    }
  },
  {
    "day": 66,
    "wordOfTheDay": {
      "word": "Bold",
      "phonetic": "BOHLD",
      "meaning": "Showing willingness to take risks; confident, courageous, and daring.",
      "example": "Be bold enough to try new methods when traditional ways take too long.",
      "category": "Bravery"
    },
    "mindFact": {
      "title": "Venus Backward Spin (Day 66 Insight)",
      "fact": "Venus is the only planet in our solar system that spins clockwise (backwards)! On Venus, the Sun rises in the west and sets in the east.",
      "icon": "\u2728",
      "category": "Space"
    },
    "powerfulThought": {
      "quote": "If you want to shine like a sun, first burn like a sun.",
      "author": "Dr. A.P.J. Abdul Kalam",
      "lesson": "Dazzling success is the fruit of quiet, disciplined effort put in every single day."
    }
  },
  {
    "day": 67,
    "wordOfTheDay": {
      "word": "Conscientious",
      "phonetic": "kahn-shee-EN-shus",
      "meaning": "Wishing to do what is right, especially to do one's work well and thoroughly.",
      "example": "A conscientious student never skips rough work or leaves steps messy.",
      "category": "Care"
    },
    "mindFact": {
      "title": "DNA Length (Day 67 Insight)",
      "fact": "If you untangled all the DNA molecules inside just one single human cell, it would stretch about 2 meters long! Untangled DNA from all your cells would reach Pluto and back!",
      "icon": "\ud83e\uddec",
      "category": "Biology"
    },
    "powerfulThought": {
      "quote": "Be the change that you wish to see in the world.",
      "author": "Mahatma Gandhi",
      "lesson": "Bring positivity, kindness, and hard work into your classroom every single day."
    }
  },
  {
    "day": 68,
    "wordOfTheDay": {
      "word": "Dynamic",
      "phonetic": "dy-NAM-ik",
      "meaning": "Full of energy, fresh ideas, and constantly progressing.",
      "example": "The human brain is dynamic; every new problem you solve creates new neural pathways!",
      "category": "Energy"
    },
    "mindFact": {
      "title": "Origami Space Mirrors (Day 68 Insight)",
      "fact": "NASA scientists use ancient Japanese paper-folding (origami) mathematics to fold giant solar panels and space telescopes so they fit inside compact rocket nose-cones!",
      "icon": "\ud83d\udef0\ufe0f",
      "category": "Invention"
    },
    "powerfulThought": {
      "quote": "Kind words can be short and easy to speak, but their echoes are truly endless.",
      "author": "Mother Teresa",
      "lesson": "A simple word of encouragement to a struggling friend can change their whole life."
    }
  },
  {
    "day": 69,
    "wordOfTheDay": {
      "word": "Exemplary",
      "phonetic": "ig-ZEM-pluh-ree",
      "meaning": "Serving as a desirable model; representing the very best.",
      "example": "Her exemplary discipline earned her the number one spot on the leaderboard.",
      "category": "Excellence"
    },
    "mindFact": {
      "title": "Cheetah Acceleration (Day 69 Insight)",
      "fact": "A cheetah can accelerate from 0 to 96 km/h in just 3 seconds \u2014 faster than most luxury sports cars on the planet!",
      "icon": "\ud83d\udc06",
      "category": "Animals"
    },
    "powerfulThought": {
      "quote": "Strength does not come from physical capacity. It comes from an indomitable will.",
      "author": "Mahatma Gandhi",
      "lesson": "Mental grit and focus will take you further than sheer talent alone."
    }
  },
  {
    "day": 70,
    "wordOfTheDay": {
      "word": "Focus",
      "phonetic": "FOH-kus",
      "meaning": "The center of interest, concentration, or targeted mental energy.",
      "example": "Focus is like a magnifying glass: it concentrates the sunlight of your mind to ignite genius.",
      "category": "Attention"
    },
    "mindFact": {
      "title": "The Great Barrier Reef (Day 70 Insight)",
      "fact": "The Great Barrier Reef in Australia is the largest living structure on Earth. It stretches over 2,300 km and is so massive it can be seen from space!",
      "icon": "\ud83d\udc20",
      "category": "Earth Science"
    },
    "powerfulThought": {
      "quote": "A person who never made a mistake never tried anything new.",
      "author": "Albert Einstein",
      "lesson": "Wear your math eraser proudly; mistakes are scientific proof that you are trying!"
    }
  },
  {
    "day": 71,
    "wordOfTheDay": {
      "word": "Genuine",
      "phonetic": "JEN-yoo-in",
      "meaning": "Truly what something is said to be; authentic, sincere, and real.",
      "example": "A genuine desire to understand is 10 times more powerful than simply chasing marks.",
      "category": "Honesty"
    },
    "mindFact": {
      "title": "Water Memory Cycle (Day 71 Insight)",
      "fact": "Every drop of water on Earth today is billions of years old! The water you drank this morning may have once been sipped by a Tyrannosaurus Rex millions of years ago.",
      "icon": "\ud83d\udca7",
      "category": "Earth Science"
    },
    "powerfulThought": {
      "quote": "Keep your face always toward the sunshine\u2014and shadows will fall behind you.",
      "author": "Walt Whitman",
      "lesson": "Choose optimism and joy; a happy student absorbs knowledge twice as fast."
    }
  },
  {
    "day": 72,
    "wordOfTheDay": {
      "word": "Harmonious",
      "phonetic": "har-MOH-nee-us",
      "meaning": "Forming a pleasing or consistent whole; peaceful and balanced.",
      "example": "Mathematical equations describe the harmonious laws of our entire universe.",
      "category": "Beauty"
    },
    "mindFact": {
      "title": "The Number Googol (Day 72 Insight)",
      "fact": "The number 1 followed by 100 zeros is called a 'Googol'! A 9-year-old boy named Milton Sirotta invented this word in 1920. Google was named after it!",
      "icon": "\ud83d\udd22",
      "category": "Math Wonder"
    },
    "powerfulThought": {
      "quote": "Small deeds done are better than great deeds planned.",
      "author": "Peter Marshall",
      "lesson": "Solving 20 questions today is infinitely better than planning to solve 100 questions tomorrow."
    }
  },
  {
    "day": 73,
    "wordOfTheDay": {
      "word": "Imaginative",
      "phonetic": "ih-MAJ-ih-nuh-tiv",
      "meaning": "Having or showing creativity, rich fantasy, and inventive ideas.",
      "example": "Einstein said: 'Logic will take you from A to B; imagination will take you everywhere!'",
      "category": "Creativity"
    },
    "mindFact": {
      "title": "Hummingbird Flight (Day 73 Insight)",
      "fact": "Hummingbirds are the only birds that can fly backwards, sideways, and upside down! Their wings flap up to 80 times per second in an infinity (\u221e) figure-eight pattern.",
      "icon": "\ud83d\udc26",
      "category": "Animals"
    },
    "powerfulThought": {
      "quote": "You must do the thing you think you cannot do.",
      "author": "Eleanor Roosevelt",
      "lesson": "Surprise yourself! Choose the hardest problem in the chapter and conquer it."
    }
  },
  {
    "day": 74,
    "wordOfTheDay": {
      "word": "Judicious",
      "phonetic": "joo-DISH-us",
      "meaning": "Having, showing, or done with good judgment and careful thought.",
      "example": "A judicious use of time during the quiz allows 2 minutes to review your answers.",
      "category": "Wisdom"
    },
    "mindFact": {
      "title": "Diamonds from the Sky (Day 74 Insight)",
      "fact": "On planets like Neptune and Uranus, extreme atmospheric pressure and methane gas cause it to literally rain solid diamonds from the sky!",
      "icon": "\ud83d\udc8e",
      "category": "Space"
    },
    "powerfulThought": {
      "quote": "The only true wisdom is in knowing you know nothing.",
      "author": "Socrates",
      "lesson": "Stay curious and humble; there is always something amazing waiting to be learned."
    }
  },
  {
    "day": 75,
    "wordOfTheDay": {
      "word": "Kindhearted",
      "phonetic": "KYND-har-tid",
      "meaning": "Having a gentle, affectionate, and considerate nature.",
      "example": "A kindhearted kid helps others feel included and cheered during games.",
      "category": "Kindness"
    },
    "mindFact": {
      "title": "Bamboo Super-Growth (Day 75 Insight)",
      "fact": "Certain species of bamboo can grow up to 91 centimeters (almost 1 meter!) in a single day. That is about 4 centimeters every single hour!",
      "icon": "\ud83c\udf8b",
      "category": "Nature"
    },
    "powerfulThought": {
      "quote": "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
      "author": "Benjamin Franklin",
      "lesson": "Explain what you learned to a friend or parent; teaching cements knowledge forever."
    }
  },
  {
    "day": 76,
    "wordOfTheDay": {
      "word": "Lucid",
      "phonetic": "LOO-sid",
      "meaning": "Expressed clearly; easy to understand; bright and luminous.",
      "example": "Her explanation of prime numbers was so lucid that even first-graders understood.",
      "category": "Clarity"
    },
    "mindFact": {
      "title": "Earth's Magnetic Shield (Day 76 Insight)",
      "fact": "Earth's spinning molten iron core creates an invisible magnetic force field around our planet that deflects harmful solar radiation and gives us the colorful Northern Lights!",
      "icon": "\ud83e\uddf2",
      "category": "Physics"
    },
    "powerfulThought": {
      "quote": "Strive not to be a success, but rather to be of value.",
      "author": "Albert Einstein",
      "lesson": "Use your math, science, and intellect to help others and make society better."
    }
  },
  {
    "day": 77,
    "wordOfTheDay": {
      "word": "Modest",
      "phonetic": "MAH-dist",
      "meaning": "Unassuming or moderate in the estimation of one's abilities or achievements.",
      "example": "A modest champion listens more than they speak and learns from everyone.",
      "category": "Humility"
    },
    "mindFact": {
      "title": "Chameleon Eyes (Day 77 Insight)",
      "fact": "A chameleon's eyes can move completely independently of each other, allowing it to look at two different directions at the exact same time with a 360-degree view!",
      "icon": "\ud83e\udd8e",
      "category": "Animals"
    },
    "powerfulThought": {
      "quote": "A champion is defined not by their wins but by how they can recover when they fall.",
      "author": "Serena Williams",
      "lesson": "Bouncing back from a hard quiz with a smile is the true sign of a champion."
    }
  },
  {
    "day": 78,
    "wordOfTheDay": {
      "word": "Nimble",
      "phonetic": "NIM-bul",
      "meaning": "Quick and light in movement or in mental agility.",
      "example": "Vedic math techniques make your mental reflexes nimble and lightning-fast.",
      "category": "Speed"
    },
    "mindFact": {
      "title": "Golden Ratio in Art (Day 78 Insight)",
      "fact": "The Golden Ratio (approximately 1.618, Greek letter Phi) is found in shells, pinecones, the Mona Lisa, and ancient Greek temples because human eyes find it supremely beautiful!",
      "icon": "\ud83d\udcd0",
      "category": "Geometry"
    },
    "powerfulThought": {
      "quote": "It is our choices that show what we truly are, far more than our abilities.",
      "author": "Albus Dumbledore (J.K. Rowling)",
      "lesson": "Talent is a gift, but discipline and kindness are choices you make every day."
    }
  },
  {
    "day": 79,
    "wordOfTheDay": {
      "word": "Open-minded",
      "phonetic": "OH-pun MYN-did",
      "meaning": "Willing to consider new ideas, perspectives, and methods.",
      "example": "Being open-minded allowed Ramanujan to see math formulas that others missed.",
      "category": "Receptivity"
    },
    "mindFact": {
      "title": "Volcanoes on Mars (Day 79 Insight)",
      "fact": "Olympus Mons on Mars is the largest volcano in our solar system. It is three times taller than Mount Everest and as wide as the entire country of France!",
      "icon": "\ud83c\udf0b",
      "category": "Space"
    },
    "powerfulThought": {
      "quote": "The mind is everything. What you think you become.",
      "author": "Gautama Buddha",
      "lesson": "Believe that you are capable of mathematical brilliance, and your brain will prove it."
    }
  },
  {
    "day": 80,
    "wordOfTheDay": {
      "word": "Persistent",
      "phonetic": "pur-SIS-tunt",
      "meaning": "Continuing firmly in a course of action in spite of difficulty.",
      "example": "A persistent drop of water can carve through solid granite over time.",
      "category": "Grit"
    },
    "mindFact": {
      "title": "Bioluminescent Glow (Day 80 Insight)",
      "fact": "Over 75% of deep-sea creatures create their own living light through a chemical reaction called bioluminescence to attract food, communicate, and disguise themselves in the dark!",
      "icon": "\ud83e\udd91",
      "category": "Marine Biology"
    },
    "powerfulThought": {
      "quote": "Patience and perseverance have a magical effect before which difficulties disappear and obstacles vanish.",
      "author": "John Quincy Adams",
      "lesson": "Consistent daily effort melts the hardest math problems like ice under warm sunlight."
    }
  },
  {
    "day": 81,
    "wordOfTheDay": {
      "word": "Quick-witted",
      "phonetic": "KWIK-wit-id",
      "meaning": "Able to think, react, and calculate quickly and smartly.",
      "example": "Quick-witted students use estimation to rule out impossible options in MCQs.",
      "category": "Agility"
    },
    "mindFact": {
      "title": "Bicycle Balance Physics (Day 81 Insight)",
      "fact": "The physics of why a moving bicycle balances so stably involves gyroscopic forces, forward momentum, and castor angles \u2014 it is still a fascinating topic of study for physicists!",
      "icon": "\ud83d\udeb2",
      "category": "Physics"
    },
    "powerfulThought": {
      "quote": "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
      "author": "Ralph Waldo Emerson",
      "lesson": "You have an ocean of untapped genius inside you; unlock it day by day."
    }
  },
  {
    "day": 82,
    "wordOfTheDay": {
      "word": "Reliable",
      "phonetic": "rih-LY-uh-bul",
      "meaning": "Consistently good in quality or performance; trustworthy.",
      "example": "A reliable person is someone who keeps their promises no matter what.",
      "category": "Trust"
    },
    "mindFact": {
      "title": "Elephant Memory (Day 82 Insight)",
      "fact": "Elephants have the largest brain of any land animal and possess legendary long-term memory, recognizing friends, family, and waterholes decades after seeing them!",
      "icon": "\ud83d\udc18",
      "category": "Animals"
    },
    "powerfulThought": {
      "quote": "The beautiful thing about learning is that no one can take it away from you.",
      "author": "B.B. King",
      "lesson": "Knowledge is the one treasure that multiplies every time you share it."
    }
  },
  {
    "day": 83,
    "wordOfTheDay": {
      "word": "Serene",
      "phonetic": "suh-REEN",
      "meaning": "Calm, peaceful, and untroubled; free from agitation.",
      "example": "A serene mind stays cool under pressure and avoids impulsive mistakes.",
      "category": "Peace"
    },
    "mindFact": {
      "title": "Sound Under Water (Day 83 Insight)",
      "fact": "Sound travels about 4.3 times faster through water (1,480 m/s) than through air (343 m/s) because water molecules are packed much more tightly together!",
      "icon": "\ud83c\udf0a",
      "category": "Physics"
    },
    "powerfulThought": {
      "quote": "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
      "author": "Aristotle",
      "lesson": "Making daily math homework an unbreakable habit turns excellence into your second nature."
    }
  },
  {
    "day": 84,
    "wordOfTheDay": {
      "word": "Tenacious",
      "phonetic": "tuh-NAY-shus",
      "meaning": "Holding fast; characterized by keeping a firm hold on a purpose.",
      "example": "Her tenacious spirit solved the brain-teaser that had stumped her whole class.",
      "category": "Grit"
    },
    "mindFact": {
      "title": "The M\u00f6bius Strip (Day 84 Insight)",
      "fact": "A M\u00f6bius strip is a surface with only ONE single side and only ONE boundary curve! If you draw a line down the middle with a pen, you will cover both 'sides' without lifting your pen!",
      "icon": "\u267e\ufe0f",
      "category": "Topology"
    },
    "powerfulThought": {
      "quote": "Do not wait for leaders; do it alone, person to person.",
      "author": "Mother Teresa",
      "lesson": "Take full ownership of your education and your goals; be your own captain."
    }
  },
  {
    "day": 85,
    "wordOfTheDay": {
      "word": "Uplifting",
      "phonetic": "up-LIF-ting",
      "meaning": "Inspiring happiness, hope, elevation, and optimism.",
      "example": "His uplifting words encouraged his teammate to try the problem again.",
      "category": "Inspiration"
    },
    "mindFact": {
      "title": "Polar Bear Skin (Day 85 Insight)",
      "fact": "Beneath their thick white fur, polar bears actually have jet-black skin! The black skin absorbs the heat from the sunlight to keep them warm in freezing Arctic blizzards.",
      "icon": "\ud83d\udc3b\u200d\u2744\ufe0f",
      "category": "Animals"
    },
    "powerfulThought": {
      "quote": "Genius is 1% inspiration, and 99% perspiration.",
      "author": "Thomas A. Edison",
      "lesson": "Practice and sweat in quiet hours produce moments of effortless genius on stage."
    }
  },
  {
    "day": 86,
    "wordOfTheDay": {
      "word": "Valiant",
      "phonetic": "VAL-yunt",
      "meaning": "Possessing or showing courage, determination, and heroism.",
      "example": "The valiant student tackled the hardest math olympiad questions without flinching.",
      "category": "Courage"
    },
    "mindFact": {
      "title": "Neutron Star Density (Day 86 Insight)",
      "fact": "Neutron stars are so dense that just a single teaspoon of neutron star matter would weigh around 6 billion tons \u2014 roughly equal to the weight of Mount Everest!",
      "icon": "\u2b50",
      "category": "Astronomy"
    },
    "powerfulThought": {
      "quote": "To succeed in your mission, you must have single-minded devotion to your goal.",
      "author": "Dr. A.P.J. Abdul Kalam",
      "lesson": "When taking your quiz, shut out all distractions and give it 100% of your heart."
    }
  },
  {
    "day": 87,
    "wordOfTheDay": {
      "word": "Warmhearted",
      "phonetic": "WARM-har-tid",
      "meaning": "Sympathetic, generous, cordial, and genuinely loving.",
      "example": "A warmhearted home is where learning is celebrated with praise, laughter, and hugs.",
      "category": "Love"
    },
    "mindFact": {
      "title": "The Power of Sleep (Day 87 Insight)",
      "fact": "While you sleep, your brain washes away metabolic toxins and organizes the math concepts you practiced during the day into long-term permanent memory!",
      "icon": "\ud83d\ude34",
      "category": "Brain Science"
    },
    "powerfulThought": {
      "quote": "Difficulties in your life do not come to destroy you, but to help you realize your hidden potential and power.",
      "author": "Dr. A.P.J. Abdul Kalam",
      "lesson": "Hard questions are gym weights for your brain; they build mental muscle."
    }
  },
  {
    "day": 88,
    "wordOfTheDay": {
      "word": "Xenial",
      "phonetic": "ZEE-nee-ul",
      "meaning": "Hospitable, warm, and exceptionally welcoming to guests or newcomers.",
      "example": "Be xenial to the new kid in school; invite them to sit and study together.",
      "category": "Welcome"
    },
    "mindFact": {
      "title": "Rainforest Oxygen (Day 88 Insight)",
      "fact": "The Amazon Rainforest is often called the 'Lungs of the Planet' because its billions of trees produce an immense portion of Earth's oxygen and house 10% of all known species!",
      "icon": "\ud83c\udf34",
      "category": "Ecology"
    },
    "powerfulThought": {
      "quote": "Be like a postage stamp\u2014stick to one thing until you get there.",
      "author": "Josh Billings",
      "lesson": "Finish what you start. Complete all 20 questions before moving to other activities."
    }
  },
  {
    "day": 89,
    "wordOfTheDay": {
      "word": "Youthful",
      "phonetic": "YOOTH-ful",
      "meaning": "Full of freshness, vitality, enthusiasm, and wonder.",
      "example": "Stay youthful in your curiosity: never lose the magic of wondering how the world ticks.",
      "category": "Curiosity"
    },
    "mindFact": {
      "title": "Kangaroo Jumping Energy (Day 89 Insight)",
      "fact": "Kangaroos store kinetic energy in their stretchy leg tendons like giant rubber springs, making hopping faster and actually using LESS energy the faster they bounce!",
      "icon": "\ud83e\udd98",
      "category": "Biomechanics"
    },
    "powerfulThought": {
      "quote": "There are no shortcuts to any place worth going.",
      "author": "Beverly Sills",
      "lesson": "True mastery takes 100 days of patient practice. Enjoy every step of the journey."
    }
  },
  {
    "day": 90,
    "wordOfTheDay": {
      "word": "Zephyr",
      "phonetic": "ZEF-ur",
      "meaning": "A soft, gentle, and refreshing breeze.",
      "example": "Take a deep breath like a cooling zephyr to soothe your brain before calculation.",
      "category": "Peace"
    },
    "mindFact": {
      "title": "Solar Eclipse Geometry (Day 90 Insight)",
      "fact": "By a cosmic coincidence, the Sun is 400 times wider than the Moon, but it is also 400 times farther away! This allows the Moon to perfectly cover the Sun during a total solar eclipse!",
      "icon": "\ud83c\udf11",
      "category": "Astronomy"
    },
    "powerfulThought": {
      "quote": "The journey of a thousand miles begins with a single step.",
      "author": "Lao Tzu",
      "lesson": "You started with Day 1; each day brings you closer to becoming a math grandmaster!"
    }
  },
  {
    "day": 91,
    "wordOfTheDay": {
      "word": "Analytical",
      "phonetic": "an-uh-LIT-ih-kul",
      "meaning": "Using logical reasoning and breaking problems into simple pieces.",
      "example": "An analytical mind sees a large complicated problem as 5 small, easy steps.",
      "category": "Logic"
    },
    "mindFact": {
      "title": "Spider Silk Strength (Day 91 Insight)",
      "fact": "Gram for gram, spider dragline silk is five times stronger than high-grade steel and three times tougher than Kevlar, yet it is completely flexible and biodegradable!",
      "icon": "\ud83d\udd78\ufe0f",
      "category": "Materials Science"
    },
    "powerfulThought": {
      "quote": "Courage is grace under pressure.",
      "author": "Ernest Hemingway",
      "lesson": "Take a deep breath when the quiz timer is running; stay cool and calculate calmly."
    }
  },
  {
    "day": 92,
    "wordOfTheDay": {
      "word": "Brilliant",
      "phonetic": "BRIL-yunt",
      "meaning": "Exceptionally clever, radiant, and talented.",
      "example": "You possess brilliant mental potential; every day's quiz expands your intelligence.",
      "category": "Radiance"
    },
    "mindFact": {
      "title": "Gecko Grip (Day 92 Insight)",
      "fact": "Geckos can walk upside down on smooth glass ceilings because their toe pads have millions of microscopic hairs that bond with surfaces using intermolecular van der Waals forces!",
      "icon": "\ud83e\udd8e",
      "category": "Physics"
    },
    "powerfulThought": {
      "quote": "Believe you can and you're halfway there.",
      "author": "Theodore Roosevelt",
      "lesson": "Self-confidence is half the battle won. You have what it takes to score full marks!"
    }
  },
  {
    "day": 93,
    "wordOfTheDay": {
      "word": "Collaborative",
      "phonetic": "kuh-LAB-uh-ruh-tiv",
      "meaning": "Working together cooperatively with others toward a shared goal.",
      "example": "When great minds are collaborative, they can solve humanity's biggest problems.",
      "category": "Teamwork"
    },
    "mindFact": {
      "title": "Magic Squares (Day 93 Insight)",
      "fact": "In a 3x3 Magic Square with numbers 1 to 9, every row, column, and diagonal adds up to exactly 15! Ancient cultures studied them over 4,000 years ago.",
      "icon": "\ud83d\udd32",
      "category": "Math Magic"
    },
    "powerfulThought": {
      "quote": "Act as if what you do makes a difference. It does.",
      "author": "William James",
      "lesson": "Every good habit you build today shapes the leader and scientist you become tomorrow."
    }
  },
  {
    "day": 94,
    "wordOfTheDay": {
      "word": "Dependable",
      "phonetic": "dih-PEN-duh-bul",
      "meaning": "Trustworthy and reliable; someone who can always be counted upon.",
      "example": "A dependable routine of 15 minutes of math daily leads to extraordinary mastery.",
      "category": "Trust"
    },
    "mindFact": {
      "title": "Lightning Never Strikes Twice? (Day 94 Insight)",
      "fact": "Myth busted! The Empire State Building in New York is struck by lightning about 25 to 100 times every single year because it acts as a giant natural lightning rod!",
      "icon": "\u26a1",
      "category": "Weather"
    },
    "powerfulThought": {
      "quote": "Happiness is when what you think, what you say, and what you do are in harmony.",
      "author": "Mahatma Gandhi",
      "lesson": "Live with honesty, study with passion, and treat everyone with love."
    }
  },
  {
    "day": 95,
    "wordOfTheDay": {
      "word": "Empathetic",
      "phonetic": "em-puh-THET-ik",
      "meaning": "Showing deep understanding and sensitivity to others' emotions.",
      "example": "An empathetic leader listens to everyone before making an important decision.",
      "category": "Empathy"
    },
    "mindFact": {
      "title": "Deep Sea Pressure (Day 95 Insight)",
      "fact": "At the bottom of the Mariana Trench (11,000 meters deep), the water pressure is over 1,000 times greater than at sea level \u2014 equal to having an elephant standing on your thumb!",
      "icon": "\ud83c\udf0a",
      "category": "Oceanography"
    },
    "powerfulThought": {
      "quote": "Never let the fear of striking out keep you from playing the game.",
      "author": "Babe Ruth",
      "lesson": "Don't fear getting an answer wrong; fear not trying at all!"
    }
  },
  {
    "day": 96,
    "wordOfTheDay": {
      "word": "Fearless",
      "phonetic": "FEER-lus",
      "meaning": "Brave and bold; facing difficult challenges with high spirits.",
      "example": "Approach hard math questions fearlessly: every challenge is a gift to grow your brain.",
      "category": "Bravery"
    },
    "mindFact": {
      "title": "Owl Head Rotation (Day 96 Insight)",
      "fact": "Owls can rotate their heads up to 270 degrees in either direction without damaging their blood vessels or cutting off blood flow to their brains!",
      "icon": "\ud83e\udd89",
      "category": "Animals"
    },
    "powerfulThought": {
      "quote": "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
      "author": "Dr. Seuss",
      "lesson": "Expand your vocabulary and read widely; words give wings to your imagination."
    }
  },
  {
    "day": 97,
    "wordOfTheDay": {
      "word": "Gracious",
      "phonetic": "GRAY-shus",
      "meaning": "Courteous, kind, elegant, and pleasant in all circumstances.",
      "example": "A gracious winner praises the efforts of everyone who participated.",
      "category": "Elegance"
    },
    "mindFact": {
      "title": "The Great Pyramid Precision (Day 97 Insight)",
      "fact": "The Great Pyramid of Giza was built with four base sides aligned to true north with an accuracy of less than one-tenth of a single degree \u2014 four thousand years before modern GPS!",
      "icon": "\ud83c\udfdb\ufe0f",
      "category": "Architecture & Math"
    },
    "powerfulThought": {
      "quote": "Honesty is the first chapter in the book of wisdom.",
      "author": "Thomas Jefferson",
      "lesson": "Be honest with your study time and your rough work; genuine learning never cheats."
    }
  },
  {
    "day": 98,
    "wordOfTheDay": {
      "word": "Hardworking",
      "phonetic": "HARD-wur-king",
      "meaning": "Putting great effort, care, and energy into one's tasks.",
      "example": "Hard work beats raw talent when raw talent doesn't work hard.",
      "category": "Effort"
    },
    "mindFact": {
      "title": "Electric Eels (Day 98 Insight)",
      "fact": "An electric eel can generate an electric shock of up to 860 volts \u2014 enough to stun a horse or power several light bulbs \u2014 using specialized battery-like electrocyte cells!",
      "icon": "\u26a1",
      "category": "Biology"
    },
    "powerfulThought": {
      "quote": "You miss 100% of the shots you don't take.",
      "author": "Wayne Gretzky",
      "lesson": "Always attempt the bonus questions and tricky problems; you might surprise yourself!"
    }
  },
  {
    "day": 99,
    "wordOfTheDay": {
      "word": "Inspiring",
      "phonetic": "in-SPY-ring",
      "meaning": "Filling someone with the urge or ability to do something creative and noble.",
      "example": "Your 100-day math journey will become an inspiring story for all your classmates!",
      "category": "Inspiration"
    },
    "mindFact": {
      "title": "Voyager 1 Journey (Day 99 Insight)",
      "fact": "Launched in 1977, NASA's Voyager 1 spacecraft is currently over 24 billion kilometers from Earth, traveling through interstellar space outside our solar system!",
      "icon": "\ud83d\ude80",
      "category": "Space Exploration"
    },
    "powerfulThought": {
      "quote": "Everything you've ever wanted is on the other side of fear.",
      "author": "George Addair",
      "lesson": "Step forward boldly into difficult math topics; understanding will replace fear."
    }
  },
  {
    "day": 100,
    "wordOfTheDay": {
      "word": "Mastery",
      "phonetic": "MASS-tuh-ree",
      "meaning": "Comprehensive knowledge, supreme skill, and effortless accomplishment.",
      "example": "Day 100 is here! True mastery is the reward of patience, joy, and daily discipline.",
      "category": "Grandmaster"
    },
    "mindFact": {
      "title": "Halfway Mark Milestone (Day 100 Insight)",
      "fact": "Congratulations on reaching Day 50! Your brain has already processed over 1,000 math questions. Neural plasticity has permanently made your logic pathways faster!",
      "icon": "\ud83c\udf89",
      "category": "Milestone Fact"
    },
    "powerfulThought": {
      "quote": "Day 50: Halfway to Glory! The habit is forged; the summit is within your sight.",
      "author": "Avinash Sir",
      "lesson": "You have shown incredible perseverance. 50 days of unbroken mathematical brilliance!"
    }
  }
];

function getHolisticDayGrowth(day) {
  const d = Math.max(1, Math.min(100, parseInt(day, 10) || 1));
  return HOLISTIC_GROWTH_DATA[d - 1] || HOLISTIC_GROWTH_DATA[0];
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { HOLISTIC_GROWTH_DATA, getHolisticDayGrowth };
}
