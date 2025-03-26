
"use client"
import Image from "next/image";
import Navbar from "@/components/Navbar";
import TextPredictor from "@/components/TextPredictor";
import { Shield, AlertTriangle, CheckCircle, TrendingUp, Newspaper } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 to-neutral-900 z-[-1]" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover opacity-10 z-[-1]" />
        
 
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-2 bg-lime-400/10 rounded-full mb-6">
              <Shield className="w-5 h-5 text-lime-400 mr-2" />
              <span className="text-lime-400 text-sm font-medium">AI-Powered Fake News Detection</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Detect <span className="text-lime-400">Fake News</span> with Machine Learning
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              NewsGuard uses advanced machine learning algorithms to analyze and identify potentially misleading news content with high accuracy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#predict" 
                className="px-8 py-3 bg-lime-400 text-neutral-900 rounded-full font-semibold text-lg hover:bg-lime-500 transition-all duration-300"
              >
                Try It Now
              </a>
              <a 
                href="#how-it-works" 
                className="px-8 py-3 bg-neutral-800 text-white rounded-full font-semibold text-lg hover:bg-neutral-700 transition-all duration-300 border border-white/10"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-neutral-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-800/50 p-6 rounded-xl border border-white/10 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">93%</h3>
              <p className="text-gray-400">Accuracy in detecting fake news</p>
            </div>
            <div className="bg-neutral-800/50 p-6 rounded-xl border border-white/10 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-lime-500/20 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-lime-500" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">10K+</h3>
              <p className="text-gray-400">Articles analyzed daily</p>
            </div>
            <div className="bg-neutral-800/50 p-6 rounded-xl border border-white/10 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">3</h3>
              <p className="text-gray-400">ML algorithms for verification</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How NewsGuard Works</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our platform uses multiple machine learning models to analyze news content and determine its credibility.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 p-8 rounded-xl border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-lime-400/10 rounded-bl-full -mr-16 -mt-16 transition-all duration-300 group-hover:bg-lime-400/20"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-neutral-800 rounded-lg flex items-center justify-center mb-6 border border-white/10">
                  <span className="text-2xl font-bold text-lime-400">1</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Logistic Regression</h3>
                <p className="text-gray-400">
                  Analyzes patterns in text to classify content based on linguistic features and known indicators of misinformation.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 p-8 rounded-xl border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-lime-400/10 rounded-bl-full -mr-16 -mt-16 transition-all duration-300 group-hover:bg-lime-400/20"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-neutral-800 rounded-lg flex items-center justify-center mb-6 border border-white/10">
                  <span className="text-2xl font-bold text-lime-400">2</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Passive Aggressive</h3>
                <p className="text-gray-400">
                  Continuously updates its model to adapt to new patterns of misinformation as they emerge.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 p-8 rounded-xl border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-lime-400/10 rounded-bl-full -mr-16 -mt-16 transition-all duration-300 group-hover:bg-lime-400/20"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-neutral-800 rounded-lg flex items-center justify-center mb-6 border border-white/10">
                  <span className="text-2xl font-bold text-lime-400">3</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Decision Tree</h3>
                <p className="text-gray-400">
                  Makes hierarchical decisions based on content features to determine the likelihood of authenticity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prediction Section */}
      <section id="predict" className="bg-neutral-900 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-lime-400/5 via-transparent to-transparent z-0"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 pt-16">
            <div className="inline-flex items-center justify-center p-2 bg-lime-400/10 rounded-full mb-4">
              <Newspaper className="w-5 h-5 text-lime-400 mr-2" />
              <span className="text-lime-400 text-sm font-medium">Try Our Detector</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Analyze News Content</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Paste a news headline or article below to get an instant analysis from our machine learning models.
            </p>
          </div>
          
          <TextPredictor />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl text-white font-bold">NewsGuard</div>
              <p className="text-gray-400 mt-2">AI-powered fake news detection</p>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div>
                <h4 className="text-white font-semibold mb-3">Features</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-lime-400 transition-colors">Text Analysis</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-lime-400 transition-colors">URL Scraping</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-lime-400 transition-colors">API Access</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-lime-400 transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-lime-400 transition-colors">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-lime-400 transition-colors">Support</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-500">© {new Date().getFullYear()} NewsGuard. All rights reserved.</p>
          </div>
        </div>
      </footer>

  
    </>
  );
}
