# CSRF-ers - Slack

hello



# MVP List (Slack)

## 1. Live Chat
* **C**reate - Create a live chat session
* **R**ead - View and read message
* **U**pdate - Sending a message
* **D**elete - Delete session


## 2. Channels
* **C**reate - Create chat channel
* **R**ead - Read lists of channels and messages within channel
* **U**pdate - Update channel by changing name, adding members, muting, changing notification sound/setting (see #6), leaving channel
* **D**elete - Delete channel (if permissible, typically only the channel creator or other admins)

## 3. Direct Message
* **C**reate - Create a message
* Read  - View and read message
* **U**pdate - Editing sent message (or sending message?), changing notification sound/setting (see #6)
* **D**elete - Delete sent message


## 4. Teams or Multi-Person DM
* **C**reate - Create multi-person direct message
* **R**ead - View and read message
* **U**pdate - Editing sent message (or sending message?), changing notification sound/setting (see #6)
* **D**elete - Delete send message


## 5. Search Message (Bonus)
* **C**reate - Entering word/phrase to search (Or no create function for searching messages?)
* **R**ead - Reading messages with the word/phrase searched
* **U**pdate - N/A
* **D**elete - Deleting recent searches


## 6. Notifications (Bonus)
* **C**reate - No create function with notifications
* **R**ead - See notification symbol. Hear notification sound
* **U**pdate - Remove notification symbol once message is “seen”. Change notification sound; changes notifications settings
* **D**elete - Make notifications disappear when user open channel with the notification


# User Stories

## 1. Channels
* CREATE
    * As a logged in user, I would like to be able to create a channel to send messages and invite others to join
    * Acceptance Criteria: I should be able to...
        * Customize channel name and description
        * Toggle channel settings like privacy
        * Share link to the channel
* READ
    * As a logged in user, I want to be able to see every user's messages
    * Acceptance Criteria: I should be able to...
        * Read messages in chronological order
        * View conversations details to see current members of channel and channel about page
* UPDATE
    * As a logged in user, I want to be able to change the channel settings
    * Acceptance Criteria: I should be able to...
        * Star channel (pin channel)
        * Change channel notifications
        * Mute channel
* DELETE
    * As a logged in user, I want to be able to leave the channel as a member or delete the channel as an admin
    * Acceptance Criteria: I should be able to...
        * Click a button that lets me leave the channel
        * Click a button that lets me delete the channel (if I have permission)

## 2. Direct Messages
* CREATE
    * As a logged in user, I would like to be able to send messages to other users
    * Acceptance Criteria: I should be able to...
        * Create a message/video clip/audio clip to send
        * Customize message with styling
        * Send attachments
* READ
    * As a logged in user, I want to be able to see the other user's messages
    * Acceptance Criteria: I should be able to...
        * Read messages in chronological order
* UPDATE
    * As a logged in user, I want to be able to change the conversations settings
    * Acceptance Criteria: I should be able to...
        * Star channel (pin channel)
        * Change conversation notifications
        * Mute conversation
* DELETE
    * As a logged in user, I want to be able to delete the direct message conversation
    * Acceptance Criteria: I should be able to...
        * Click a button that lets me delete the conversation
