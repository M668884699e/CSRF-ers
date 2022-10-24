from .db import db
# from .dmr_user import DMRUser
import datetime

class DMR(db.Model):
    __tablename__ = 'direct_message_rooms'

    id = db.Column(db.Integer, primary_key=True)
    # Todo: reformat for multiple messages
    # message_id = db.Column(db.Integer)
    dmr_name = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    # dmr_member = db.relationship("DMRUser", backref="channel", cascade="all,delete")
    
    # connect polymorphic relationship
    __mapper_args__ = {
        'polymorphic_identity': 'dmr',
        'with_polymorphic': '*'
    }

    # dmr_users = db.join()

    def to_dict(self):
        return {
            'id': self.id,
            'dmr_name': self.dmr_name,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
