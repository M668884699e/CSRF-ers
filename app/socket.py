from flask_socketio import SocketIO, emit, send, join_room, leave_room
from flask import session
from app.models import Message, db
from flask_login import login_required, current_user
from app.forms import MessageForm
import os

# setting up origins for socket io
if os.environ.get("FLASK_ENV") == "production":
    origins = [
        os.environ.get("LIVE_SITE_HTTP"),
        os.environ.get("LIVE_SITE_HTTPS")
    ]
else:
    origins = "*"

# create SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins, logger=True, engineio_logger=True)
<<<<<<< HEAD
=======

>>>>>>> sockets-for-message-form

#? Handling create chat message
@socketio.on("message")
def handle_chat_sent(data):
    #? [POST] message database
    """
    Fetch message
    """

<<<<<<< HEAD
    print("socket data", data)

    send({
        'message': data['message'],
        'messageable_id': data['messageable_id'],
        'messageable_type': data['messageable_type'],
        'sender_id': current_user['id']
    })

=======
    print("backend socket data", data)

    # USER BEWARE, this doesn't work
        # emit({
        #     'message': data['message'],
        #     'messageable_id': data['messageable_id'],
        #     'messageable_type': data['messageable_type'],
        #     'sender_id': current_user['id']
        # }, broadcast=True)

    emit("message", data, broadcast=True)


>>>>>>> sockets-for-message-form
#? Join channel
@socketio.on('joinChannel', namespace='/channels')
def joinChannel(message):
    # grab the channel
    channel = session.get(channel)

    #
    join_room(channel)
    emit('status', {'message': 'Successfully joined the channel'})


# test
<<<<<<< HEAD
@socketio.on("chat")
def chat(data):
=======
@socketio.on("socket_test")
def socket_test(data):
>>>>>>> sockets-for-message-form
    print("")
    print("socket test function has been entered")
    print(data)
    print("")
    # send(data, broadcast=True)
<<<<<<< HEAD
    emit("chat", data, broadcast=True)
=======
    emit("socket_test", data, broadcast=True)
>>>>>>> sockets-for-message-form
