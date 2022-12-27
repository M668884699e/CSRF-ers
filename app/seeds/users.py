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
    
    test_user = User(
        first_name = "Test",
        last_name = "User",
        username="Test User",
        email="test@user.com",
        hashed_password=generate_password_hash('password')
    )
    
    db.session.add(demo)
    db.session.add(test_user)

    db.session.commit()


# undo user seeding
def undo_users():
    # db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.execute("DELETE FROM users;")
    db.session.commit()
