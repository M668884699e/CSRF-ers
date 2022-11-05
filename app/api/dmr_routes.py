from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import DMR, DMRUser, Message, User, db
from app.forms import DMRForm

# blueprint for dmr
dmr_routes = Blueprint('dmr', __name__)

#* GET - /dmr
# Get all DirectMessageRooms
@login_required
@dmr_routes.route('/')
def get_dmrs():
  """
  Get all Direct Message Rooms
  """
  dmrs = DMR.query.all()
  return {'dmrs':[dmr.to_dict() for dmr in dmrs]}

#* GET - /dmr/:dmrId
# Get DMR by id
@login_required
@dmr_routes.route('/<int:dmr_id>')
def get_dmr(dmr_id):
  """
  Get all DMR by id
  """
  dmr = DMR.query.get(dmr_id)
  return {"dmrs": dmr.to_dict()}

#* GET - /dmr/:dmrId/users
# Get all users in DirectMessageRooms
@login_required
@dmr_routes.route('/<int:dmr_id>/users')
def get_dmr_users(dmr_id):
  """
  Get all users of dmr_users by dmr id
  """
  # if dmr is not found, throw an error
  specific_dmr = DMR.query.get(dmr_id)

  # if dmr does not exist, throw an error
  if(specific_dmr is None):
    return {'errors': [f'DMR {dmr_id} does not exist']}, 404

  # in dmr_users model, query all dmr data by given dmr id
  dmr_users = DMRUser.query.filter(DMRUser.dmr_id == dmr_id)

  # otherwise response with successful dmr_users found
  return {'dmr_users':[dmr_user.to_dict() for dmr_user in dmr_users]}

#* GET - /dmr/all/users
# Get all dmr with user
@login_required
@dmr_routes.route("/all/users")
def get_dmrs_users():
  """
  Get all dmrs with users
  """
  # query through all dmr users model and return all records
  all_dmrs_users = DMRUser.query.all()

  return {"dmr_users": [all_dmr_users.to_dict() for all_dmr_users in all_dmrs_users]}

#* GET - /dmr/:dmrId/messages
# Get all messages in a DirectMessageRoom
@login_required
@dmr_routes.route('/<int:dmr_id>/messages')
def get_dmr_messages(dmr_id):
  """
  Get all messages of dmr_users by dmr id
  """
  # if dmr is not found, throw an error
  specific_dmr = DMR.query.get(dmr_id)

  # if dmr does not exist, throw an error
  if(specific_dmr is None):
    return {'errors': [f'DMR {dmr_id} does not exist']}, 404

  # query for any existing messages in the given dmr id
  dmr_messages = Message.query.filter(Message.messageable_type == 'DMR', Message.messageable_id == dmr_id)

  return {'dmr': dmr_id, 'dmr_messages':{dmr_message.id: dmr_message.to_dict() for dmr_message in dmr_messages}}

#* POST - /dmr
# Create new DirectMessageRoom
@login_required
@dmr_routes.route('/', methods=['POST'])
def create_dmr():
  """
  Create new Direct Message Room
  """
  # get data from dmr form
  form = DMRForm()

  # get a list of user names from user_ids
  user_ids = form.data['user_ids'].split(',')


  # make an empty string to later store user name
  user_names = []

  for x in user_ids:
    check_user = User.query.get(int(x))
    if(check_user is None):
      return {'errors': [f"User {int(x)} does not exist"]}, 404
    user_name = User.query.get(int(x)).to_dict()['display_name']
    user_names.append(user_name)

  user_names.pop(0)
  user_names = ", ".join(user_names)

  allDMRs = DMR.query.all()
  for x in allDMRs:
    if user_names == x.dmr_name:
      return {'errors': "A Direct Message Room with these members already exists"}, 400


  # create new dmr
  new_dmr = DMR(
    dmr_name = user_names
  )

  # add dmr to db and commit
  db.session.add(new_dmr)
  db.session.commit()

  #* (2) create DMR_Users
  # make an empty list to later store new dmr_users
  new_dmr_users = []

  # for every user id
  for user_id in user_ids:
    # check if user exist and throw error if necessary
    check_user = User.query.get(user_id)

    if(check_user is None):
        return {'errors': [f"User {user_id} does not exist"]}, 404

    # create new dmr_user
    new_dmr_user = DMRUser(
      user_id = user_id,
      dmr_id = new_dmr.id
    )

    # add new_dmr_user to db session
    db.session.add(new_dmr_user)

    # add new_dmr_user
    new_dmr_users.append(new_dmr_user)

  db.session.commit()
  # return successful message response
  return {'new_dmr': new_dmr.to_dict(), 'new_dmr_user': [new_dmr_user.to_dict() for new_dmr_user in new_dmr_users]}

# Add a user to the dmr, requires authentication if user has permission to add others
@login_required
@dmr_routes.route("/<int:dmr_id>/users/<int:user_id>", methods = ["PUT"])
def add_user_to_dmr(dmr_id, user_id):
    """
    Add user to dmr
    """

    # if dmr is not found, throw an error
    specific_dmr = DMR.query.get(dmr_id)

    # if dmr does not exist, throw an error
    if(specific_dmr is None):
        return {'errors': [f"DMR {dmr_id} does not exist"]}, 404

    # check if user exist
    add_user = User.query.get(user_id)

    # if user does not exist, throw an error
    if(add_user is None):
        return {'errors': [f"User {user_id} does not exist"]}, 404

    # if user does not exist in the given dmr, proceed to adding
    if(DMRUser.query.filter(DMRUser.dmr_id == dmr_id).filter_by(user_id = user_id).first() is None):
        # create new DmrUser seed
        new_dmr_user = DMRUser(
            dmr_id = dmr_id,
            user_id = user_id
        )

        # commit and add to db session
        db.session.add(new_dmr_user)
        db.session.commit()

        # return successful response
        return {
            'message': f'Successfully added user {user_id} to dmr {dmr_id}',
            'new_dmr_user': new_dmr_user.to_dict()
        }

    return "No user to add"

#* DELETE - /dmr/:dmrId
# Delete DirectMessageRoom
@login_required
@dmr_routes.route('/<int:dmr_id>', methods=['DELETE'])
def delete_dmr(dmr_id):
  """
  Delete existing DMR
  """
  # get dmr by dmr id
  dmr = DMR.query.get(dmr_id)

  # if dmr does not exist, throw an error
  if(dmr == None):
      return {'errors': [f"DMR {dmr_id} does not exist"]}, 404
    
  # delete all messages with messeagle_type === channel and channel_id
  current_dmr_messages = Message.query.filter(dmr_id == Message.messageable_id).filter("DMR" == Message.messageable_type)
  current_dmr_messages.delete(synchronize_session = False)

  # otherwise, return successful response and delete dmr
  db.session.delete(dmr)
  db.session.commit()

  return {"message": f"Successfully deleted dmr {dmr_id}"}

#* DELETE /dmrs/:dmrId/users/:userId
@login_required
@dmr_routes.route('/<int:dmr_id>/users/<int:user_id>', methods=['DELETE'])
def remove_user_from_dmr(dmr_id, user_id):
  """
  Remove current user from dmr
  """
  # given dmr id, query through all dmr_users to find current dmr
  current_dmr_user = DMRUser.query.filter(DMRUser.user_id == current_user.get_id()).filter(DMRUser.dmr_id == dmr_id).first()

  #check if user is a current member of given dmr, throw error if necessary
  if current_dmr_user is None:
    return {'message': f'User {current_user.get_id()} does not exist in dmr {dmr_id}'}, 404

  # delete user that's not current owner
  db.session.delete(current_dmr_user)
  db.session.commit()

  # return back successful response
  return{
    'message': f'Successfully deleted user {current_user.get_id()} from dmr {dmr_id}'
  }
