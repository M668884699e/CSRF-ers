from app.models import db, DMR

# Add seeders
def seed_dmrs():
    
    demo_dmr = DMR(
        dmr_name = 'Test Demo'
    )
    csrfers = DMR(
        dmr_name = 'CSRFers'
    )
    third_dmr = DMR(
        dmr_name = 'Third dmr'
    )
    
    db.session.add(demo_dmr)
    db.session.add(csrfers)
    db.session.add(third_dmr)
    
    db.session.commit()
    
# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_dmrs():
    # db.session.execute('TRUNCATE direct_message_rooms RESTART IDENTITY CASCADE;')
    db.session.execute("DROP TABLE IF EXISTS direct_message_rooms;")
    db.session.commit()