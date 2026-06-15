import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

const TOPICS = [
  { num: "01", title: "Number Sense & Operations", desc: "Integers, absolute value, and arithmetic rules" },
  { num: "02", title: "Order of Operations", desc: "PEMDAS — knowing what to calculate first" },
  { num: "03", title: "Variables & Expressions", desc: "What x means and how to evaluate expressions" },
  { num: "04", title: "Simplifying Expressions", desc: "Combining like terms and cleaning up" },
  { num: "05", title: "Solving One-Step Equations", desc: "Find the unknown with one operation" },
  { num: "06", title: "Solving Two-Step Equations", desc: "Tackle equations with two operations" },
  { num: "07", title: "Inequalities", desc: "Greater than, less than, and everything in between" },
  { num: "08", title: "Graphing Basics", desc: "Coordinate plane, plotting points, slope" },
  { num: "09", title: "Linear Equations", desc: "Slope-intercept form and graphing lines" },
  { num: "10", title: "Word Problems", desc: "Translating English sentences into algebra" },
]

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  if (session) redirect("/dashboard")

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Algebra for Beginners</h1>
          <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
            Struggling with algebra? You're in the right place. Learn step by step, practice at
            your own pace.
          </p>
          <p className="text-gray-500 mb-10">
            No confusing textbooks. No skipped steps. Just clear lessons and real practice.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Learning — Free
            </Link>
            <Link
              href="/login"
              className="border border-gray-300 bg-white text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Topic list */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">What You'll Learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {TOPICS.map((topic) => (
              <div
                key={topic.num}
                className="bg-white rounded-lg p-4 border border-gray-200 flex gap-4 items-start"
              >
                <span className="text-blue-400 font-mono font-bold text-sm flex-shrink-0">
                  {topic.num}
                </span>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{topic.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{topic.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              {
                icon: "📖",
                title: "1. Read the Lesson",
                desc: "Each topic starts with a clear, plain-English explanation with worked examples.",
              },
              {
                icon: "✏️",
                title: "2. Practice Problems",
                desc: "Apply what you learned. Get instant feedback and hints if you're stuck.",
              },
              {
                icon: "🔓",
                title: "3. Unlock the Next Topic",
                desc: "Score 70% or higher to unlock the next topic. Build a real foundation.",
              },
            ].map((step) => (
              <div key={step.title}>
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
