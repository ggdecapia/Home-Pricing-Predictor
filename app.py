# Import the functions we need from flask
from flask import Flask
from flask import render_template 
from flask import jsonify
from flask import request

from datetime import datetime

import math

from sklearn.preprocessing import StandardScaler
from tensorflow.keras.models import load_model
import joblib
from joblib import dump, load
import pickle


# Instantiate the Flask application. (Chocolate cake recipe.)
# This statement is required for Flask to do its job. 
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 # Effectively disables page caching


# Load the model
NN_model = load_model("Trained_Models/chris_best_model.h5")
MLR_model = pickle.load(open("Trained_Models/katrice_MLR_model.h5", 'rb'))


# Load the StandardScaler
X_Scaler = StandardScaler()
X_Scaler = load('Trained_Models/std_scaler.bin')


# Here's where we define the various application routes ...
@app.route("/")
def IndexRoute():
    ''' This function runs when the browser loads the index route. 
        Note that the html file must be located in a folder called templates. '''

    webpage = render_template("index.html")
    return webpage


# This order is the current order of the features as listed on the home website
def build_input_row(latitude, longitude, yr_built, 
                    sqft_living, floors, sqft_above, sqft_basement, sqft_lot,
                    bedrooms, bathrooms, condition, grade):
    
    mylist = []

    # Maintain this order of features. This is the order into the NN model
    mylist.append(bedrooms)
    mylist.append(bathrooms)
    mylist.append(sqft_living)
    mylist.append(sqft_lot)
    mylist.append(floors)
    mylist.append(condition)
    mylist.append(grade)
    mylist.append(sqft_above)
    mylist.append(sqft_basement)
    mylist.append(yr_built)
    mylist.append(latitude)
    mylist.append(longitude)

    conds = []
    conds.append(mylist)

    return conds


@app.route("/predict_price")
def predict_price():
    ''' Process the request arguments and feed into the prediction model. '''

    ### REQUIRED ###
    latitude = request.args.get('lat', None)
    longitude = request.args.get('long', None)
    yr_built = request.args.get('yr_built', None)
    sqft_living = request.args.get('sqft_living', None)
    floors = request.args.get('floors', None)
    sqft_above = request.args.get('sqft_above', None)
    sqft_basement = request.args.get('sqft_basement', None)
    sqft_lot = request.args.get('sqft_lot', None)
    bedrooms = request.args.get('bedrooms', None)
    bathrooms = request.args.get('bathrooms', None)
    condition = request.args.get('condition', None)
    grade = request.args.get('grade', None)

    features = []
    features = build_input_row(latitude, longitude, yr_built, 
                    sqft_living, floors, sqft_above, sqft_basement, sqft_lot,
                    bedrooms, bathrooms, condition, grade)
    print(features)

    # This is the order expected by the model
    # bedrooms, bathrooms, sqft_living, sqft_lot, floors, condition
    # grade, sqft_above, sqft_basement, yr_built, latitude, longitude
    # features = [3, 2, 2000, 5000, 1, 3, 7, 1600, 400, 1985, 47.1, -122.1]
    # Use this for testing this route's url
    # Real House ie. X_trimmed.head(1)
    # ?lat=47.5112&long=-122.257&yr_built=1955&sqft_living=1180&floors=1&sqft_above=1180&sqft_basement=0&sqft_lot=5650&bedrooms=3&bathrooms=1&condition=3&grade=7
    # Hypothetical House
    # ?lat=47.5112&long=-122.257&yr_built=1985&sqft_living=2000&floors=1&sqft_above=1600&sqft_basement=400&sqft_lot=5000&bedrooms=3&bathrooms=2&condition=3&grade=7

    result = {}

    predicted_value = NN_model.predict(X_Scaler.transform(features))
    result["predicted_value_NN"] = str(predicted_value[0][0])

    predicted_value = MLR_model.predict(X_Scaler.transform(features))
    result["predicted_value_MLR"] = str(predicted_value[0][0])
    
    print(result)

    return result


@app.route("/predict_NN_price")
def predict_NN_price():
    ''' Process the request arguments and feed into the prediction model. '''

    ### REQUIRED ###
    latitude = request.args.get('lat', None)
    longitude = request.args.get('long', None)
    yr_built = request.args.get('yr_built', None)
    sqft_living = request.args.get('sqft_living', None)
    floors = request.args.get('floors', None)
    sqft_above = request.args.get('sqft_above', None)
    sqft_basement = request.args.get('sqft_basement', None)
    sqft_lot = request.args.get('sqft_lot', None)
    bedrooms = request.args.get('bedrooms', None)
    bathrooms = request.args.get('bathrooms', None)
    condition = request.args.get('condition', None)
    grade = request.args.get('grade', None)

    features = []
    features = build_input_row(latitude, longitude, yr_built, 
                    sqft_living, floors, sqft_above, sqft_basement, sqft_lot,
                    bedrooms, bathrooms, condition, grade)
    print(features)

    predicted_value = NN_model.predict(X_Scaler.transform(features))

    result = {"predicted_value_NN": str(predicted_value[0][0])}
    
    print(result)

    return result

@app.route("/predict_MLR_price")
def predict_MLR_price():
    ''' Process the request arguments and feed into the prediction model. '''

    ### REQUIRED ###
    latitude = request.args.get('lat', None)
    longitude = request.args.get('long', None)
    yr_built = request.args.get('yr_built', None)
    sqft_living = request.args.get('sqft_living', None)
    floors = request.args.get('floors', None)
    sqft_above = request.args.get('sqft_above', None)
    sqft_basement = request.args.get('sqft_basement', None)
    sqft_lot = request.args.get('sqft_lot', None)
    bedrooms = request.args.get('bedrooms', None)
    bathrooms = request.args.get('bathrooms', None)
    condition = request.args.get('condition', None)
    grade = request.args.get('grade', None)

    features = []
    features = build_input_row(latitude, longitude, yr_built, 
                    sqft_living, floors, sqft_above, sqft_basement, sqft_lot,
                    bedrooms, bathrooms, condition, grade)
    print(features)

    predicted_value = MLR_model.predict(X_Scaler.transform(features))

    result = {"predicted_value_MLR": str(predicted_value[0][0])}
    
    print(result)

    return result


# This statement is required for Flask to do its job. 
# Think of it as chocolate cake recipe. 
if __name__ == '__main__':
    app.run(debug=True)