from flask import Blueprint, jsonify, session, request
from app.models import db, User, Message, DMRUser, ChannelUser, Notification
from app.forms import LoginForm, SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

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
# Get user by id
@user_routes.route('/current')
# @login_required
def get_current_user():
    """
    get current user
    """
    user = User.query.get(current_user.get_id())
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
    belongs_channels = ChannelUser.query.filter(ChannelUser.user_id == current_user.get_id())

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
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # if username does not exist...
        display_name = form.data['username']

        if(form.data['username'].strip() == ""):
            # combine first and last name to make user name
            display_name = f"{form.data['first_name']} {form.data['last_name']}"

        user = User(
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            # username=form.data['username'],
            username=display_name,
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

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
    form = SignUpForm()

    #* update user
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

    # commit update
    db.session.commit()

    # return current user
    return current_user_update.to_dict()

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
    return f"Successfully deleted user {destroy_user.id}"
