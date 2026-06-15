import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

function p(
  difficulty: number,
  questionLatex: string,
  answer: string,
  steps: string[],
  hints: string[]
) {
  return { difficulty, questionLatex, answer, solutionSteps: { steps }, hints: { hints } }
}

async function main() {
  // Clear existing curriculum data (preserves user accounts)
  await prisma.attempt.deleteMany()
  await prisma.userProgress.deleteMany()
  await prisma.problem.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.topic.deleteMany()

  // ─── TOPIC 1: Number Sense & Operations ───────────────────────────────────
  const topic1 = await prisma.topic.create({
    data: {
      slug: "number-sense",
      title: "Number Sense & Operations",
      description: "Build a solid foundation with integers, absolute value, and basic arithmetic.",
      orderIndex: 1,
      lessons: {
        create: [
          {
            title: "Integers and the Number Line",
            orderIndex: 1,
            content: `INTEGERS AND THE NUMBER LINE
============================

An integer is any whole number — positive, negative, or zero.
Examples: ..., -3, -2, -1, 0, 1, 2, 3, ...

THE NUMBER LINE
Numbers to the right are larger. Numbers to the left are smaller.
So: -2 > -5 (because -2 is further right on the number line)

ABSOLUTE VALUE
The absolute value of a number is its distance from zero. Always positive.
  |7|  = 7   (7 steps from zero)
  |-7| = 7   (-7 is also 7 steps from zero)
  |0|  = 0

ADDING AND SUBTRACTING INTEGERS
Same signs → add and keep the sign:
  3 + 5 = 8
  (-3) + (-5) = -8

Different signs → subtract, keep the sign of the larger absolute value:
  7 + (-3) = 4     (|7| is bigger, so positive)
  (-7) + 3  = -4   (|-7| is bigger, so negative)

MULTIPLYING AND DIVIDING INTEGERS
  Positive × Positive = Positive   →  3 × 4 = 12
  Negative × Negative = Positive   →  (-3) × (-4) = 12
  Positive × Negative = Negative   →  3 × (-4) = -12
  Negative ÷ Positive = Negative   →  (-12) ÷ 4 = -3`,
          },
        ],
      },
      problems: {
        create: [
          // EASY (20)
          p(1, "|-7|", "7", ["Absolute value = distance from zero.", "|-7| = 7"], ["Distance from zero is always positive.", "7 steps from 0.", "Answer: 7"]),
          p(1, "-5 + 3", "-2", ["Different signs: subtract.", "5 - 3 = 2, keep sign of |-5|.", "Answer: -2"], ["Which has the bigger absolute value?", "|-5| = 5 > |3| = 3, so answer is negative.", "-2"]),
          p(1, "(-3) \\times (-4)", "12", ["Negative × Negative = Positive.", "3 × 4 = 12.", "Answer: 12"], ["Two negatives make a positive.", "3 × 4 = ?", "12"]),
          p(1, "-12 \\div 4", "-3", ["Negative ÷ Positive = Negative.", "12 ÷ 4 = 3.", "Answer: -3"], ["Negative ÷ Positive = Negative.", "12 ÷ 4 = 3.", "-3"]),
          p(1, "|15|", "15", ["Absolute value of a positive = itself.", "Answer: 15"], ["Is 15 already positive?", "Yes — absolute value keeps it the same.", "15"]),
          p(1, "-8 + (-2)", "-10", ["Same signs (both negative): add and keep sign.", "-8 + 2 = 10, keep negative.", "Answer: -10"], ["Both numbers are negative.", "Add their absolute values: 8 + 2 = 10.", "Keep negative: -10"]),
          p(1, "4 \\times (-5)", "-20", ["Positive × Negative = Negative.", "4 × 5 = 20.", "Answer: -20"], ["Different signs → negative result.", "4 × 5 = 20.", "-20"]),
          p(1, "-18 \\div (-3)", "6", ["Negative ÷ Negative = Positive.", "18 ÷ 3 = 6.", "Answer: 6"], ["Two negatives → positive.", "18 ÷ 3 = ?", "6"]),
          p(1, "|-12|", "12", ["Absolute value = distance from zero.", "|-12| = 12"], ["Distance is always positive.", "12 steps from 0.", "12"]),
          p(1, "7 + (-10)", "-3", ["Different signs: subtract.", "10 - 7 = 3, keep sign of |-10|.", "Answer: -3"], ["Which is bigger: |7| or |-10|?", "|-10| = 10 is bigger, so answer is negative.", "10 - 7 = 3 → answer is -3"]),
          p(1, "|0|", "0", ["Zero is zero steps from zero.", "Answer: 0"], ["Distance from 0 to 0 is?", "0"]),
          p(1, "-6 + 9", "3", ["Different signs: subtract.", "9 - 6 = 3, keep sign of |9|.", "Answer: 3"], ["Which is bigger: |-6| or |9|?", "|9| = 9 is bigger, so answer is positive.", "9 - 6 = 3"]),
          p(1, "3 \\times (-7)", "-21", ["Positive × Negative = Negative.", "3 × 7 = 21.", "Answer: -21"], ["Different signs → negative.", "3 × 7 = 21.", "-21"]),
          p(1, "-24 \\div 6", "-4", ["Negative ÷ Positive = Negative.", "24 ÷ 6 = 4.", "Answer: -4"], ["Negative ÷ Positive = Negative.", "24 ÷ 6 = 4.", "-4"]),
          p(1, "|-8|", "8", ["Distance from 0 to -8 is 8.", "Answer: 8"], ["Absolute value is always positive.", "8"]),
          p(1, "-4 + (-4)", "-8", ["Same signs: add and keep sign.", "4 + 4 = 8, keep negative.", "Answer: -8"], ["Both negative → add magnitudes.", "4 + 4 = 8 → -8"]),
          p(1, "5 \\times (-2)", "-10", ["Positive × Negative = Negative.", "5 × 2 = 10.", "Answer: -10"], ["Different signs → negative.", "5 × 2 = 10.", "-10"]),
          p(1, "-15 \\div (-5)", "3", ["Negative ÷ Negative = Positive.", "15 ÷ 5 = 3.", "Answer: 3"], ["Two negatives → positive.", "15 ÷ 5 = 3.", "3"]),
          p(1, "|-20|", "20", ["Distance from 0 to -20 is 20.", "Answer: 20"], ["Always positive.", "20"]),
          p(1, "-9 + 4", "-5", ["Different signs: 9 - 4 = 5, keep sign of |-9|.", "Answer: -5"], ["|-9| > |4|, so answer is negative.", "9 - 4 = 5 → -5"]),
          // MEDIUM (20)
          p(2, "-8 + (-5) - (-3)", "-10", ["Subtracting negative = adding: -(-3) = +3.", "Rewrite: -8 + (-5) + 3", "-8 + (-5) = -13, then -13 + 3 = -10"], ["Turn -(-3) into +3.", "-8 - 5 + 3 = ?", "-13 + 3 = -10"]),
          p(2, "|(-3) + (-4)|", "7", ["Add inside: -3 + (-4) = -7.", "|-7| = 7"], ["Add inside first.", "-3 + (-4) = -7.", "|-7| = 7"]),
          p(2, "(-2) \\times 3 \\times (-4)", "24", ["(-2) × 3 = -6.", "-6 × (-4) = 24 (neg × neg = pos)"], ["Work left to right.", "(-2) × 3 = -6.", "-6 × (-4) = 24"]),
          p(2, "-36 \\div (-4) \\div 3", "3", ["Left to right: -36 ÷ (-4) = 9.", "9 ÷ 3 = 3"], ["-36 ÷ (-4) = ? (neg ÷ neg = pos)", "9 ÷ 3 = ?", "3"]),
          p(2, "(-5)^2", "25", ["(-5)² = (-5) × (-5).", "Neg × Neg = Pos: 25"], ["(-5)² means (-5) × (-5).", "Two negatives make a positive.", "25"]),
          p(2, "-3 + 7 - (-2)", "6", ["-(-2) = +2.", "Rewrite: -3 + 7 + 2 = 6"], ["Turn -(-2) into +2.", "-3 + 7 + 2 = ?", "6"]),
          p(2, "(-8) \\div 2 + 5", "1", ["-8 ÷ 2 = -4.", "-4 + 5 = 1"], ["Divide first: -8 ÷ 2 = -4.", "Then add 5.", "-4 + 5 = 1"]),
          p(2, "4 \\times (-3) + 14", "2", ["Multiply first: 4 × (-3) = -12.", "-12 + 14 = 2"], ["4 × (-3) = ?", "-12 + 14 = ?", "2"]),
          p(2, "|-3 + (-5)|", "8", ["Add inside: -3 + (-5) = -8.", "|-8| = 8"], ["Add inside: -3 + (-5) = ?", "|-8| = ?", "8"]),
          p(2, "-2 \\times (-3) - 8", "-2", ["(-2) × (-3) = 6.", "6 - 8 = -2"], ["Neg × Neg = Pos.", "-2 × (-3) = 6.", "6 - 8 = -2"]),
          p(2, "|(-4) \\times 3|", "12", ["(-4) × 3 = -12.", "|-12| = 12"], ["Multiply first: (-4) × 3 = -12.", "|-12| = ?", "12"]),
          p(2, "(-3)^2 - 5", "4", ["(-3)² = 9.", "9 - 5 = 4"], ["(-3)² = (-3) × (-3) = ?", "9 - 5 = ?", "4"]),
          p(2, "-7 \\times (-2) + (-8)", "6", ["(-7) × (-2) = 14.", "14 + (-8) = 6"], ["Neg × Neg = Pos: -7 × -2 = 14.", "14 + (-8) = ?", "6"]),
          p(2, "(-20) \\div 4 \\times (-1)", "5", ["Left to right: -20 ÷ 4 = -5.", "-5 × (-1) = 5"], ["-20 ÷ 4 = -5.", "-5 × (-1) = ? (neg × neg = pos)", "5"]),
          p(2, "6 + (-9) - (-1)", "-2", ["-(-1) = +1.", "6 + (-9) + 1 = -2"], ["Turn -(-1) into +1.", "6 - 9 + 1 = ?", "-2"]),
          p(2, "(-4) \\times (-4) - 8", "8", ["(-4) × (-4) = 16.", "16 - 8 = 8"], ["Neg × Neg = Pos: (-4)×(-4) = 16.", "16 - 8 = ?", "8"]),
          p(2, "-5 + 3 \\times (-2)", "-11", ["Multiply first: 3 × (-2) = -6.", "-5 + (-6) = -11"], ["Multiply before adding.", "3 × (-2) = -6.", "-5 + (-6) = -11"]),
          p(2, "|(-6) - 4|", "10", ["Subtract: -6 - 4 = -10.", "|-10| = 10"], ["-6 - 4 = ?", "|-10| = ?", "10"]),
          p(2, "(-3) \\times 4 \\div (-6)", "2", ["(-3) × 4 = -12.", "-12 ÷ (-6) = 2"], ["(-3) × 4 = -12.", "-12 ÷ (-6) = ? (neg ÷ neg = pos)", "2"]),
          p(2, "(-2)^2 + (-3)^2", "13", ["(-2)² = 4.", "(-3)² = 9.", "4 + 9 = 13"], ["(-2)² = 4 and (-3)² = 9.", "Add them.", "13"]),
          // HARD (10)
          p(3, "(-2)^3", "-8", ["(-2)³ = (-2)×(-2)×(-2).", "4 × (-2) = -8"], ["(-2)³ means multiply (-2) three times.", "(-2)×(-2) = 4, then 4×(-2) = ?", "-8"]),
          p(3, "-4 + (-3) \\times 2 - 1", "-11", ["Multiply first: (-3)×2 = -6.", "-4 + (-6) - 1 = -11"], ["Multiply first: (-3)×2 = -6.", "-4 - 6 - 1 = ?", "-11"]),
          p(3, "|(-5) \\times 3| - 6", "9", ["(-5)×3 = -15.", "|-15| = 15.", "15 - 6 = 9"], ["(-5)×3 = -15.", "|-15| = 15.", "15 - 6 = 9"]),
          p(3, "(-12) \\div 4 + (-3) \\times 2", "-9", ["Divide: -12÷4 = -3.", "Multiply: (-3)×2 = -6.", "-3 + (-6) = -9"], ["Do division and multiplication first.", "-12÷4 = -3 and (-3)×2 = -6.", "-3 + (-6) = -9"]),
          p(3, "(-2) \\times (-3) + (-4) \\times 2", "-2", ["(-2)×(-3) = 6.", "(-4)×2 = -8.", "6 + (-8) = -2"], ["Do both multiplications first.", "6 + (-8) = ?", "-2"]),
          p(3, "(-1)^5", "-1", ["Odd exponent on a negative = negative.", "(-1)×(-1)×(-1)×(-1)×(-1) = -1"], ["Odd power of a negative is always negative.", "(-1)^5 = -1"]),
          p(3, "(-2)^2 \\times (-3)^2", "36", ["(-2)² = 4.", "(-3)² = 9.", "4 × 9 = 36"], ["Square each: (-2)²=4, (-3)²=9.", "4 × 9 = ?", "36"]),
          p(3, "-((-3)^3)", "27", ["(-3)³ = -27.", "−(−27) = 27"], ["(-3)³ = (-3)×(-3)×(-3) = -27.", "Negate it: −(−27) = ?", "27"]),
          p(3, "|(-4)^2 - 20|", "4", ["(-4)² = 16.", "16 - 20 = -4.", "|-4| = 4"], ["(-4)² = 16.", "16 - 20 = -4.", "|-4| = 4"]),
          p(3, "(-3) \\times (-2)^3 - 2", "22", ["(-2)³ = -8.", "(-3)×(-8) = 24.", "24 - 2 = 22"], ["(-2)³ = -8.", "(-3)×(-8) = 24 (neg×neg=pos).", "24 - 2 = 22"]),
        ],
      },
    },
  })

  // ─── TOPIC 2: Order of Operations ─────────────────────────────────────────
  const topic2 = await prisma.topic.create({
    data: {
      slug: "order-of-operations",
      title: "Order of Operations",
      description: "Learn PEMDAS — the rules for which math to do first.",
      orderIndex: 2,
      prerequisiteId: topic1.id,
      lessons: {
        create: [
          {
            title: "PEMDAS: The Order of Operations",
            orderIndex: 1,
            content: `PEMDAS: THE ORDER OF OPERATIONS
================================

When an expression has multiple operations, follow PEMDAS:

  P — Parentheses   →  (3 + 2)
  E — Exponents     →  2³
  M — Multiplication
  D — Division         (M and D: equal priority, left to right)
  A — Addition
  S — Subtraction      (A and S: equal priority, left to right)

EXAMPLE 1: 2 + 3 × 4
  Multiply first: 3 × 4 = 12
  Then add: 2 + 12 = 14  ✓  (NOT 5 × 4 = 20)

EXAMPLE 2: (2 + 3) × 4
  Parentheses first: 2 + 3 = 5
  Multiply: 5 × 4 = 20  ✓

EXAMPLE 3: 10 - 2² + 1
  Exponent first: 2² = 4
  Left to right: 10 - 4 = 6, then 6 + 1 = 7  ✓

THE GOLDEN RULE: Work one step at a time. Always ask "Am I following PEMDAS?"`,
          },
        ],
      },
      problems: {
        create: [
          // EASY (20)
          p(1, "2 + 3 \\times 4", "14", ["Multiply first: 3×4=12.", "2+12=14"], ["M before A in PEMDAS.", "3×4=12.", "2+12=14"]),
          p(1, "(2 + 3) \\times 4", "20", ["Parentheses: 2+3=5.", "5×4=20"], ["P first: 2+3=5.", "5×4=20"]),
          p(1, "10 - 4 \\div 2", "8", ["Divide first: 4÷2=2.", "10-2=8"], ["D before S.", "4÷2=2.", "10-2=8"]),
          p(1, "(10 - 4) \\div 2", "3", ["Parentheses: 10-4=6.", "6÷2=3"], ["P first: 10-4=6.", "6÷2=3"]),
          p(1, "3 \\times 4 + 2", "14", ["Multiply first: 3×4=12.", "12+2=14"], ["M before A.", "3×4=12.", "12+2=14"]),
          p(1, "3 \\times (4 + 2)", "18", ["Parentheses: 4+2=6.", "3×6=18"], ["P first: 4+2=6.", "3×6=18"]),
          p(1, "8 \\div 4 + 1", "3", ["Divide first: 8÷4=2.", "2+1=3"], ["D before A.", "8÷4=2.", "2+1=3"]),
          p(1, "5 + 2 \\times 3", "11", ["Multiply first: 2×3=6.", "5+6=11"], ["M before A.", "2×3=6.", "5+6=11"]),
          p(1, "(5 + 2) \\times 3", "21", ["Parentheses: 5+2=7.", "7×3=21"], ["P first: 5+2=7.", "7×3=21"]),
          p(1, "12 - 3 \\times 2", "6", ["Multiply first: 3×2=6.", "12-6=6"], ["M before S.", "3×2=6.", "12-6=6"]),
          p(1, "6 \\div 2 + 4", "7", ["Divide first: 6÷2=3.", "3+4=7"], ["D before A.", "6÷2=3.", "3+4=7"]),
          p(1, "6 \\div (2 + 4)", "1", ["Parentheses: 2+4=6.", "6÷6=1"], ["P first: 2+4=6.", "6÷6=1"]),
          p(1, "4 \\times 3 - 5", "7", ["Multiply first: 4×3=12.", "12-5=7"], ["M before S.", "4×3=12.", "12-5=7"]),
          p(1, "4 \\times (3 - 5)", "-8", ["Parentheses: 3-5=-2.", "4×(-2)=-8"], ["P first: 3-5=-2.", "4×(-2)=-8"]),
          p(1, "9 + 3 \\div 3", "10", ["Divide first: 3÷3=1.", "9+1=10"], ["D before A.", "3÷3=1.", "9+1=10"]),
          p(1, "(9 + 3) \\div 3", "4", ["Parentheses: 9+3=12.", "12÷3=4"], ["P first: 9+3=12.", "12÷3=4"]),
          p(1, "2 \\times 5 - 4", "6", ["Multiply first: 2×5=10.", "10-4=6"], ["M before S.", "2×5=10.", "10-4=6"]),
          p(1, "20 \\div 4 + 1", "6", ["Divide first: 20÷4=5.", "5+1=6"], ["D before A.", "20÷4=5.", "5+1=6"]),
          p(1, "7 - 2 \\times 3", "1", ["Multiply first: 2×3=6.", "7-6=1"], ["M before S.", "2×3=6.", "7-6=1"]),
          p(1, "(7 - 2) \\times 3", "15", ["Parentheses: 7-2=5.", "5×3=15"], ["P first: 7-2=5.", "5×3=15"]),
          // MEDIUM (20)
          p(2, "10 - 2^2 + 1", "7", ["Exponent: 2²=4.", "10-4+1=7 (left to right)"], ["E first: 2²=4.", "10-4=6, 6+1=7"]),
          p(2, "3 \\times (4 + 2) \\div 6", "3", ["P: 4+2=6.", "Left to right: 3×6=18, 18÷6=3"], ["P: 4+2=6.", "3×6=18, 18÷6=3"]),
          p(2, "(3 + 2)^2", "25", ["P: 3+2=5.", "5²=25"], ["P first: 3+2=5.", "5²=25"]),
          p(2, "2 + 3^2 \\times 2", "20", ["E: 3²=9.", "M: 9×2=18.", "A: 2+18=20"], ["E first: 3²=9.", "Then 9×2=18.", "2+18=20"]),
          p(2, "4^2 - (3 + 5)", "8", ["P: 3+5=8.", "E: 4²=16.", "16-8=8"], ["P: 3+5=8.", "E: 4²=16.", "16-8=8"]),
          p(2, "18 \\div (2 + 1) \\times 2", "12", ["P: 2+1=3.", "Left to right: 18÷3=6, 6×2=12"], ["P: 2+1=3.", "18÷3=6.", "6×2=12"]),
          p(2, "5 \\times 2 - 4 \\div 2", "8", ["M and D first: 5×2=10, 4÷2=2.", "10-2=8"], ["M: 5×2=10. D: 4÷2=2.", "10-2=8"]),
          p(2, "(4 + 6) \\div (8 - 3)", "2", ["P: 4+6=10 and 8-3=5.", "10÷5=2"], ["Both parentheses first.", "10÷5=2"]),
          p(2, "3^2 + 4^2", "25", ["3²=9.", "4²=16.", "9+16=25"], ["Square both: 3²=9, 4²=16.", "9+16=25"]),
          p(2, "2 \\times (3 + 4) - 5", "9", ["P: 3+4=7.", "M: 2×7=14.", "S: 14-5=9"], ["P: 3+4=7.", "2×7=14.", "14-5=9"]),
          p(2, "(2 + 1)^3", "27", ["P: 2+1=3.", "E: 3³=27"], ["P first: 2+1=3.", "3³=3×3×3=27"]),
          p(2, "5^2 - 3 \\times 4", "13", ["E: 5²=25.", "M: 3×4=12.", "25-12=13"], ["E first: 5²=25.", "M: 3×4=12.", "25-12=13"]),
          p(2, "(8 - 2) \\div 3 + 1", "3", ["P: 8-2=6.", "D: 6÷3=2.", "A: 2+1=3"], ["P: 8-2=6.", "6÷3=2.", "2+1=3"]),
          p(2, "2^3 - (1 + 3)", "4", ["P: 1+3=4.", "E: 2³=8.", "8-4=4"], ["P: 1+3=4.", "E: 2³=8.", "8-4=4"]),
          p(2, "4 \\times 3^2 - 10", "26", ["E: 3²=9.", "M: 4×9=36.", "36-10=26"], ["E first: 3²=9.", "4×9=36.", "36-10=26"]),
          p(2, "(5 - 3)^4", "16", ["P: 5-3=2.", "E: 2⁴=16"], ["P first: 5-3=2.", "2⁴=2×2×2×2=16"]),
          p(2, "6 \\div 2 \\times (1 + 2)", "9", ["P: 1+2=3.", "Left to right: 6÷2=3, 3×3=9"], ["P: 1+2=3.", "6÷2=3.", "3×3=9"]),
          p(2, "3 \\times (2^2 - 1)", "9", ["E: 2²=4.", "P: 4-1=3.", "3×3=9"], ["E: 2²=4.", "P: 4-1=3.", "3×3=9"]),
          p(2, "10 - 3 \\times 2 + 4", "8", ["M first: 3×2=6.", "Left to right: 10-6=4, 4+4=8"], ["M first: 3×2=6.", "10-6=4.", "4+4=8"]),
          p(2, "(3 + 5) \\div 4 \\times 3", "6", ["P: 3+5=8.", "Left to right: 8÷4=2, 2×3=6"], ["P: 3+5=8.", "8÷4=2.", "2×3=6"]),
          // HARD (10)
          p(3, "4 + 2^3 \\times (6 - 4) \\div 4", "8", ["P: 6-4=2.", "E: 2³=8.", "M/D left to right: 8×2=16, 16÷4=4.", "A: 4+4=8"], ["P: 6-4=2. E: 2³=8.", "8×2=16, 16÷4=4.", "4+4=8"]),
          p(3, "(2 + 3)^2 - 4 \\times (6 - 2)", "9", ["P: 2+3=5 and 6-2=4.", "E: 5²=25.", "M: 4×4=16.", "25-16=9"], ["P: 5 and 4. E: 25.", "M: 16. 25-16=9"]),
          p(3, "3 \\times (2^2 + 1) - 4 \\div 2", "13", ["E: 2²=4.", "P: 4+1=5.", "M: 3×5=15. D: 4÷2=2.", "15-2=13"], ["E: 2²=4. P: 4+1=5.", "3×5=15, 4÷2=2.", "15-2=13"]),
          p(3, "2^3 + (5 - 2) \\times 4 - 1", "19", ["E: 2³=8. P: 5-2=3.", "M: 3×4=12.", "8+12-1=19"], ["E: 8. P: 3. M: 12.", "8+12-1=19"]),
          p(3, "(3 + 1)^2 \\div (2 \\times 4 - 6)", "8", ["P left: 3+1=4.", "P right: 2×4=8, 8-6=2.", "E: 4²=16.", "16÷2=8"], ["P: 4 and 2. E: 16.", "16÷2=8"]),
          p(3, "5^2 - (3 + 2)^2 + 4", "4", ["P: 3+2=5.", "E: 5²=25 and 5²=25.", "25-25+4=4"], ["P: 3+2=5. E: 25 and 25.", "25-25+4=4"]),
          p(3, "2 \\times 3^2 - (4 - 1)^2", "9", ["E: 3²=9. P: 4-1=3, 3²=9.", "M: 2×9=18.", "18-9=9"], ["E: 9 and 9. M: 18.", "18-9=9"]),
          p(3, "(2 + 3) \\times (5 - 2)^2 - 1", "44", ["P: 2+3=5 and 5-2=3.", "E: 3²=9.", "M: 5×9=45.", "45-1=44"], ["P: 5 and 3. E: 9.", "5×9=45. 45-1=44"]),
          p(3, "4^2 \\div (2^2 - 2) \\times 3", "24", ["E: 4²=16, 2²=4.", "P: 4-2=2.", "Left to right: 16÷2=8, 8×3=24"], ["E: 16 and 4. P: 4-2=2.", "16÷2=8.", "8×3=24"]),
          p(3, "3^3 - (4 - 1)^2 \\times (2 + 1)", "0", ["E: 3³=27. P: 4-1=3, 3²=9. P: 2+1=3.", "M: 9×3=27.", "27-27=0"], ["E: 27. P: 9 and 3.", "9×3=27.", "27-27=0"]),
        ],
      },
    },
  })

  // ─── TOPIC 3: Variables & Expressions ─────────────────────────────────────
  await prisma.topic.create({
    data: {
      slug: "variables-and-expressions",
      title: "Variables & Expressions",
      description: "Understand what variables are and how to evaluate algebraic expressions.",
      orderIndex: 3,
      prerequisiteId: topic2.id,
      lessons: {
        create: [
          {
            title: "What Is a Variable?",
            orderIndex: 1,
            content: `WHAT IS A VARIABLE?
===================

A variable is a letter that represents an unknown number.
Most common: x, y, n — but any letter works.

KEY VOCABULARY
  Expression  — numbers, variables, and operations. Example: 3x + 5
  Term        — part separated by + or −. In 3x + 5: terms are 3x and 5
  Coefficient — number multiplied by a variable. In 3x: coefficient is 3
  Constant    — term with no variable. In 3x + 5: constant is 5

EVALUATING EXPRESSIONS
To evaluate: substitute the number for the variable, then simplify.

Example: Evaluate 2x + 5 when x = 3
  Step 1: Replace x with 3:   2(3) + 5
  Step 2: Multiply:            6 + 5
  Step 3: Add:                 11  ✓

Example: Evaluate y² − 3 when y = −2
  Step 1: Replace y with -2:  (-2)² - 3
  Step 2: Exponent:            4 - 3
  Step 3: Subtract:            1  ✓

COMMON PHRASES
  "Five more than x"        →  x + 5
  "Three times a number n"  →  3n
  "A number decreased by 7" →  n - 7
  "Half of a number"        →  n / 2`,
          },
        ],
      },
      problems: {
        create: [
          // EASY (20)
          p(1, "\\text{Evaluate } 2x + 5 \\text{ when } x = 3", "11", ["Substitute: 2(3)+5.", "6+5=11"], ["Replace x with 3.", "2×3=6.", "6+5=11"]),
          p(1, "\\text{Evaluate } y^2 \\text{ when } y = -2", "4", ["(-2)²=(-2)×(-2)=4"], ["Replace y with -2.", "(-2)×(-2)=? (neg×neg=pos)", "4"]),
          p(1, "\\text{Evaluate } 3n \\text{ when } n = 7", "21", ["3×7=21"], ["Replace n with 7.", "3×7=21"]),
          p(1, "\\text{Evaluate } x + 4 \\text{ when } x = -1", "3", ["-1+4=3"], ["Replace x with -1.", "-1+4=3"]),
          p(1, "\\text{Evaluate } 2a - 1 \\text{ when } a = 5", "9", ["2(5)-1=10-1=9"], ["Replace a with 5.", "2×5=10.", "10-1=9"]),
          p(1, "\\text{Evaluate } x^2 \\text{ when } x = 4", "16", ["4²=16"], ["Replace x with 4.", "4×4=16"]),
          p(1, "\\text{Evaluate } 5n + 2 \\text{ when } n = 0", "2", ["5(0)+2=0+2=2"], ["Replace n with 0.", "5×0=0.", "0+2=2"]),
          p(1, "\\text{Evaluate } y - 8 \\text{ when } y = 3", "-5", ["3-8=-5"], ["Replace y with 3.", "3-8=-5"]),
          p(1, "\\text{Evaluate } 4x \\text{ when } x = -3", "-12", ["4×(-3)=-12"], ["Replace x with -3.", "4×(-3)=-12"]),
          p(1, "\\text{Evaluate } n^2 + 1 \\text{ when } n = 3", "10", ["3²+1=9+1=10"], ["3²=9.", "9+1=10"]),
          p(1, "\\text{Evaluate } x - 5 \\text{ when } x = 2", "-3", ["2-5=-3"], ["Replace x with 2.", "2-5=-3"]),
          p(1, "\\text{Evaluate } 6m \\text{ when } m = 4", "24", ["6×4=24"], ["Replace m with 4.", "6×4=24"]),
          p(1, "\\text{Evaluate } a + b \\text{ when } a = 5,\\ b = -2", "3", ["5+(-2)=3"], ["Replace both variables.", "5+(-2)=3"]),
          p(1, "\\text{Evaluate } 2x \\text{ when } x = -6", "-12", ["2×(-6)=-12"], ["Replace x with -6.", "2×(-6)=-12"]),
          p(1, "\\text{Evaluate } n^3 \\text{ when } n = 2", "8", ["2³=2×2×2=8"], ["2³ means 2×2×2.", "8"]),
          p(1, "\\text{Evaluate } 3y + 1 \\text{ when } y = -1", "-2", ["3(-1)+1=-3+1=-2"], ["3×(-1)=-3.", "-3+1=-2"]),
          p(1, "\\text{Evaluate } x^2 - 4 \\text{ when } x = 3", "5", ["3²-4=9-4=5"], ["3²=9.", "9-4=5"]),
          p(1, "\\text{Evaluate } 10 - 2a \\text{ when } a = 3", "4", ["10-2(3)=10-6=4"], ["2×3=6.", "10-6=4"]),
          p(1, "\\text{Evaluate } 4n - 3 \\text{ when } n = 2", "5", ["4(2)-3=8-3=5"], ["4×2=8.", "8-3=5"]),
          p(1, "\\text{Evaluate } x + y \\text{ when } x = -3,\\ y = 7", "4", ["-3+7=4"], ["Replace both.", "-3+7=4"]),
          // MEDIUM (20)
          p(2, "\\text{Evaluate } 3a - 7 \\text{ when } a = 4", "5", ["3(4)-7=12-7=5"], ["3×4=12.", "12-7=5"]),
          p(2, "\\text{Evaluate } 2x^2 + 3x - 1 \\text{ when } x = 2", "13", ["2(4)+3(2)-1=8+6-1=13"], ["x²=4. 2(4)=8, 3(2)=6.", "8+6-1=13"]),
          p(2, "\\text{Evaluate } 2a + 3b \\text{ when } a = 1,\\ b = 4", "14", ["2(1)+3(4)=2+12=14"], ["2×1=2, 3×4=12.", "2+12=14"]),
          p(2, "\\text{Evaluate } x^2 - y \\text{ when } x = 3,\\ y = 4", "5", ["3²-4=9-4=5"], ["x²=9.", "9-4=5"]),
          p(2, "\\text{Evaluate } 3x - 2y \\text{ when } x = 4,\\ y = 3", "6", ["3(4)-2(3)=12-6=6"], ["3×4=12, 2×3=6.", "12-6=6"]),
          p(2, "\\text{Evaluate } -2n + 10 \\text{ when } n = 6", "-2", ["-2(6)+10=-12+10=-2"], ["-2×6=-12.", "-12+10=-2"]),
          p(2, "\\text{Evaluate } (x + 3)^2 \\text{ when } x = 2", "25", ["x+3=5.", "5²=25"], ["2+3=5.", "5²=25"]),
          p(2, "\\text{Evaluate } 2x^2 \\text{ when } x = -3", "18", ["2(-3)²=2(9)=18"], ["(-3)²=9.", "2×9=18"]),
          p(2, "\\text{Evaluate } a^2 + b^2 \\text{ when } a = 3,\\ b = 4", "25", ["3²+4²=9+16=25"], ["3²=9, 4²=16.", "9+16=25"]),
          p(2, "\\text{Evaluate } 4x - y^2 \\text{ when } x = 5,\\ y = 3", "11", ["4(5)-3²=20-9=11"], ["y²=9, 4x=20.", "20-9=11"]),
          p(2, "\\text{Evaluate } x^2 - 2x + 1 \\text{ when } x = 4", "9", ["16-8+1=9"], ["x²=16, 2x=8.", "16-8+1=9"]),
          p(2, "\\text{Evaluate } 3a + 2b - c \\text{ when } a=2,\\ b=3,\\ c=4", "8", ["3(2)+2(3)-4=6+6-4=8"], ["3×2=6, 2×3=6.", "6+6-4=8"]),
          p(2, "\\text{Evaluate } (2x - 1)^2 \\text{ when } x = 3", "25", ["2(3)-1=5.", "5²=25"], ["2×3=6, 6-1=5.", "5²=25"]),
          p(2, "\\text{Evaluate } x^3 - x \\text{ when } x = 2", "6", ["2³-2=8-2=6"], ["2³=8.", "8-2=6"]),
          p(2, "\\text{Evaluate } 5n^2 - 3n + 2 \\text{ when } n = 1", "4", ["5(1)-3(1)+2=5-3+2=4"], ["n²=1.", "5-3+2=4"]),
          p(2, "\\text{Evaluate } (a + b)^2 \\text{ when } a = 2,\\ b = 3", "25", ["a+b=5.", "5²=25"], ["2+3=5.", "5²=25"]),
          p(2, "\\text{Evaluate } 2x + y - z \\text{ when } x=3,\\ y=4,\\ z=6", "4", ["2(3)+4-6=6+4-6=4"], ["2×3=6.", "6+4-6=4"]),
          p(2, "\\text{Evaluate } ab + c \\text{ when } a=3,\\ b=-2,\\ c=10", "4", ["3(-2)+10=-6+10=4"], ["ab=3×(-2)=-6.", "-6+10=4"]),
          p(2, "\\text{Evaluate } x^2 + 2xy + y^2 \\text{ when } x=2,\\ y=3", "25", ["4+2(2)(3)+9=4+12+9=25"], ["x²=4, y²=9, 2xy=12.", "4+12+9=25"]),
          p(2, "\\text{Evaluate } 3m^2 - 12 \\text{ when } m = 2", "0", ["3(4)-12=12-12=0"], ["m²=4.", "3×4=12.", "12-12=0"]),
          // HARD (10)
          p(3, "\\text{Evaluate } \\frac{n + 8}{4} \\text{ when } n = 4", "3", ["Numerator: 4+8=12.", "12÷4=3"], ["n+8=12.", "12÷4=3"]),
          p(3, "\\text{Evaluate } 3x^2 - 2x + 1 \\text{ when } x = -2", "17", ["x²=4.", "3(4)-2(-2)+1=12+4+1=17"], ["x²=4.", "3(4)=12, -2(-2)=+4.", "12+4+1=17"]),
          p(3, "\\text{Evaluate } (a+b)(a-b) \\text{ when } a=5,\\ b=3", "16", ["a+b=8, a-b=2.", "8×2=16"], ["a+b=8 and a-b=2.", "8×2=16"]),
          p(3, "\\text{Evaluate } 2x^3 \\text{ when } x = 2", "16", ["x³=8.", "2×8=16"], ["2³=8.", "2×8=16"]),
          p(3, "\\text{Evaluate } (2n - 3)^2 \\text{ when } n = 4", "25", ["2(4)-3=5.", "5²=25"], ["2×4=8, 8-3=5.", "5²=25"]),
          p(3, "\\text{Evaluate } x^2 - y^2 \\text{ when } x=4,\\ y=3", "7", ["x²=16, y²=9.", "16-9=7"], ["x²=16, y²=9.", "16-9=7"]),
          p(3, "\\text{Evaluate } 2a^2 + 3ab \\text{ when } a=2,\\ b=-1", "2", ["2(4)+3(2)(-1)=8-6=2"], ["a²=4, ab=-2.", "8+3(-2)=8-6=2"]),
          p(3, "\\text{Evaluate } (3x-2)(x+4) \\text{ when } x=2", "24", ["3(2)-2=4.", "2+4=6.", "4×6=24"], ["3x-2=4 and x+4=6.", "4×6=24"]),
          p(3, "\\text{Evaluate } x^3 + y^3 \\text{ when } x=1,\\ y=2", "9", ["1³=1, 2³=8.", "1+8=9"], ["x³=1, y³=8.", "1+8=9"]),
          p(3, "\\text{Evaluate } (x+y)^2 - (x^2+y^2) \\text{ when } x=3,\\ y=4", "24", ["(3+4)²=49.", "x²+y²=9+16=25.", "49-25=24"], ["(x+y)²=49.", "x²+y²=25.", "49-25=24"]),
        ],
      },
    },
  })

  console.log("Seed complete: 3 topics × 50 problems each.")
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
