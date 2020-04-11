schema = {
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
}
