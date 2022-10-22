from app.models import db, Channel

# Adds three demo channels, you can add other channels here if you want
def seed_channels():
    channel_1 = Channel(
        owner_id = 1,
        channel_name = "Channel 1"
        users: {
            1: {
                id: 1,
                first_name: "Demo",
                last_name: "User",
                username: 'Demo',
                email: 'demo@aa.io',
            },
            2: {
                id: 2,
                first_name="Marnie",
                last_name="Smith",
                username='marnie',
                email='marnie@aa.io'
            }
            3: {
                id: 3,
                first_name="Bobbie",
                last_name="Jones"
                username='bobbie',
                email='bobbie@aa.io'
            }
        }
        messages: [1, 2, 3]
    )
    channel_2 = Channel(
        owner_id = 2,
        channel_name = "Channel 2"
        users: {
            1: {
                id: 2,
                first_name="Marnie",
                last_name="Smith",
                username='marnie',
                email='marnie@aa.io'
            }
            2: {
                id: 3,
                first_name="Bobbie",
                last_name="Jones"
                username='bobbie',
                email='bobbie@aa.io'
            }
        }
        messages: [4, 5]
    )
    channel_3 = Channel(
        owner_id = 3,
        channel_name = "Channel 3"
        users: {
            1: {
                id: 1,
                first_name: "Demo",
                last_name: "User",
                username: 'Demo',
                email: 'demo@aa.io',
            },
            2: {
                id: 3,
                first_name="Bobbie",
                last_name="Jones"
                username='bobbie',
                email='bobbie@aa.io'
            }
        }
        messages: [6, 7]
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
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
