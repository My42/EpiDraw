import bcrypt
import time

from flask import Flask
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask import request
from jsonschema import validate, ValidationError
from src.user_schema import schema

try:
    client = MongoClient('database', 27017)
    db = client.epidraw_user
except:
    raise Exception('Not able to connect to the database')

app = Flask(__name__)


@app.route('/')
def index():
    app.logger.info('/index')
    return 'to implement'


create_user_schema = {
    'type': 'object',
    'properties': {
        'email': schema.get('email'),
        'password': schema.get('password'),
        'username': schema.get('username')
    },
    'required': ['email', 'password', 'username']
}


@app.route('/user', methods=['POST'])
def create_user_route():
    if not request.is_json:
        return 'Bad request: Body must be formatted as a json', 400
    data = request.get_json();

    try:
        validate(instance=data, schema=create_user_schema)
    except ValidationError:
        return 'Bad request', 400

    if db.users.find_one({'email': data.get('email')}):
        return 'Email already exists', 409

    user = {
        'email': data.get('email'),
        'password': bcrypt.hashpw(data.get('password').encode('utf-8'), bcrypt.gensalt()),
        'username': data.get('username'),
        'createdAt': int(time.time())
    }

    doc = db.users.insert_one(user)

    return {
               'id': str(doc.inserted_id),
               'email': user.get('email'),
               'username': user.get('username'),
               'createdAt': user.get('createdAt')
           }, 201


@app.route('/user/<string:user_id>', methods=['GET'])
def get_user_route(user_id: str):
    user = db.users.find_one({'_id': ObjectId(user_id)})

    print('user =', user, flush=True)

    if not user:
        return {}

    object_id = user.pop('_id')
    user.pop('password')

    print('user =', user, flush=True)

    return {
        'id': str(object_id),
        **user
    }
