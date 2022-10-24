from crypt import methods
from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Message, DMR, db
# from app.forms import MessageForm

message_routes = Blueprint('messages', __name__)

@message_routes.route('/', methods=["GET"])
@login_required
def get_messages():
    messages = Message.query.all()
    return {'messages':[message.to_dict() for message in messages]}


@message_routes.route('/', methods=['POST'])
@login_required
def new_message():
    message = Message()
    db.session.add(message)
    db.session.commit()
    return message.to_dict()

@message_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_message():
    message = Message.query.get(id)
    db.session.add(message)
    db.session.commit()
    return message.to_dict()

@message_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_message():
    message = Message.query.get(id)
    db.session.delete(message)
    db.session.commit()
    
