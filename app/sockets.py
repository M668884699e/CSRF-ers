from flask import session
from flask_login import current_user
from . import socketio
from flask_socketio import emit, send, join_room, leave_room


@socketio.on('joinChannel', namespace='/channels')
def joinChannel(message):
    # grab the channel
    channel = session.get(channel)
    
    # 
    join_room(channel)
    emit('status', {'message': 'Successfully joined the channel'})