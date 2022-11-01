from flask import Blueprint, jsonify, session, request
from app.models import db, User, Message, DMRUser, ChannelUser, Channel, Notification
from app.forms import LoginForm, SignUpForm, EditUserForm
from flask_login import current_user, login_user, logout_user, login_required
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

#* GET - /authenticate
# Verify user authentication
@user_routes.route('/authenticate')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}

#* GET - /unauthorized
# Respond user as unauthorized
@user_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401

#* GET - /users
# Get all users
@user_routes.route('/')
@login_required
def users():
    """
    get all available users
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

#* GET - /users/current
# Get current logged in user
@user_routes.route('/current')
# @login_required
def get_current_user():
    """
    get current user
    """
    user = User.query.get(current_user.get_id())
    return user.to_dict()

#* GET - /users/<int:id>
@user_routes.route('/<int:id>')
@login_required
def get_user_by_id(id):
    user = User.query.get(id)
    
    if user == None:
        return {'errors': [f"User {id} does not exist"]}, 404
    return user.to_dict()
        

#* GET - /users/logout
# Log out of the current user
@user_routes.route('/logout', methods=["POST"])
def logout():
    """
    Logs a user out
    """
    # log out current user and send successful response
    logout_user()
    return {'message': 'User logged out'}


#* GET - /users/dmr
# Get all user DMR room
@user_routes.route('/dmr')
@login_required
def get_user_dmrs():
    # query DMR and find any dmr that current user belongs to
    belongs_dmrs = DMRUser.query.filter(DMRUser.user_id == current_user.get_id())

    return {"dmrs": [belongs_dmr.to_dict() for belongs_dmr in belongs_dmrs]}


#* GET - /users/messages
# Get all user messages
@user_routes.route('/messages')
@login_required
def get_user_messages():
    # query Message and find any that current user have access to
    belongs_messages = Message.query.filter(Message.sender_id == current_user.get_id())

    return {"messages": [belongs_message.to_dict() for belongs_message in belongs_messages]}

#* GET - /users/channels
# Get all channels
@user_routes.route('/channels')
@login_required
def get_user_channels():
    # query Channel and find any that current user belongs to
    belongs_channels_users = ChannelUser.query.filter(ChannelUser.user_id == current_user.get_id())

    # variable to store all channels details that current user belongs to
    belongs_channels_ids = []

    # get list of all channel id that user belongs to from belongs_channels_users
    for key in [belongs_channel_users.to_dict() for belongs_channel_users in belongs_channels_users]:
        if(key['user_id'] == int(current_user.get_id())):
            belongs_channels_ids.append(key['channel_id'])
    
    belongs_channels = Channel.query.filter(Channel.id.in_(belongs_channels_ids))

    # return successful response
    return {"channels": [belongs_channel.to_dict() for belongs_channel in belongs_channels]}

#* GET - /users/notifications
# Get all notifications of current logged in user
@user_routes.route('/notifications')
@login_required
def get_user_notifications():
    # query Notification and find any that current user have access to
    belongs_notifications = Notification.query.filter(Notification.user_id == current_user.get_id())

    return {"notifications": [belongs_notification.to_dict() for belongs_notification in belongs_notifications]}

#* POST - /users/login
# Log into the existing user account
@user_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#* POST - /users/signup
# Create a new user
@user_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    
    if form.validate_on_submit():
        # if username does not exist...
        display_name = form.data['username']

        if(form.data['username'].strip() == ""):
            # combine first and last name to make user name
            display_name = f"{form.data['first_name']} {form.data['last_name']}"

        user = User(
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            username=display_name,
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#* POST - /users/image/sample
# Retrieve a url of image for sample
@user_routes.route('/image/sample', methods=['POST'])
def post_image_sample():
    """
    Retrieve a url of image for sample
    """
    # get user data from form
    form = SignUpForm()
    
    #? check if there are image file uploaded
    # if "image_sample" not in request.files:
    if "image_sample" not in request.files:
        return {"errors": "image required"}, 400
    
    image = request.files["image_sample"]

    # print("                       ")
    # print("        HERE           ")
    # print("                       ")        

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400
    
    image.filename = get_unique_filename(image.filename)
    
    upload = upload_file_to_s3(image)
    
    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400    

    url = upload["url"]
    
    # return current user
    return {"image_sample": url}

#* PUT/PATCH - /users
# Update user information (username, first/last name, email, etc.)
@user_routes.route('/', methods=['PUT'])
@login_required
def update_user():
    """
    update current user information
    """
    # get current user
    current_user_update = User.query.get(current_user.get_id())

    # get user data from form
    form = EditUserForm()
    
    form['csrf_token'].data = request.cookies['csrf_token']
    
    upload_profile_image = form.data['profile_image']
    
    #? For help with debugging form
    if(len(form.errors) > 1): 
        print("          ")
        print(form.errors)
        print("          ")
    
    #? check if there are image file uploaded
    if "profile_image" in request.files:

        image = request.files["profile_image"]

        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400    

        url = upload["url"]
    
        # if url exist, replace profile image with url
        if(url):
            upload_profile_image = url

    #* update user
    if form.validate_on_submit():
        # check for any form errors
        # if first name exist
        if(form.data['first_name']):
            current_user_update.first_name = form.data['first_name']

        # if last name exist
        if(form.data['last_name']):
            current_user_update.last_name = form.data['last_name']

        # if user name exist
        if(form.data['username']):
            current_user_update.username = form.data['username']

        # if email exist
        if(form.data['email']):
            current_user_update.email = form.data['email']

        # if password exist
        if(form.data['password']):
            current_user_update.password = form.data['password']

        # if profile image exist
        if(upload_profile_image):
            current_user_update.profile_image = upload_profile_image

        # commit update
        db.session.commit()

        # return current user
        return current_user_update.to_dict()
        
    # return errors
    return{"errors": [error_values for error in form.errors for error_values in form.errors[error]]}, 400

#* DELETE - /users
# Delete user
@user_routes.route('/', methods=['DELETE'])
@login_required
def delete_user():
    # get current user
    destroy_user = User.query.get(current_user.get_id())

    # if no current user to delete, throw error
    if(destroy_user == None):
        return {'errors': [f"User {current_user.get_id()} does not exist"]}, 404

    # delete current user
    db.session.delete(destroy_user)
    db.session.commit()

    # return successful response with delete message
    return {'message': "Successfully deleted user {destroy_user.id}"}
