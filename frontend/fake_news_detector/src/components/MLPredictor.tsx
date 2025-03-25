import React from 'react'
import { NewsPredictionResponse } from './TextPredictor'
const MLPredictor = (props:{prediction:NewsPredictionResponse}) => {
    const {prediction}=props
  return (
    <div>
       {prediction && (
                    <div className="mt-10">
                        <div>
                            {/* Display probabilities for Naive Bayes */}
                            <div className="text-lg font-semibold mt-5">Logistic Regression Probabilities:</div>
                            <ul className='flex flex-col md:flex-row mt-5 rounded-xl overflow-hidden'>
                                {Object.entries(prediction.logistic_regression_probabilities).map(([key, value]) => (
                                    <li key={key} className='md:w-1/2 py-2 px-5 font-semibold'>
                                        <span className={key === "FAKE" ? 'text-red-600' : 'text-green-600'}>{key}:</span> {value}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Display probabilities for Passive Aggressive */}
                        <div className="text-lg font-semibold mt-5">Passive Aggressive Probabilities:</div>
                        <ul className='flex flex-col md:flex-row mt-5 rounded-xl overflow-hidden'>
                            {Object.entries(prediction.passive_aggressive_probabilities).map(([key, value]) => (
                                <li key={key} className='md:w-1/2 py-2 px-5 font-semibold'>
                                    <span className={key === "FAKE" ? 'text-red-600' : 'text-green-600'}>{key}:</span> {value}
                                </li>
                            ))}
                        </ul>

                        {/* Display Final Prediction */}
                        <div className=" text-lg font-semibold mt-5">Final Prediction: <span>{prediction.prediction}</span></div>
                    </div>
                )}
    </div>
  )
}

export default MLPredictor
