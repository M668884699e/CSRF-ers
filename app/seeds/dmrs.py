from app.models import db, DMR

# Add dmr seeders
def seed_dmrs():
    
    # demo_dmr = DMR(
    #     dmr_name = 'Test Demo'
    # )
    # csrfers = DMR(
    #     dmr_name = 'CSRFers'
    # )
    # third_dmr = DMR(
    #     dmr_name = 'Third dmr'
    # )
    
    # db.session.add(demo_dmr)
    # db.session.add(csrfers)
    # db.session.add(third_dmr)
    
    db.session.commit()
    
# undo dmr seeds
def undo_dmrs():
    # db.session.execute('TRUNCATE direct_message_rooms RESTART IDENTITY CASCADE;')
    db.session.execute("DELETE FROM direct_message_rooms;")
    db.session.commit()
