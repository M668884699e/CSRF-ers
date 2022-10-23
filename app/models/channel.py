from .db import db
from .message import Message
import datetime
# from .user import User



class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, nullable=False)
    channel_name = db.Column(db.String(40), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

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
