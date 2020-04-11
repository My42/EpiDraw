import bcrypt
import time

from flask import Flask
from pymongo import MongoClient

from flask import request, Response
from jsonschema import validate, ValidationError

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
        'email': {
            'pattern': r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$',
            'type': 'string'
        },
        'password': {
            'minLength': 8,
            'pattern': r'^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$',
            'type': 'string'
        },
        'username': {
            'minLength': 3,
            'type': 'string'
        }
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
    }
