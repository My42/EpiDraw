import os

os.environ['FLASK_ENV'] = 'development'
os.environ['FLASK_APP'] = '__init__.py'

os.system('flask run --host=0.0.0.0')
