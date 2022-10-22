from .db import db
from .messages import Messages
from .user import User


class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, nullable=False)
    channel_name = db.Column(db.String(40), nullable=False)
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)

    message_id = db.join(Messages, Messages.id = Channels.message_id)
    users = db.join(User, Users.id = Channels.user_id)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        # if len(password) <= 6:
        #     return "ERROR" # TBD
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'channel_name': self.channel_name
        }
