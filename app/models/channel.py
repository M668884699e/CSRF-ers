from .db import db
from .message import Message
import datetime

class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, nullable=False)
    channel_name = db.Column(db.String(40), nullable=False)
    channel_image = db.Column(db.String(255), default="https://preview.redd.it/k0yaetfhwta21.png?auto=webp&s=dc76059060406cbbfc4b62514eb3128fe7f3a866")
    public = db.Column(db.Boolean, default=False)
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
            'channel_name': self.channel_name,
            'channel_image': self.channel_image,
            'public': self.public,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
