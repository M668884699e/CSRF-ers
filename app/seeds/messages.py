from app.models import db, Message

# add message seeders
def seed_messages():
    message_one = Message(
        message='test', sender_id=1, messageable_id=1, messageable_type='Channel'
    )
    
    message_two = Message(
        message='Test', sender_id=1, messageable_id=1, messageable_type='DMR'
    )
    
    db.session.add(message_one)
    db.session.add(message_two)
    # db.session.add(message_three)
    # db.session.add(message_four)
    # db.session.add(message_five)
    # db.session.add(message_six)
    # db.session.add(message_seven)
    # db.session.add(message_eight)
    # db.session.add(message_nine)
    # db.session.add(message_ten)
    # db.session.add(message_eleven)

    db.session.commit()


# undo message seeders
def undo_messages():
    db.session.execute("DELETE FROM messages;")
    db.session.commit()
