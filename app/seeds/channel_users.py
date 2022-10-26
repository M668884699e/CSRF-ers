from app.models import db, ChannelUser

# seed channel users
def seed_channel_users():
    channel_one_user_one = ChannelUser(
        channel_id = 1,
        user_id = 1,
    )

    channel_one_user_two = ChannelUser(
        channel_id = 1,
        user_id = 2,
    )

    channel_one_user_three = ChannelUser(
        channel_id = 1,
        user_id = 3,
    )

    channel_two_user_one = ChannelUser(
        channel_id = 2,
        user_id = 1
    )

    channel_two_user_two = ChannelUser(
        channel_id = 2,
        user_id = 2
    )

    channel_three_user_one = ChannelUser(
        channel_id = 3,
        user_id = 1
    )

    channel_three_user_three = ChannelUser(
        channel_id = 3,
        user_id = 3
    )
    db.session.add(channel_one_user_one)
    db.session.add(channel_one_user_two)
    db.session.add(channel_one_user_three)
    db.session.add(channel_two_user_one)
    db.session.add(channel_two_user_two)
    db.session.add(channel_three_user_one)
    db.session.add(channel_three_user_three)

    db.session.commit()

# undo channel users
def undo_channel_users():
    db.session.execute("DELETE FROM channel_users;")
    db.session.commit()
