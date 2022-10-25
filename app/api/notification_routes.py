from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Notification, db
from app.forms import NotificationForm

notification_routes = Blueprint('notifications', __name__)

#* GET - /notifications
# Get all notifications
@login_required
@notification_routes.route('/')
def get_all_notifications():
  """
  Get all notifications
  """
  # query all notifications
  notifications = Notification.query.all()
  
  # return successful response
  return {'notifications': [notification.to_dict() for notification in notifications]}

#* GET - /notifications/:notificationId
# Get specific notification
@login_required
@notification_routes.route('/<int:notification_id>')
def get_notification(notification_id):
  """
  Get specific notification by id
  """
  # query specific notification
  notification = Notification.query.get(notification_id)
  
  # throw error if notification not found
  if notification is None:
    return {'errors': [f"Notification {notification_id} does not exist"]}, 404
  
  # return successful response
  return {'notification': notification.to_dict()}

#* PUT - /notifications/:notificationid
# Modify chosen notification
@login_required
@notification_routes.route('/<int:notification_id>', methods=['PUT'])
def update_notification(notification_id):
  """
  Modify given notification
  """
  # get current notification
  current_notification = Notification.query.get(notification_id)
  
  # if notification does not exist, throw error
  if current_notification is None:
    return {'errors': [f"Notification {notification_id} does not exist"]}, 404
  
  # if current notification user does not match current logged in notification, throw error
  if current_notification.user_id != int(current_user.get_id()):
    return {'errors': [f"User {current_user.get_id()} does not have access to update notification {notification_id}"]}, 404
  
  # get notification data from form
  form = NotificationForm()
 
  if(form.data['notification_sound']):
    current_notification.notification_sound = form.data['notification_sound']
  
  if(form.data['sound_setting'] is not None):
    current_notification.sound_setting = form.data['sound_setting']
  
  if(form.data['read_status'] is not None):
    current_notification.read_status = form.data['read_status']
  
  # # commit update
  db.session.commit()
  
  # # return updated current notification
  return {"current_notification": current_notification.to_dict()}
