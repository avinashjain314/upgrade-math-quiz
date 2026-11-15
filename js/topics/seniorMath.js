/**
 * Senior Math Question Generators (Grade 4 to 10)
 * Topics:
 * - Integers & Advanced Arithmetic
 * - Divisibility Rules, Primes, Factors & Multiples
 * - LCM & HCF
 * - BODMAS / Order of Operations
 * - Percentages, Ratios & Proportions
 * - Profit & Loss, Discount
 * - Unitary Method
 * - Simple Algebra (Linear Equations)
 * - Perimeter, Area & Angles
 * - Powers & Exponents, Squares & Cubes
 * - Symmetry & Indian/Metric Unit Conversions
 * 
 * Upgrade Math Quiz by Avinash Sir
 */

const SENIOR_STUDENT_NAMES = [
  'Ardiya', 'Aarav', 'Sara', 'Yousuf', 'Kalsoom', 'Omar', 'Ali',
  'Shrinay', 'Shrihaan', 'Aanya', 'Avinash', 'Shruti', 'Aayush'
];

const SeniorMath = {
  pick(arr, rng) {
    return arr[Math.floor(rng() * arr.length)];
  },

  pickName(rng) {
    return SENIOR_STUDENT_NAMES[Math.floor(rng() * SENIOR_STUDENT_NAMES.length)];
  },

  pickTwoNames(rng) {
    const idx1 = Math.floor(rng() * SENIOR_STUDENT_NAMES.length);
    let idx2 = Math.floor(rng() * SENIOR_STUDENT_NAMES.length);
    while (idx2 === idx1) idx2 = Math.floor(rng() * SENIOR_STUDENT_NAMES.length);
    return [SENIOR_STUDENT_NAMES[idx1], SENIOR_STUDENT_NAMES[idx2]];
  },

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

  // 1. INTEGERS & SIGNED ARITHMETIC
  genIntegers(day, diff, rng) {
    if (diff === 'easy') {
      const a = Math.floor(rng() * 20) - 10;
      const b = Math.floor(rng() * 20) - 10;
      const sum = a + b;
      const opts = this.makeOptions(sum, [1, -1, 2, -2], rng);
      return {
        topic: 'Integers',
        difficulty: diff,
        questionText: `Evaluate: (${a}) + (${b}) = ?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Adding integers: (${a}) + (${b}) = ${sum}.`
      };
    } else if (diff === 'medium') {
      const a = Math.floor(rng() * 15) + 5;
      const b = -(Math.floor(rng() * 15) + 5);
      const prod = a * b;
      const opts = this.makeOptions(prod, [a, -a, 10, -10], rng);
      return {
        topic: 'Integers',
        difficulty: diff,
        questionText: `What is the product of (${a}) × (${b})?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Positive times negative always yields negative: ${a} × (${b}) = ${prod}.`
      };
    } else {
      // Hard: Multi-term integer expression
      const a = -(Math.floor(rng() * 12) + 4);
      const b = Math.floor(rng() * 15) + 6;
      const c = -(Math.floor(rng() * 10) + 3);
      const result = a - b + c;
      const opts = this.makeOptions(result, [2, -2, 5, -5], rng);
      return {
        topic: 'Integers',
        difficulty: diff,
        questionText: `Simplify: (${a}) - (${b}) + (${c}) = ?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Step 1: (${a}) - ${b} = ${a - b}. Step 2: ${a - b} + (${c}) = ${result}.`
      };
    }
  },

  // 2. BODMAS / ORDER OF OPERATIONS
  genBODMAS(day, diff, rng) {
    if (diff === 'easy') {
      const a = Math.floor(rng() * 10) + 2;
      const b = Math.floor(rng() * 6) + 2;
      const c = Math.floor(rng() * 5) + 1;
      const ans = a + (b * c);
      const opts = this.makeOptions(ans, [(a + b) * c - ans, 2, -2, 5], rng);
      return {
        topic: 'BODMAS',
        difficulty: diff,
        questionText: `Apply BODMAS: ${a} + ${b} × ${c} = ?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `According to BODMAS, multiplication comes before addition: ${b} × ${c} = ${b * c}. Then ${a} + ${b * c} = ${ans}.`
      };
    } else if (diff === 'medium') {
      const q = Math.floor(rng() * 6) + 2;
      const div = Math.floor(rng() * 4) + 2;
      const dividend = q * div;
      const mult = Math.floor(rng() * 5) + 3;
      const sub = Math.floor(rng() * 8) + 2;
      const ans = (dividend / div) * mult - sub;
      const opts = this.makeOptions(ans, [sub, -sub, 2, -2], rng);
      return {
        topic: 'BODMAS',
        difficulty: diff,
        questionText: `Evaluate: ${dividend} ÷ ${div} × ${mult} - ${sub} = ?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Step 1: Division ${dividend} ÷ ${div} = ${q}. Step 2: Multiplication ${q} × ${mult} = ${q * mult}. Step 3: Subtraction ${q * mult} - ${sub} = ${ans}.`
      };
    } else {
      // Hard: Brackets and nested operations
      const a = Math.floor(rng() * 5) + 2;
      const b = Math.floor(rng() * 10) + 5;
      const c = Math.floor(rng() * 4) + 1;
      const d = Math.floor(rng() * 12) + 6;
      const inside = b - c;
      const ans = a * inside + d;
      const opts = this.makeOptions(ans, [a, -a, d, -d, 10], rng);
      return {
        topic: 'BODMAS',
        difficulty: diff,
        questionText: `Solve: ${a} × (${b} - ${c}) + ${d} = ?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Solve brackets first: (${b} - ${c}) = ${inside}. Then multiply: ${a} × ${inside} = ${a * inside}. Finally add: ${a * inside} + ${d} = ${ans}.`
      };
    }
  },

  // 3. LCM & HCF
  genLCMandHCF(day, diff, rng) {
    const isLCM = rng() > 0.5;
    if (diff === 'easy') {
      const pairs = [
        { a: 4, b: 6, lcm: 12, hcf: 2 },
        { a: 6, b: 8, lcm: 24, hcf: 2 },
        { a: 9, b: 12, lcm: 36, hcf: 3 },
        { a: 10, b: 15, lcm: 30, hcf: 5 },
        { a: 12, b: 16, lcm: 48, hcf: 4 },
        { a: 15, b: 20, lcm: 60, hcf: 5 }
      ];
      const p = this.pick(pairs, rng);
      const val = isLCM ? p.lcm : p.hcf;
      const label = isLCM ? 'LCM (Lowest Common Multiple)' : 'HCF (Highest Common Factor)';
      const opts = this.makeOptions(val, [isLCM ? -p.a : 1, 2, -2, isLCM ? p.a : 4], rng);
      return {
        topic: isLCM ? 'LCM' : 'HCF',
        difficulty: diff,
        questionText: `Find the ${label} of ${p.a} and ${p.b}:`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: isLCM 
          ? `Multiples of ${p.a} and ${p.b}: the smallest common multiple is ${p.lcm}.`
          : `Factors of ${p.a} and ${p.b}: the largest common divisor is ${p.hcf}.`
      };
    } else {
      // Medium / Hard: Triplet or co-primes
      const triplets = [
        { nums: [6, 8, 12], lcm: 24, hcf: 2 },
        { nums: [12, 18, 24], lcm: 72, hcf: 6 },
        { nums: [15, 25, 30], lcm: 150, hcf: 5 },
        { nums: [8, 12, 20], lcm: 120, hcf: 4 }
      ];
      const t = this.pick(triplets, rng);
      const val = isLCM ? t.lcm : t.hcf;
      const label = isLCM ? 'LCM' : 'HCF';
      const opts = this.makeOptions(val, [isLCM ? 12 : 1, -2, 4, isLCM ? -12 : 2], rng);
      return {
        topic: isLCM ? 'LCM' : 'HCF',
        difficulty: diff,
        questionText: `Find the ${label} of ${t.nums.join(', ')}:`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `By prime factorization of ${t.nums.join(', ')}, the ${label} is ${val}.`
      };
    }
  },

  // 4. PERCENTAGES
  genPercentages(day, diff, rng) {
    if (diff === 'easy') {
      const pcts = [10, 20, 25, 50];
      const p = this.pick(pcts, rng);
      const mult = Math.floor(rng() * 8) + 2;
      const base = (100 / p) * mult * 10;
      const ans = (p / 100) * base;
      const opts = this.makeOptions(ans, [10, -10, 5, -5], rng);
      return {
        topic: 'Percentages',
        difficulty: diff,
        questionText: `What is ${p}% of ${base}?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `${p}% of ${base} = (${p}/100) × ${base} = ${ans}.`
      };
    } else if (diff === 'medium') {
      // Percentage score in exams
      const maxMarks = this.pick([200, 300, 400, 500], rng);
      const scoredPct = this.pick([75, 80, 85, 90, 95], rng);
      const marksScored = (scoredPct / 100) * maxMarks;
      const opts = this.makeOptions(marksScored, [10, -10, 20, -20], rng);
      const studentName = this.pickName(rng);
      return {
        topic: 'Percentages',
        difficulty: diff,
        questionText: `In an annual math exam, ${studentName} scored ${scoredPct}% out of a total of ${maxMarks} marks. How many marks did ${studentName} score?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Marks scored = ${scoredPct}% of ${maxMarks} = (${scoredPct}/100) × ${maxMarks} = ${marksScored} marks.`
      };
    } else {
      // Hard: Percentage increase or decrease
      const original = this.pick([200, 400, 500, 800], rng);
      const incPct = this.pick([10, 15, 20, 25], rng);
      const increase = (incPct / 100) * original;
      const newPrice = original + increase;
      const opts = this.makeOptions(newPrice, [increase, -increase, 50, -50], rng, (v) => `$${v}`);
      return {
        topic: 'Percentages',
        difficulty: diff,
        questionText: `The price of a bicycle was $${original}. If its price is increased by ${incPct}%, what is the new price of the bicycle?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Increase amount = ${incPct}% of $${original} = $${increase}. New Price = $${original} + $${increase} = $${newPrice}.`
      };
    }
  },

  // 5. PROFIT, LOSS & DISCOUNT
  genProfitLoss(day, diff, rng) {
    if (diff === 'easy') {
      const cp = (Math.floor(rng() * 10) + 10) * 10; // e.g. 150
      const gain = (Math.floor(rng() * 5) + 2) * 10; // e.g. 30
      const sp = cp + gain;
      const opts = this.makeOptions(gain, [10, -10, 5, -5], rng, (v) => `$${v}`);
      return {
        topic: 'Profit & Loss',
        difficulty: diff,
        questionText: `A shopkeeper bought a toy for $${cp} and sold it for $${sp}. What was the profit made?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Profit = Selling Price (SP) - Cost Price (CP) = $${sp} - $${cp} = $${gain}.`
      };
    } else if (diff === 'medium') {
      // Profit % calculation
      const cp = this.pick([200, 250, 400, 500], rng);
      const profitPcts = [10, 20, 25];
      const pPct = this.pick(profitPcts, rng);
      const profit = (pPct / 100) * cp;
      const sp = cp + profit;
      const opts = this.makeOptions(pPct, [5, -5, 10, -10], rng, (v) => `${v}%`);
      return {
        topic: 'Profit & Loss',
        difficulty: diff,
        questionText: `An item was bought for $${cp} and sold for $${sp}. Calculate the Profit Percentage (%):`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Profit = $${sp} - $${cp} = $${profit}. Profit % = (Profit / CP) × 100 = (${profit} / ${cp}) × 100 = ${pPct}%.`
      };
    } else {
      // Hard: Discount on Marked Price
      const mp = this.pick([800, 1000, 1200, 1500, 2000], rng);
      const discPct = this.pick([10, 15, 20, 25], rng);
      const discAmt = (discPct / 100) * mp;
      const sp = mp - discAmt;
      const opts = this.makeOptions(sp, [discAmt, -discAmt, 50, -50], rng, (v) => `$${v}`);
      return {
        topic: 'Profit & Loss',
        difficulty: diff,
        questionText: `A sports jacket is marked at $${mp}. The store offers a festival discount of ${discPct}%. What is the final selling price of the jacket?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Discount = ${discPct}% of $${mp} = $${discAmt}. Selling Price = Marked Price - Discount = $${mp} - $${discAmt} = $${sp}.`
      };
    }
  },

  // 6. RATIOS & PROPORTIONS
  genRatios(day, diff, rng) {
    if (diff === 'easy') {
      const common = Math.floor(rng() * 4) + 2;
      const a = (Math.floor(rng() * 5) + 2);
      const b = (Math.floor(rng() * 5) + 3);
      const scaledA = a * common;
      const scaledB = b * common;
      const simplified = `${a} : ${b}`;
      const options = [
        simplified,
        `${b} : ${a}`,
        `${a + 1} : ${b}`,
        `${a} : ${b + 1}`
      ].sort(() => rng() - 0.5);
      return {
        topic: 'Ratios',
        difficulty: diff,
        questionText: `Express the ratio ${scaledA} : ${scaledB} in its simplest form:`,
        options: options,
        correctIndex: options.indexOf(simplified),
        correctAnswer: simplified,
        explanation: `Divide both terms by their common factor ${common}: ${scaledA} ÷ ${common} = ${a}, ${scaledB} ÷ ${common} = ${b}. Simplest ratio = ${simplified}.`
      };
    } else {
      // Dividing a sum in a ratio
      const r1 = Math.floor(rng() * 3) + 2; // 2, 3, 4
      const r2 = Math.floor(rng() * 3) + 3; // 3, 4, 5
      const sumR = r1 + r2;
      const unit = (Math.floor(rng() * 5) + 3) * 10; // e.g. 40
      const totalAmount = sumR * unit;
      const share1 = r1 * unit;
      const opts = this.makeOptions(share1, [unit, -unit, 20, -20], rng, (v) => `$${v}`);
      const [nameA, nameB] = this.pickTwoNames(rng);
      return {
        topic: 'Ratios',
        difficulty: diff,
        questionText: `Divide $${totalAmount} between ${nameA} and ${nameB} in the ratio ${r1} : ${r2}. What is ${nameA}'s share?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Total ratio parts = ${r1} + ${r2} = ${sumR}. Value of 1 part = $${totalAmount} ÷ ${sumR} = $${unit}. ${nameA}'s share (${r1} parts) = ${r1} × $${unit} = $${share1}.`
      };
    }
  },

  // 7. SIMPLE ALGEBRA
  genAlgebra(day, diff, rng) {
    if (diff === 'easy') {
      const xVal = Math.floor(rng() * 12) + 3;
      const b = Math.floor(rng() * 15) + 5;
      const c = xVal + b;
      const opts = this.makeOptions(xVal, [1, -1, 2, -2], rng);
      return {
        topic: 'Simple Algebra',
        difficulty: diff,
        questionText: `Solve for x: x + ${b} = ${c}`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Subtract ${b} from both sides: x = ${c} - ${b} = ${xVal}.`
      };
    } else if (diff === 'medium') {
      const a = Math.floor(rng() * 5) + 2;
      const xVal = Math.floor(rng() * 8) + 2;
      const b = Math.floor(rng() * 10) + 3;
      const c = (a * xVal) + b;
      const opts = this.makeOptions(xVal, [1, -1, 2, -2], rng);
      return {
        topic: 'Simple Algebra',
        difficulty: diff,
        questionText: `Find the value of x: ${a}x + ${b} = ${c}`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Step 1: ${a}x = ${c} - ${b} = ${a * xVal}. Step 2: x = ${a * xVal} ÷ ${a} = ${xVal}.`
      };
    } else {
      // Hard: Variable on both sides
      const xVal = Math.floor(rng() * 7) + 3;
      const a = Math.floor(rng() * 3) + 4; // 4, 5, 6
      const b = Math.floor(rng() * 2) + 2; // 2, 3
      const diffCoeff = a - b;
      const c = diffCoeff * xVal; // so ax - bx = c -> (diffCoeff)x = c
      const opts = this.makeOptions(xVal, [1, -1, 2, -2], rng);
      return {
        topic: 'Simple Algebra',
        difficulty: diff,
        questionText: `Solve the linear equation: ${a}x - ${c} = ${b}x`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Rearranging: ${a}x - ${b}x = ${c} → ${diffCoeff}x = ${c} → x = ${c} ÷ ${diffCoeff} = ${xVal}.`
      };
    }
  },

  // 8. PERIMETER & AREA
  genPerimeterArea(day, diff, rng) {
    if (diff === 'easy') {
      const side = Math.floor(rng() * 12) + 4;
      const perim = 4 * side;
      const opts = this.makeOptions(perim, [4, -4, 2, -2], rng, (v) => `${v} cm`);
      return {
        topic: 'Perimeter & Area',
        difficulty: diff,
        questionText: `What is the perimeter of a square whose side length is ${side} cm?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Perimeter of square = 4 × side = 4 × ${side} cm = ${perim} cm.`
      };
    } else if (diff === 'medium') {
      const l = Math.floor(rng() * 12) + 6;
      const w = Math.floor(rng() * 6) + 3;
      const area = l * w;
      const opts = this.makeOptions(area, [l, -l, w, -w], rng, (v) => `${v} sq cm`);
      return {
        topic: 'Perimeter & Area',
        difficulty: diff,
        questionText: `Calculate the area of a rectangle with length ${l} cm and breadth ${w} cm:`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Area of rectangle = Length × Breadth = ${l} × ${w} = ${area} sq cm.`
      };
    } else {
      // Hard: Finding width given area and length
      const l = Math.floor(rng() * 10) + 10;
      const w = Math.floor(rng() * 8) + 4;
      const area = l * w;
      const opts = this.makeOptions(w, [1, -1, 2, -2], rng, (v) => `${v} cm`);
      return {
        topic: 'Perimeter & Area',
        difficulty: diff,
        questionText: `A rectangular park has an area of ${area} sq meters. If its length is ${l} meters, what is its breadth?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Breadth = Area ÷ Length = ${area} ÷ ${l} = ${w} meters.`
      };
    }
  },

  // 9. SQUARES, CUBES, POWERS & EXPONENTS
  genPowersSquares(day, diff, rng) {
    if (diff === 'easy') {
      const isSqrt = rng() < 0.5;
      if (isSqrt) {
        const n = Math.floor(rng() * 20) + 11; // 11 to 30
        const sq = n * n;
        const opts = this.makeOptions(n, [1, -1, 2, -2], rng);
        return {
          topic: 'Square Roots',
          difficulty: diff,
          questionText: `What is the square root of ${sq} (√${sq})?`,
          options: opts.options,
          correctIndex: opts.correctIndex,
          correctAnswer: opts.correctAnswer,
          explanation: `Since ${n} × ${n} = ${sq}, the square root of ${sq} is ${n}.`
        };
      } else {
        const n = Math.floor(rng() * 20) + 11; // 11 to 30
        const sq = n * n;
        const opts = this.makeOptions(sq, [n, -n, 10, -10], rng);
        return {
          topic: 'Squares & Cubes',
          difficulty: diff,
          questionText: `What is the square of ${n} (${n}²)?`,
          options: opts.options,
          correctIndex: opts.correctIndex,
          correctAnswer: opts.correctAnswer,
          explanation: `${n}² = ${n} × ${n} = ${sq}.`
        };
      }
    } else if (diff === 'medium') {
      const isCubeRoot = rng() < 0.4;
      if (isCubeRoot) {
        const n = Math.floor(rng() * 9) + 2; // 2 to 10
        const cube = n * n * n;
        const opts = this.makeOptions(n, [1, -1, 2, -2], rng);
        return {
          topic: 'Cube Roots',
          difficulty: diff,
          questionText: `What is the cube root of ${cube} (∛${cube})?`,
          options: opts.options,
          correctIndex: opts.correctIndex,
          correctAnswer: opts.correctAnswer,
          explanation: `Since ${n} × ${n} × ${n} = ${cube}, the cube root of ${cube} is ${n}.`
        };
      } else {
        const n = Math.floor(rng() * 9) + 2; // 2 to 10
        const cube = n * n * n;
        const opts = this.makeOptions(cube, [n * n, -(n * n), 10, -10], rng);
        return {
          topic: 'Squares & Cubes',
          difficulty: diff,
          questionText: `Evaluate the cube of ${n} (${n}³):`,
          options: opts.options,
          correctIndex: opts.correctIndex,
          correctAnswer: opts.correctAnswer,
          explanation: `${n}³ = ${n} × ${n} × ${n} = ${cube}.`
        };
      }
    } else {
      // Hard: Exponents law (product rule or quotient rule)
      const isQuotient = rng() < 0.5;
      const base = this.pick([2, 3, 5, 7, 10], rng);
      if (isQuotient) {
        const m = Math.floor(rng() * 4) + 5; // 5 to 8
        const n = Math.floor(rng() * 3) + 2; // 2 to 4
        const diffExp = m - n;
        const options = [
          `${base}^${diffExp}`,
          `${base}^${m + n}`,
          `${base}^${m * n}`,
          `${base}^${diffExp + 1}`
        ].sort(() => rng() - 0.5);

        return {
          topic: 'Powers & Exponents',
          difficulty: diff,
          questionText: `Using the quotient law of exponents, simplify: ${base}^${m} ÷ ${base}^${n} = ?`,
          options: options,
          correctIndex: options.indexOf(`${base}^${diffExp}`),
          correctAnswer: `${base}^${diffExp}`,
          explanation: `By exponent law a^m ÷ a^n = a^(m - n): ${base}^${m} ÷ ${base}^${n} = ${base}^(${m} - ${n}) = ${base}^${diffExp}.`
        };
      } else {
        const m = Math.floor(rng() * 3) + 2;
        const n = Math.floor(rng() * 3) + 2;
        const totalExp = m + n;
        const options = [
          `${base}^${totalExp}`,
          `${base}^${m * n}`,
          `${base * base}^${totalExp}`,
          `${base}^${totalExp - 1}`
        ].sort(() => rng() - 0.5);

        return {
          topic: 'Powers & Exponents',
          difficulty: diff,
          questionText: `Using the product law of exponents, simplify: ${base}^${m} × ${base}^${n} = ?`,
          options: options,
          correctIndex: options.indexOf(`${base}^${totalExp}`),
          correctAnswer: `${base}^${totalExp}`,
          explanation: `By exponent law a^m × a^n = a^(m + n): ${base}^${m} × ${base}^${n} = ${base}^(${m} + ${n}) = ${base}^${totalExp}.`
        };
      }
    }
  },

  // 10. ANGLES & GEOMETRY
  genAngles(day, diff, rng) {
    if (diff === 'easy') {
      const mode = Math.floor(rng() * 3);
      if (mode === 0) {
        // Complementary angle (sums to 90)
        const a = Math.floor(rng() * 65) + 15; // 15 to 80
        const comp = 90 - a;
        const opts = this.makeOptions(comp, [10, -10, 5, -5], rng, (v) => `${v}°`);
        return {
          topic: 'Complementary Angles',
          difficulty: diff,
          questionText: `Two angles are complementary if they add up to 90°. What is the complement of ${a}°?`,
          options: opts.options,
          correctIndex: opts.correctIndex,
          correctAnswer: opts.correctAnswer,
          explanation: `Complementary angles add up to 90°. Complement = 90° - ${a}° = ${comp}°.`
        };
      } else if (mode === 1) {
        // Supplementary angle (sums to 180)
        const a = Math.floor(rng() * 120) + 30; // 30 to 150
        const supp = 180 - a;
        const opts = this.makeOptions(supp, [10, -10, 20, -20], rng, (v) => `${v}°`);
        return {
          topic: 'Supplementary Angles',
          difficulty: diff,
          questionText: `Two angles are supplementary if their sum is 180°. What is the supplement of ${a}°?`,
          options: opts.options,
          correctIndex: opts.correctIndex,
          correctAnswer: opts.correctAnswer,
          explanation: `Supplementary angles add up to 180°. Supplement = 180° - ${a}° = ${supp}°.`
        };
      } else {
        // Angle Classification
        const deg = this.pick([25, 45, 68, 89, 90, 105, 120, 145, 175, 180, 210, 270], rng);
        let typeStr = '';
        if (deg < 90) typeStr = 'Acute angle (< 90°)';
        else if (deg === 90) typeStr = 'Right angle (= 90°)';
        else if (deg < 180) typeStr = 'Obtuse angle (> 90° and < 180°)';
        else if (deg === 180) typeStr = 'Straight angle (= 180°)';
        else typeStr = 'Reflex angle (> 180°)';

        const allTypes = [
          'Acute angle (< 90°)',
          'Right angle (= 90°)',
          'Obtuse angle (> 90° and < 180°)',
          'Straight angle (= 180°)',
          'Reflex angle (> 180°)'
        ];
        const dist = allTypes.filter(t => t !== typeStr).sort(() => rng() - 0.5).slice(0, 3);
        const options = [typeStr, ...dist].sort(() => rng() - 0.5);

        return {
          topic: 'Angles',
          difficulty: diff,
          questionText: `An angle measuring ${deg}° is classified as what type of angle?`,
          options: options,
          correctIndex: options.indexOf(typeStr),
          correctAnswer: typeStr,
          explanation: `By geometric definitions: ${deg}° is an ${typeStr}.`
        };
      }
    } else if (diff === 'medium') {
      // Linear pair: straight line angle
      const a = Math.floor(rng() * 110) + 35; // 35 to 145
      const b = 180 - a;
      const opts = this.makeOptions(b, [10, -10, 5, -5], rng, (v) => `${v}°`);
      return {
        topic: 'Linear Pair Angles',
        difficulty: diff,
        questionText: `Two adjacent angles on a straight line form a linear pair. If one angle is ${a}°, what is the measure of the other angle?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Angles on a straight line add up to 180°. Other angle = 180° - ${a}° = ${b}°.`
      };
    } else {
      // Hard: Quadrilateral fourth angle or Triangle third angle
      const isQuad = rng() < 0.5;
      if (isQuad) {
        const a = Math.floor(rng() * 40) + 60; // 60-100
        const b = Math.floor(rng() * 40) + 70; // 70-110
        const c = Math.floor(rng() * 30) + 80; // 80-110
        const d = 360 - (a + b + c);
        const opts = this.makeOptions(d, [10, -10, 15, -15], rng, (v) => `${v}°`);
        return {
          topic: 'Angles in Quadrilaterals',
          difficulty: diff,
          questionText: `In a four-sided quadrilateral, three interior angles measure ${a}°, ${b}°, and ${c}°. What is the measure of the fourth angle?`,
          options: opts.options,
          correctIndex: opts.correctIndex,
          correctAnswer: opts.correctAnswer,
          explanation: `The sum of interior angles of any quadrilateral is 360°. Fourth angle = 360° - (${a}° + ${b}° + ${c}°) = ${d}°.`
        };
      } else {
        const a = Math.floor(rng() * 40) + 40; // 40 to 80
        const b = Math.floor(rng() * 40) + 30; // 30 to 70
        const c = 180 - (a + b);
        const opts = this.makeOptions(c, [10, -10, 5, -5], rng, (v) => `${v}°`);
        return {
          topic: 'Angles',
          difficulty: diff,
          questionText: `In a triangle, two interior angles measure ${a}° and ${b}°. What is the measure of the third angle?`,
          options: opts.options,
          correctIndex: opts.correctIndex,
          correctAnswer: opts.correctAnswer,
          explanation: `Sum of all 3 interior angles of any triangle is 180°. Third angle = 180° - (${a}° + ${b}°) = 180° - ${a + b}° = ${c}°.`
        };
      }
    }
  },

  // 11. UNITARY METHOD & INTERNATIONAL CONVERSIONS
  genUnitaryAndConversions(day, diff, rng) {
    if (diff === 'easy') {
      const mode = Math.floor(rng() * 4);
      if (mode === 0) {
        const m = Math.floor(rng() * 8) + 2; // 2 to 9
        const ans = m * 1000;
        const opts = this.makeOptions(ans, [100, -100, 1000, -1000], rng, (v) => `${v.toLocaleString()} thousands`);
        return {
          topic: 'International Numbering',
          difficulty: diff,
          questionText: `How many thousands make ${m} Million in the International numbering system?`,
          options: opts.options,
          correctIndex: opts.correctIndex,
          correctAnswer: opts.correctAnswer,
          explanation: `1 Million = 1,000 thousands. Therefore, ${m} Million = ${m} × 1,000 = ${ans.toLocaleString()} thousands.`
        };
      } else if (mode === 1) {
        const km = Math.floor(rng() * 12) + 2;
        const ans = km * 1000;
        const opts = this.makeOptions(ans, [100, -100, 1000, -1000], rng, (v) => `${v} m`);
        return {
          topic: 'Conversion of Units',
          difficulty: diff,
          questionText: `Convert ${km} kilometers (km) into meters (m):`,
          options: opts.options,
          correctIndex: opts.correctIndex,
          correctAnswer: opts.correctAnswer,
          explanation: `1 km = 1,000 m. Therefore, ${km} km = ${km} × 1,000 = ${ans} m.`
        };
      } else if (mode === 2) {
        const kg = Math.floor(rng() * 15) + 3;
        const ans = kg * 1000;
        const opts = this.makeOptions(ans, [100, -100, 1000, -1000], rng, (v) => `${v} g`);
        return {
          topic: 'Conversion of Units',
          difficulty: diff,
          questionText: `Convert ${kg} kilograms (kg) into grams (g):`,
          options: opts.options,
          correctIndex: opts.correctIndex,
          correctAnswer: opts.correctAnswer,
          explanation: `1 kg = 1,000 g. Therefore, ${kg} kg = ${kg} × 1,000 = ${ans} g.`
        };
      } else {
        const m = Math.floor(rng() * 8) + 2;
        const ans = m * 1000;
        const opts = this.makeOptions(ans, [100, -100, 1000, -1000], rng, (v) => `${v} mm`);
        return {
          topic: 'Conversion of Units',
          difficulty: diff,
          questionText: `How many millimeters (mm) are there in ${m} meters (m)?`,
          options: opts.options,
          correctIndex: opts.correctIndex,
          correctAnswer: opts.correctAnswer,
          explanation: `1 meter = 1,000 millimeters. Therefore, ${m} m = ${m} × 1,000 = ${ans} mm.`
        };
      }
    } else {
      // Unitary method with real coaching student names
      const studentName = this.pickName(rng);
      const items = ['identical notebooks', 'cricket balls', 'storybooks', 'math compass boxes', 'art sketchbooks', 'backpacks'];
      const item = this.pick(items, rng);
      const count1 = Math.floor(rng() * 4) + 3; // e.g. 5
      const pricePerUnit = Math.floor(rng() * 15) + 12; // e.g. 20
      const total1 = count1 * pricePerUnit;
      const count2 = count1 + Math.floor(rng() * 4) + 2; // e.g. 8
      const total2 = count2 * pricePerUnit;
      const opts = this.makeOptions(total2, [pricePerUnit, -pricePerUnit, 20, -20], rng, (v) => `$${v}`);
      return {
        topic: 'Unitary Method',
        difficulty: diff,
        questionText: `If the cost of ${count1} ${item} is $${total1}, ${studentName} wants to buy ${count2} such ${item}. How much will ${studentName} have to pay?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Step 1 (Find cost of 1 unit): $${total1} ÷ ${count1} = $${pricePerUnit} per item. Step 2 (Find cost of ${count2} units): ${count2} × $${pricePerUnit} = $${total2}.`
      };
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SeniorMath;
}
