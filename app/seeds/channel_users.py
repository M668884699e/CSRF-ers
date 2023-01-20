from app.models import db, ChannelUser

# seed channel users
def seed_channel_users():
    channel_one_user_one = ChannelUser(
        channel_id = 1,
        user_id = 1,
    )

    channel_two_user_one = ChannelUser(
        channel_id = 2,
        user_id = 1
    )
    
    channel_three_user_one = ChannelUser(
        channel_id = 3,
        user_id = 1
    )
    
    channel_four_user_one = ChannelUser(
        channel_id = 4,
        user_id = 1
    )
    
    channel_five_user_one = ChannelUser(
        channel_id = 5,
        user_id = 1
    )
    
    db.session.add(channel_one_user_one)
    db.session.add(channel_two_user_one)
    db.session.add(channel_three_user_one)
    db.session.add(channel_four_user_one)
    db.session.add(channel_five_user_one)
    
    db.session.commit()

# undo channel users
def undo_channel_users():
    db.session.execute("DELETE FROM channel_users;")
    db.session.commit()
