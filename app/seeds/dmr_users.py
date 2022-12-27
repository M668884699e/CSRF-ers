from app.models import db, DMRUser

# Add seeders
def seed_dmr_users():

    dmr_one_user_one = DMRUser(
        dmr_id = 1,
        user_id = 1
    )

    dmr_one_user_two = DMRUser(
        dmr_id = 1,
        user_id = 2
    )

    db.session.add(dmr_one_user_one)
    db.session.add(dmr_one_user_two)

    db.session.commit()

# Unseed dmr_users
def undo_dmr_users():
    db.session.execute("DELETE FROM dmr_users;")
    db.session.commit()
