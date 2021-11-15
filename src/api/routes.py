from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Outgoings, Incomes
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask_bcrypt import generate_password_hash, check_password_hash

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
    
    if body['password'] != body['repeat_password']:
        raise APIException('Passwords should be identical.', status_code=400)

    user = User.query.filter_by(email = body['email']).first()
    if user:
        raise APIException('There is already an account with this email.', status_code=400)

    new_user = User(name=body['name'], lastname=body['lastname'], email=body['email'], password=generate_password_hash(body['password']).decode('utf-8'), is_active=True)
    db.session.add(new_user)
    db.session.commit()
    return "ok", 200

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    user = User.query.filter_by(email = email).first()
    if not user or not check_password_hash(user.password, password):
        raise APIException('Please check your login details and try again.', status_code=400)

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token)

#-------------- crud de ingresos --------------

@api.route('/incomes', methods=['POST', 'GET'])
@jwt_required()
def ingresos():
    if request.method == 'POST':
        request_body= request.json
        id = get_jwt_identity()

        if request_body is None:
            raise APIException("You need to specify the request body as a json object.", status_code=400)
        if 'type' not in request_body:
            raise APIException('You need to specify the type.', status_code=400)
        if 'subtype' not in request_body:
            raise APIException('You need to specify the subtype.', status_code=400)
        if 'currency' not in request_body:
            raise APIException('You need to specify the currency.', status_code=400)
        if 'date' not in request_body:
            raise APIException('You need to specify the date.', status_code=400)
        if 'amount' not in request_body:
            raise APIException('You need to specify the amount.', status_code=400)
        if 'description' not in request_body:
            description = None
        else:
            description = request_body['description']

        ingreso= Incomes(user_id=id, type=request_body['type'], subtype=request_body['subtype'], currency=request_body['currency'], description=description, date=request_body['date'], amount=request_body['amount'])
        db.session.add(ingreso)
        db.session.commit()
        #listamos en json todos los ingresos
        all_incomes=Incomes.query.all()
        all_incomes=list(map(lambda x: x.serialize(),all_incomes))
    
        return jsonify(all_incomes), 200

    if request.method == 'GET':
        all_incomes=Incomes.query.all()
        all_incomes=list(map(lambda x: x.serialize(),all_incomes))

        return jsonify(all_incomes), 200

@api.route('/incomes/<int:id>', methods=['GET', 'DELETE', 'PUT'])
@jwt_required()
def get_income(id):
    if request.method == 'GET':
        body=request.json
        income=Incomes.query.get(id)
        if income is None:
            raise APIException('Ingreso no encontrado', status_code=404)
        else:
            return jsonify(income.serialize()), 200

    if request.method == 'DELETE':
        income=Incomes.query.get(id)
        if income is None:
            raise APIException('Ingreso no encontrado', status_code=404)
        else:
            db.session.delete(income)
            db.session.commit()
            return jsonify(income.serialize()), 200
    
    if request.method == 'PUT':
        body=request.json
        income=Incomes.query.get(id)
        if income is None:
            raise APIException('Ingreso no encontrado', status_code=404)
        else:
            if "type" in body:
                income.type = body["type"]
            if "subtype" in body:
                income.subtype = body["subtype"]
            if "currency" in body:
                income.currency = body["currency"]
            if "description" in body:
                income.description = body["description"]
            if "date" in body:
                income.date = body["date"]
            if "amount" in body:
                income.amount = body["amount"]
            db.session.commit()        
        #income = Incomes.query.get(id)
            income = income.serialize()
        return jsonify(income), 200

#-------------------------crud de egresos-------------------------------------

@api.route('/outgoings', methods=['POST', 'GET'])
@jwt_required()
def egresos():
    if request.method == 'POST':
        request_body= request.json
        id = get_jwt_identity()

        if request_body is None:
            raise APIException("You need to specify the request body as a json object.", status_code=400)
        if 'type' not in request_body:
            raise APIException('You need to specify the type.', status_code=400)
        if 'subtype' not in request_body:
            raise APIException('You need to specify the subtype.', status_code=400)
        if 'currency' not in request_body:
            raise APIException('You need to specify the currency.', status_code=400)
        if 'date' not in request_body:
            raise APIException('You need to specify the date.', status_code=400)
        if 'amount' not in request_body:
            raise APIException('You need to specify the amount.', status_code=400)
        if 'description' not in request_body:
            description = None
        else:
            description = request_body['description']

        egreso= Outgoings(user_id=id, type=request_body['type'], subtype=request_body['subtype'], currency=request_body['currency'], description=description, date=request_body['date'], amount=request_body['amount'])
        db.session.add(egreso)
        db.session.commit()
        #listamos en json todos los egresos
        all_outgoings=Outgoings.query.all()
        all_outgoings=list(map(lambda x: x.serialize(),all_outgoings))
    
        return jsonify(all_outgoings), 200

    if request.method == 'GET':
        all_outgoings=Outgoings.query.all()
        all_outgoings=list(map(lambda x: x.serialize(),all_outgoings))

        return jsonify(all_outgoings), 200

@api.route('/outgoings/<int:id>', methods=['GET', 'DELETE', 'PUT'])
@jwt_required()
def get_outgoing(id):
    if request.method == 'GET':
        body=request.json
        outgoing=Outgoings.query.get(id)
        if outgoing is None:
            raise APIException('Ingreso no encontrado', status_code=404)
        else:
            return jsonify(outgoing.serialize()), 200

    if request.method == 'DELETE':
        outgoing=Outgoings.query.get(id)
        if outgoing is None:
            raise APIException('Ingreso no encontrado', status_code=404)
        else:
            db.session.delete(outgoing)
            db.session.commit()
            return jsonify(outgoing.serialize()), 200

    
    if request.method == 'PUT':
        body=request.json
        outgoing=Outgoings.query.get(id)
        if outgoing is None:
            raise APIException('Ingreso no encontrado', status_code=404)
        else:
            if "type" in body:
                outgoing.type = body["type"]
            if "subtype" in body:
                outgoing.subtype = body["subtype"]
            if "currency" in body:
                outgoing.currency = body["currency"]
            if "description" in body:
                outgoing.description = body["description"]
            if "date" in body:
                outgoing.date = body["date"]
            if "amount" in body:
                outgoing.amount = body["amount"]
            db.session.commit()        
        #outgoing = Outgoings.query.get(id)
            outgoing = outgoing.serialize()
        return jsonify(outgoing), 200



@api.route('/summaryinc/<int:id_user>', methods=['GET'])
def get_ingresos_usuario(id_user):
    if request.method == 'GET':
        outgoing= id
        #outgoing=Outgoings.query.get(id)
        if outgoing is None:
            raise APIException('Ingreso no encontrado', status_code=404)
        else:
            return (outgoing), 200