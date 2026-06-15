import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import PracticeClient from "./PracticeClient"

export default async function PracticePage({ params }: { params: { topicSlug: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  const topic = await prisma.topic.findUnique({
    where: { slug: params.topicSlug },
    include: { problems: { orderBy: { difficulty: "asc" } } },
  })

  if (!topic || topic.problems.length === 0) notFound()

  // Shuffle problems randomly each session
  const shuffled = [...topic.problems].sort(() => Math.random() - 0.5)

  // Serialize for client
  const problems = shuffled.map((p) => ({
    id: p.id,
    difficulty: p.difficulty,
    questionLatex: p.questionLatex,
    answer: p.answer,
    solutionSteps: p.solutionSteps as { steps: string[] },
    hints: p.hints as { hints: string[] },
  }))

  return (
    <PracticeClient
      topic={{ id: topic.id, slug: topic.slug, title: topic.title }}
      problems={problems}
    />
  )
}
