from .db import db

class ChannelUser(db.Model):
    __tablename__ = "channel_users"

    channel_id = db.Column("channel_id", db.ForeignKey("channels.id"), primary_key=True)
    # channel_name = db.Column("channel_name", db.ForeignKey("channels.channel_name"), primary_key=False)
    user_id = db.Column("user_id", db.ForeignKey("users.id"), primary_key=True)

    def to_dict(self):
        return {
            'channel_id': self.channel_id,
            # "channel_name": self.channel_name,
            'user_id': self.user_id
        }
