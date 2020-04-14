import bcrypt
import time
import os

from flask import Flask
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask import request
from jsonschema import validate, ValidationError
from src.user_schema import schema
from src.get_public_user_field import get_public_user_field
from flask import jsonify

try:
    db_host = os.environ['DATABASE_HOST']
except KeyError:
    db_host = 'localhost'


print('db_host =', db_host)

try:
    client = MongoClient(db_host, 27017)
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


@app.route('/users', methods=['POST'])
def create_user_route():
    if not request.is_json:
        return 'Bad request: Body must be formatted as a json', 400
    data = request.get_json()

    try:
        validate(instance=data, schema=create_user_schema)
    except ValidationError:
        return 'Bad request', 400

    if db.users.find_one({'email': data.get('email')}):
        return 'Email already exists', 409

    user = {
        'email': data.get('email'),
        'password': str(bcrypt.hashpw(data.get('password').encode('utf-8'), bcrypt.gensalt())),
        'username': data.get('username'),
        'createdAt': int(time.time())
    }

    doc = db.users.insert_one(user)
    user.pop('_id')

    return {
               **user,
               'id': str(doc.inserted_id)
           }, 201


@app.route('/users', defaults={'user_id': None})
@app.route('/users/<string:user_id>', methods=['GET'])
def get_user_route(user_id: str):
    if user_id:
        user = db.users.find_one({'_id': ObjectId(user_id)})

        if not user:
            return {}

        return get_public_user_field(user)
    else:
        args = request.args.to_dict(flat=True)
        users_cursor = db.users.find(args)
        users = []

        for user in users_cursor:
            users.append(get_public_user_field(user))

        return jsonify(users)


@app.route('/users/<string:user_id>', methods=['DELETE'])
def delete_user_by_id(user_id):
    db.users.delete_one({'_id': ObjectId(user_id)})

    return 'Deleted', 204
