from flask import Blueprint, jsonify
# from flask_login import login_required
from app.models import Channel, Message

channel_routes = Blueprint("channels", __name__)

# Get all channels
@channel_routes.route("/")
def get_all_channels():
    channels = Channel.query.all()
    return {"channels": [channel.to_dict() for channel in channels]}


# Get specfic channel, requires authentication if current user is member of channel
@channel_routes.route("/<int:channel_id>")
def get_one_channel(channel_id):
    specific_channel = Channel.query.get(channel_id)
    return {"channel": specific_channel.to_dict()}

# Get all users of a channel, requires authentication
@channel_routes.route("/:channelId/users")
def get_channel_users():
    channel_id = req.args
    channel_users = User.query.filter_by() # requires db diagram to see how this will be linked

# Get all messages of a channel, requires authentication ?
@channel_routes.route("/:channelId/messages")
def get_channel_messages():
    channel_id = req.args
    channel_messages = Message.query.filter_by(messgeable_id == channel_id).all
    return {"channel_messages": [message.to_dict() for message in channel_messages]}


# Create a new channel
@channel_routes.route("/", methods = ["POST"])
def create_channel():
    # Needs work
    pass

# Add a user to the channel, requires authentication if user has permission to add others
@channel_routes.route("/:channelId/users/:userId", methods = ["POST"])
def add_user_to_channel():
    # Needs work
    pass

# Update channel settings, requires authentication if user has permission to change channel settings
# different from the personalization settings like display name and notification settings for specific
# user,
@channel_routes.route("/:channelId")
def change_channel_settings():
    # Needs work
    pass

# Delete channel, requires authentication if user has permission to delete channel
@channel_routes.route("/:channelId", methods = ["DELETE"])
    channel_id = req.args

    return "Channel successfully deleted"
