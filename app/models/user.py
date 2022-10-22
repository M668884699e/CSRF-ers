from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
# from .channel import ChannelUser


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    # channels = db.relationship("Channel",
    #                         secondary=channel_users,
    #                         back_populates="users")
    print("hello 1")
    channel_member = db.relationship("ChannelUser", backref="member", cascade="all, delete")
    # channel = db.relationship("ChannelUser", back_populates="orders")
    # users = db.relationship("ChannelUser", back_populates="users")
    print("hello 2")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name':self.first_name,
            'last_name':self.last_name,
            'username': self.username,
            'email': self.email,
            'hashed_password': self.hashed_password
        }
