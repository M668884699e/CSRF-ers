from .db import db
from .message import Messages
from .user import User

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

# channel_messages = Table(
#     "channel_messages",
#     Base.metadata,
#     Column("channel_id", ForeignKey("channels.id"), primary_key=True),
#     Column("message_id", ForeignKey("messages.id"), primary_key=True)
# )

class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, nullable=False)
    channel_name = db.Column(db.String(40), nullable=False)
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)

    # user = relationship("User", back_populates="users")
    users = relationship("Users",
                        secondary=channel_users,
                        back_populates="channels")


    # message = relationship("Message", back_populates="messages")


    @property
    def password(self):
        return self.hashed_password

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'channel_name': self.channel_name
        }
