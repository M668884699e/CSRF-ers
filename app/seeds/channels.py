from app.models import db, Channel

# Adds three demo channels, you can add other channels here if you want
def seed_channels():
    # channel_1 = Channel(
    #     owner_id = 1,
    #     channel_name = "Channel 1",
    #     # channel_image = "",
    #     public = True
    # )
    # channel_2 = Channel(
    #     owner_id = 2,
    #     channel_name = "Channel 2",
    #     public = True
    # )
    # channel_3 = Channel(
    #     owner_id = 3,
    #     channel_name = "Channel 3",
    #     public = False
    # )
    
    # channel_4 = Channel(
    #     owner_id = 2,
    #     channel_name = "Channel 4",
    #     public = True
    # )

    # channel_5 = Channel(
    #     owner_id = 2,
    #     channel_name = "Channel 5",
    #     public = True
    # )

    # channel_6 = Channel(
    #     owner_id = 2,
    #     channel_name = "Channel 6",
    #     public = True
    # )
    
    channel_1207 = Channel(
        owner_id = 1,
        channel_name = "1207",
        public = True
    )
    
    channel_1208 = Channel(
        owner_id = 1,
        channel_name = "1208",
        public = True
    )
    
    channel_1213 = Channel(
        owner_id = 1,
        channel_name = "1213",
        public = True
    )

    channel_1226 = Channel(
        owner_id = 1,
        channel_name = "1226",
        public = True
    )

    channel_124 = Channel(
        owner_id = 1,
        channel_name = "124",
        public = True
    )

    db.session.add(channel_1207)
    db.session.add(channel_1208)
    db.session.add(channel_1213)
    db.session.add(channel_1226)
    db.session.add(channel_124)

    db.session.commit()

# undo seed channel
def undo_channels():
    # db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.execute("DELETE FROM channels;")
    db.session.commit()
