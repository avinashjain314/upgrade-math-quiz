/**
 * Avinash Sir's 100-Day Vedic Math Shortcuts, Sharp Mental Hacks & Holistic Brain Focus Tips
 * Exactly 100 UNIQUE entries - One for each day of the 100-Day Program (Day 1 to Day 100).
 * No repetitions. Pure mathematical elegance, focus wisdom, and inspiring guidance.
 * Upgrade Math Quiz by Avinash Sir
 */

const VEDIC_TRICKS_AND_WISDOM = [
  {
    day: 1,
    title: "Multiply Any 2-Digit Number by 11",
    trick: "Split the digits and insert their sum in the middle! E.g., 35 \u00d7 11: 3 _ 5, middle = 3 + 5 = 8 \u2192 385. If sum is 10 or more, carry 1 over to the left: 78 \u00d7 11: 7 _ 8, 7+8=15 \u2192 858!",
    focusTip: "\ud83e\udde0 Focus Ritual: Take 3 slow, deep breaths before reading any question. A calm brain calculates 2x faster than a rushed brain!",
    quote: "Every math expert was once a beginner who refused to give up. Welcome to Day 1!"
  },
  {
    day: 2,
    title: "Square Any Number Ending in 5",
    trick: "Multiply the tens digit by (tens digit + 1), then attach 25 at the end! E.g., 65\u00b2: 6 \u00d7 7 = 42, attach 25 \u2192 4,225. 85\u00b2: 8 \u00d7 9 = 72, attach 25 \u2192 7,225!",
    focusTip: "\ud83d\udca7 Brain Hydration: Drink half a glass of fresh water before starting. The human brain is 75% water; hydration prevents calculation slips!",
    quote: "Math is not about memorizing numbers; it is about recognizing beautiful patterns."
  },
  {
    day: 3,
    title: "Instant Subtraction from Base 1,000, 10,000 (All from 9, Last from 10)",
    trick: "To subtract 634 from 1,000: subtract 6 from 9 (=3), 3 from 9 (=6), and last digit 4 from 10 (=6) \u2192 366! Zero borrowing headaches!",
    focusTip: "\ud83d\udc40 Eye-Pencil Tracking: When reading a word problem, use your finger or cursor to trace the key numbers so you never misread data.",
    quote: "Consistency turns everyday practice into effortless genius."
  },
  {
    day: 4,
    title: "Multiply Numbers Close to 100 (Below 100)",
    trick: "Calculate 96 \u00d7 97: 96 is -4 from 100, 97 is -3. Left part = 96 - 3 = 93. Right part = (-4) \u00d7 (-3) = 12 \u2192 9,312! Solved in 3 seconds!",
    focusTip: "\ud83c\udfaf The 5-Second Pause: After reading a tricky question, pause for 5 seconds to understand what is being asked before touching your pen.",
    quote: "Speed in math comes naturally when your understanding is crystal clear."
  },
  {
    day: 5,
    title: "Instant Division by 5",
    trick: "To divide any number by 5, double the number and shift the decimal point one place to the left! E.g., 142 \u00f7 5: double is 284, shift decimal \u2192 28.4!",
    focusTip: "\ud83e\uddd8 Posture Power: Sit with your back upright and shoulders relaxed. Good posture increases oxygen flow to your prefrontal cortex by 15%!",
    quote: "Mistakes are not failures; they are stepping stones to mathematical mastery."
  },
  {
    day: 6,
    title: "Multiply by 25 in a Flash",
    trick: "Since 25 = 100 \u00f7 4, divide the number by 4 and add two zeros! E.g., 36 \u00d7 25: 36 \u00f7 4 = 9, add two zeros \u2192 900! If remainder 1, add 25; rem 2 add 50; rem 3 add 75.",
    focusTip: "\ud83d\udd07 Zero-Distraction Zone: Put away extra devices and TV while doing your 20 daily questions. 15 minutes of pure focus beats 1 hour of distracted study.",
    quote: "Smart shortcuts aren't cheating; they are the elegance of mathematics."
  },
  {
    day: 7,
    title: "Quick Divisibility Check for 9 (Digital Roots)",
    trick: "Add all the digits together. If the sum is divisible by 9, the entire number is! E.g., 5,832: 5+8+3+2 = 18 (divisible by 9). So 5,832 is divisible by 9!",
    focusTip: "\u2b50 Weekly Reflection: Celebrate completing 7 days! Tell yourself: 'I am building an unstoppable daily study discipline.'",
    quote: "One full week completed! You are already sharper than 90% of students!"
  },
  {
    day: 8,
    title: "Mental Percentage Swap (x% of y = y% of x)",
    trick: "What is 16% of 50? Swap it: 50% of 16 is super easy = 8! What is 84% of 25? 25% of 84 = 84 \u00f7 4 = 21!",
    focusTip: "\ud83d\udd04 Perspective Shift: When a problem looks difficult, ask yourself: 'Can I rephrase or reverse this to make it simpler?'",
    quote: "A flexible mind discovers simple solutions to complex puzzles."
  },
  {
    day: 9,
    title: "The Butterfly Method for Adding Unlike Fractions",
    trick: "For a/b + c/d: cross-multiply (a\u00d7d) and (b\u00d7c), add them for numerator. Multiply denominators (b\u00d7d) for bottom! E.g., 2/3 + 1/4: (8 + 3)/(12) = 11/12!",
    focusTip: "\ud83e\udde0 Mental Chalkboard: Close your eyes for 3 seconds and visualize the numbers written in glowing chalk. Mental imagery boosts working memory.",
    quote: "Train your mind to see the big picture before diving into calculations."
  },
  {
    day: 10,
    title: "Square of Numbers Between 50 and 59",
    trick: "For 54\u00b2: Add units digit to 25 (25 + 4 = 29). Square units digit (4\u00b2 = 16) \u2192 2,916! Try 57\u00b2: 25 + 7 = 32, 7\u00b2 = 49 \u2192 3,249!",
    focusTip: "\ud83c\udfc6 Double Digits: Day 10 completed! Consistency is the superpower of high achievers.",
    quote: "Mathematics is the music of logic. Keep listening to its rhythm!"
  },
  {
    day: 11,
    title: "Lightning 15% Calculation in Your Head",
    trick: "To find 15% of $240: Find 10% (move decimal: $24), take half of that for 5% ($12), add them: 24 + 12 = $36!",
    focusTip: "\ud83c\udf4e Brain Fuel: Healthy snacks like almonds, walnuts, and seasonal fruits fuel your brain with omega-3s and steady energy.",
    quote: "Mastering practical math turns everyday life into an advantage."
  },
  {
    day: 12,
    title: "Instant Divisibility by 4 & 8",
    trick: "For 4: check only the last 2 digits. If they divide by 4, the whole number does! E.g., 17,536: 36 \u00f7 4 = 9, yes! For 8: check only the last 3 digits: 536 \u00f7 8 = 67, yes!",
    focusTip: "\ud83d\udd0d Eliminate & Simplify: Always filter out irrelevant extra data in word problems first.",
    quote: "Divide big challenges into tiny, conquerable pieces."
  },
  {
    day: 13,
    title: "Multiply Numbers Ending in 1",
    trick: "For 31 \u00d7 41: Multiply tens digits (3\u00d74=12), add tens digits (3+4=7), write 1 at end \u2192 1,271! For 51 \u00d7 21: 5\u00d72=10, 5+2=7, write 1 \u2192 1,071!",
    focusTip: "\ud83c\udf19 Deep Sleep: Sleep consolidates your mathematical memory. Aim for 8 hours of solid rest every night.",
    quote: "Your brain continues to wire new math circuits even while you sleep!"
  },
  {
    day: 14,
    title: "Rapid Multiplication by 99",
    trick: "Multiply by 100 and subtract the number itself! E.g., 47 \u00d7 99 = (47 \u00d7 100) - 47 = 4,700 - 47 = 4,653!",
    focusTip: "\ud83d\udd25 2 Weeks Streak: Your daily math habit is now taking deep root in your subconscious mind.",
    quote: "Discipline is choosing what you want most over what you want right now."
  },
  {
    day: 15,
    title: "Average of Arithmetic Sequences in 1 Second",
    trick: "If numbers are equally spaced (like 14, 18, 22, 26, 30), the average is simply (First + Last) \u00f7 2! (14 + 30) \u00f7 2 = 22!",
    focusTip: "\u2696\ufe0f Balance: Life, like math, requires balance. Work hard, rest well, and play with enthusiasm.",
    quote: "Halfway through your first month! Your numerical instinct is sharper every day."
  },
  {
    day: 16,
    title: "Multiply Numbers Close to 100 (Above 100)",
    trick: "Calculate 104 \u00d7 107: 104 is +4, 107 is +7. Left part = 104 + 7 = 111. Right part = 4 \u00d7 7 = 28 \u2192 11,128! Instant answer!",
    focusTip: "\ud83c\udf2c\ufe0f Box Breathing: Inhale 4s, hold 4s, exhale 4s, hold 4s. This calms the amygdala before high-pressure problem solving.",
    quote: "When your mind is serene, complex numbers arrange themselves into harmony."
  },
  {
    day: 17,
    title: "Multiply Any Number by 50 in a Snap",
    trick: "Since 50 = 100 \u00f7 2, simply divide the number by 2 and add two zeros! E.g., 68 \u00d7 50: 68 \u00f7 2 = 34, add two zeros \u2192 3,400!",
    focusTip: "\u270d\ufe0f Neat Rough Sheet: Keep your rough paper organized in columns. Clutter on paper leads to clutter in thought.",
    quote: "Order and cleanliness in your workspace create clarity in your thinking."
  },
  {
    day: 18,
    title: "Consecutive Square Differences",
    trick: "The difference between two consecutive squares N\u00b2 and (N-1)\u00b2 is simply N + (N-1)! E.g., 25\u00b2 - 24\u00b2 = 25 + 24 = 49! 50\u00b2 - 49\u00b2 = 99!",
    focusTip: "\ud83d\udca1 Spotlight Attention: Imagine your attention as a laser beam illuminating only the current line of equation.",
    quote: "Focus is a muscle. Every time you bring your attention back, you strengthen it."
  },
  {
    day: 19,
    title: "Instant Divisibility by 3 and 6",
    trick: "A number divides by 3 if its digit sum divides by 3. It divides by 6 if it divides by 3 AND ends in an even digit (0, 2, 4, 6, 8)!",
    focusTip: "\ud83c\udfa7 Internal Radio: Turn off negative self-talk. Replace 'I cannot do this' with 'I have not solved it YET.'",
    quote: "The word 'YET' is the bridge between current ability and future genius."
  },
  {
    day: 20,
    title: "Rapid Halving and Doubling",
    trick: "For tough multiplications, double one number and cut the other in half! E.g., 16 \u00d7 35 = 8 \u00d7 70 = 560! E.g., 18 \u00d7 45 = 9 \u00d7 90 = 810!",
    focusTip: "\ud83c\udfaf 20-Day Milestone: You have answered 400 questions! Celebrate your growing mental stamina.",
    quote: "Dedication is the quiet courage to show up every single day."
  },
  {
    day: 21,
    title: "Multiply When Tens are Same & Units Add to 10",
    trick: "For 43 \u00d7 47 (tens are 4, units 3+7=10): Multiply tens by (tens+1): 4\u00d75=20. Multiply units: 3\u00d77=21 \u2192 2,021! Try 72 \u00d7 78 = (7\u00d78)|(2\u00d78) = 5,616!",
    focusTip: "\ud83c\udf1f 3 Full Weeks: A habit takes 21 days to form. Daily math is now officially part of who you are!",
    quote: "Congratulations! You have crossed the 21-day habit threshold."
  },
  {
    day: 22,
    title: "Rapid Division by 25",
    trick: "To divide by 25, multiply by 4 and shift the decimal two places left! E.g., 320 \u00f7 25: 320 \u00d7 4 = 1,280, shift decimal two places \u2192 12.8!",
    focusTip: "\ud83d\udc41\ufe0f Blink & Refresh: Every 10 questions, blink firmly 5 times and look 20 feet away to relax your optic nerves.",
    quote: "Taking care of your eyes preserves your mental sharpness for the long run."
  },
  {
    day: 23,
    title: "Cube Root of Any 2-Digit Perfect Cube in 2 Seconds",
    trick: "Look at the last digit: 1\u00b3\u21921, 4\u00b3\u21924, 5\u00b3\u21925, 6\u00b3\u21926, 9\u00b3\u21929. (2\u21948, 3\u21947 flip). E.g., \u221b54,872: ends in 2 so units digit is 8. For 54: 3\u00b3=27 < 54 < 4\u00b3=64, so tens is 3 \u2192 38!",
    focusTip: "\ud83e\udde9 Pattern Detective: Search for the underlying code in numbers; math is nature's secret language.",
    quote: "When you decode patterns, numbers transform from puzzles into friends."
  },
  {
    day: 24,
    title: "Subtract by Adding Up (Cashier's Method)",
    trick: "To do 100 - 67 mentally: start at 67, add 3 to reach 70, then add 30 to reach 100. Total added = 3 + 30 = 33! Forward addition is always faster than subtraction.",
    focusTip: "\ud83d\udeb6 Brain Circulation: Stand up and do 10 gentle arm swings or stretch before your session to pump oxygenated blood.",
    quote: "Physical vitality fuels intellectual brilliance."
  },
  {
    day: 25,
    title: "Rapid Multiplication by 125",
    trick: "Since 125 = 1,000 \u00f7 8, divide the number by 8 and attach three zeros! E.g., 48 \u00d7 125: 48 \u00f7 8 = 6, attach three zeros \u2192 6,000!",
    focusTip: "Quarter-Century Day: 25 days of unbroken excellence! Your mental calculation speed is skyrocketing.",
    quote: "Excellence is not an act, but a daily habit."
  },
  {
    day: 26,
    title: "The Alternating Divisibility Rule for 11",
    trick: "Sum the digits in odd positions and even positions. If their difference is 0 or a multiple of 11, the number divides by 11! E.g., 9,174: (9+7) - (1+4) = 16 - 5 = 11. Divisible!",
    focusTip: "\ud83d\udcdd Note Your Aha Moments: Keep a tiny notebook beside your bed for mathematical insights and creative ideas.",
    quote: "The mind that writes down its insights retains them for a lifetime."
  },
  {
    day: 27,
    title: "Sum of First N Odd Numbers is N\u00b2",
    trick: "1 = 1\u00b2, 1+3 = 4 = 2\u00b2, 1+3+5 = 9 = 3\u00b2, 1+3+5+7 = 16 = 4\u00b2! Sum of first 20 odd numbers? Simply 20\u00b2 = 400! Zero manual addition needed!",
    focusTip: "\ud83d\udcd0 Geometric Visualization: Picture odd numbers as L-shaped borders wrapping around a square. Beautiful geometry explains arithmetic!",
    quote: "Geometry and algebra are two mirrors reflecting the same eternal truth."
  },
  {
    day: 28,
    title: "Square Numbers in the 40s (Base 50 Deficit)",
    trick: "For 46\u00b2: How far is 46 below 50? Deficit = 4. Subtract deficit from 25: 25 - 4 = 21. Square the deficit: 4\u00b2 = 16 \u2192 2,116! E.g., 47\u00b2 = (25-3)|(3\u00b2) = 2,209!",
    focusTip: "\ud83c\udf89 4 Full Weeks Completed: You have established a world-class standard of daily learning.",
    quote: "One full lunar cycle of consistent mathematics. Your brain is structurally transformed!"
  },
  {
    day: 29,
    title: "Vedic 2x2 Vertical & Crosswise Multiplication",
    trick: "Multiply 23 \u00d7 14 in 1 line: (1) Right vertical: 3\u00d74=12 (write 2, carry 1). (2) Crosswise: (2\u00d74)+(3\u00d71)+1 = 8+3+1=12 (write 2, carry 1). (3) Left vertical: 2\u00d71+1 = 3 \u2192 322!",
    focusTip: "\u26a1 Flow State: When calculation rhythm kicks in, embrace the flow. Do not hurry; let the mind glide.",
    quote: "Urdhva Tiryagbhyam: the ancient Vedic secret of lightning multiplication."
  },
  {
    day: 30,
    title: "Quick Decimal Multiplication",
    trick: "Ignore decimals completely, multiply the whole numbers, then count the total decimal places in both numbers and place the dot! E.g., 0.04 \u00d7 0.007: 4 \u00d7 7 = 28. Decimal places: 2 + 3 = 5 \u2192 0.00028!",
    focusTip: "30 Days of Mastery: Exactly one month of daily learning completed! You are extraordinary.",
    quote: "A month of consistency can reshape your entire academic confidence."
  },
  {
    day: 31,
    title: "Sum of First N Counting Numbers in 1 Second",
    trick: "To find 1 + 2 + 3 + ... + N, use formula N \u00d7 (N + 1) \u00f7 2! E.g., sum from 1 to 10: 10 \u00d7 11 \u00f7 2 = 55! Sum from 1 to 100: 100 \u00d7 101 \u00f7 2 = 5,050!",
    focusTip: "\ud83d\udc66 Young Gauss Inspiration: 10-year-old Carl Friedrich Gauss discovered this pattern in seconds. Greatness begins in childhood curiosity!",
    quote: "Curiosity is the engine of intellectual growth."
  },
  {
    day: 32,
    title: "Rapid Multiplication by 15",
    trick: "Add half of the number to itself, then multiply by 10! E.g., 44 \u00d7 15: Half of 44 is 22. 44 + 22 = 66. Multiply by 10 \u2192 660!",
    focusTip: "\ud83c\udf75 Calm Mind: Avoid sugary snacks before study; steady glucose keeps your concentration laser sharp.",
    quote: "Fuel your brain with purity and it will reward you with clarity."
  },
  {
    day: 33,
    title: "Mental Fraction to Decimal Benchmarks (The Eighths)",
    trick: "Memorize the eighths: 1/8 = 0.125, 2/8 = 0.25, 3/8 = 0.375, 4/8 = 0.5, 5/8 = 0.625, 6/8 = 0.75, 7/8 = 0.875! Instant conversions forever!",
    focusTip: "\ud83d\uddc2\ufe0f Mental Filing Cabinet: Categorize numbers into familiar families so you never have to recalculate from scratch.",
    quote: "Smart mathematicians don't recalculate what they already know; they build upon foundations."
  },
  {
    day: 34,
    title: "Square of Any 2-Digit Number via (a+b)\u00b2",
    trick: "For 32\u00b2: Break into 30 and 2. 30\u00b2 = 900. 2 \u00d7 30 \u00d7 2 = 120. 2\u00b2 = 4. 900 + 120 + 4 = 1,024! Mental algebra makes squaring effortless.",
    focusTip: "\ud83d\udd4a\ufe0f Release Tension: If your forehead feels tight during hard questions, consciously relax your eyebrows.",
    quote: "Relaxation and concentration are two wings of the same flying bird."
  },
  {
    day: 35,
    title: "Instant GCD via Euclidean Subtraction",
    trick: "To find GCD of two numbers, their GCD must also divide their difference! E.g., GCD(56, 42): 56 - 42 = 14. Does 14 divide both 42 and 56? Yes! So GCD is 14!",
    focusTip: "5 Weeks of Focus: You have answered 700 questions with precision and grit.",
    quote: "The greatest joy of study is watching difficult concepts become second nature."
  },
  {
    day: 36,
    title: "Lightning LCM: The Leader Multiplier",
    trick: "To find LCM of 6, 8, 12: Take the largest number 12. Check multiples of 12: 12 (not div by 8), 24 (divisible by 6 and 8!). LCM = 24 in 3 seconds!",
    focusTip: "\ud83c\udfaf High-Yield Efficiency: Always test multiples of the biggest number first. It saves 80% of calculation time.",
    quote: "Efficiency is doing things right; wisdom is doing the right things quickly."
  },
  {
    day: 37,
    title: "Difference of Two Squares (a\u00b2 - b\u00b2 = (a-b)(a+b))",
    trick: "Calculate 53\u00b2 - 47\u00b2 without squaring! (53 - 47) \u00d7 (53 + 47) = 6 \u00d7 100 = 600! Calculate 65\u00b2 - 35\u00b2 = (30) \u00d7 (100) = 3,000!",
    focusTip: "\ud83d\udc41\ufe0f See the Structure: Don't compute blindly; inspect whether the problem matches a famous identity.",
    quote: "Algebra is the art of turning complicated arithmetic into child's play."
  },
  {
    day: 38,
    title: "Area of a Triangle Mentally (Half-Base Trick)",
    trick: "Area = \u00bd \u00d7 base \u00d7 height. If either base or height is even, cut it in half FIRST before multiplying! E.g., base=16, height=13: cut 16 to 8, 8 \u00d7 13 = 104!",
    focusTip: "\ud83d\udd04 Pre-Reduction: Always simplify or divide before you multiply to keep numbers small and manageable.",
    quote: "Keep your numbers small and your errors will remain zero."
  },
  {
    day: 39,
    title: "Multiply by 5 Mentally (Ten-and-Half Rule)",
    trick: "To multiply any number by 5: append a zero (multiply by 10) and take half! E.g., 428 \u00d7 5: 4,280 \u00f7 2 = 2,140! Try 76 \u00d7 5: 760 \u00f7 2 = 380!",
    focusTip: "\ud83e\udde0 Two Brain Hemispheres: Clench and release your left hand 5 times to stimulate your right creative hemisphere.",
    quote: "Creativity and logic working together create mathematical genius."
  },
  {
    day: 40,
    title: "The Secret Divisibility Rule for 7",
    trick: "Double the last digit and subtract it from the rest of the number. If result divides by 7, the whole number does! E.g., 343: double 3 = 6. 34 - 6 = 28. 28 divides by 7, so 343 does!",
    focusTip: "40-Day Power: You are now 40% through the 100-day journey! The summit is getting closer.",
    quote: "Every peak is conquered step by single step. Keep climbing!"
  },
  {
    day: 41,
    title: "Rapid 20% Calculation",
    trick: "To find 20% of any value, divide it by 5! (Or find 10% by shifting decimal and double it). E.g., 20% of $350: 350 \u00f7 5 = $70!",
    focusTip: "\u23f1\ufe0f Pacing Awareness: Keep a steady cadence of about 30-40 seconds per question. Never rush, never stall.",
    quote: "Rhythm and calm momentum conquer the hardest exams."
  },
  {
    day: 42,
    title: "Diagonal of a Rectangle via Pythagorean Triples",
    trick: "Memorize the core triples: (3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25). If a rectangle is 9 by 12 (3\u00d73, 4\u00d73), diagonal is immediately 5\u00d73 = 15!",
    focusTip: "6 Full Weeks: 42 days of consistent problem solving! Your mathematical intuition is razor-sharp.",
    quote: "When you know the fundamental triples, geometry problems solve themselves."
  },
  {
    day: 43,
    title: "Multiply Numbers: One Above and One Below 100",
    trick: "Calculate 104 \u00d7 97: 104 is +4, 97 is -3. Left: 104 - 3 = 101 hundred = 10,100. Right: (+4) \u00d7 (-3) = -12. 10,100 - 12 = 10,088!",
    focusTip: "\ud83d\udee1\ufe0f The Verification Reflex: Always check if the final digit makes sense: 4 \u00d7 7 ends in 8. 10,088 ends in 8!",
    quote: "Checking your work is the mark of a true professional."
  },
  {
    day: 44,
    title: "The Powers of 2 Binary Ladder",
    trick: "Know the ladder: 2, 4, 8, 16, 32, 64, 128, 256, 512, 1,024! To multiply by 16, simply double four times: 25 \u2192 50 \u2192 100 \u2192 200 \u2192 400!",
    focusTip: "\ud83d\udcbb Computer Science Connection: Computers count in powers of 2. Mastering this connects you to modern coding!",
    quote: "Mathematics is the software running the modern universe."
  },
  {
    day: 45,
    title: "Sum of Interior Angles of Any Polygon: (n - 2) \u00d7 180\u00b0",
    trick: "Subtract 2 from the number of sides, multiply by 180\u00b0! E.g., Pentagon (5 sides): (5-2)\u00d7180\u00b0 = 3\u00d7180\u00b0 = 540\u00b0. Hexagon (6 sides): 4\u00d7180\u00b0 = 720\u00b0!",
    focusTip: "\ud83c\udfa8 Sketch to Solve: A quick 2-second thumbnail sketch clears up confusion faster than re-reading paragraphs.",
    quote: "A single drawing is worth a thousand equations."
  },
  {
    day: 46,
    title: "Rapid Mental Estimation (1 Significant Figure)",
    trick: "Before calculating 489 \u00d7 31, estimate: 500 \u00d7 30 = 15,000. If your options are 1,515, 15,159, or 151,590, you know instantly it's 15,159 without working it all out!",
    focusTip: "\ud83d\udd2d The Satellite View: Zoom out and estimate first before zooming into the microscopic arithmetic.",
    quote: "Estimation is the steering wheel of mental arithmetic."
  },
  {
    day: 47,
    title: "Fast Tip and Tax Estimation",
    trick: "Need 18% tax or tip on $60? 10% is $6. 20% is $12. 2% is $1.20. 18% = 20% - 2% = $12 - $1.20 = $10.80!",
    focusTip: "\ud83d\uded2 Real-World Connection: Practice calculating discounts and taxes every time you visit the grocery store with family.",
    quote: "Every shopping receipt is a free gym workout for your brain."
  },
  {
    day: 48,
    title: "Multiply by 9, 99, 999 with Vedic Deficit Subtraction",
    trick: "For 34 \u00d7 9: 34 \u00d7 (10 - 1) = 340 - 34 = 306. For 52 \u00d7 99: 52 \u00d7 (100 - 1) = 5,200 - 52 = 5,148! Effortless speed!",
    focusTip: "\ud83d\udee1\ufe0f Emotion Shield: If you miss a question today, smile and say: 'Thank you, question! You just showed me where I can improve.'",
    quote: "A growth mindset turns every slip into new wisdom."
  },
  {
    day: 49,
    title: "Speed, Distance, Time Triangle Shortcut",
    trick: "Remember the triangle: Distance at top, Speed & Time at bottom! D = S \u00d7 T, S = D \u00f7 T, T = D \u00f7 S. Cover what you need with your thumb to see the formula!",
    focusTip: "7 Full Weeks: 49 days! Tomorrow is the halfway milestone of the 100-day program.",
    quote: "Seven weeks of unbroken dedication! You have developed iron discipline."
  },
  {
    day: 50,
    title: "THE 50-DAY HALFWAY SUMMIT: Golden Ratio Splitting",
    trick: "To divide $200 in ratio 2:3: Total parts = 5. Value of 1 part = 200 \u00f7 5 = 40. Shares: 2\u00d740 = $80 and 3\u00d740 = $120. Total parts is the secret key!",
    focusTip: "\ud83c\udf89 50 DAYS COMPLETED: Exactly 1,000 questions solved! Stand tall and take pride in your extraordinary achievement.",
    quote: "You are now at the mountain peak! The second half is the glorious downhill run to mastery."
  },
  {
    day: 51,
    title: "Circumference & Area of Circles without Decimals (\u03c0 \u2248 22/7)",
    trick: "If radius is a multiple of 7 (e.g., r = 14): Circumference = 2 \u00d7 (22/7) \u00d7 14 = 2 \u00d7 22 \u00d7 2 = 88! Area = (22/7) \u00d7 14 \u00d7 14 = 22 \u00d7 2 \u00d7 14 = 616! Clean whole numbers!",
    focusTip: "\ud83d\udd04 Factor First: Always cancel denominator 7 with the radius before multiplying numerator terms.",
    quote: "Simplicity is the ultimate sophistication in mathematics."
  },
  {
    day: 52,
    title: "Multiply Any 3-Digit Number by 111",
    trick: "For 243 \u00d7 111: (1) First digit: 2. (2) Sum first two: 2+4=6. (3) Sum all three: 2+4+3=9. (4) Sum last two: 4+3=7. (5) Last digit: 3 \u2192 26,973!",
    focusTip: "\ud83c\udfb5 Number Music: Listen to the rolling rhythm of sliding window additions: 2, 6, 9, 7, 3!",
    quote: "When numbers flow in rhythm, calculation feels like playing a musical instrument."
  },
  {
    day: 53,
    title: "Solve Linear Equation ax + b = c in 1 Step Mentally",
    trick: "For 4x + 9 = 37: Don't write 3 lines. Think: x = (37 - 9) \u00f7 4 = 28 \u00f7 4 = 7! 'Subtract the constant, divide by the coefficient.'",
    focusTip: "\ud83d\ude80 Mental Compression: Compress multi-line algebra into a single mental breath.",
    quote: "Great algebraists see the destination before they take the first step."
  },
  {
    day: 54,
    title: "Prime Number Test Under 100 in 3 Seconds",
    trick: "To test if any number under 100 is prime, only test divisibility by 2, 3, 5, and 7! If none of these divide it, it is guaranteed prime! E.g., 91: 91 \u00f7 7 = 13 (not prime). 89: not div by 2,3,5,7 \u2192 89 is Prime!",
    focusTip: "\ud83d\udc8e Prime Diamonds: Primes are the atomic elements of arithmetic; respect their unique beauty.",
    quote: "Prime numbers are the building blocks from which all integers are constructed."
  },
  {
    day: 55,
    title: "Convert km/h to m/s in One Flash (Multiply by 5/18)",
    trick: "Since 1 km = 1,000m and 1 hr = 3,600s, 1,000/3,600 = 5/18! E.g., 72 km/h: 72 \u00d7 (5/18) = 4 \u00d7 5 = 20 m/s! E.g., 90 km/h: 90 \u00d7 (5/18) = 5 \u00d7 5 = 25 m/s!",
    focusTip: "\u26a1 Instant Physics: 5/18 is the magic key for speed conversion in all science competitions.",
    quote: "When math meets science, understanding turns into real-world power."
  },
  {
    day: 56,
    title: "Convert m/s to km/h in One Flash (Multiply by 18/5)",
    trick: "To reverse it, multiply m/s by 18/5! E.g., a sprinter runs at 10 m/s: 10 \u00d7 (18/5) = 2 \u00d7 18 = 36 km/h! E.g., 15 m/s: 15 \u00d7 (18/5) = 3 \u00d7 18 = 54 km/h!",
    focusTip: "8 Full Weeks: 56 days of dedication! You are performing in the top 1% of math students.",
    quote: "Two complete months of excellence. Your transformation is undeniable."
  },
  {
    day: 57,
    title: "Rapid Metric Step Ladder (King Henry Died By Drinking Chocolate Milk)",
    trick: "Kilo, Hecto, Deka, Base (m/g/L), Deci, Centi, Milli. Each step down: multiply by 10 (shift dot right). Each step up: divide by 10 (shift dot left)! E.g., 4.5 km to cm: 5 steps down = 450,000 cm!",
    focusTip: "\ud83e\ude9c Visual Steps: Mentally hop along the staircase; never memorize separate conversion factors again.",
    quote: "Systematic mnemonics free up working memory for creative problem solving."
  },
  {
    day: 58,
    title: "Estimate Non-Perfect Square Roots Mentally",
    trick: "Formula: \u221aN \u2248 \u221aA + (N - A) / (2\u221aA), where A is nearest perfect square. E.g., \u221a27: nearest square is 25. \u221a27 \u2248 5 + (27 - 25)/(2\u00d75) = 5 + 2/10 = 5.2! (True is 5.196!).",
    focusTip: "\ud83c\udfaf High Precision: This ancient formula gives 99.8% accurate square roots in seconds.",
    quote: "A good approximation in 3 seconds is worth more than perfection in 10 minutes."
  },
  {
    day: 59,
    title: "Venn Diagram Overlap Formula: n(A \u222a B) = n(A) + n(B) - n(A \u2229 B)",
    trick: "Class of 30: 18 play soccer, 15 play basketball. How many play both? Total = Soccer + Basketball - Both \u2192 30 = 18 + 15 - Both \u2192 Both = 33 - 30 = 3! Instant!",
    focusTip: "\u2b55 Visual Circles: Always draw two overlapping loops; write the center intersection first.",
    quote: "Set theory is the logical foundation of computer algorithms and data science."
  },
  {
    day: 60,
    title: "Complementary (90\u00b0) & Supplementary (180\u00b0) Angles",
    trick: "Complementary starts with C (Corner = 90\u00b0). Supplementary starts with S (Straight line = 180\u00b0). Complement of 37\u00b0: 90 - 37 = 53\u00b0. Supplement of 37\u00b0: 180 - 37 = 143\u00b0!",
    focusTip: "60-Day Milestone: 1,200 questions conquered! You have built true mathematical grit.",
    quote: "Grit is the passionate perseverance toward long-term goals."
  },
  {
    day: 61,
    title: "Fast Exponent Rules for Combining Powers",
    trick: "Same base: Multiply \u2192 ADD powers (x\u00b3 \u00b7 x\u2074 = x\u2077). Divide \u2192 SUBTRACT powers (x\u2078 / x\u00b3 = x\u2075). Power of power \u2192 MULTIPLY powers ((x\u00b2)\u00b3 = x\u2076). Keep it intuitive!",
    focusTip: "\ud83d\udd0b Power Thinking: Exponents are just repeated multiplication; keep the fundamental definition in mind.",
    quote: "Master the rules so you can use them like second nature."
  },
  {
    day: 62,
    title: "Zero Factor Property in Quadratic Equations",
    trick: "If (x - 4)(x + 7) = 0, then either x - 4 = 0 OR x + 7 = 0. Therefore x = 4 or x = -7! Simply flip the signs of the constants inside the brackets!",
    focusTip: "\u26a1 Sign Flip Reflex: Train your eye to read roots straight out of factored forms without intermediate writing.",
    quote: "In mathematics, zero is not emptiness: it is the most powerful pivot in algebra."
  },
  {
    day: 63,
    title: "Multiply Consecutive Integers Mentally: N \u00d7 (N + 1) = N\u00b2 + N",
    trick: "To calculate 15 \u00d7 16: simply square 15 (=225) and add 15 \u2192 240! To calculate 25 \u00d7 26: 25\u00b2 = 625, plus 25 = 650! Instant calculation!",
    focusTip: "9 Full Weeks: 63 days completed! You have developed instinctive arithmetic reflexes.",
    quote: "When basic calculations become automatic, your brain has full power for creative problem solving."
  },
  {
    day: 64,
    title: "The Golden Probability Rule",
    trick: "Probability = Favorable Outcomes \u00f7 Total Possible Outcomes. E.g., rolling a prime on a 6-sided die: primes are 2, 3, 5 (3 outcomes). P = 3/6 = 1/2 = 50%!",
    focusTip: "\ud83c\udfb2 Real Life Probability: Assess risks and chances with numbers, not with fear or wishful thinking.",
    quote: "Probability is the mathematical tool that transforms uncertainty into clarity."
  },
  {
    day: 65,
    title: "The Handshake Formula for N People",
    trick: "If 10 people in a room shake hands with everyone once, how many handshakes? Formula: N \u00d7 (N - 1) \u00f7 2! E.g., 10 \u00d7 9 \u00f7 2 = 45 handshakes! E.g., 8 teams: 8 \u00d7 7 \u00f7 2 = 28 games!",
    focusTip: "\ud83e\udd1d Combinatorics Insight: Each person shakes hands with N-1 others, but divide by 2 because A shaking B is same as B shaking A!",
    quote: "Counting without enumerating every pair is the magic of combinatorics."
  },
  {
    day: 66,
    title: "Simple Interest in Seconds (I = P \u00d7 R \u00d7 T \u00f7 100)",
    trick: "To find interest on $4,000 at 5% for 3 years: First cancel the two zeros of 4,000 with 100 (= 40). Now multiply: 40 \u00d7 5 \u00d7 3 = 200 \u00d7 3 = $600! Instant!",
    focusTip: "\ud83d\udcb0 Financial Literacy: Understanding interest puts you ahead in understanding how money and banks work.",
    quote: "Mathematics is the language of financial freedom."
  },
  {
    day: 67,
    title: "The Rule of 72 for Doubling Investments",
    trick: "To find how many years it takes for an investment to double with compound interest: divide 72 by the interest rate! At 6%: 72 \u00f7 6 = 12 years. At 8%: 72 \u00f7 8 = 9 years!",
    focusTip: "\ud83d\udcc8 The Power of Compounding: Albert Einstein called compound interest the 8th wonder of the world. Start early!",
    quote: "Small daily habits compound into monumental lifetime achievements."
  },
  {
    day: 68,
    title: "Multiply 3-Digit Numbers Close to 1,000",
    trick: "Calculate 1,006 \u00d7 1,008: 1,006 is +6, 1,008 is +8. Left part = 1,006 + 8 = 1,014. Right part = 6 \u00d7 8 = 48 (write as 3 digits: 048) \u2192 1,014,048!",
    focusTip: "\ud83c\udf1f Base 1,000 Power: Vedic math expands seamlessly to thousands, millions, and beyond.",
    quote: "The rules that govern tiny numbers govern astronomical numbers just as gracefully."
  },
  {
    day: 69,
    title: "Instant Divisibility Rule for 12",
    trick: "A number divides by 12 if and only if it divides by BOTH 3 and 4! E.g., 1,548: sum of digits = 1+5+4+8 = 18 (divisible by 3). Last 2 digits = 48 (divisible by 4). Therefore 1,548 is divisible by 12!",
    focusTip: "\ud83d\udd0d Coprime Factoring: Break large divisors into coprime factors to test them instantly.",
    quote: "Deconstruct large challenges into small tests that you already know how to pass."
  },
  {
    day: 70,
    title: "Area of a Trapezoid in Your Head",
    trick: "Formula: Average of parallel sides \u00d7 height! E.g., parallel sides 11 and 19, height 6: Average of 11 and 19 is (11+19)/2 = 15. Area = 15 \u00d7 6 = 90!",
    focusTip: "\ud83c\udf89 70 DAYS COMPLETED: 10 full weeks of unbroken practice! 1,400 questions conquered.",
    quote: "Seventy days of relentless commitment has forged an unbreakable academic confidence."
  },
  {
    day: 71,
    title: "Slope of a Line in 2 Seconds (Rise over Run)",
    trick: "Slope m = (y\u2082 - y\u2081) / (x\u2082 - x\u2081). Think: 'Change in Y over Change in X'. E.g., from (2, 3) to (5, 9): Y goes up by 6, X goes up by 3. Slope = 6 \u00f7 3 = 2!",
    focusTip: "\ud83d\udcc8 Steepness Visualization: A positive slope goes uphill like climbing stairs; a negative slope goes downhill.",
    quote: "Coordinate geometry connects visual pictures directly with algebraic formulas."
  },
  {
    day: 72,
    title: "Work-Rate Formula for Two People Working Together",
    trick: "If Sara can paint a room in 3 hours and Aarav in 6 hours: Time together = (A \u00d7 B) / (A + B) = (3 \u00d7 6) / (3 + 6) = 18 / 9 = 2 hours! Instant answer!",
    focusTip: "\ud83e\udd1d Synergy Principle: Two working together finish faster than either alone. Product divided by Sum is the golden formula.",
    quote: "Teamwork divides the effort and multiplies the effect."
  },
  {
    day: 73,
    title: "Multiply Any 2-Digit Number by 101",
    trick: "Simply write the 2-digit number twice side-by-side! E.g., 47 \u00d7 101 = 4,747! 83 \u00d7 101 = 8,383! 29 \u00d7 101 = 2,929! Instant magic!",
    focusTip: "\u2728 The Magic Mirror: 101 acts like a cloning mirror for two-digit numbers.",
    quote: "Mathematics is full of delightful surprises when you know where to look."
  },
  {
    day: 74,
    title: "Pythagorean Theorem Reverse Check: Is a Triangle Right-Angled?",
    trick: "Square all three sides: if a\u00b2 + b\u00b2 = c\u00b2, it's a right triangle! If a\u00b2 + b\u00b2 > c\u00b2, it's acute! If a\u00b2 + b\u00b2 < c\u00b2, it's obtuse! E.g., sides 6, 8, 10: 36 + 64 = 100 = 10\u00b2 \u2192 Right-angled!",
    focusTip: "\ud83d\udcd0 The 3-Way Classifier: In 5 seconds you can classify any triangle's character using just squares.",
    quote: "Geometry gives you the power to see the nature of space itself."
  },
  {
    day: 75,
    title: "Volume of a Cylinder Mentally (Base Area \u00d7 Height)",
    trick: "Think of a stack of circular coins: Volume = \u03c0 \u00d7 r\u00b2 \u00d7 h. Compute base area first: if r = 7 and h = 10: Area = (22/7) \u00d7 7 \u00d7 7 = 154. Volume = 154 \u00d7 10 = 1,540!",
    focusTip: "\ud83e\ude99 3D Stacking: Every prism or cylinder is simply the base shape extruded or stacked upward.",
    quote: "Transform 3D spatial thinking into simple 2D multiplications."
  },
  {
    day: 76,
    title: "Rapid Negative Number Multiplication Sign Rule",
    trick: "Count the minus signs! If the count of negative signs is ODD, the final answer is NEGATIVE (-). If the count of negative signs is EVEN, the answer is POSITIVE (+)! E.g., (-2) \u00d7 (-3) \u00d7 (-4) has 3 negatives \u2192 -24!",
    focusTip: "\ud83d\udd22 Parity Check: Check sign first, then compute magnitudes. Never mix sign tracking with arithmetic.",
    quote: "Decouple the sign from the number to eliminate calculation slips."
  },
  {
    day: 77,
    title: "Rapid Multiplication by 19",
    trick: "Multiply by 20 and subtract the number itself! E.g., 34 \u00d7 19: 34 \u00d7 20 = 680. 680 - 34 = 646! Try 15 \u00d7 19 = 300 - 15 = 285!",
    focusTip: "11 Full Weeks: 77 days completed! The finish line is on the horizon.",
    quote: "You are within 23 days of finishing the full 100-day program. Keep the fire burning!"
  },
  {
    day: 78,
    title: "Lightning Factoring of x\u00b2 + Bx + C",
    trick: "To factor x\u00b2 + 7x + 12: find two numbers that MULTIPLY to 12 and ADD to 7. Numbers are 3 and 4! Factors are (x + 3)(x + 4) instantly!",
    focusTip: "\ud83e\udde9 Product-Sum Pairs: List factors of C in your mind and test their sum; it takes under 5 seconds.",
    quote: "Algebraic factoring is like cracking a fun numeric combination lock."
  },
  {
    day: 79,
    title: "Square of Numbers Ending in 1 Mentally",
    trick: "Use identity (N+1)\u00b2 = N\u00b2 + 2N + 1. E.g., 31\u00b2: 30\u00b2 = 900. Add 2\u00d730 = 60, add 1 \u2192 961! Try 51\u00b2: 50\u00b2 = 2,500 + 100 + 1 = 2,601!",
    focusTip: "\ud83c\udfaf Neighbor Squaring: Step from the known round ten to the next integer in one mental jump.",
    quote: "Anchor yourself to familiar round numbers and leap from there."
  },
  {
    day: 80,
    title: "Square of Numbers Ending in 9 Mentally",
    trick: "Use identity (N-1)\u00b2 = N\u00b2 - 2N + 1. E.g., 29\u00b2: 30\u00b2 = 900. Subtract 2\u00d730 = 60, add 1 \u2192 900 - 60 + 1 = 841! Try 49\u00b2: 2,500 - 100 + 1 = 2,401!",
    focusTip: "80 DAYS COMPLETED: 1,600 questions conquered! You are now in the elite mastery tier.",
    quote: "Eighty days of excellence. Your perseverance is inspiring everyone around you."
  },
  {
    day: 81,
    title: "Rapid Division by 9 with Vedic Remainders",
    trick: "To divide 123 by 9: (1) First digit is 1. (2) Next: 1 + 2 = 3. Quotient = 13! (3) Remainder = sum of all digits: 1 + 2 + 3 = 6 \u2192 Quotient 13, Remainder 6!",
    focusTip: "\u26a1 Digit Sum Division: Vedic math lets you read division answers straight across the digits without long division.",
    quote: "Ancient Vedic scholars created the most elegant mental algorithms in human history."
  },
  {
    day: 82,
    title: "Rapid Temperature Conversion (\u00b0C to \u00b0F)",
    trick: "To convert \u00b0C to \u00b0F mentally: Double the Celsius temperature, subtract 10%, and add 32! E.g., 20\u00b0C: double is 40. Minus 10% (4) = 36. Plus 32 = 68\u00b0F! Exact!",
    focusTip: "\ud83c\udf21\ufe0f Global Traveler Tool: Use this anytime you travel between countries with metric and imperial units.",
    quote: "Practical math makes you a versatile citizen of the world."
  },
  {
    day: 83,
    title: "Exterior Angle Theorem for Any Triangle",
    trick: "The exterior angle of a triangle is always EQUAL to the sum of the two opposite interior angles! If interior angles are 45\u00b0 and 65\u00b0, exterior angle is simply 45\u00b0 + 65\u00b0 = 110\u00b0!",
    focusTip: "\ud83d\udcd0 Instant Triangle Angles: Skip the 180\u00b0 intermediate step; jump directly to the answer.",
    quote: "The shortest path between a problem and its answer is a clear geometric theorem."
  },
  {
    day: 84,
    title: "Rapid Mental Mean via Deviation from Baseline",
    trick: "Find average of 88, 92, 95, 89, 96: Pick baseline 90. Deviations: -2, +2, +5, -1, +6. Sum of deviations = 10. Divide by 5 = +2. Average = 90 + 2 = 92!",
    focusTip: "12 Full Weeks: 84 days! You are just 16 days away from grand completion.",
    quote: "Working with small deviations instead of huge totals is the secret of expert statisticians."
  },
  {
    day: 85,
    title: "Multiply Numbers Close to Base 200",
    trick: "Calculate 198 \u00d7 197: Deficits from 200 are -2 and -3. Left: (198 - 3) \u00d7 2 = 195 \u00d7 2 = 390. Right: (-2) \u00d7 (-3) = 06 \u2192 39,006! Instant speed!",
    focusTip: "\ud83d\ude80 Sub-Base Scaling: Multiply by the base ratio (2 for base 200, 3 for base 300) to master any base.",
    quote: "When you understand the general principle, you can conquer any number base."
  },
  {
    day: 86,
    title: "Rapid Multiplication by 21",
    trick: "Multiply by 20 and add the number itself! E.g., 34 \u00d7 21: 34 \u00d7 20 = 680. Plus 34 = 714! Try 45 \u00d7 21 = 900 + 45 = 945!",
    focusTip: "\ud83d\udd22 Near-Multiplier Symmetry: 19 was (\u00d720 - N); 21 is (\u00d720 + N). Notice the symmetrical beauty!",
    quote: "Symmetry is nature's favorite pattern, and mathematics is full of it."
  },
  {
    day: 87,
    title: "Total Number of Factors of Any Integer in 10 Seconds",
    trick: "Find prime factorization: 72 = 2\u00b3 \u00d7 3\u00b2. Add 1 to each exponent and multiply them: (3 + 1) \u00d7 (2 + 1) = 4 \u00d7 3 = 12 factors! Zero guessing or missing factors!",
    focusTip: "\ud83d\udd2c Prime Anatomy: The exponents of prime factors tell the complete story of all divisors.",
    quote: "Look into the prime DNA of a number to reveal all its secrets."
  },
  {
    day: 88,
    title: "Rapid Distance Between Two Points: (\u0394x, \u0394y) Triple Check",
    trick: "Points (1, 2) and (4, 6): \u0394x = 3, \u0394y = 4. Notice the 3-4-5 Pythagorean triple! Distance is immediately 5 without calculating square roots!",
    focusTip: "\ud83c\udfaf \u0394-Triangle Insight: Treat coordinate distance as the hypotenuse of a right triangle with legs \u0394x and \u0394y.",
    quote: "Great mathematicians always look for familiar right triangles in the coordinate plane."
  },
  {
    day: 89,
    title: "Cube of Any Single-Digit Number from Memory",
    trick: "Lock in the cubes: 1\u00b3=1, 2\u00b3=8, 3\u00b3=27, 4\u00b3=64, 5\u00b3=125, 6\u00b3=216, 7\u00b3=343, 8\u00b3=512, 9\u00b3=729, 10\u00b3=1,000! These 10 numbers unlock all 3D volume problems.",
    focusTip: "\ud83e\uddf1 Solid Foundations: A solid mental library of cubes makes high school algebra effortless.",
    quote: "Invest time in memorizing fundamental anchors and your mental calculation will soar."
  },
  {
    day: 90,
    title: "Finding Median Instantly (Odd vs Even Data Sets)",
    trick: "For N numbers in order: If N is odd, median is exactly the ((N+1)/2)th term. If N is even, average the two middle terms! E.g., for 10 terms: average 5th and 6th terms!",
    focusTip: "\ud83c\udf89 90 DAYS COMPLETED: 90% of the journey done! 1,800 questions conquered. You are in the final lap!",
    quote: "Ten days remain between you and the finish line of the 100-day program. Finish like a champion!"
  },
  {
    day: 91,
    title: "Rapid Division by 4 (The Double Half)",
    trick: "To divide any number by 4, cut it in half TWICE! E.g., 348 \u00f7 4: half of 348 is 174; half of 174 is 87! E.g., 540 \u00f7 4: 270 \u2192 135!",
    focusTip: "13 Full Weeks: 91 days! Just 9 days to the Grand 100-Day Graduation.",
    quote: "Cutting in half twice is 10 times easier for the human brain than direct division by 4."
  },
  {
    day: 92,
    title: "Rapid Division by 8 (The Triple Half)",
    trick: "To divide any number by 8, cut it in half THREE times! E.g., 416 \u00f7 8: Half is 208, half is 104, half is 52! E.g., 720 \u00f7 8: 360 \u2192 180 \u2192 90!",
    focusTip: "\u2702\ufe0f Cascading Halves: Break division by powers of 2 into simple mental bisections.",
    quote: "Complex operations become trivial when broken into consecutive simple steps."
  },
  {
    day: 93,
    title: "Thales' Theorem: Angle in a Semicircle is Always 90\u00b0",
    trick: "Any angle inscribed in a semicircle with the diameter as its base is ALWAYS exactly 90\u00b0! If you see a triangle spanning a circle's diameter, it is guaranteed right-angled!",
    focusTip: "\ud83c\udfdb\ufe0f Ancient Greek Insight: Thales of Miletus sacrificed an ox in celebration when he proved this 2,600 years ago!",
    quote: "Some truths of geometry remain eternally unchanging through millennia."
  },
  {
    day: 94,
    title: "Rapid Multiplication by 98",
    trick: "Multiply by 100 and subtract TWICE the number! E.g., 23 \u00d7 98 = 2,300 - (2 \u00d7 23) = 2,300 - 46 = 2,254! E.g., 45 \u00d7 98 = 4,500 - 90 = 4,410!",
    focusTip: "\ud83c\udfaf Near-Hundred Precision: Base 100 deficit tricks give you superhero calculation speed.",
    quote: "Confidence in math comes from having an arsenal of diverse tools ready in your mind."
  },
  {
    day: 95,
    title: "Collinear Points Test in 10 Seconds",
    trick: "Three points A, B, C lie on a single straight line if and only if Slope(AB) = Slope(BC)! Compare (y\u2082-y\u2081)/(x\u2082-x\u2081) for both pairs: if equal, they are collinear!",
    focusTip: "5 Days to 100: You are on Day 95! Feel the surge of pride in your daily commitment.",
    quote: "You are five days away from joining the rare club of 100-Day Math Achievers!"
  },
  {
    day: 96,
    title: "Surface Area of Cube vs Sphere Insight",
    trick: "A cube of side 's' has surface area 6s\u00b2. A sphere has 4\u03c0r\u00b2. For a sphere inside a cube of side 2r: ratio of Sphere Area to Cube Area is 4\u03c0r\u00b2 / 24r\u00b2 = \u03c0/6 \u2248 52.4%!",
    focusTip: "\ud83c\udf10 Space Efficiency: Spheres hold the maximum volume with the minimum surface area in nature.",
    quote: "Nature always solves optimization problems using the principles of mathematics."
  },
  {
    day: 97,
    title: "The Pigeonhole Principle for Clever Logic Puzzles",
    trick: "If you have N+1 items to put into N boxes, at least one box MUST contain 2 or more items! E.g., In any group of 13 people, at least two MUST share the same birth month!",
    focusTip: "\ud83d\udd4a\ufe0f Logic Power: The Pigeonhole Principle solves complex Olympiad puzzles with zero calculation.",
    quote: "Pure logical reasoning is just as powerful as numerical computation."
  },
  {
    day: 98,
    title: "Telescoping Series Trick (1/(1\u00d72) + 1/(2\u00d73) + ...)",
    trick: "Notice that 1/(n(n+1)) = 1/n - 1/(n+1)! When you add them, all middle terms cancel out! Sum to n terms = 1 - 1/(n+1) = n/(n+1)! E.g., 1/(1\u00d72) + 1/(2\u00d73) + ... + 1/(9\u00d710) = 9/10!",
    focusTip: "\ud83d\udd2d Telescoping Wonder: Watch giant equations collapse into a single tiny fraction.",
    quote: "Two days to graduation! You have mastered patterns that high schoolers struggle with."
  },
  {
    day: 99,
    title: "Working Backwards (Backtracking) Strategy for Tough Puzzles",
    trick: "When a problem gives you the final result after a series of operations, work BACKWARDS reversing every operation! If 'Sara doubled a number, added 7, and got 25': reverse it: (25 - 7) \u00f7 2 = 18 \u00f7 2 = 9!",
    focusTip: "\u23f3 Eve of Graduation: 99 days completed! Tomorrow is your 100th and final milestone.",
    quote: "Tomorrow you complete the 100-Day Program. You have proven that consistency creates mastery."
  },
  {
    day: 100,
    title: "DAY 100 CENTURY GRANDMASTER: Avinash Sir's Golden Synthesis",
    trick: "You have conquered all 100 days and 2,000 questions! The Grandmaster secret is simple: (1) Always scan for patterns before calculating. (2) Keep numbers small using factoring and simplification. (3) Stay calm with deep breath. (4) Never stop being curious. You now possess a permanent mental math superpower!",
    focusTip: "\ud83c\udfc6 CENTURY GRANDMASTER: 100 DAYS OF GLORY! You are an inspiration. Wear your knowledge with humility and joy.",
    quote: "Congratulations, my dear student! You have completed the 100-Day Upgrade Math Journey. You are officially a Math Master!"
  },
];

/**
 * Retrieves the unique wisdom and trick for a given day (1 to 100).
 * Each day 1-100 returns a 100% unique trick, focus tip, and quote from Avinash Sir.
 */
function getDailyWisdom(day) {
  const dayNum = Math.max(1, Math.min(100, parseInt(day, 10) || 1));
  const base = VEDIC_TRICKS_AND_WISDOM[dayNum - 1] || VEDIC_TRICKS_AND_WISDOM[0];
  return {
    day: dayNum,
    title: `Day ${dayNum}: ${base.title}`,
    trick: base.trick,
    focusTip: base.focusTip,
    quote: `Avinash Sir says: "${base.quote}"`
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VEDIC_TRICKS_AND_WISDOM, getDailyWisdom };
}
