from flask import Flask, request, jsonify
import joblib
from scipy.special import expit  # For sigmoid function
from flask_cors import CORS  # Import CORS
from scraper import scrape_news 

# Load models and vectorizer
cv = joblib.load('vectorizer.pkl')  # Load the vectorizer (CountVectorizer or TfidfVectorizer)
linear_clf = joblib.load('linear_clf.pkl')  # Load the Passive-Aggressive Classifier model
logistic_clf = joblib.load('logistic_clf.pkl')  # Load the Logistic Regression model

# Create the Flask app
app = Flask(__name__)
CORS(app) 

def predict_news(news_text: str, threshold: float = 0.6) -> str:
    """
    Predict if the news text is real or fake using both Passive-Aggressive Classifier and Logistic Regression.
    
    Args:
        news_text (str): The text of the news to classify.
        threshold (float): The threshold for classifying the news as FAKE.
    
    Returns:
        str: "REAL" if the news is real, "FAKE" if the news is fake,
             along with the probabilities of each class from both models.
    """
    print(news_text)  # Debugging output

    # Preprocess the input news text (vectorization)
    vectorized_text = cv.transform([news_text])

    # Predict using Passive-Aggressive Classifier
    pa_decision_values = linear_clf.decision_function(vectorized_text)[0]
    pa_probabilities = expit(pa_decision_values)  # Convert decision function to probability

    # Predict using Logistic Regression
    logistic_prediction = logistic_clf.predict(vectorized_text)
    logistic_probabilities = logistic_clf.predict_proba(vectorized_text)[0][1]  # Probability for FAKE (class 1)

    # Apply threshold for Passive-Aggressive Classifier
    pa_prediction_label = 'FAKE' if pa_probabilities > threshold else 'REAL'

    # Logistic Regression uses direct probability
    logistic_prediction_label = 'FAKE' if logistic_prediction[0] == 1 else 'REAL'
    
    # Average the probabilities from both models
    avg_probability = (pa_probabilities + logistic_probabilities) / 2

    # Final prediction based on averaged probability
    final_prediction_label = 'FAKE' if avg_probability > threshold else 'REAL'
    
    # Get class probabilities
    classes = ['REAL', 'FAKE']
    class_probabilities_pa = [1 - pa_probabilities, pa_probabilities]  
    class_probabilities_logistic = [1 - logistic_probabilities, logistic_probabilities]  

    # Print model probabilities
    print(f"Passive-Aggressive Classifier Probabilities: {dict(zip(classes, class_probabilities_pa))}")
    print(f"Logistic Regression Probabilities: {dict(zip(classes, class_probabilities_logistic))}")
    
    # Return the final prediction
    return final_prediction_label, dict(zip(classes, class_probabilities_pa)), dict(zip(classes, class_probabilities_logistic))

@app.route('/predict', methods=['POST'])
def predict():
    """API endpoint to predict if a news article is real or fake."""
    data = request.get_json()
    
    if 'text' not in data:
        return jsonify({"error": "No text provided!"}), 400
    
    news_text = data['text']
    
    # Make the prediction
    prediction_label, pa_probabilities, logistic_probabilities = predict_news(news_text)
    
    response = {
        "prediction": prediction_label,
        "passive_aggressive_probabilities": pa_probabilities,
        "logistic_regression_probabilities": logistic_probabilities
    }
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
