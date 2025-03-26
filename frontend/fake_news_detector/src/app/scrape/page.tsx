"use client";
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { NewsPredictionResponse } from "@/components/TextPredictor";
import MLPredictor from "@/components/MLPredictor";
import Navbar from "@/components/Navbar";
import { span } from "framer-motion/client";
import Link from "next/link";
import {  NewspaperIcon } from "lucide-react";
interface ScrapedData {
  title: string;
  content: string;
  error?: string;
}

const Page = () => {
  const [url, setUrl] = useState<string>("");
  const [scrapedData, setScrapedData] = useState<ScrapedData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<NewsPredictionResponse | null>(
    null
  );
  const newsWebsites = [
    {
      name: "NDTV",
      url: "https://www.ndtv.com"
    },
    {
      name: "The Hindu",
      url: "https://www.thehindu.com"
    },
    {
      name: "Times of India",
      url: "https://timesofindia.indiatimes.com"
    },
    {
      name: "India Today",
      url: "https://www.indiatoday.in"
    },
    {
      name: "Indian Express",
      url: "https://indianexpress.com"
    }
  ]
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      setError("Please provide a valid URL.");
      return;
    }

    setLoading(true);
    setError(null);
    setScrapedData(null);

    try {
      const response = await axios.post("http://127.0.0.1:5000/scrape", {
        url,
      });
      setScrapedData(response.data);
    } catch (err) {
      setError("An error occurred while scraping the website.");
    } finally {
      setLoading(false);
    }
  };

  const getPrediction = async () => {
    if (!scrapedData) return;

    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        text: scrapedData.title + " " + scrapedData.content, // Concatenating title & content
      });
      setPrediction(response.data as NewsPredictionResponse);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="flex flex-col items-center justify-center min-h-screen lg:py-40 py-28 px-6 text-white">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight text-center ">
          Detect <span className="text-lime-400">Fake News</span> with <br />Web Scraping
        </h1>

        <div className="max-w-3xl mx-auto my-8">
          <h2 className="text-center text-neutral-400 text-xl mb-10">
            Scrape and Analyze news from these websites
          </h2>
          <div className="flex  gap-5 flex-wrap justify-center">
            {newsWebsites.map((website) => {
              return (
              
                <Link
                  className="inline-flex px-5 py-2 rounded-lg bg-neutral-800  
                font-semibold hover:bg-lime-400 hover:text-neutral-900 transition ease-in duration-300 cursor-pointer 
                gap-5 border border-white/15
                "
                  key={website.name}
                  href={website.url}
                >
                  <NewspaperIcon />
                  {website.name}
                </Link>
              );
            })}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl p-8 bg-neutral-900 rounded-lg shadow-xl border border-white/15"
        >
          <h1 className="text-3xl font-bold text-center mb-6">
            Predict in One Click
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-4 bg-neutral-800 p-3 rounded-lg border border-white/15">
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter the news article URL..."
                className="w-full bg-transparent text-white outline-none placeholder-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 text-lg font-semibold text-white bg-lime-400 hover:bg-lime-600 rounded-lg transition duration-300"
            >
              {loading ? "Scraping..." : "Scrape"}
            </button>
          </form>

          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

          {scrapedData && !error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 p-6 bg-neutral-800 rounded-lg"
            >
              <h2 className="text-2xl font-semibold text-blue-400">
                {scrapedData.title}
              </h2>
              <p className="mt-3 text-gray-300">{scrapedData.content}</p>

              {/* Button to get prediction */}
              <button
                onClick={getPrediction}
                disabled={loading}
                className="mt-4 px-6 py-3 w-full text-lg font-semibold text-white bg-lime-400 hover:bg-lime-600 rounded-lg transition duration-300"
              >
                {loading ? "Predicting..." : "Get Prediction"}
              </button>
            </motion.div>
          )}

          {/* Ensure MLPredictor renders correctly */}
          {prediction && (
            <div className="mt-6">
              <MLPredictor prediction={prediction} />
            </div>
          )}
        </motion.div>
      </section>
    </>
  );
};

export default Page;
