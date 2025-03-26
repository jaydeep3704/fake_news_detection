"use client"

import { useState, useCallback } from "react"
import axios from "axios"
import MLPredictor from "./MLPredictor"
import { AlertTriangle, Send, Newspaper } from "lucide-react"

export interface NewsPredictionResponse {
  logistic_regression_probabilities: {
    FAKE: number
    REAL: number
  }
  passive_aggressive_probabilities: {
    FAKE: number
    REAL: number
  }
  decision_tree_probabilities: {
    FAKE: number
    REAL: number
  }
  prediction: "FAKE" | "REAL"
}

const TextPredictor = () => {
  const [text, setText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [prediction, setPrediction] = useState<NewsPredictionResponse | null>(null)

  const getPrediction = async () => {
    if (!text.trim()) {
      setError("Please enter some text to analyze")
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      const url = "http://localhost:5000/predict"
      const response = await axios.post(url, {
        text: text,
      })
      setPrediction(response.data as NewsPredictionResponse)
    } catch (error) {
      console.error(error)
      setError("Failed to analyze text. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  // Sample news headlines for inspiration
  const sampleHeadlines = [
    "Scientists Discover Revolutionary Cancer Treatment with 95% Success Rate",
    "Breaking: Government Admits to Hiding Alien Technology for Decades",
    "New Study Shows Coffee Reduces Risk of Heart Disease by 30%",
    "Experts Warn: Smartphone Use Linked to Rare Brain Condition",
  ]

  const useSampleHeadline = useCallback(
    (headline: string) => {
      setText(headline)
    },
    [setText],
  )

  return (
    <section className="py-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-neutral-800/50 rounded-2xl border border-white/10 p-6 md:p-8 shadow-xl">
          <div className="flex flex-col gap-6">
            {/* Text input area with floating label */}
            <div className="relative">
              <textarea
                rows={5}
                className="w-full p-4 pr-12 bg-neutral-900 rounded-xl border border-white/15 text-white placeholder-transparent focus:border-lime-400/50 focus:ring-1 focus:ring-lime-400/50 transition-all duration-200 peer"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter news headline or content"
                id="news-content"
              />
              <label
                htmlFor="news-content"
                className="absolute left-4 -top-6 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-6 peer-focus:text-lime-400 peer-focus:text-sm"
              >
                Enter news headline or content to analyze
              </label>
              <Newspaper className="absolute right-4 top-4 text-gray-500 w-5 h-5" />
            </div>

            {/* Sample headlines */}
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Try one of these examples:</p>
              <div className="flex flex-wrap gap-2">
                {sampleHeadlines.map((headline, index) => (
                  <button
                    key={index}
                    onClick={() => useSampleHeadline(headline)}
                    className="text-sm bg-neutral-900 hover:bg-neutral-800 text-gray-300 px-3 py-1.5 rounded-full border border-white/10 transition-colors duration-200"
                  >
                    {headline.length > 40 ? headline.substring(0, 40) + "..." : headline}
                  </button>
                ))}
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg">
                <AlertTriangle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit button */}
            <button
              className="self-center cursor-pointer py-3 px-8 text-xl font-semibold bg-lime-400 text-neutral-900 border-none rounded-full 
                            w-full md:w-auto flex gap-3 items-center justify-center hover:bg-lime-500 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={getPrediction}
              disabled={isLoading || !text.trim()}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-neutral-900" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Analyze Content
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results section */}
        <MLPredictor prediction={prediction as NewsPredictionResponse} />
      </div>
    </section>
  )
}

export default TextPredictor

