import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  const topics = await prisma.topic.findMany({
    orderBy: { orderIndex: "asc" },
    include: {
      progress: { where: { userId: session.user.id } },
    },
  })

  const masteredIds = new Set(
    topics.filter((t) => t.progress[0]?.status === "mastered").map((t) => t.id)
  )

  function isUnlocked(topic: (typeof topics)[0]) {
    if (!topic.prerequisiteId) return true
    return masteredIds.has(topic.prerequisiteId)
  }

  const totalMastered = masteredIds.size

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <span className="font-bold text-gray-900">Algebra for Beginners</span>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{session.user.name || session.user.email}</span>
            <Link href="/api/auth/signout" className="text-sm text-gray-400 hover:text-gray-600">
              Sign out
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your Learning Path</h2>
            <p className="text-gray-500 mt-1">Complete each topic to unlock the next one.</p>
          </div>
          <span className="text-sm text-gray-500">
            {totalMastered} / {topics.length} mastered
          </span>
        </div>

        <div className="space-y-3">
          {topics.map((topic) => {
            const progress = topic.progress[0]
            const status = progress?.status ?? "not_started"
            const score = progress?.scorePct ?? 0
            const unlocked = isUnlocked(topic)

            return (
              <div
                key={topic.id}
                className={`bg-white rounded-xl border p-5 transition-opacity ${
                  unlocked ? "border-gray-200" : "border-gray-100 opacity-50"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex gap-4 items-center min-w-0">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                        status === "mastered"
                          ? "bg-green-100 text-green-700"
                          : status === "in_progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {status === "mastered" ? "✓" : topic.orderIndex}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{topic.title}</p>
                      <p className="text-sm text-gray-500 truncate">{topic.description}</p>
                      {status !== "not_started" && (
                        <p className="text-xs text-gray-400 mt-0.5">Score: {Math.round(score)}%</p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    {unlocked ? (
                      <>
                        <Link
                          href={`/lessons/${topic.slug}`}
                          className="text-sm border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Lesson
                        </Link>
                        <Link
                          href={`/practice/${topic.slug}`}
                          className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Practice
                        </Link>
                      </>
                    ) : (
                      <span className="text-gray-300 text-lg">🔒</span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
