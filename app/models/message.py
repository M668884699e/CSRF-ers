from .db import db
import datetime


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(3000), nullable=False)
    channel_id = db.Column(db.Integer, nullable=True)
    direct_message_room_id = db.Column(db.Integer, nullable=True)
    sender_id = db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'message': self.message,
            'channel_id': self.channel_id,
            'direct_message_room_id': self.direct_message_room_id,
            'sender_id': self.sender_id
        }
