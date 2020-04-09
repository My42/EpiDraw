import bcrypt
import time

from flask import request, Response
from jsonschema import validate, ValidationError

create_user_schema = {
    "email": {
        "type": "string",
        "pattern": r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    },
    "password": {
        "type": "string",
        "minLength": 8,
        "pattern": ""
    },
    "username": {
        "type": "string",
        "minLength": 3
    }
}


def create_user(app, db):
    if not request.is_json:
        return Response(response="Bad request: Body must be formatted as a json", status=400)
    data = request.get_json();

    try:
        validate(instance=data, schema=create_user_schema)
    except ValidationError:
        return Response(response="Bad request", status=400)

    user = {
        "email": data.get("email"),
        "password": bcrypt.hashpw(data.get("password").encode('utf-8'), bcrypt.gensalt()),
        "username": data.get("username"),
        "createdAt": int(time.time())
    }

    if bcrypt.checkpw(b"BAJAM FERME TA GUEULE", user.get("password")):
        app.logger.info("It Matches!")
    else:
        app.logger.info("It Does not Match :(")

    doc = db.users.insert_one(user)

    return {
        "id": str(doc.inserted_id),
        "email": user.get("email"),
        "username": user.get("username"),
        "createdAt": user.get("createdAt")
    }
