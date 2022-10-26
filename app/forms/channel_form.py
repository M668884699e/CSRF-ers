from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, ValidationError

class ChannelForm(FlaskForm):
  channel_name = StringField('channel_name', validators=[DataRequired()])
  user_ids = StringField('user_ids', validators=[DataRequired()])
  public = BooleanField('public')
