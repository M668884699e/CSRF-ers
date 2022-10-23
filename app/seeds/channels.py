from app.models import db, Channel

# Adds three demo channels, you can add other channels here if you want
def seed_channels():
    channel_1 = Channel(
        owner_id = 1,
        channel_name = "Channel 1",
    )
    channel_2 = Channel(
        owner_id = 2,
        channel_name = "Channel 2",
    )
    channel_3 = Channel(
        owner_id = 3,
        channel_name = "Channel 3",
    )

    db.session.add(channel_1)
    db.session.add(channel_2)
    db.session.add(channel_3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the channels table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_channels():
    # db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.execute("DROP TABLE IF EXISTS channels;")
    db.session.commit()
