from app.models import db, Message

def seed_messages():
    message_one = Message(
        message='Message One', sender_id=1, messageable_id=1, messageable_type = "Channel")
    message_two = Message(
        message='Message Two',  sender_id=1,messageable_id=1, messageable_type = "Channel")
    message_three = Message(
        message='Message Three',  sender_id=1,messageable_id=2, messageable_type = "Channel")
    message_four = Message(
        message='Message Four',  sender_id=1,messageable_id=2, messageable_type = "Channel")
    message_five = Message(
        message='Message Five',  sender_id=1,messageable_id=3, messageable_type = "Channel")
    message_six = Message(
        message='Message Six',  sender_id=1,messageable_id=3, messageable_type = "Channel")
    message_seven = Message(
        message='Message Seven',  sender_id=1,messageable_id=3, messageable_type = "Channel")

    # dmr_messages
    message_eight = Message(
        message='Message Eight', sender_id=1, messageable_id=1, messageable_type = "DMR")
    message_nine = Message(
        message='Message Nine', sender_id=2, messageable_id=2, messageable_type = "DMR")
    message_ten = Message(
        message='Message Ten', sender_id=2, messageable_id=3, messageable_type = "DMR")
    message_eleven = Message(
        message='Message Eleven', sender_id=3, messageable_id=1, messageable_type = "DMR")


    db.session.add(message_one)
    db.session.add(message_two)
    db.session.add(message_three)
    db.session.add(message_four)
    db.session.add(message_five)
    db.session.add(message_six)
    db.session.add(message_seven)
    db.session.add(message_eight)
    db.session.add(message_nine)
    db.session.add(message_ten)
    db.session.add(message_eleven)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the messages table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_messages():
    # db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.execute("DELETE FROM messages;")
    db.session.commit()
