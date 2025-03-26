
"use client"

import type { NewsPredictionResponse } from "./TextPredictor"
import { AlertTriangle, CheckCircle, BarChart3 } from "lucide-react"

const MLPredictor = (props: { prediction: NewsPredictionResponse }) => {
  const { prediction } = props

  if (!prediction) return null

  // Calculate the highest probability for highlighting
  const getHighestProbability = (probabilities: Record<string, number>) => {
    return Object.entries(probabilities).reduce((a, b) => (a[1] > b[1] ? a : b))[0]
  }

  const logisticHighest = getHighestProbability(prediction.logistic_regression_probabilities)
  const passiveHighest = getHighestProbability(prediction.passive_aggressive_probabilities)
  const decisionTreeHighest = getHighestProbability(prediction.decision_tree_probabilities)

  return (
    <div className="mt-16 animate-fadeIn">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-white mb-2">Analysis Results</h3>
        <p className="text-gray-400">Our machine learning models have analyzed your content</p>
      </div>

      {/* Final Prediction Banner */}
      <div
        className={`mb-10 p-6 rounded-xl flex items-center justify-between ${
          prediction.prediction === "FAKE"
            ? "bg-red-500/20 border border-red-500/30"
            : "bg-green-500/20 border border-green-500/30"
        }`}
      >
        <div className="flex items-center">
          {prediction.prediction === "FAKE" ? (
            <AlertTriangle className="w-10 h-10 text-red-500 mr-4" />
          ) : (
            <CheckCircle className="w-10 h-10 text-green-500 mr-4" />
          )}
          <div>
            <h4 className="text-xl font-bold text-white">
              {prediction.prediction === "FAKE" ? "Potentially Misleading Content" : "Likely Authentic Content"}
            </h4>
            <p className="text-gray-300">
              {prediction.prediction === "FAKE"
                ? "Our analysis suggests this content may contain misinformation."
                : "Our analysis suggests this content is likely to be reliable."}
            </p>
          </div>
        </div>
        <div className={`text-3xl font-bold ${prediction.prediction === "FAKE" ? "text-red-500" : "text-green-500"}`}>
          {prediction.prediction}
        </div>
      </div>

      {/* Model Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Logistic Regression */}
        <div className="bg-neutral-800/50 rounded-xl border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center">
            <BarChart3 className="w-5 h-5 text-lime-400 mr-2" />
            <h4 className="font-semibold text-white">Logistic Regression</h4>
          </div>
          <div className="p-4">
            {Object.entries(prediction.logistic_regression_probabilities).map(([key, value]) => (
              <div key={key} className="mb-2 last:mb-0">
                <div className="flex justify-between mb-1">
                  <span
                    className={`text-sm font-medium ${
                      key === logisticHighest ? (key === "FAKE" ? "text-red-400" : "text-green-400") : "text-gray-400"
                    }`}
                  >
                    {key}
                  </span>
                  <span className="text-sm font-medium text-white">{(value * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-neutral-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${key === "FAKE" ? "bg-red-500" : "bg-green-500"}`}
                    style={{ width: `${value * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Passive Aggressive */}
        <div className="bg-neutral-800/50 rounded-xl border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center">
            <BarChart3 className="w-5 h-5 text-lime-400 mr-2" />
            <h4 className="font-semibold text-white">Passive Aggressive</h4>
          </div>
          <div className="p-4">
            {Object.entries(prediction.passive_aggressive_probabilities).map(([key, value]) => (
              <div key={key} className="mb-2 last:mb-0">
                <div className="flex justify-between mb-1">
                  <span
                    className={`text-sm font-medium ${
                      key === passiveHighest ? (key === "FAKE" ? "text-red-400" : "text-green-400") : "text-gray-400"
                    }`}
                  >
                    {key}
                  </span>
                  <span className="text-sm font-medium text-white">{(value * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-neutral-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${key === "FAKE" ? "bg-red-500" : "bg-green-500"}`}
                    style={{ width: `${value * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decision Tree */}
        <div className="bg-neutral-800/50 rounded-xl border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center">
            <BarChart3 className="w-5 h-5 text-lime-400 mr-2" />
            <h4 className="font-semibold text-white">Decision Tree</h4>
          </div>
          <div className="p-4">
            {Object.entries(prediction.decision_tree_probabilities).map(([key, value]) => (
              <div key={key} className="mb-2 last:mb-0">
                <div className="flex justify-between mb-1">
                  <span
                    className={`text-sm font-medium ${
                      key === decisionTreeHighest
                        ? key === "FAKE"
                          ? "text-red-400"
                          : "text-green-400"
                        : "text-gray-400"
                    }`}
                  >
                    {key}
                  </span>
                  <span className="text-sm font-medium text-white">{(value * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-neutral-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${key === "FAKE" ? "bg-red-500" : "bg-green-500"}`}
                    style={{ width: `${value * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-8 p-6 bg-neutral-800/30 rounded-xl border border-white/10">
        <h4 className="text-lg font-semibold text-white mb-3">How to interpret these results:</h4>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start">
            <span className="text-lime-400 mr-2">•</span>
            <span>Each model analyzes different aspects of the content to determine authenticity.</span>
          </li>
          <li className="flex items-start">
            <span className="text-lime-400 mr-2">•</span>
            <span>Higher percentages indicate stronger confidence in the classification.</span>
          </li>
          <li className="flex items-start">
            <span className="text-lime-400 mr-2">•</span>
            <span>The final prediction combines insights from all three models.</span>
          </li>
          <li className="flex items-start">
            <span className="text-lime-400 mr-2">•</span>
            <span>Always verify information from multiple reliable sources.</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MLPredictor

