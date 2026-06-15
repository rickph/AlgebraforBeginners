import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function LessonPage({ params }: { params: { topicSlug: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  const topic = await prisma.topic.findUnique({
    where: { slug: params.topicSlug },
    include: { lessons: { orderBy: { orderIndex: "asc" } } },
  })

  if (!topic || topic.lessons.length === 0) notFound()

  const lesson = topic.lessons[0]

  // Mark in_progress only if not already mastered
  await prisma.userProgress.upsert({
    where: { userId_topicId: { userId: session.user.id, topicId: topic.id } },
    create: { userId: session.user.id, topicId: topic.id, status: "in_progress" },
    update: { lastAttemptedAt: new Date() },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3 text-sm">
          <Link href="/dashboard" className="text-gray-400 hover:text-gray-600">
            Dashboard
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-medium">{topic.title}</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h1 className="text-xl font-bold text-gray-900 mb-6">{lesson.title}</h1>
          <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-6 overflow-x-auto">
            {lesson.content}
          </pre>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to Dashboard
          </Link>
          <Link
            href={`/practice/${topic.slug}`}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Practice →
          </Link>
        </div>
      </main>
    </div>
  )
}
