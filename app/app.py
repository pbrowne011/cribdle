from flask import Flask, render_template, jsonify, request
from src.init import init

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
    #s = init()
    #print(str(s))
    #return str(s)
