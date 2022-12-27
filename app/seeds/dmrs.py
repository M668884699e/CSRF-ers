from app.models import db, DMR

# Add dmr seeders
def seed_dmrs():
    
    demo_test_user = DMR(
        dmr_name = 'Demo, Test User'
    )

    db.session.add(demo_test_user)
    
    db.session.commit()
    
# undo dmr seeds
def undo_dmrs():
    # db.session.execute('TRUNCATE direct_message_rooms RESTART IDENTITY CASCADE;')
    db.session.execute("DELETE FROM direct_message_rooms;")
    db.session.commit()
