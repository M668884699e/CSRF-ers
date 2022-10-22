# API Templates

## Users

__GET__ - /users

Get all users

__GET__ - /users/:userId

Get user by id

__GET__ - /users/:userId/messages

Get all user messages

__GET__ - /user/:userId/dmr

Get all DirectMessageRooms user is part of

__GET__ - /user/:userId/channels

Get all Channels user is part of

__POST__ - /users

Create new user

__PUT/PATCH__ - /users/:userId

Update user information (username, first/last name, email, etc.)

__DELETE__ - /users/:userId

Delete user


## Messages

__POST__ - /messages

Create new message
__PUT/PATCH__ - /messages/:messageId

Update sent message

__DELETE__ - /messages/:messageId

Delete message


## Channels

__GET__ - /channels
Get all channels

__GET__ - /channels/:channelId

Get channel by id

__GET__ - /channels/:channelId/users

Get all channel users

__GET__ - /channels/:channelId/messages

Get all channel messages

__POST__ - /channels

Create a new channel

__POST__ - /channels/:channelId/users/:userId

Add a new user to the channel

__PUT/PATCH__ - /channels/:channelId

Update channel settings

__DELETE__ - /channels/:channelId

Delete channel


## DirectMessageRooms

__GET__ - /dmr

Get all DirectMessageRooms

__GET__ - /dmr/:dmrId

Get DirectMessageRoom by id

__GET__ - /dmr/:dmrId/users

Get all users in DirectMessageRooms

__GET__ - /dmr/:dmrId/messages

Get all messages in a DirectMessageRoom

__POST__ - /dmr

Create new DirectMessageRoom

__DELETE__ - /dmr/:dmrId

Delete DirectMessageRoom


## Live Chat(Bonus)

__GET__ - /chats/:chatId

Read all messages in a live chat

__POST__ - /chats

Create a live chat session

__POST__ - /chats/:chatId

Create a live chat message

__DELETE__ - chats/:chatId

Delete a Live chat session

## Search Messages(Bonus)

__GET__ - /search/?keyword
Read all messages of a search

## Notifications (Bonus)

__GET__ /notifications/:notificationId

Read the symbol notification

__PUT/PATCH__ /notifications/:notificationId

Update: remove notification symbol once read as seen, change notification sound, change notification settings.
