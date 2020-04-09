from flask import Flask
from pymongo import MongoClient

from src.controllers import create_user

try:
    client = MongoClient("database", 27017)
    db = client.epidraw_user
except:
    raise Exception("Not able to connect to the database")

app = Flask(__name__)


@app.route("/")
def index():
    app.logger.info("/index")
    return "to implement"


@app.route("/user", methods=["POST"])
def create_user_route():
    return create_user(app, db)
