"use client"

import { useEffect, useRef } from "react"
import katex from "katex"

interface Props {
  latex: string
  display?: boolean
}

export default function MathDisplay({ latex, display = true }: Props) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (ref.current) {
      katex.render(latex, ref.current, {
        throwOnError: false,
        displayMode: display,
      })
    }
  }, [latex, display])

  return <span ref={ref} />
}
