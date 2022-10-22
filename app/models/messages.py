from .db import db


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(3000), nullable=False)
    channel_id = db.Column(db.Integer, nullable=True)
    direct_message_room_id = db.Column(db.Integer, nullable=True)
    sender_id = db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)

    def to_dict(self):
        return {
            'id': self.id,
            'message': self.message,
            'channelId': self.channel_id,
            'directMessageRoomId': self.direct_message_room_id,
            'senderId': self.sender_id
        }
