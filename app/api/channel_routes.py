from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Channel, ChannelUser, Message, User, db
from app.forms import ChannelForm

channel_routes = Blueprint("channels", __name__)

#* GET - /channels/
# Get all channels
@login_required
@channel_routes.route("/")
def get_all_channels():
    """
    Get all channels
    """
    channels = Channel.query.all()
    return {"channels": [channel.to_dict() for channel in channels]}

#* GET - /channels/:channelId
# Get specific channel, requires authentication if current user is member of channel
@login_required
@channel_routes.route("/<int:channel_id>")
def get_one_channel(channel_id):
    """
    Get specific channel
    """
    specific_channel = Channel.query.get(channel_id)
    
    # if dmr does not exist, throw an error
    if(specific_channel is None):
        return {'errors': [f"Channel {channel_id} does not exist"]}, 404
    
    # otherwise, send successful response
    return {"channel": specific_channel.to_dict()}

#* GET - /channels/:channelId/users
# Get all users of a channel, requires authentication
@login_required
@channel_routes.route("/<int:channel_id>/users")
def get_channel_users(channel_id):
    """
    Get all users of a channel
    """
    # if channel is not found, throw an error
    specific_channel = Channel.query.get(channel_id)
    
    # if channel does not exist, throw an error
    if(specific_channel is None):
        return {'errors': [f"Channel {channel_id} does not exist"]}, 404
    
    # specific_channel_users = ChannelUser.query(ChannelUser.user_id).filter(ChannelUser.channel_id == channel_id)
    specific_channel_users = ChannelUser.query.with_entities(ChannelUser.user_id).filter(ChannelUser.channel_id == channel_id).all()
    
    return {'channel': channel_id, 'users': [specific_channel_user[0] for specific_channel_user in specific_channel_users]}

#* GET - /channels/:channelId/messages
# Get all messages of a channel, requires authentication ?
@login_required
@channel_routes.route("/<int:channel_id>/messages")
def get_channel_messages(channel_id):
    """
    Get all messages of channel by channel id
    """
    # if channel is not found, throw an error
    specific_channel = Channel.query.get(channel_id)
    
    # if channel does not exist, throw an error
    if(specific_channel is None):
      return {'errors': [f'Channel {channel_id} does not exist']}, 404
  
    # query for any existing messages in the given channel id
    channel_messages = Message.query.filter(Message.messageable_type == 'Channel', Message.messageable_id == int(channel_id))
  
    return {'channel': channel_id, 'channel_messages':[channel_message.to_dict() for channel_message in channel_messages]}

#* POST - /channels
# Create a new channel
@login_required
@channel_routes.route("/", methods = ["POST"])
def create_channel():
    """
    Create a channel
    """
    # get data from channel form
    form = ChannelForm()
    
    # get a list of user ids, channel name
    user_ids, channel_name = form.data['user_ids'].split(', '), form.data['channel_name']
    
    #* (1) Create Channel
    new_channel = Channel(
        owner_id = current_user.get_id(),
        channel_name = channel_name
    )
    
    # add channel to db and commit
    db.session.add(new_channel)
    db.session.commit()
    
    #* (2) Create Channel_Users
    new_channel_users = []
    
    # for every user id
    for user_id in user_ids:
        # check if user exist and throw error if necessary
        check_user = User.query.get(user_id)
        
        if(check_user is None):
            return {'errors': [f"User {user_id} does not exist"]}, 404   
        
        # create new channel_user
        new_channel_user = ChannelUser(
            channel_id = new_channel.id,
            user_id = user_id
        )
        
        # add new channel_user to db session
        db.session.add(new_channel_user)
        
        # add new channel_user
        new_channel_users.append(new_channel_user)
        
    db.session.commit()
    
    # return successful message response
    return {'new_channel': new_channel.to_dict(), 'new_channel_user': [new_channel_user.to_dict() for new_channel_user in new_channel_users]}

# Add a user to the channel, requires authentication if user has permission to add others
@login_required
@channel_routes.route("/<int:channel_id>/users/<int:user_id>", methods = ["POST"])
def add_user_to_channel(channel_id, user_id):
    """
    Add user to channel
    """
    # if channel is not found, throw an error
    specific_channel = Channel.query.get(channel_id)
    
    # if channel does not exist, throw an error
    if(specific_channel is None):
        return {'errors': [f"Channel {channel_id} does not exist"]}, 404
    
    # check if user exist
    add_user = User.query.get(user_id)
    
    # if user does not exist, throw an error
    if(add_user is None):
        return {'errors': [f"User {user_id} does not exist"]}, 404
    
    # if user already exist in the given channel, throw an error
    if(ChannelUser.query.filter(ChannelUser.channel_id == channel_id).filter_by(user_id = user_id).first() is not None):
        return {'errors': [f"User already exist in Channel {channel_id}"]}, 400   
    
    # check if channel owner and throw error if necessary
    if(specific_channel.owner_id != current_user.get_id()):
        return {'errors': [f"User {current_user.get_id()} does not have access to add others to channel {channel_id}"]}, 400   
    
    # create new ChannelUser seed
    new_channel_user = ChannelUser(
        channel_id = channel_id,
        user_id = user_id
    )
    
    # commit and add to db session
    db.session.add(new_channel_user)
    db.session.commit()
    
    # return successful response
    return {
        'message': f'Successfully added user {user_id} to channel {channel_id}',
        'new_channel_user': new_channel_user.to_dict()
    }

#*! PUT - /channels/:channelId
# Update channel settings, requires authentication if user has permission to change channel settings
# different from the personalization settings like display name and notification settings for specific
# user,
@login_required
@channel_routes.route('/<int:channel_id>', methods=['PUT'])
def change_channel_settings():
    """
    Change channel settings
    """
    # Needs work
    pass

#* DELETE - /channels/:channelId
# Delete channel, requires authentication if user has permission to delete channel
@login_required
@channel_routes.route('/<int:channel_id>', methods=['DELETE'])
def delete_channel(channel_id):
    """
    Delete existing Channel
    """
    # get channel by channel_id
    destroy_channel = Channel.query.get(channel_id)
    
    # if channel does not exist, throw an error
    if(destroy_channel == None):
        return {'errors': [f"Channel {channel_id} does not exist"]}, 404
    
    # otherwise, return successful response and delete channel
    db.session.delete(destroy_channel)
    db.session.commit()

    return {"channel": f"Successfully deleted channel {channel_id}"}
