import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { problemId, topicId, userAnswer, isCorrect, timeSpentSec } = await req.json()

  await prisma.attempt.create({
    data: {
      userId: session.user.id,
      problemId,
      userAnswer,
      isCorrect,
      timeSpentSec: timeSpentSec ?? 0,
    },
  })

  // Score = latest attempt per problem / total problems in topic
  const topicProblems = await prisma.problem.findMany({
    where: { topicId },
    select: { id: true },
  })

  let correctCount = 0
  for (const problem of topicProblems) {
    const latest = await prisma.attempt.findFirst({
      where: { userId: session.user.id, problemId: problem.id },
      orderBy: { createdAt: "desc" },
    })
    if (latest?.isCorrect) correctCount++
  }

  const scorePct = topicProblems.length > 0 ? (correctCount / topicProblems.length) * 100 : 0
  const status = scorePct >= 70 ? "mastered" : "in_progress"

  await prisma.userProgress.upsert({
    where: { userId_topicId: { userId: session.user.id, topicId } },
    create: { userId: session.user.id, topicId, status, scorePct, lastAttemptedAt: new Date() },
    update: { status, scorePct, lastAttemptedAt: new Date() },
  })

  return NextResponse.json({ ok: true, scorePct, status })
}
