from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import re

def check_valid_email(form, field):
    EMAIL_REGEX = re.compile(r"[^@]+@[^@]+\.[^@]+")
    
    if not EMAIL_REGEX.match(field.data):
        raise ValidationError("Email entered is invalid.")
    

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')
      
class EditUserForm(FlaskForm):
    first_name = StringField(
        'first_name')
    last_name = StringField(
        'last_name')
    username = StringField('username')
    email = StringField('email', validators=[user_exists, check_valid_email])
    password = StringField('password')
    profile_image = StringField('profile_image')
