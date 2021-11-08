from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import APIException, generate_sitemap
from api.models import db, User
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

@api.route('/signup', methods=['POST'])
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

    new_user = User(name=body['name'], lastname=body['lastname'], email=body['email'], password='password')
    db.session.add(new_user)
    db.session.commit()
    return "ok", 200

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    user = User.query.filter_by(email = email).first()
    if not user or user.password != password:
        raise APIException('Please check your login details and try again.', status_code=400)

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token)
