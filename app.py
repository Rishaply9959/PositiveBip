from flask import Flask, request, render_template, redirect, url_for
import json
import os

app = Flask(__name__)

DATA_FILE = 'userData.txt'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    user_data = request.json

    # Handle gender data if present
    if 'gender' in user_data:
        # If gender is a list, convert it to a comma-separated string
        if isinstance(user_data['gender'], list):
            user_data['gender'] = ', '.join(user_data['gender'])

    # Write data to the file
    with open(DATA_FILE, 'a') as file:
        file.write(json.dumps(user_data) + '\n')

    return 'Form data received and stored successfully!'

if __name__ == '__main__':
    app.run(debug=True)
    