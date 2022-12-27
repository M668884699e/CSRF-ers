from flask_socketio import SocketIO, emit, send
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
socketio = SocketIO(cors_allowed_origins=origins)

#? Handling create chat message
@socketio.on("message")
def handle_chat_sent(data):    
    #? [POST] message database
    """
    Fetch message
    """        

    send({'message': data['message']})
