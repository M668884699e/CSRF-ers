from crypt import methods
from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Message, DMR, db
from app.forms import MessageForm

# form = MessageForm()
message_routes = Blueprint('messages', __name__)

@message_routes.route('/', methods=["GET"])
@login_required
def get_messages():
    # query all messages
    messages = Message.query.all()
    
    # return successful response
    return {'messages':[message.to_dict() for message in messages]}

@message_routes.route('/', methods=['POST'])
@login_required
def new_message():
    # create message form
    form = MessageForm()
    
    # if form data message is blank, then don't update
    if(form.data['message'].strip() == '' or form.data['message'] == None):
        return {'errors': ["Message invalid"]}, 400
    
    # create message
    message = Message(
        message=form.data['message'],
        messageable_id=form.data['messageable_id'],
        messageable_type=form.data['messageable_type'],
        sender_id=current_user.get_id()
    )
    
    # add message to database
    db.session.add(message)
    db.session.commit()
    
    # return successful message response
    return message.to_dict()

@message_routes.route('/<int:message_id>', methods=['PUT'])
@login_required
def edit_message(message_id):
    # get current message
    current_message = Message.query.get(message_id)
    
    # get message data from form
    form = MessageForm()

    # update message 
    current_message.message = form.data['message']
 
    # commit update
    db.session.commit()
    
    # return current message
    return current_message.to_dict()

@message_routes.route('/<int:message_id>', methods=['DELETE'])
@login_required
def delete_message(message_id):
    # get message by message id
    message = Message.query.get(message_id)
    
    # if message does not exist, then throw an error
    if(message == None):
        return {'errors': [f"Message {message_id} does not exist"]}, 404
    
    # otherwise, return successful response and delete message
    db.session.delete(message)
    db.session.commit()
    
    return f"Successfully deleted message {message_id}"
    
