from flask.cli import AppGroup
from .users import seed_users, undo_users
from .channels import seed_channels, undo_channels
from .messages import seed_messages, undo_messages
from .dmrs import seed_dmrs, undo_dmrs
# from .dmr_users import seed_dmr_users, undo_dmr_users
# from .channel_users import seed_channel_users, undo_channel_users

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    # Add other seed functions here
    seed_users()
    seed_channels()
    seed_dmrs()
    seed_messages()
    # seed_dmr_users()
    # seed_channel_users()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # Add other undo functions here
    undo_users()
    undo_channels()
    undo_dmrs()
    undo_messages()
    # undo_dmr_users()
    # undo_channel_users()
