from flask import Flask, render_template, jsonify
import logging
from src.init import init

app = Flask(__name__, static_folder="static", static_url_path="/static")

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/api/game")
def game_data():
    game_info = init()
    logger.debug(f"API returning game data: {game_info}")
    return jsonify(game_info)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
    # app.run(debug=True)
