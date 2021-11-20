import enum
import os
import jwt
from time import time
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), unique=False, nullable=False)
    lastname = db.Column(db.String(250), unique=False, nullable=False)
    email = db.Column(db.String(250), unique=False, nullable=False)
    password = db.Column(db.String(250), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    incomes_id = db.relationship('Incomes', backref="user", lazy=True)
    outgoings_id = db.relationship('Outgoings', backref="user")
    
    def get_reset_token(self, expires_in=600):
        return jwt.encode({'reset_password': self.id, 'exp': time() + expires_in},
            os.getenv('FLASK_APP_KEY'), algorithm='HS256')

    def verify_reset_password_token(token):
        try:
            id = jwt.decode(token, os.getenv('FLASK_APP_KEY'),
                            algorithms=['HS256'])
        except:
            return
        return User.query.get(id)

    def __repr__(self):
        return '<User %r>' % self.email

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "email": self.email,
            "isActive": self.is_active
            # do not serialize the password, its a security breach
        }


class Incomes (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    type = db.Column(db.String(250), unique=False, nullable=False)
    subtype = db.Column(db.String(250), unique=False, nullable=False)
    currency = db.Column(db.String(250), unique=False, nullable=False)
    description = db.Column(db.String(250), unique=False, nullable=True)
    date = db.Column(db.Date, unique=False, nullable=False)
    amount = db.Column(db.Integer, unique=False, nullable=False)

    def __repr__(self):
        return '<Incomes %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "type": self.type,
            "subtype": self.subtype,
            "currency": self.currency,
            "description": self.description,
            "date": self.date,
            "amount": self.amount
            # do not serialize the password, its a security breach
        }

    
class Outgoings (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    type = db.Column(db.String(250), unique=False, nullable=False)
    subtype = db.Column(db.String(250), unique=False, nullable=False)
    date = db.Column(db.Date, unique=False, nullable=False)
    currency = db.Column(db.String(250), unique=False, nullable=False)
    amount = db.Column(db.Integer, unique=False, nullable=False)
    description = db.Column(db.String(250), unique=False, nullable=True)

    def __repr__(self):
        return '<Outgoings %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "type": self.type,
            "subtype": self.subtype,
            "currency": self.currency,
            "description": self.description,
            "date": self.date,
            "amount": self.amount
            # do not serialize the password, its a security breach
        }