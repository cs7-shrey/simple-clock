"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Component() {
  const [daysPassed, setDaysPassed] = useState(0)
  const [quote, setQuote] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const targetDate = new Date("2024-10-05T00:00:00+05:30")

  useEffect(() => {
    const calculateDaysPassed = () => {
      const now = new Date()
      const timeDiff = now.getTime() - targetDate.getTime()
      const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24))
      setDaysPassed(daysDiff)
    }

    calculateDaysPassed()
    const timer = setInterval(calculateDaysPassed, 1000 * 60 * 60) // Update every hour

    return () => clearInterval(timer)
  }, [])

  const fetchQuote = async () => {
    setIsLoading(true)
    setError("")
    try {
      const response = await fetch("http://localhost:8000/quote")
      if (!response.ok) {
        throw new Error("Failed to fetch quote", "status:", response.status)
      }
      const data = await response.json()
      setQuote(data.quote)
    } catch (err) {
      setError("Failed to fetch quote. Please try again.", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Winter Arc</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-2xl font-bold text-center">
          Days passed since October 5th, 2024 (UTC+5:30):
          <span className="block text-4xl text-primary mt-2">{daysPassed}</span>
        </p>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Quote of the moment:</h3>
          {isLoading ? (
            <p>Loading quote...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p className="italic">&ldquo;{quote}&rdquo;</p>
          )}
        </div>
        <Button onClick={fetchQuote} disabled={isLoading} className="w-full">
          {isLoading ? "Fetching..." : "Get New Quote"}
        </Button>
      </CardContent>
    </Card>
  )
}