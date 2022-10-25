from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import Message

class NotificationForm(FlaskForm):
  notificationable_id = IntegerField("notificationable_id", validators=[DataRequired()])
  notificationable_type = StringField("notificationable_type", validators=[DataRequired()])
  notification_sound = StringField("notification_sound", validators=[DataRequired()])
  sound_setting = BooleanField("sound_setting", default=True)
  read_status = BooleanField("read_status", default=False)
