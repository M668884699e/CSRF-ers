from .db import db
from .message import Message
import datetime

class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, nullable=False)
    channel_name = db.Column(db.String(40), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    channel_member = db.relationship("ChannelUser", backref="channel", cascade="all,delete")

    # connect polymorphic relationship
    __mapper_args__ = {
        'polymorphic_identity': 'channel',
        'with_polymorphic': '*'
    }

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'channel_name': self.channel_name
        }
