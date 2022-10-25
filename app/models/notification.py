from .db import db
import datetime

class Notification(db.Model):
  __tablename__ = "notifications"
  
  id = db.Column(db.Integer, primary_key=True)
  notificationable_id = db.Column(db.Integer)
  notificationable_type = db.Column(db.String(50))
  user_id = db.Column("user_id", db.ForeignKey("users.id"))
  notification_sound = db.Column(db.String(255))
  sound_setting = db.Column(db.Boolean)
  read_status = db.Column(db.Boolean)
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  
  # connect polymorphic relationship
  __mapper_args__ = {
    'polymorphic_identity': 'notifications',
    'with_polymorphic': '*'
  }
  
  def to_dict(self):
    """
    Convert to return notification as dictionary
    """
    return {
      "id": self.id,
      "notificationable_id": self.notificationable_id,
      "notificationable_type": self.notificationable_type,
      "user_id": self.user_id,
      "notification_sound": self.notification_sound,
      "sound_setting": self.sound_setting,
      "read_status": self.read_status,
      "created_at": self.created_at,
      "updated_at": self.updated_at
    }
