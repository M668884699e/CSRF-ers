from app.models import db, Message

def seed_messages():
    message_one = Message(
        message='Message One', channel_id=1)
    message_two = Message(
        message='Message Two', channel_id=1)
    message_three = Message(
        message='Message Three', channel_id=1)
    message_four = Message(
        message='Message Four', channel_id=2)
    message_five = Message(
        message='Message Five', channel_id=2)
    message_six = Message(
        message='Message Six', channel_id=3)
    message_seven = Message(
        message='Message Seven', channel_id=3)

    db.session.add(message_one)
    db.session.add(message_two)
    db.session.add(message_three)
    db.session.add(message_four)
    db.session.add(message_five)
    db.session.add(message_six)
    db.session.add(message_seven)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the messages table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
