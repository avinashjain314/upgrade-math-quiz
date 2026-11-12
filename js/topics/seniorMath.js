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

const SeniorMath = {
  pick(arr, rng) {
    return arr[Math.floor(rng() * arr.length)];
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
      const names = ['Sara', 'Aanya', 'Aarav', 'Ardiya', 'Omar', 'Kalsoom', 'Ali', 'Adam', 'Yousuf', 'Avinash', 'Shrihaan', 'Shrinay'];
      const studentName = this.pick(names, rng);
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
      return {
        topic: 'Ratios',
        difficulty: diff,
        questionText: `Divide $${totalAmount} between Sara and Aarav in the ratio ${r1} : ${r2}. What is Sara's share?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Total ratio parts = ${r1} + ${r2} = ${sumR}. Value of 1 part = $${totalAmount} ÷ ${sumR} = $${unit}. Sara's share (${r1} parts) = ${r1} × $${unit} = $${share1}.`
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
      const n = Math.floor(rng() * 15) + 6; // 6 to 20
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
    } else if (diff === 'medium') {
      const n = Math.floor(rng() * 8) + 2; // 2 to 9
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
    } else {
      // Hard: Exponents law a^m * a^n = a^(m+n)
      const base = this.pick([2, 3, 5], rng);
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
  },

  // 10. ANGLES & GEOMETRY
  genAngles(day, diff, rng) {
    if (diff === 'easy') {
      const angleTypes = [
        { angle: '45°', type: 'Acute angle (< 90°)' },
        { angle: '90°', type: 'Right angle (= 90°)' },
        { angle: '120°', type: 'Obtuse angle (> 90° and < 180°)' },
        { angle: '180°', type: 'Straight angle (= 180°)' }
      ];
      const item = this.pick(angleTypes, rng);
      const options = [
        'Acute angle (< 90°)',
        'Right angle (= 90°)',
        'Obtuse angle (> 90° and < 180°)',
        'Straight angle (= 180°)'
      ].sort(() => rng() - 0.5);

      return {
        topic: 'Angles',
        difficulty: diff,
        questionText: `An angle measuring ${item.angle} is classified as what type of angle?`,
        options: options,
        correctIndex: options.indexOf(item.type),
        correctAnswer: item.type,
        explanation: `By geometric definitions: ${item.angle} is an ${item.type}.`
      };
    } else {
      // Triangle angle sum property: 180 - (a + b)
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
  },

  // 11. UNITARY METHOD & INTERNATIONAL CONVERSIONS
  genUnitaryAndConversions(day, diff, rng) {
    if (diff === 'easy') {
      // International Numbering & Metric System
      const conv = [
        { q: 'How many thousands make 1 Million in the International numbering system?', ans: '1,000 thousands', opts: ['100 thousands', '1,000 thousands', '10,000 thousands', '500 thousands'] },
        { q: 'How many Millions make 1 Billion in the International numbering system?', ans: '1,000 Millions', opts: ['100 Millions', '1,000 Millions', '10,000 Millions', '500 Millions'] },
        { q: 'How many zeroes are there in 1 Million (1,000,000)?', ans: '6 zeroes', opts: ['5 zeroes', '6 zeroes', '7 zeroes', '8 zeroes'] },
        { q: 'How many zeroes are there in 1 Billion (1,000,000,000)?', ans: '9 zeroes', opts: ['6 zeroes', '8 zeroes', '9 zeroes', '10 zeroes'] },
        { q: 'How many millimeters (mm) are in 1 meter (m)?', ans: '1,000 mm', opts: ['100 mm', '500 mm', '1,000 mm', '10,000 mm'] },
        { q: 'How many grams (g) are in 1 kilogram (kg)?', ans: '1,000 g', opts: ['100 g', '500 g', '1,000 g', '10,000 g'] }
      ];
      const item = this.pick(conv, rng);
      const shuffled = [...item.opts].sort(() => rng() - 0.5);
      return {
        topic: 'Conversion of Units',
        difficulty: diff,
        questionText: item.q,
        options: shuffled,
        correctIndex: shuffled.indexOf(item.ans),
        correctAnswer: item.ans,
        explanation: `In the International System of Units: ${item.ans}.`
      };
    } else {
      // Unitary method
      const count1 = Math.floor(rng() * 4) + 3; // e.g. 5
      const pricePerUnit = Math.floor(rng() * 15) + 12; // e.g. 20
      const total1 = count1 * pricePerUnit;
      const count2 = count1 + Math.floor(rng() * 4) + 2; // e.g. 8
      const total2 = count2 * pricePerUnit;
      const opts = this.makeOptions(total2, [pricePerUnit, -pricePerUnit, 20, -20], rng, (v) => `$${v}`);
      return {
        topic: 'Unitary Method',
        difficulty: diff,
        questionText: `If the cost of ${count1} identical story books is $${total1}, what will be the cost of ${count2} such books?`,
        options: opts.options,
        correctIndex: opts.correctIndex,
        correctAnswer: opts.correctAnswer,
        explanation: `Step 1 (Find cost of 1 unit): $${total1} ÷ ${count1} = $${pricePerUnit} per book. Step 2 (Find cost of ${count2} units): ${count2} × $${pricePerUnit} = $${total2}.`
      };
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SeniorMath;
}
