from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

class DMRForm(FlaskForm):
    user_ids = StringField('user_ids', validators=[DataRequired()])
