from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow requests from Chrome extension

@app.route('/check-login', methods=['POST'])
def check_login():
    data = request.get_json()
    url = data.get("url")
    html = data.get("html")

    if "freegift" in html.lower() or "phish" in url.lower() or "winmoney" in html.lower():
        return jsonify({"status": "fake"})
    else:
        return jsonify({"status": "real"})

if __name__ == '__main__':
    app.run(debug=True)

