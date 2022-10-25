from app.models import db, Notification

def seed_notifications():
  """
  Seed all notifications
  """
  # make notification seed samples
  notification_one = Notification(
    notificationable_id=1,
    notificationable_type="Channel",
    user_id=1,
    notification_sound="sound",
    sound_setting=True,
    read_status=False
  )
  
  notification_two = Notification(
    notificationable_id=2,
    notificationable_type="Channel",
    user_id=2,
    notification_sound="sound",
    sound_setting=True,
    read_status=False
  )
  
  notification_three = Notification(
    notificationable_id=3,
    notificationable_type="Channel",
    user_id=3,
    notification_sound="sound",
    sound_setting=True,
    read_status=False
  )
  
  # add seed to database
  db.session.add(notification_one)
  db.session.add(notification_two)
  db.session.add(notification_three)
  
  # commit seeding
  db.session.commit()

def undo_notifications():
  """
  Unseed all notifications by deleting data
  """
  db.session.execute("DELETE FROM notifications;")
  db.session.commit()
