"use client";

import React, { useState } from 'react';
import axios from 'axios';
import MLPredictor from './MLPredictor';


export interface NewsPredictionResponse {
    logistic_regression_probabilities: {
        FAKE: number;
        REAL: number;
    };
    passive_aggressive_probabilities: {
        FAKE: number;
        REAL: number;
    };
    decision_tree_probabilities:{
        FAKE: number;
        REAL: number;
    }
    prediction: "FAKE" | "REAL"; // Since prediction is either 'FAKE' or 'REAL'
}



const TextPredictor = () => {
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false); // State to track if the request is loading


    const [prediction, setPrediction] = useState<NewsPredictionResponse | null>(null);
    const getPrediction = async () => {
        setIsLoading(true); // Set loading state to true when request starts
        try {
            const url = "http://127.0.0.1:5000/predict";
            const response = await axios.post(url, {
                text: text
            });
            setPrediction(response.data as NewsPredictionResponse);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false); // Set loading state to false when request is done
        }
    };
    

    return (
        <section className="py-28 lg:py-40 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col gap-10 w-full items-center">
                    <textarea
                        rows={7}
                        className="flex p-4 rounded-2xl bg-neutral-900 outline-none border border-white/15 w-full"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter a news Headline to Predict"
                    />
                    <button
                        className="cursor-pointer p-2 text-xl font-semibold bg-lime-400 text-neutral-900 border-none rounded-full 
                        w-[300px] flex gap-3 items-center justify-center"
                        onClick={getPrediction}
                        disabled={isLoading} // Disable button while loading
                    >
                        {isLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white" />
                                Predicting...
                            </>
                        ) : (
                            "Predict"
                        )}
                    </button>
                </div>

               <MLPredictor prediction={prediction as NewsPredictionResponse}/>
            </div>
        </section>
    );
};

export default TextPredictor;
