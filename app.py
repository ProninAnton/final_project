from flask import Flask, render_template, request, jsonify
#from models import db, ChatHistory, chat_with_llm
from chat_pipeline import run_pipeline

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    llm_reply = run_pipeline(user_message)
    return jsonify({"reply": llm_reply})


if __name__ == "__main__":
    app.run(debug=True)
