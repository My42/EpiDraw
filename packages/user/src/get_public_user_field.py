def get_public_user_field(user):
    return {
        'createdAt': user.get('createdAt'),
        'email': user.get('email'),
        'id': str(user.get('_id')),
        'username': user.get('username'),
    }
