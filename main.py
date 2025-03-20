from flask import Flask, request, jsonify
import joblib
from scipy.special import expit  # For sigmoid function
from flask_cors import CORS  # Import CORS
from scraper import scrape_news 


# Load models and vectorizer
cv = joblib.load('vectorizer.pkl')  # Load the vectorizer (CountVectorizer or TfidfVectorizer)
linear_clf = joblib.load('linear_clf.pkl')  # Load the Passive-Aggressive Classifier model
classifier = joblib.load('naive_bayes_classifier.pkl')  # Load the Naive Bayes Classifier model
 
# Create the Flask app
app = Flask(__name__)
CORS(app) 
def predict_news(news_text: str, threshold: float = 0.75) -> str:
    """
    Predict if the news text is real or fake and show the probabilities,
    applying a threshold for classifying as FAKE using both Passive-Aggressive Classifier and Naive Bayes.
    
    Args:
        news_text (str): The text of the news to classify.
        threshold (float): The threshold for classifying the news as FAKE.
    
    Returns:
        str: "REAL" if the news is real, "FAKE" if the news is fake,
             along with the probabilities of each class from both models.
    """
    # Preprocess the input news text (e.g., vectorize the text)
    print(news_text)
    vectorized_text = cv.transform([news_text])

    # Predict using the trained Passive-Aggressive Classifier (pa)
    # Get decision values (Negative for FAKE, Positive for REAL)
    pa_decision_values = linear_clf.decision_function(vectorized_text)[0]
    
    # Apply sigmoid to get probabilities
    pa_probabilities = expit(pa_decision_values)  # Convert decision function to probabilities
    
    # Predict using Naive Bayes classifier
    nb_prediction = classifier.predict(vectorized_text)
    
    # Get the probability of FAKE using Naive Bayes
    nb_probabilities = classifier.predict_proba(vectorized_text)[0][1]  # Probability for FAKE (class 1)

    # The class label for REAL is 0 and FAKE is 1
    # Apply threshold for Passive-Aggressive Classifier (linear_clf)
    pa_prediction_label = 'FAKE' if pa_probabilities > threshold else 'REAL'

    # You can use Naive Bayes prediction directly (no threshold is needed)
    nb_prediction_label = 'FAKE' if nb_prediction[0] == 1 else 'REAL'
    
    # Average the probabilities from both models for final decision
    avg_probability = (pa_probabilities + nb_probabilities) / 2




    # Final label based on the average probability
    final_prediction_label = 'FAKE' if avg_probability > threshold else 'REAL'
    
    # Get the class labels (REAL and FAKE) and their corresponding probabilities
    classes = ['REAL', 'FAKE']
    class_probabilities_pa = [1 - pa_probabilities, pa_probabilities]  # 1 - prob for REAL, prob for FAKE
    class_probabilities_nb = [1 - nb_probabilities, nb_probabilities]  # 1 - prob for REAL, prob for FAKE
    
    # Display the probabilities from both models
    print(f"Passive-Aggressive Classifier Probabilities: {dict(zip(classes, class_probabilities_pa))}")
    print(f"Naive Bayes Probabilities: {dict(zip(classes, class_probabilities_nb))}")
    
    # Return the final prediction based on the average of both models
    return final_prediction_label, dict(zip(classes, class_probabilities_pa)), dict(zip(classes, class_probabilities_nb))

@app.route('/predict', methods=['POST'])
def predict():
    # Get the text from the request
    data = request.get_json()  # Expecting JSON input like {"text": "The news article text"}
    
    # Check if the 'text' key is present
    if 'text' not in data:
        return jsonify({"error": "No text provided!"}), 400
    
    news_text = data['text']
    
    # Make the prediction using the model
    prediction_label, pa_probabilities, nb_probabilities = predict_news(news_text)
    
    # Return the result as JSON
    response = {
        "prediction": prediction_label,
        "passive_aggressive_probabilities": pa_probabilities,
        "naive_bayes_probabilities": nb_probabilities
    }
    return jsonify(response)



@app.route('/scrape', methods=['POST'])
def scrape_news_api():
    # Get the URL from the JSON request body
    data = request.get_json()
    url = data.get('url')

    if not url:
        return jsonify({"error": "URL is required"}), 400

    # Call the scrape_news function to scrape the URL
    result = scrape_news(url)

    # Return the result as a JSON response
    return jsonify(result)



# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
