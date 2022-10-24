from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Message

class MessageForm(FlaskForm):
    message = StringField('message', validators=[DataRequired()])
    messageable_id = IntegerField('messageable_id', validators=[DataRequired()])
    messageable_type = StringField('messageable_type', validators=[DataRequired()])
