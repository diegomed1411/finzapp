"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Outgoings, Incomes
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/incomes', methods=['POST', 'GET'])
def ingresos():
    if request.method == 'POST':
        request_body= request.json
        ingreso= Ingresos(user_id=request_body['user_id'],type=request_body['type'], subtype=request_body['subtype'], currency=request_body['currency'], description=request_body['description'], date=request_body['date'], amount=request_body['amount'])
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

@app.route('/incomes/<int:id>', methods=['GET', 'DELETE'])
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
            return jsonify(income.serialize()), 200
