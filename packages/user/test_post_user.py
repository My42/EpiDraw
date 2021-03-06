import unittest
from app import app, db
from flask import json
import json

app.config['DEBUG'] = True
app.config['TESTING'] = True


def test_user_bad_args():
    response = app.test_client().post(
        '/users',
        data=json.dumps({'a': 1, 'b': 2}),
        content_type='application/json',
    )
    data = response.get_data(as_text=True)

    assert response.status_code == 400
    assert response.data == b'Bad request'


def test_user_bad_email():
    response = app.test_client().post(
        '/users',
        data=json.dumps({
            'email': 'bad_email',
            'password': 'coucou0%',
            'username': 'username'
        }),
        content_type='application/json',
    )
    data = response.get_data(as_text=True)

    assert response.status_code == 400
    assert response.data == b'Bad request'


def test_user_bad_password():
    response = app.test_client().post(
        '/users',
        data=json.dumps({
            'email': 'good.email@gmail.com',
            'password': 'badPassword',
            'username': 'username'
        }),
        content_type='application/json',
    )
    data = response.get_data(as_text=True)

    assert response.status_code == 400
    assert response.data == b'Bad request'


def test_user_bad_username():
    response = app.test_client().post(
        '/users',
        data=json.dumps({
            'email': 'good.email@gmail.com',
            'password': 'coucou0%',
            'username': 'A'
        }),
        content_type='application/json',
    )
    data = response.get_data(as_text=True)

    assert response.status_code == 400
    assert response.data == b'Bad request'


def test_user_succeed():
    data = {
        'email': 'good.email@gmail.com',
        'password': 'coucou0%',
        'username': 'Tangara'
    }
    response = app.test_client().post(
        '/users',
        data=json.dumps(data),
        content_type='application/json',
    )
    json_response = response.get_json()

    assert response.status_code == 201
    assert json_response.get('email') == data.get('email')
    assert json_response.get('username') == data.get('username')
    assert json_response.get('password')is not None
    assert json_response.get('id') is not None


def test_user_email_already_exists():
    data = {
        'email': 'good.email@gmail.com',
        'password': 'coucou0%',
        'username': 'Tangara'
    }
    response = app.test_client().post(
        '/users',
        data=json.dumps(data),
        content_type='application/json',
    )
    data = response.get_data(as_text=True)

    assert response.status_code == 409
    assert response.data == b'Email already exists'


def test_get_user():
    user = db.users.find_one()
    response = app.test_client().get(
        '/users/{0}'.format(str(user.get('_id'))),
    )

    json_response = response.get_json()

    assert response.status_code == 200
    assert json_response.get('email') == user.get('email')
    assert json_response.get('username') == user.get('username')
    assert json_response.get('password') == None


def test_get_users():
    response = app.test_client().get('/users')

    json_response = response.get_json()

    assert response.status_code == 200
    assert isinstance(json_response, list)


def test_delete_user_by_id():
    user = db.users.find_one()
    response = app.test_client().delete('/users/{0}'.format(str(user.get('_id'))))

    user = db.users.find_one()

    assert user is None
