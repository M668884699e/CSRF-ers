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
    # marnie = User(
    #     first_name="Marnie",
    #     last_name="Smith",
    #     username='marnie',
    #     email='marnie@aa.io',
    #     hashed_password=generate_password_hash('password')
    # )
    # bobbie = User(
    #     first_name="Bobbie",
    #     last_name="Jones",
    #     username='bobbie',
    #     email='bobbie@aa.io',
    #     hashed_password=generate_password_hash('password')
    # )
    
    # person4 = User(
    #     first_name="Person",
    #     last_name="4",
    #     username='person_4',
    #     email="person4@email.com",
    #     hashed_password=generate_password_hash('password')
    # )
    
    # person5 = User(
    #     first_name="Person",
    #     last_name="5",
    #     username='person_5',
    #     email="person5@email.com",
    #     hashed_password=generate_password_hash('password')
    # )

    # person6 = User(
    #     first_name="Person",
    #     last_name="6",
    #     username='person_6',
    #     email="person6@email.com",
    #     hashed_password=generate_password_hash('password')
    # )

    # person7 = User(
    #     first_name="Person",
    #     last_name="7",
    #     username='person_7',
    #     email="person7@email.com",
    #     hashed_password=generate_password_hash('password')
    # )

    # person8 = User(
    #     first_name="Person",
    #     last_name="8",
    #     username='person_8',
    #     email="person8@email.com",
    #     hashed_password=generate_password_hash('password')
    # )
    
    # person9 = User(
    #     first_name="Person",
    #     last_name="9",
    #     username='person_9',
    #     email="person9@email.com",
    #     hashed_password=generate_password_hash('password')
    # )

    db.session.add(demo)
    # db.session.add(marnie)
    # db.session.add(bobbie)
    # db.session.add(person4)
    # db.session.add(person5)
    # db.session.add(person6)
    # db.session.add(person7)
    # db.session.add(person8)
    # db.session.add(person9)

    db.session.commit()


# undo user seeding
def undo_users():
    # db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.execute("DELETE FROM users;")
    db.session.commit()
