from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    print("hello 5")
    demo = User(
        first_name = "Demo",
        last_name = "User",
        username='Demo',
        email='demo@aa.io',
        hashed_password='password'
    )
    marnie = User(
        first_name="Marnie",
        last_name="Smith",
        username='marnie',
        email='marnie@aa.io',
        hashed_password='password'
    )
    bobbie = User(
        first_name="Bobbie",
        last_name="Jones",
        username='bobbie',
        email='bobbie@aa.io',
        hashed_password='password'
    )

    print("hello 6")
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    print("hello 7")
    db.session.commit()
    print('hello 8')

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    # db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.execute("DROP TABLE IF EXISTS users;")
    db.session.commit()
