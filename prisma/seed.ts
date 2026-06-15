import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Topic 1: Number Sense (no prerequisite)
  const topic1 = await prisma.topic.upsert({
    where: { slug: "number-sense" },
    update: {},
    create: {
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
Written as |x|:
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
          {
            difficulty: 1,
            questionLatex: "|-7|",
            answer: "7",
            solutionSteps: {
              steps: [
                "Absolute value means distance from zero — always positive.",
                "-7 is 7 steps away from 0 on the number line.",
                "So |-7| = 7",
              ],
            },
            hints: {
              hints: [
                "Absolute value is always positive — it's a distance.",
                "-7 is 7 steps from 0.",
                "Answer: 7",
              ],
            },
          },
          {
            difficulty: 1,
            questionLatex: "-5 + 3",
            answer: "-2",
            solutionSteps: {
              steps: [
                "Different signs: subtract the smaller absolute value from the larger.",
                "|-5| = 5 and |3| = 3. Difference = 5 - 3 = 2.",
                "-5 has the larger absolute value, so the result is negative.",
                "Answer: -2",
              ],
            },
            hints: {
              hints: [
                "The signs are different. Which has the bigger absolute value?",
                "|-5| = 5 is bigger than |3| = 3. The answer will be negative.",
                "5 - 3 = 2, and it's negative: -2",
              ],
            },
          },
          {
            difficulty: 1,
            questionLatex: "(-3) \\times (-4)",
            answer: "12",
            solutionSteps: {
              steps: [
                "Negative × Negative = Positive.",
                "3 × 4 = 12.",
                "Both negatives cancel out, so the answer is positive: 12",
              ],
            },
            hints: {
              hints: [
                "What is the sign rule for negative × negative?",
                "Negative × Negative = Positive.",
                "3 × 4 = 12, and two negatives make a positive. Answer: 12",
              ],
            },
          },
          {
            difficulty: 1,
            questionLatex: "-12 \\div 4",
            answer: "-3",
            solutionSteps: {
              steps: [
                "Negative ÷ Positive = Negative.",
                "12 ÷ 4 = 3.",
                "Apply the sign: -3",
              ],
            },
            hints: {
              hints: [
                "Negative ÷ Positive = Negative.",
                "Ignore signs for now: 12 ÷ 4 = 3.",
                "Now apply the negative sign: -3",
              ],
            },
          },
          {
            difficulty: 2,
            questionLatex: "-8 + (-5) - (-3)",
            answer: "-10",
            solutionSteps: {
              steps: [
                "Subtracting a negative is the same as adding: -(-3) = +3.",
                "Rewrite: -8 + (-5) + 3",
                "-8 + (-5) = -13",
                "-13 + 3 = -10",
              ],
            },
            hints: {
              hints: [
                "Subtracting a negative: -(-3) means +3.",
                "Rewrite as: -8 + (-5) + 3",
                "Add left to right: -8 + (-5) = -13, then -13 + 3 = -10",
              ],
            },
          },
        ],
      },
    },
  })

  // Topic 2: Order of Operations (requires Topic 1)
  const topic2 = await prisma.topic.upsert({
    where: { slug: "order-of-operations" },
    update: {},
    create: {
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

When an expression has multiple operations, you must follow a specific order.
We call this PEMDAS:

  P — Parentheses   →  (3 + 2)
  E — Exponents     →  2³
  M — Multiplication
  D — Division         (M and D: equal priority, left to right)
  A — Addition
  S — Subtraction      (A and S: equal priority, left to right)

EXAMPLE 1: No Parentheses
  Evaluate: 2 + 3 × 4

  Step 1: Multiplication first (M before A): 3 × 4 = 12
  Step 2: Addition: 2 + 12 = 14  ✓

  Common mistake: doing 2 + 3 first = 5, then 5 × 4 = 20. WRONG.

EXAMPLE 2: With Parentheses
  Evaluate: (2 + 3) × 4

  Step 1: Parentheses first: 2 + 3 = 5
  Step 2: Multiply: 5 × 4 = 20  ✓

EXAMPLE 3: With Exponents
  Evaluate: 10 - 2² + 1

  Step 1: Exponent first: 2² = 4
  Step 2: Left to right: 10 - 4 = 6, then 6 + 1 = 7  ✓

THE GOLDEN RULE
Always ask: "Am I following PEMDAS?" Work one step at a time.`,
          },
        ],
      },
      problems: {
        create: [
          {
            difficulty: 1,
            questionLatex: "2 + 3 \\times 4",
            answer: "14",
            solutionSteps: {
              steps: [
                "PEMDAS: Multiplication before Addition.",
                "3 × 4 = 12",
                "2 + 12 = 14",
              ],
            },
            hints: {
              hints: [
                "Which operation comes first according to PEMDAS?",
                "Multiplication (M) comes before Addition (A). Do 3 × 4 first.",
                "3 × 4 = 12, then 2 + 12 = 14",
              ],
            },
          },
          {
            difficulty: 1,
            questionLatex: "(2 + 3) \\times 4",
            answer: "20",
            solutionSteps: {
              steps: [
                "P in PEMDAS — Parentheses first.",
                "2 + 3 = 5",
                "5 × 4 = 20",
              ],
            },
            hints: {
              hints: [
                "P = Parentheses. What's inside the parentheses?",
                "2 + 3 = 5",
                "Now multiply: 5 × 4 = 20",
              ],
            },
          },
          {
            difficulty: 2,
            questionLatex: "10 - 2^2 + 1",
            answer: "7",
            solutionSteps: {
              steps: [
                "E in PEMDAS — Exponents first. 2² = 4",
                "Expression is now: 10 - 4 + 1",
                "Left to right: 10 - 4 = 6, then 6 + 1 = 7",
              ],
            },
            hints: {
              hints: [
                "E in PEMDAS = Exponents. What is 2²?",
                "2² = 4. Now the expression is 10 - 4 + 1.",
                "Work left to right: 10 - 4 = 6, then 6 + 1 = 7",
              ],
            },
          },
          {
            difficulty: 2,
            questionLatex: "3 \\times (4 + 2) \\div 6",
            answer: "3",
            solutionSteps: {
              steps: [
                "Parentheses first: 4 + 2 = 6",
                "Expression: 3 × 6 ÷ 6",
                "Multiplication and Division left to right: 3 × 6 = 18",
                "18 ÷ 6 = 3",
              ],
            },
            hints: {
              hints: [
                "Start with parentheses: 4 + 2 = ?",
                "Now you have 3 × 6 ÷ 6. Handle × and ÷ left to right.",
                "3 × 6 = 18, then 18 ÷ 6 = 3",
              ],
            },
          },
          {
            difficulty: 3,
            questionLatex: "4 + 2^3 \\times (6 - 4) \\div 4",
            answer: "8",
            solutionSteps: {
              steps: [
                "P — Parentheses: 6 - 4 = 2",
                "Expression: 4 + 2³ × 2 ÷ 4",
                "E — Exponents: 2³ = 8",
                "Expression: 4 + 8 × 2 ÷ 4",
                "M/D left to right: 8 × 2 = 16, then 16 ÷ 4 = 4",
                "A — Addition: 4 + 4 = 8",
              ],
            },
            hints: {
              hints: [
                "Start with P: what's inside (6 - 4)?",
                "Next, E: what is 2³?",
                "Then handle × and ÷ left to right, and finally the + at the very end.",
              ],
            },
          },
        ],
      },
    },
  })

  // Topic 3: Variables & Expressions (requires Topic 2)
  await prisma.topic.upsert({
    where: { slug: "variables-and-expressions" },
    update: {},
    create: {
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

WHY VARIABLES?
Instead of writing specific numbers every time, variables let us write
general rules that work for any value.

  Specific: "Five times three, plus two" = 17
  General:   5x + 2   (works for any x)

KEY VOCABULARY
  Expression  — a math phrase: numbers, variables, operations. Example: 3x + 5
  Term        — a part separated by + or −. In 3x + 5: the terms are 3x and 5
  Coefficient — the number multiplied by a variable. In 3x: coefficient is 3
  Constant    — a term with no variable. In 3x + 5: the constant is 5

EVALUATING EXPRESSIONS
To evaluate means to find the value by substituting a number for the variable.

Example: Evaluate 2x + 5 when x = 3
  Step 1: Replace x with 3:   2(3) + 5
  Step 2: Multiply:            6 + 5
  Step 3: Add:                 11  ✓

Example: Evaluate y² − 3 when y = −2
  Step 1: Replace y with -2:  (-2)² - 3
  Step 2: Exponent:            4 - 3
  Step 3: Subtract:            1  ✓

WRITING EXPRESSIONS FROM WORDS
  "Five more than x"        →  x + 5
  "Three times a number n"  →  3n
  "A number decreased by 7" →  n - 7
  "Half of a number"        →  n / 2`,
          },
        ],
      },
      problems: {
        create: [
          {
            difficulty: 1,
            questionLatex: "\\text{Evaluate } 2x + 5 \\text{ when } x = 3",
            answer: "11",
            solutionSteps: {
              steps: [
                "Substitute x = 3: 2(3) + 5",
                "Multiply: 6 + 5",
                "Add: 11",
              ],
            },
            hints: {
              hints: [
                "Replace every x with 3.",
                "You now have 2(3) + 5. What is 2 × 3?",
                "6 + 5 = 11",
              ],
            },
          },
          {
            difficulty: 1,
            questionLatex: "\\text{Evaluate } y^2 \\text{ when } y = -2",
            answer: "4",
            solutionSteps: {
              steps: [
                "Substitute y = -2: (-2)²",
                "(-2)² means (-2) × (-2)",
                "Negative × Negative = Positive: 4",
              ],
            },
            hints: {
              hints: [
                "Replace y with -2: (-2)²",
                "(-2)² = (-2) × (-2). What do you get?",
                "Negative × Negative = Positive. Answer: 4",
              ],
            },
          },
          {
            difficulty: 2,
            questionLatex: "\\text{Evaluate } 3a - 7 \\text{ when } a = 4",
            answer: "5",
            solutionSteps: {
              steps: [
                "Substitute a = 4: 3(4) - 7",
                "Multiply: 12 - 7",
                "Subtract: 5",
              ],
            },
            hints: {
              hints: [
                "Replace a with 4.",
                "3 × 4 = 12. Now subtract 7.",
                "12 - 7 = 5",
              ],
            },
          },
          {
            difficulty: 2,
            questionLatex: "\\text{Evaluate } 2x^2 + 3x - 1 \\text{ when } x = 2",
            answer: "13",
            solutionSteps: {
              steps: [
                "Substitute x = 2: 2(2)² + 3(2) - 1",
                "Exponent first: 2² = 4, so: 2(4) + 3(2) - 1",
                "Multiply: 8 + 6 - 1",
                "Left to right: 8 + 6 = 14, then 14 - 1 = 13",
              ],
            },
            hints: {
              hints: [
                "Replace all x with 2: 2(2)² + 3(2) - 1",
                "Handle exponent first: 2² = 4",
                "Now: 2(4) + 3(2) - 1 = 8 + 6 - 1 = 13",
              ],
            },
          },
          {
            difficulty: 3,
            questionLatex: "\\text{Evaluate } \\frac{n + 8}{4} \\text{ when } n = 4",
            answer: "3",
            solutionSteps: {
              steps: [
                "Substitute n = 4: (4 + 8) / 4",
                "Numerator first: 4 + 8 = 12",
                "Divide: 12 / 4 = 3",
              ],
            },
            hints: {
              hints: [
                "Substitute n = 4 into the expression.",
                "The numerator becomes 4 + 8 = ?",
                "12 divided by 4 = 3",
              ],
            },
          },
        ],
      },
    },
  })

  console.log("Seed complete: 3 topics with lessons and problems created.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
