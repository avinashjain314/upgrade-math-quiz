/**
 * Junior Math Question Generators (Grade 1 to 4)
 * Topics:
 * - Addition, Subtraction, Multiplication, Division
 * - Word problems / Story sums
 * - Fractions, Decimals, Comparing decimals
 * - Tally marks, Roman numbers
 * - Measurement (Length, Mass, Capacity with International Metric units)
 * - Time & Calendar
 * - Shapes & Geometry (2D and 3D)
 * - Data Handling
 * - Money (Currency & Cents)
 * 
 * Upgrade Math Quiz by Avinash Sir
 */

const JuniorMath = {
  // Helper to pick random element
  pick(arr, rng) {
    return arr[Math.floor(rng() * arr.length)];
  },

  // Helper to create 4 unique multiple choice options
  makeOptions(correctVal, distractorOffsets, rng, formatter = (v) => String(v)) {
    const set = new Set();
    const correctStr = formatter(correctVal);
    set.add(correctStr);

    if (Array.isArray(distractorOffsets)) {
      for (const offset of distractorOffsets) {
        if (set.size >= 4) break;
        const candidateVal = correctVal + offset;
        if (candidateVal !== correctVal) {
          const formatted = formatter(candidateVal);
          if (formatted && formatted !== correctStr) {
            set.add(formatted);
          }
        }
      }
    }

    // Safe fallbacks capped at 50 iterations
    let step = 1;
    let safety = 0;
    while (set.size < 4 && safety < 50) {
      safety++;
      const altPlus = formatter(correctVal + step);
      const altMinus = formatter(correctVal - step);
      if (altPlus && !set.has(altPlus)) set.add(altPlus);
      if (set.size < 4 && altMinus && !set.has(altMinus)) set.add(altMinus);
      step++;
    }

    // Absolute guarantee: if still < 4, generate distinct options
    let fallbackId = 1;
    while (set.size < 4) {
      set.add(`${correctStr} (${fallbackId++})`);
    }

    const options = Array.from(set).sort(() => rng() - 0.5);
    const correctIndex = options.indexOf(correctStr);
    return { options, correctIndex, correctAnswer: correctStr };
  },

  // 1. ADDITION
  genAddition(day, diff, rng) {
    let a, b;
    if (diff === 'easy') {
      a = Math.floor(rng() * 40) + 10;
      b = Math.floor(rng() * 40) + 5;
    } else if (diff === 'medium') {
      a = Math.floor(rng() * 300) + 120;
      b = Math.floor(rng() * 300) + 95;
    } else {
      // Hard: 3-digit with carry or three addends
      a = Math.floor(rng() * 500) + 380;
      b = Math.floor(rng() * 400) + 270;
      const c = Math.floor(rng() * 90) + 15;
      const sum = a + b + c;
      const opts = this.makeOptions(sum, [10, -10, 1, -1, 20], rng);
      return {
        topic: 'Addition',
        difficulty: diff,
        questionText: `Calculate the sum: ${a} + ${b} + ${c} = ?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Add the numbers step-by-step: ${a} + ${b} = ${a + b}. Then ${a + b} + ${c} = ${sum}.`
      };
    }

    const sum = a + b;
    const opts = this.makeOptions(sum, [10, -10, 1, -1, 2], rng);
    return {
      topic: 'Addition',
      difficulty: diff,
      questionText: `What is the value of ${a} + ${b}?`,
      options: opts.options,
      correctIndex: opts.correctIndex,
      correctAnswer: opts.correctAnswer,
      explanation: `${a} + ${b} equals ${sum}.`
    };
  },

  // 2. SUBTRACTION
  genSubtraction(day, diff, rng) {
    let a, b;
    if (diff === 'easy') {
      a = Math.floor(rng() * 50) + 30;
      b = Math.floor(rng() * (a - 10)) + 5;
    } else if (diff === 'medium') {
      a = Math.floor(rng() * 400) + 200;
      b = Math.floor(rng() * (a - 80)) + 50;
    } else {
      // Hard: Subtraction across zeros
      const thousands = [500, 600, 700, 800, 1000];
      a = this.pick(thousands, rng);
      b = Math.floor(rng() * (a - 150)) + 75;
    }

    const diffVal = a - b;
    const opts = this.makeOptions(diffVal, [10, -10, 1, -1, 100], rng);
    return {
      topic: 'Subtraction',
      difficulty: diff,
      questionText: `Solve: ${a} - ${b} = ?`,
      options: opts.options,
      correctIndex: opts.correctIndex,
      correctAnswer: opts.correctAnswer,
      explanation: `Subtract ${b} from ${a}: ${a} - ${b} = ${diffVal}.`
    };
  },

  // 3. MULTIPLICATION
  genMultiplication(day, diff, rng) {
    let a, b;
    if (diff === 'easy') {
      a = Math.floor(rng() * 8) + 2;
      b = Math.floor(rng() * 9) + 2;
    } else if (diff === 'medium') {
      a = Math.floor(rng() * 30) + 11;
      b = Math.floor(rng() * 7) + 3;
    } else {
      // Hard: 2-digit by 2-digit or 3-digit by 1-digit
      a = Math.floor(rng() * 45) + 15;
      b = Math.floor(rng() * 15) + 11;
    }

    const prod = a * b;
    const opts = this.makeOptions(prod, [a, -a, b, -b, 10, -10], rng);
    return {
      topic: 'Multiplication',
      difficulty: diff,
      questionText: `Calculate: ${a} × ${b} = ?`,
      options: opts.options,
      correctIndex: opts.correctIndex,
      correctAnswer: opts.correctAnswer,
      explanation: `${a} multiplied by ${b} equals ${prod}.`
    };
  },

  // 4. DIVISION
  genDivision(day, diff, rng) {
    let divisor, quotient, dividend;
    if (diff === 'easy') {
      divisor = Math.floor(rng() * 7) + 2;
      quotient = Math.floor(rng() * 9) + 2;
    } else if (diff === 'medium') {
      divisor = Math.floor(rng() * 7) + 3;
      quotient = Math.floor(rng() * 30) + 12;
    } else {
      // Hard: Division with a small remainder question
      divisor = Math.floor(rng() * 6) + 4;
      quotient = Math.floor(rng() * 20) + 10;
      const remainder = Math.floor(rng() * (divisor - 1)) + 1;
      dividend = (divisor * quotient) + remainder;
      
      const opts = this.makeOptions(remainder, [1, -1, 2, -2], rng, (r) => `Remainder ${r}`);
      return {
        topic: 'Division',
        difficulty: diff,
        questionText: `What is the remainder when ${dividend} is divided by ${divisor}?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `${dividend} ÷ ${divisor} gives Quotient = ${quotient} with Remainder = ${remainder} because (${divisor} × ${quotient}) + ${remainder} = ${dividend}.`
      };
    }

    dividend = divisor * quotient;
    const opts = this.makeOptions(quotient, [1, -1, 2, -2, 5], rng);
    return {
      topic: 'Division',
      difficulty: diff,
      questionText: `What is ${dividend} ÷ ${divisor}?`,
      options: opts.options,
      correctIndex: opts.correctIndex,
      correctAnswer: opts.correctAnswer,
      explanation: `${dividend} ÷ ${divisor} = ${quotient} (because ${divisor} × ${quotient} = ${dividend}).`
    };
  },

  // 5. WORD PROBLEMS / STORY SUMS
  genWordProblem(day, diff, rng) {
    const names = ['Sara', 'Aanya', 'Aarav', 'Ardiya', 'Omar', 'Kalsoom', 'Ali', 'Adam', 'Yousuf', 'Avinash', 'Shrihaan', 'Shrinay'];
    const name = this.pick(names, rng);

    if (diff === 'easy') {
      const items = ['chocolates', 'apples', 'colored pencils', 'stickers', 'cricket balls'];
      const item = this.pick(items, rng);
      const initial = Math.floor(rng() * 30) + 20;
      const gave = Math.floor(rng() * (initial - 5)) + 5;
      const left = initial - gave;
      const opts = this.makeOptions(left, [2, -2, 5, -5], rng);
      return {
        topic: 'Word Problems',
        difficulty: diff,
        questionText: `${name} had ${initial} ${item}. He gave ${gave} of them to his best friend. How many ${item} are left with ${name}?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Total ${item} initially = ${initial}. Given away = ${gave}. Remaining = ${initial} - ${gave} = ${left}.`
      };
    } else if (diff === 'medium') {
      // Books in shelves / boxes
      const boxes = Math.floor(rng() * 6) + 4;
      const perBox = Math.floor(rng() * 12) + 6;
      const total = boxes * perBox;
      const opts = this.makeOptions(total, [boxes, -boxes, perBox, -perBox, 10], rng);
      return {
        topic: 'Word Problems',
        difficulty: diff,
        questionText: `In a school library, ${name} arranged books into ${boxes} shelves. If each shelf holds exactly ${perBox} books, how many books are there in total?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Total books = Number of shelves × Books per shelf = ${boxes} × ${perBox} = ${total} books.`
      };
    } else {
      // Hard: Two-step story sum
      const pricePerPen = Math.floor(rng() * 6) + 5;
      const numPens = Math.floor(rng() * 5) + 3;
      const notebookCost = Math.floor(rng() * 30) + 25;
      const totalCost = (pricePerPen * numPens) + notebookCost;
      const paidNote = totalCost <= 50 ? 50 : (totalCost <= 100 ? 100 : 200);
      const change = paidNote - totalCost;

      const opts = this.makeOptions(change, [5, -5, 10, -10], rng, (v) => `$${v}`);
      return {
        topic: 'Word Problems',
        difficulty: diff,
        questionText: `${name} bought ${numPens} gel pens at $${pricePerPen} each and one drawing notebook for $${notebookCost}. If ${name} gave a $${paidNote} bill to the shopkeeper, how much change did they receive back?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Cost of pens = ${numPens} × $${pricePerPen} = $${numPens * pricePerPen}. Plus notebook = $${notebookCost}. Total bill = $${totalCost}. Change from $${paidNote} = $${paidNote} - $${totalCost} = $${change}.`
      };
    }
  },

  // 6. FRACTIONS
  genFractions(day, diff, rng) {
    if (diff === 'easy') {
      const fracs = [
        { num: 1, den: 2, label: 'one half (1/2)' },
        { num: 1, den: 4, label: 'one quarter (1/4)' },
        { num: 3, den: 4, label: 'three quarters (3/4)' },
        { num: 1, den: 3, label: 'one third (1/3)' }
      ];
      const chosen = this.pick(fracs, rng);
      const totalSlices = chosen.den * (Math.floor(rng() * 2) + 1);
      const eaten = totalSlices * (chosen.num / chosen.den);

      const options = ['one half (1/2)', 'one quarter (1/4)', 'three quarters (3/4)', 'one third (1/3)'];
      const correctIndex = options.indexOf(chosen.label);
      return {
        topic: 'Fractions',
        difficulty: diff,
        questionText: `A pizza is cut into ${totalSlices} equal slices. If Sara eats ${eaten} slice(s), what fraction of the pizza did she eat?`,
        options: options,
        correctIndex: correctIndex,
        correctAnswer: chosen.label,
        explanation: `${eaten} out of ${totalSlices} slices is ${eaten}/${totalSlices}, which simplifies to ${chosen.label}.`
      };
    } else if (diff === 'medium') {
      // Adding like fractions
      const den = Math.floor(rng() * 6) + 5; // e.g. 7, 8, 9, 10
      const n1 = Math.floor(rng() * 3) + 1;
      const n2 = Math.floor(rng() * (den - n1 - 1)) + 1;
      const sumNum = n1 + n2;
      const correct = `${sumNum}/${den}`;

      const options = [
        `${sumNum}/${den}`,
        `${sumNum}/${den * 2}`,
        `${Math.max(1, sumNum - 1)}/${den}`,
        `${sumNum + 1}/${den}`
      ].sort(() => rng() - 0.5);

      return {
        topic: 'Fractions',
        difficulty: diff,
        questionText: `Find the sum of the like fractions: ${n1}/${den} + ${n2}/${den} = ?`,
        options: options,
        correctIndex: options.indexOf(correct),
        correctAnswer: correct,
        explanation: `When adding fractions with identical denominators, keep the denominator the same and add the numerators: (${n1} + ${n2})/${den} = ${sumNum}/${den}.`
      };
    } else {
      // Hard: Fraction of a whole quantity
      const den = this.pick([3, 4, 5, 6, 8], rng);
      const num = Math.floor(rng() * (den - 1)) + 1;
      const mult = Math.floor(rng() * 6) + 3;
      const total = den * mult;
      const ans = num * mult;

      const opts = this.makeOptions(ans, [den, -den, mult, -mult, 2], rng);
      return {
        topic: 'Fractions',
        difficulty: diff,
        questionText: `What is ${num}/${den} of ${total} mangoes?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `First divide the total by the denominator: ${total} ÷ ${den} = ${mult}. Then multiply by the numerator: ${mult} × ${num} = ${ans} mangoes.`
      };
    }
  },

  // 7. DECIMALS & COMPARING DECIMALS
  genDecimals(day, diff, rng) {
    if (diff === 'easy') {
      // Converting hundredths / cents to decimal
      const cents = this.pick([25, 50, 75, 10, 80], rng);
      const correct = `0.${cents < 10 ? '0' + cents : cents}`;
      const options = [`0.${cents}`, `${cents}`, `0.00${cents}`, `0.${cents}0`].sort(() => rng() - 0.5);
      return {
        topic: 'Decimals',
        difficulty: diff,
        questionText: `How is ${cents} hundredths (${cents} cents out of 100) written using a decimal point?`,
        options: options,
        correctIndex: options.indexOf(`0.${cents}`),
        correctAnswer: `0.${cents}`,
        explanation: `Since 1 whole = 100 hundredths, ${cents} hundredths = ${cents}/100 = 0.${cents}.`
      };
    } else if (diff === 'medium') {
      // Comparing decimals
      const val1 = (Math.floor(rng() * 50) + 10) / 10;
      const val2 = val1 + 0.1;
      const isGreater = rng() > 0.5;
      const left = isGreater ? val2 : val1;
      const right = isGreater ? val1 : val2;
      const correct = isGreater ? '>' : '<';
      const options = ['>', '<', '=', 'Cannot be compared'];
      return {
        topic: 'Comparing Decimals',
        difficulty: diff,
        questionText: `Which symbol correctly fills the blank: ${left.toFixed(1)} ____ ${right.toFixed(1)} ?`,
        options: options,
        correctIndex: options.indexOf(correct),
        correctAnswer: correct,
        explanation: `${left.toFixed(1)} is ${isGreater ? 'greater than' : 'less than'} ${right.toFixed(1)}, so the correct symbol is '${correct}'.`
      };
    } else {
      // Hard: Decimal addition/subtraction
      const a = (Math.floor(rng() * 500) + 100) / 100;
      const b = (Math.floor(rng() * 300) + 50) / 100;
      const sum = (a + b).toFixed(2);
      const opts = this.makeOptions(parseFloat(sum), [0.1, -0.1, 0.01, -0.01], rng, (v) => v.toFixed(2));
      return {
        topic: 'Decimals',
        difficulty: diff,
        questionText: `Evaluate: ${a.toFixed(2)} + ${b.toFixed(2)} = ?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Align the decimal points vertically and add: ${a.toFixed(2)} + ${b.toFixed(2)} = ${sum}.`
      };
    }
  },

  // 8. ROMAN NUMERALS & TALLY MARKS
  genRomanAndTally(day, diff, rng) {
    if (rng() > 0.5) {
      // Roman Numerals
      const map = [
        { num: 4, roman: 'IV' },
        { num: 9, roman: 'IX' },
        { num: 14, roman: 'XIV' },
        { num: 19, roman: 'XIX' },
        { num: 24, roman: 'XXIV' },
        { num: 29, roman: 'XXIX' },
        { num: 35, roman: 'XXXV' },
        { num: 40, roman: 'XL' },
        { num: 50, roman: 'L' },
        { num: 90, roman: 'XC' }
      ];
      const item = this.pick(map, rng);
      if (diff === 'easy') {
        const simple = [
          { num: 5, roman: 'V' },
          { num: 10, roman: 'X' },
          { num: 15, roman: 'XV' },
          { num: 20, roman: 'XX' },
          { num: 7, roman: 'VII' },
          { num: 12, roman: 'XII' }
        ];
        const s = this.pick(simple, rng);
        const opts = this.makeOptions(s.num, [1, -1, 5, -5], rng);
        return {
          topic: 'Roman Numbers',
          difficulty: diff,
          questionText: `What Hindu-Arabic number does the Roman numeral '${s.roman}' represent?`,
          options: opts.options,
          correctIndex: opts.correctIndex,
          correctAnswer: opts.correctAnswer,
          explanation: `In Roman numerals, '${s.roman}' represents the value ${s.num}.`
        };
      } else {
        const opts = [item.roman, item.roman + 'I', 'V' + item.roman, item.roman.replace('X', 'V')].sort(() => rng() - 0.5);
        return {
          topic: 'Roman Numbers',
          difficulty: diff,
          questionText: `What is the Roman numeral for the number ${item.num}?`,
          options: opts,
          correctIndex: opts.indexOf(item.roman),
          correctAnswer: item.roman,
          explanation: `The number ${item.num} is written as '${item.roman}' in Roman numerals.`
        };
      }
    } else {
      // Tally Marks
      const count = Math.floor(rng() * 15) + 5; // e.g. 5 to 19
      const fullBundles = Math.floor(count / 5);
      const singles = count % 5;
      const opts = this.makeOptions(count, [1, -1, 5, -5], rng);
      return {
        topic: 'Tally Marks',
        difficulty: diff,
        questionText: `In data handling, how many total count does ${fullBundles} bundle(s) of 5 tally marks plus ${singles} single tally mark(s) represent?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Each completed tally bundle represents 5: (${fullBundles} × 5) + ${singles} = ${count}.`
      };
    }
  },

  // 9. MEASUREMENT (INDIAN UNITS)
  genMeasurement(day, diff, rng) {
    if (diff === 'easy') {
      const conversions = [
        { q: 'How many centimeters (cm) are in 1 meter (m)?', ans: '100 cm', opts: ['10 cm', '100 cm', '1000 cm', '60 cm'] },
        { q: 'How many grams (g) make 1 kilogram (kg)?', ans: '1000 g', opts: ['100 g', '500 g', '1000 g', '10 g'] },
        { q: 'How many milliliters (mL) are in 1 liter (L)?', ans: '1000 mL', opts: ['100 mL', '500 mL', '1000 mL', '10,000 mL'] },
        { q: 'How many meters (m) make 1 kilometer (km)?', ans: '1000 m', opts: ['100 m', '500 m', '1000 m', '60 m'] }
      ];
      const item = this.pick(conversions, rng);
      const shuffled = [...item.opts].sort(() => rng() - 0.5);
      return {
        topic: 'Measurement',
        difficulty: diff,
        questionText: item.q,
        options: shuffled,
        correctIndex: shuffled.indexOf(item.ans),
        correctAnswer: item.ans,
        explanation: `Standard metric conversion: ${item.ans}.`
      };
    } else if (diff === 'medium') {
      // Convert km to m or kg to g
      const km = Math.floor(rng() * 7) + 2;
      const m = Math.floor(rng() * 800) + 100;
      const totalM = (km * 1000) + m;
      const opts = this.makeOptions(totalM, [100, -100, 1000, -1000], rng, (v) => `${v} m`);
      return {
        topic: 'Measurement',
        difficulty: diff,
        questionText: `Convert ${km} km ${m} m into meters (m):`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Since 1 km = 1000 m, ${km} km = ${km * 1000} m. Adding ${m} m gives ${totalM} m.`
      };
    } else {
      // Hard: Measurement word problem
      const bucketL = Math.floor(rng() * 5) + 3; // e.g. 5 L
      const mugML = 250; // 250 mL
      const totalML = bucketL * 1000;
      const mugsNeeded = totalML / mugML;
      const opts = this.makeOptions(mugsNeeded, [2, -2, 4, -4], rng);
      return {
        topic: 'Measurement',
        difficulty: diff,
        questionText: `A water bucket can hold ${bucketL} Liters of water. If a small measuring mug holds 250 mL, how many full mugs are needed to fill the entire bucket?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `${bucketL} Liters = ${totalML} mL. Dividing by 250 mL per mug: ${totalML} ÷ 250 = ${mugsNeeded} mugs.`
      };
    }
  },

  // 10. TIME & CALENDAR
  genTimeCalendar(day, diff, rng) {
    if (diff === 'easy') {
      const qTypes = [
        { q: 'How many minutes are there in 1 full hour?', a: '60 minutes', opts: ['50 minutes', '60 minutes', '100 minutes', '24 minutes'] },
        { q: 'How many days are in the month of August?', a: '31 days', opts: ['28 days', '30 days', '31 days', '29 days'] },
        { q: 'How many hours are there in 2 full days?', a: '48 hours', opts: ['24 hours', '36 hours', '48 hours', '72 hours'] },
        { q: 'If today is Wednesday, what day will it be after 3 days?', a: 'Saturday', opts: ['Friday', 'Saturday', 'Sunday', 'Monday'] }
      ];
      const item = this.pick(qTypes, rng);
      const shuffled = [...item.opts].sort(() => rng() - 0.5);
      return {
        topic: 'Time & Calendar',
        difficulty: diff,
        questionText: item.q,
        options: shuffled,
        correctIndex: shuffled.indexOf(item.a),
        correctAnswer: item.a,
        explanation: `Answer is ${item.a}.`
      };
    } else if (diff === 'medium') {
      // Elapsed time
      const startH = Math.floor(rng() * 4) + 2; // e.g. 3 PM
      const durationM = this.pick([30, 45, 60, 90], rng);
      const endH = startH + Math.floor(durationM / 60);
      const endM = durationM % 60;
      const timeStr = `${endH}:${endM === 0 ? '00' : endM} PM`;

      const options = [
        timeStr,
        `${endH + 1}:${endM === 0 ? '00' : endM} PM`,
        `${endH - 1}:${endM === 0 ? '00' : endM} PM`,
        `${endH}:${endM === 30 ? '00' : '30'} PM`
      ].sort(() => rng() - 0.5);

      return {
        topic: 'Time & Calendar',
        difficulty: diff,
        questionText: `Aanya started her math homework at ${startH}:00 PM and worked continuously for ${durationM} minutes. At what time did she finish?`,
        options: options,
        correctIndex: options.indexOf(timeStr),
        correctAnswer: timeStr,
        explanation: `${startH}:00 PM plus ${durationM} minutes equals ${timeStr}.`
      };
    } else {
      // Hard: Days in multiple weeks + days
      const weeks = Math.floor(rng() * 5) + 3;
      const extraDays = Math.floor(rng() * 5) + 1;
      const totalDays = (weeks * 7) + extraDays;
      const opts = this.makeOptions(totalDays, [1, -1, 7, -7], rng, (v) => `${v} days`);
      return {
        topic: 'Time & Calendar',
        difficulty: diff,
        questionText: `How many total days are there in ${weeks} weeks and ${extraDays} days?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `${weeks} weeks = ${weeks} × 7 = ${weeks * 7} days. Adding ${extraDays} days = ${totalDays} days.`
      };
    }
  },

  // 11. SHAPES & GEOMETRY (2D & 3D)
  genShapes(day, diff, rng) {
    const shapeFacts = [
      { name: 'Triangle', sides: 3, vertices: 3 },
      { name: 'Rectangle', sides: 4, vertices: 4 },
      { name: 'Pentagon', sides: 5, vertices: 5 },
      { name: 'Hexagon', sides: 6, vertices: 6 },
      { name: 'Octagon', sides: 8, vertices: 8 }
    ];
    const solidFacts = [
      { name: 'Cube', faces: 6, edges: 12, vertices: 8 },
      { name: 'Cuboid', faces: 6, edges: 12, vertices: 8 },
      { name: 'Cylinder', faces: 3, curvedFaces: 1, flatFaces: 2 },
      { name: 'Sphere', faces: 1, edges: 0, vertices: 0 }
    ];

    if (diff === 'easy') {
      const s = this.pick(shapeFacts, rng);
      const opts = this.makeOptions(s.sides, [1, -1, 2, -2], rng);
      return {
        topic: 'Shapes',
        difficulty: diff,
        questionText: `How many straight sides does a flat ${s.name} have?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `A ${s.name} is a polygon with ${s.sides} straight sides and ${s.vertices} corners (vertices).`
      };
    } else {
      const s = this.pick(solidFacts, rng);
      const opts = this.makeOptions(s.vertices, [2, -2, 4, -4], rng);
      return {
        topic: 'Shapes',
        difficulty: diff,
        questionText: `How many corners (vertices) does a solid 3D ${s.name} have?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `A standard 3D ${s.name} has ${s.faces} faces, ${s.edges} edges, and ${s.vertices} vertices.`
      };
    }
  },

  // 12. MONEY (CURRENCY & CENTS)
  genMoney(day, diff, rng) {
    const denominations = [10, 20, 50, 100, 200, 500];
    const note = this.pick(denominations, rng);
    const count = Math.floor(rng() * 4) + 2;
    const total = note * count;

    if (diff === 'easy') {
      const opts = this.makeOptions(total, [note, -note, 50, -50], rng, (v) => `$${v}`);
      return {
        topic: 'Money',
        difficulty: diff,
        questionText: `What is the total value of ${count} bills of $${note}?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `${count} × $${note} = $${total}.`
      };
    } else {
      // Shopping Bill
      const p1 = Math.floor(rng() * 40) + 15;
      const p2 = Math.floor(rng() * 50) + 20;
      const bill = p1 + p2;
      const noteGiven = bill <= 50 ? 50 : (bill <= 100 ? 100 : 200);
      const change = noteGiven - bill;
      const opts = this.makeOptions(change, [5, -5, 10, -10], rng, (v) => `$${v}`);
      return {
        topic: 'Money',
        difficulty: diff,
        questionText: `Aarav bought a notebook for $${p1} and a compass box for $${p2}. If he pays the shopkeeper with a $${noteGiven} bill, how much change should he receive?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Total purchase bill = $${p1} + $${p2} = $${bill}. Change = $${noteGiven} - $${bill} = $${change}.`
      };
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = JuniorMath;
}
