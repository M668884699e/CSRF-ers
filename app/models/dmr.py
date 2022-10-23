from .db import db

class DMR(db.Model):
    __tablename__ = 'direct_message_rooms'

    id = db.Column(db.Integer, primary_key=True)
    # Todo: reformat for multiple messages
    # message_id = db.Column(db.Integer)
    dmr_name = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DATE)
    updated_at = db.Column(db.DATE)

    # dmr_users = db.join()

    def to_dict(self):
        return {
            'id': self.id,
            # 'message_id': self.message_id
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
