"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import MathDisplay from "@/components/MathDisplay"

interface Problem {
  id: number
  difficulty: number
  questionLatex: string
  answer: string
  solutionSteps: { steps: string[] }
  hints: { hints: string[] }
}

interface Props {
  topic: { id: number; slug: string; title: string }
  problems: Problem[]
}

const DIFFICULTY_LABEL = ["", "Easy", "Medium", "Hard"]

export default function PracticeClient({ topic, problems }: Props) {
  const [index, setIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null)
  const [showSolution, setShowSolution] = useState(false)
  const [hintIndex, setHintIndex] = useState(-1)
  const [results, setResults] = useState<boolean[]>([])
  const [startTime, setStartTime] = useState(Date.now())
  const [finished, setFinished] = useState(false)

  const problem = problems[index]
  const isLast = index === problems.length - 1

  useEffect(() => {
    setStartTime(Date.now())
    setUserAnswer("")
    setFeedback(null)
    setShowSolution(false)
    setHintIndex(-1)
  }, [index])

  async function submitAnswer() {
    const isCorrect = userAnswer.trim().toLowerCase() === problem.answer.trim().toLowerCase()
    const timeSpentSec = Math.round((Date.now() - startTime) / 1000)

    setFeedback(isCorrect ? "correct" : "wrong")
    setResults((prev) => [...prev, isCorrect])

    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        problemId: problem.id,
        topicId: topic.id,
        userAnswer: userAnswer.trim(),
        isCorrect,
        timeSpentSec,
      }),
    })
  }

  function next() {
    if (isLast) {
      setFinished(true)
    } else {
      setIndex((i) => i + 1)
    }
  }

  function restart() {
    setIndex(0)
    setResults([])
    setFinished(false)
  }

  if (finished) {
    const correct = results.filter(Boolean).length
    const score = Math.round((correct / problems.length) * 100)
    const mastered = score >= 70

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-10 max-w-sm w-full text-center">
          <div className="text-5xl mb-4">{mastered ? "🎉" : "💪"}</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {mastered ? "Topic Mastered!" : "Good Effort!"}
          </h2>
          <p className="text-gray-500 mb-2">
            {correct} of {problems.length} correct
          </p>
          <p className="text-4xl font-bold text-blue-600 mb-6">{score}%</p>
          {!mastered && (
            <p className="text-sm text-gray-400 mb-6">
              Score 70% or higher to unlock the next topic.
            </p>
          )}
          <div className="flex gap-3 justify-center">
            <button
              onClick={restart}
              className="border border-gray-200 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              Try Again
            </button>
            <Link
              href="/dashboard"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="text-sm text-gray-400 hover:text-gray-600">
            ← Dashboard
          </Link>
          <span className="text-sm text-gray-500 font-medium">{topic.title}</span>
          <span className="text-sm text-gray-400">
            {index + 1} / {problems.length}
          </span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10">
        {/* Progress bar */}
        <div className="h-1.5 bg-gray-200 rounded-full mb-8">
          <div
            className="h-1.5 bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${(index / problems.length) * 100}%` }}
          />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <span className="inline-block text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full mb-6">
            {DIFFICULTY_LABEL[problem.difficulty]}
          </span>

          {/* Question */}
          <p className="text-sm text-gray-400 mb-2">Evaluate:</p>
          <div className="py-6 text-center text-3xl">
            <MathDisplay latex={problem.questionLatex} />
          </div>

          {/* Hints */}
          {hintIndex >= 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 space-y-1.5">
              {problem.hints.hints.slice(0, hintIndex + 1).map((hint, i) => (
                <p key={i} className="text-sm text-amber-800">
                  {i === 0 ? "💡 " : "→ "}
                  {hint}
                </p>
              ))}
            </div>
          )}

          {/* Solution steps */}
          {showSolution && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm font-semibold text-blue-800 mb-2">Step-by-step solution:</p>
              <ol className="space-y-1">
                {problem.solutionSteps.steps.map((step, i) => (
                  <li key={i} className="text-sm text-blue-700">
                    {i + 1}. {step}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Input */}
          {!feedback && (
            <div className="space-y-4">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && userAnswer.trim() && submitAnswer()}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-xl text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your answer"
                autoFocus
              />
              <div className="flex gap-3">
                {hintIndex < problem.hints.hints.length - 1 && (
                  <button
                    onClick={() => setHintIndex((i) => i + 1)}
                    className="flex-1 border border-amber-300 text-amber-700 py-2 rounded-lg text-sm font-medium hover:bg-amber-50 transition-colors"
                  >
                    Hint
                  </button>
                )}
                <button
                  onClick={submitAnswer}
                  disabled={!userAnswer.trim()}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-40 transition-colors"
                >
                  Check Answer
                </button>
              </div>
            </div>
          )}

          {/* Correct feedback */}
          {feedback === "correct" && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-700 font-semibold text-lg">Correct!</p>
                <p className="text-green-600 text-sm mt-1">Answer: {problem.answer}</p>
              </div>
              <button
                onClick={next}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {isLast ? "See Results →" : "Next Problem →"}
              </button>
            </div>
          )}

          {/* Wrong feedback */}
          {feedback === "wrong" && (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <p className="text-red-700 font-semibold">Not quite.</p>
                <p className="text-red-500 text-sm mt-1">Your answer: {userAnswer}</p>
              </div>
              <div className="flex gap-3">
                {!showSolution && (
                  <button
                    onClick={() => setShowSolution(true)}
                    className="flex-1 border border-blue-200 text-blue-600 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
                  >
                    Show Solution
                  </button>
                )}
                <button
                  onClick={next}
                  className="flex-1 bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
                >
                  {isLast ? "See Results →" : "Next Problem →"}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
