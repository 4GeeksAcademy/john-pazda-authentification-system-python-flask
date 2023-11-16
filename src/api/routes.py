"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import os

api = Blueprint('api', __name__)


# Setup the Flask-JWT-Extended extension
jwt = os.environ.get('FLASK_JWT_SECRET')


@api.route("/token", methods=["POST"])
def create_token():
    body = request.json
    email = body.get("email")
    password = body.get("password")
    if email is None:
        raise APIException("No email in body, 400")
    if password is None:
        raise APIException(400, "No password in body")
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        raise APIException("No user in system, 404")
    if password != user.password:
        raise APIException(401, "Wrong password! STAY OUT")
    access_token = create_access_token(identity=user.id)
    return jsonify(
        access_token=access_token,
        user=user.serialize()
        ), 201

@api.route("/hello", methods=["GET"])
@jwt_required()
def get_hello():
    email = get_jwt_identity()
    dictionary = {
        "message": "Hello World " 
    }
    return jsonify(dictionary)

@api.route('/sign-up', methods=["POST"])
def add_user(): 
    body = request.json
    email = body["email"]
    password = body["password"]

    if email is None:
        raise APIException("No email entered")
    if password is None:
        raise APIException("No Password entered")
    user = user(
        email=email,
        password=password,
        is_active=True
    )

    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize()), 201