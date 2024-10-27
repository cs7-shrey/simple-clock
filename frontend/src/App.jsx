"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function order(isSunday, isMorningWorkHour, isEvening, isNight) {
  if (isMorningWorkHour) {
    return "It's a work hour. You should be at the fuckin' library";
  }
  if (isNight) {
    if (isSunday) return "The offset from hangout should be enough. If you need more help, visit https://music.youtube.com/";
  }
  else if (isEvening) {
    if (isSunday) return "It's evening buddy. Go hangout with your friends or visit the mall ya fir Kair ki bani chala ja";
    else return "It's weekday baby! Go hit the gym!"
  }
}

export default function Component() {
  const [daysPassed, setDaysPassed] = useState(0)
  const [quote, setQuote] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [guide, setGuide] = useState("")

  const targetDate = new Date("2024-10-05T00:00:00+05:30")

  const now = new Date();
  const isSunday = now.getDay() === 0;
  const isMorningWorkHour = now.getHours() >= 11 && now.getHours() < 18;
  const isEvening = now.getHours() >= 18 && now.getHours() < 20;
  const isNight = (now.getHours() >= 20 && now.getHours() < 23) || (now.getHours() < 24 && now.getMinutes() < 30);

  useEffect(() => {
    const calculateDaysPassed = () => {
      const now = new Date()
      const timeDiff = now.getTime() - targetDate.getTime()
      const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24))
      setDaysPassed(daysDiff)
    }

    setGuide(order(isSunday, isMorningWorkHour, isEvening, isNight));

    calculateDaysPassed()
    const timer = setInterval(calculateDaysPassed, 1000 * 60 * 60) // Update every hour

    return () => clearInterval(timer)
  }, [])

  const fetchQuote = async () => {
    setIsLoading(true)
    setError("")
    try {
      const response = await fetch("https://simpleclockbackend-gxeyedauc4afdcbk.canadacentral-01.azurewebsites.net/quote")
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
      <div className="flex justify-center">
        <CardHeader>
          <CardTitle>Winter Arc</CardTitle>
        </CardHeader>
      </div>
      <CardContent className="space-y-4">
        <p className="text-2xl font-bold text-center">
          Day (UTC+5:30):
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
        <hr />
        <div>
          <h3 className="text-lg font-semibold">I'm here bro</h3>
          <p>{guide}</p>
        </div>
      </CardContent>
    </Card>
  )
}