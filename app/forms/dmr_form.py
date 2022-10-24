from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FieldList
from wtforms.validators import DataRequired, ValidationError
from app.models import DMR

class DMRForm(FlaskForm):
    dmr_name = StringField('dmr_name', validators=[DataRequired()])
    user_ids = FieldList(IntegerField('user_ids', validators=[DataRequired()]))
