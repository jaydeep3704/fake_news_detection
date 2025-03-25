from flask import Flask, request, jsonify
import joblib
from scipy.special import expit  # For sigmoid function
from flask_cors import CORS  # Import CORS
from scraper import scrape_news 

# Load models and vectorizer
cv = joblib.load('vectorizer.pkl')  # Load the vectorizer
linear_clf = joblib.load('linear_clf.pkl')  # Passive-Aggressive Classifier
logistic_clf = joblib.load('logistic_clf.pkl')  # Logistic Regression
decision_tree_clf = joblib.load('decision_tree.pkl')  # Decision Tree ✅ Added

# Create the Flask app
app = Flask(__name__)
CORS(app)

def predict_news(news_text: str, threshold: float = 0.6) -> dict:
    """Predict if the news text is real or fake using multiple models."""
    print(news_text)  # Debugging output

    # Preprocess input
    vectorized_text = cv.transform([news_text])

    # Passive-Aggressive Classifier
    pa_decision_values = linear_clf.decision_function(vectorized_text)[0]
    pa_probabilities = expit(pa_decision_values)  

    # Logistic Regression
    logistic_probabilities = logistic_clf.predict_proba(vectorized_text)[0][1]  

    # Decision Tree ✅ Added
    dt_probabilities = decision_tree_clf.predict_proba(vectorized_text)[0][1]  

    # Final prediction based on averaged probability
    avg_probability = (pa_probabilities + logistic_probabilities + dt_probabilities) / 3
    final_prediction_label = "FAKE" if avg_probability > threshold else "REAL"

    # Return JSON response
    return {
        "prediction": final_prediction_label,
        "passive_aggressive_probabilities": {"REAL": 1 - pa_probabilities, "FAKE": pa_probabilities},
        "logistic_regression_probabilities": {"REAL": 1 - logistic_probabilities, "FAKE": logistic_probabilities},
        "decision_tree_probabilities": {"REAL": 1 - dt_probabilities, "FAKE": dt_probabilities}
    }

@app.route('/predict', methods=['POST'])
def predict():
    """API endpoint to predict news authenticity."""
    data = request.get_json()
    
    if 'text' not in data:
        return jsonify({"error": "No text provided!"}), 400
    
    news_text = data['text']
    
    # Make the prediction
    response = predict_news(news_text)
    
    return jsonify(response)

@app.route('/scrape', methods=['POST'])
def scrape_news_api():
    """API endpoint to scrape news from a given URL."""
    data = request.get_json()
    url = data.get('url')

    if not url:
        return jsonify({"error": "URL is required"}), 400

    # Scrape the news content
    result = scrape_news(url)

    return jsonify(result)

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
