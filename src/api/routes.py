import os
from flask import Flask, request, jsonify, url_for
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from utils import APIException, generate_sitemap
from admin import setup_admin
from models import db, User
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.url_map.strict_slashes = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DB_CONNECTION_STRING')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db)
db.init_app(app)
CORS(app)
setup_admin(app)
app.config["JWT_SECRET_KEY"] = "ha82hbk50gjqva978bru3ifeid20al0l9j2ks8d4kd72dncjafqw093jb8c0zz1"
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

@app.route('/')
def sitemap():
    return generate_sitemap(app)

@app.route('/signup', methods=['POST'])
def signup_post():
    body = request.get_json()

    if body is None:
        raise APIException("You need to specify the request body as a json object.", status_code=400)
    if 'name' not in body:
        raise APIException('You need to specify the name.', status_code=400)
    if 'lastname' not in body:
        raise APIException('You need to specify the lastname.', status_code=400)
    if 'email' not in body:
        raise APIException('You need to specify the email.', status_code=400)
    if 'password' not in body:
        raise APIException('You need to specify the password.', status_code=400)
    if 'repeat_password' not in body:
        raise APIException('You need to specify the repeat_password.', status_code=400)
    
    if password != repeat_password:
        raise APIException('Passwords should be identical.', status_code=400)

    user = User.query.filter_by(email = body['email']).first()
    if user:
        raise APIException('There is already an account with this email.', status_code=400)

    new_user = User(name=body['name'], lastname=body['lastname'], email=body['email'], password=bcrypt.generate_password_hash(body['password']).decode('utf-8'))
    db.session.add(new_user)
    db.session.commit()

    return "ok", 200

@app.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    user = User.query.filter_by(email = email).first()
    if not user or not bcrypt.check_password_hash(user.password, password):
        raise APIException('Please check your login details and try again.', status_code=400)

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token)

if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3000))
    app.run(host='0.0.0.0', port=PORT, debug=False)