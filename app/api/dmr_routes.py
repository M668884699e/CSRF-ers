from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import DMR, DMRUser, Message, db
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
  return {'DirectMessageRooms':[dmr.to_dict() for dmr in dmrs]}

#* GET - /dmr/:dmrId
# Get DMR by id
@login_required
@dmr_routes.route('/<int:dmr_id>')
def get_dmr(dmr_id):
  """
  Get all DMR by id
  """
  dmr = DMR.query.get(dmr_id)
  return dmr.to_dict()

#* GET - /dmr/:dmrId/users
# Get all users in DirectMessageRooms
@login_required
@dmr_routes.route('/<int:dmr_id>/users')
def get_dmr_users(dmr_id):
  """
  Get all users of dmr_users by dmr id
  """
  # in dmr_users model, query all dmr data by given dmr id
  dmr_users = DMRUser.query.filter(DMRUser.dmr_id == dmr_id)

  return {'dmr_users':[dmr_user.to_dict() for dmr_user in dmr_users]}
  

#* GET - /dmr/:dmrId/messages
# Get all messages in a DirectMessageRoom
@login_required
@dmr_routes.route('/<int:dmr_id>/messages')
def get_dmr_messages(dmr_id):
  """
  Get all messages of dmr_users by dmr id
  """
  dmr_messages = Message.query.filter(Message.messageable_type == 'DMR')
  
  return {'dmr_messages':[dmr_message.to_dict() for dmr_message in dmr_messages]}
  
#* POST - /dmr
# Create new DirectMessageRoom
@login_required
@dmr_routes.route('/', methods=['POST'])
def new_dmr():
  """
  Create new Direct Message Room
  """
  # get data from dmr form
  form = DMRForm()
  
  # create new dmr from form data
  new_dmr = DMR(
    dmr_name = form.data['dmr_name']
  )
  
  db.session.add(new_dmr)
  
  new_dmr_users = []
  
  print("form.data['user_ids'] ????? ", form.data['user_ids'])
  
  # create new dmr_users model from form data
  for user_id in form.data['user_ids']:
    new_dmr_user = DMRUsers(
      dmr_id = new_dmr.id,
      user_id = user_id
    )
  
    new_dmr_users.append(new_dmr_user)
    
    db.session.add(new_dmr_user)
  
  # after adding dmr and dmr_user to database -> commit
  db.session.commit()
  
  # return successful message response
  return {'new_dmr': new_dmr.to_dict(), 'new_dmr_user': [new_dmr_user.to_dict() for new_dmr_user in new_dmr_users]}

#* PUT - /dmr/:dmrId
# Update DirectMessageRoom settings

#* DELETE - /dmr/:dmrId
# Delete DirectMessageRoom
@login_required
@dmr_routes.route('/<int:dmr_id>', methods=['DELETE'])
def destroy_dmr(dmr_id):
  """
  Delete existing DMR
  """
  # get dmr by dmr id
  dmr = DMR.query.get(dmr_id)
  
  # if dmr does not exist, throw an error
  if(dmr == None):
      return {'errors': [f"DMR {dmr_id} does not exist"]}, 404
  
  # otherwise, return successful response and delete dmr
  db.session.delete(dmr)
  db.session.commit()
  
  return f"Successfully deleted dmr {dmr_id}"
