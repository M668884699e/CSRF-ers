from app.models import db, User
from werkzeug.security import generate_password_hash

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name = "Demo",
        last_name = "User",
        username='Demo',
        email='demo@aa.io',
        hashed_password=generate_password_hash('password')
    )
    marnie = User(
        first_name="Marnie",
        last_name="Smith",
        username='marnie',
        email='marnie@aa.io',
        hashed_password=generate_password_hash('password')
    )
    bobbie = User(
        first_name="Bobbie",
        last_name="Jones",
        username='bobbie',
        email='bobbie@aa.io',
        hashed_password=generate_password_hash('password')
    )


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    # db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.execute("DELETE FROM users;")
    db.session.commit()
