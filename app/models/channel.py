from .db import db
from .message import Message
# from .user import User

# Join Table Imports
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import relationship
# from sqlalchemy.schema import Column, ForeignKey, Table
# from sqlalchemy.types import Integer, String

# Base = declarative_base()

# channel_users = db.Table(
#     "channel_users",
#     # Base.metadata,
#     db.Column("channel_id", db.ForeignKey("channels.id"), primary_key=True),
#     db.Column("user_id", db.ForeignKey("users.id"), primary_key=True)
# )

class ChannelUser(db.Model):
    __tablename__ = "channel_users"

    channel_id = db.Column("channel_id", db.ForeignKey("channels.id"), primary_key=True)
    user_id = db.Column("user_id", db.ForeignKey("users.id"), primary_key=True)

    # channels = db.relationship("Channel", back_populates="channels")
    # users = db.relationship("User", back_populates="users")



class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, nullable=False)
    channel_name = db.Column(db.String(40), nullable=False)
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)

    # users = db.relationship("User",
    #                     secondary=channel_users,
    #                     back_populates="channels")

    # users = db.relationship("channel_users", back_populates="users")
    # channels = db.relationship("channel_users", back_populates="channels")
    channel_member = db.relationship("ChannelUser", backref="channel", cascade="all,delete")


    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'channel_name': self.channel_name
        }
