from .db import db

class DMR(db.Model):
    __tablename__ = 'direct_message_rooms'
    
    id = db.Column(db.Integer, primary_key=True)
    message_id = db.Column(db.Integer)
    created_at = db.Column(db.DATE)
    updated_at = db.Column(db.DATE)
    
    def to_dict(self):
        return {
            'id': self.id,
            'message_id': self.message_id
            'created_at': self.created_at
            'updated_at': self.updated_at
        }