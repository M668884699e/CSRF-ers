from flask.cli import AppGroup
from .users import seed_users, undo_users
from .channels import seed_channels, undo_channels
from .messages import seed_messages, undo_messages
from .dmrs import seed_dmrs, undo_dmrs

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    print("hello 3")
    seed_users()
    print("hello 4")

    seed_channels()
    seed_dmrs()

    seed_messages()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()

    undo_channels()
    undo_dmrs()

    undo_messages()
    # Add other undo functions here
