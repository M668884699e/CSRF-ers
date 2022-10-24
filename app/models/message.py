from .db import db
import datetime


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(3000), nullable=False)
    # channel_id = db.Column(db.Integer, nullable=True)
    # direct_message_room_id = db.Column(db.Integer, nullable=True)
    sender_id = db.Column(db.Integer, nullable=True)
    
    # polymorphic association between message to channel and dmr
    messageable_id = db.Column(db.Integer, nullable=False)
    messageable_type = db.Column(db.String(50), nullable=False)
    
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # connect polymorphic relationship
    __mapper_args__ = {
        'polymorphic_identity': 'messages',
        'with_polymorphic': '*'
    }


    def to_dict(self):
        return {
            'id': self.id,
            'message': self.message,
            # 'channel_id': self.channel_id,
            # 'direct_message_room_id': self.direct_message_room_id,
            'sender_id': self.sender_id,
            'messageable_id': self.messageable_id,
            'messageable_type': self.messageable_type
        }
