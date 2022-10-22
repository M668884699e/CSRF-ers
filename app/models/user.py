from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

# Join Table Imports
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer, String

Base = declarative_base()

channel_users = Table(
    "channel_users",
    Base.metadata,
    Column("channel_id", ForeignKey("channels.id"), primary_key=True),
    Column("user_id", ForeignKey("users.id"), primary_key=True)
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(40), nullable=False)
    lastName = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    channels = relationship("Channels",
                            secondary=channel_users,
                            back_populates="users")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        # if len(password) <= 6:
        #     return "ERROR" # TBD
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName':self.firstName,
            'lastName':self.lastName,
            'username': self.username,
            'email': self.email
        }
