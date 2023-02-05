# Slackers Project

Heroku Link: https://csrf-ers.herokuapp.com/

GitHub Link: https://github.com/pchawin40/CSRF-ers

## Setup Directions:
1. Clone from GitHub repository
   1. Run `pipenv install` in the  `CSRF-ers` directory
   2. Switch to the `react-app` directory and run `npm install`
   3. Run `pipenv shell` to start the virtual environment
2. Run the following command in your terminal to run the migration and seeder files within the `CSRF-ers` directory
   1. `flask db init && flask db migrate && flask db upgrade && flask seed all`
3. Run the following commands to create start a local session
   1. In the `CSRF-ers` directory, run `flask run`
   2. In the `react-app` directory, run `npm start`

___

## Description:
This is a repository of a Slackers by Chawin (Ham) Pathompornvivat, Brian Moore, and Kihong (Samuel) Bae.
<br>
This project implements 4 features. Two features, Channels and Channel Messages, are full CRUD features. The two other features, Direct Message Rooms and Direct Message Room Messages are CRD features (without an Update functionality).
<br>
This clone project also implements a feature to allow users to create a new account, sign in with a Demo User account, and log out.

___

## Landing Page:
Depending on whether the user is logged in, the first screen with direct to either a Login Page:
![Login Page](https://github.com/pchawin40/CSRF-ers/blob/dev/assets/LoginPage.png)
Or the Landing Page:
![Slack Landing Page](https://github.com/pchawin40/CSRF-ers/blob/dev/assets/LandingPage.png).

___

## Main Page:
After logging in, the user will be redirected to the Slack main page: the chat rooms, where the main functionality of the service takes place.
![Chat Page](https://github.com/pchawin40/CSRF-ers/blob/dev/assets/ChatPage.png)

___

## Channels and Direct Message Rooms:

### Create a Channel or a Direct Message Room
Users are able to create a new Channel or Direct Message Room. This will lead them through one or more modal pages that allows them to customize specific details of the newly created Channel/Direct Message Room.
<br>
For example, a user may customize a newly created Channel by customizing the name, public setting, and members.
<br>
Note that unlike Channels, Direct Message Rooms do not have a function of customizing the name or the public setting. This is because DMRs have a default name of all the conversation members and existing DMRs cannot be seen by users that are not a part of them.
<br>
<br>

### Read Channels and Direct Message Rooms:
Redux will load the Channels and Direct Message Rooms the user is a part of on the left side bar. From there, users are able to switch between Channels and Direct Message Room.
<br>
<br>

### Updating Channels:
If the user is the owner of a Channel, right clicking it will open a menu with the option of `Edit Chat`. This option will allow the owner of the Channel to change the Channel name as well as add/remove users.
<br>
_Note_: There is no function of editing Direct Message Rooms of changing the name or adding/removing users. To add users to a Direct Message Room, a new one would need to be created.
<br>
<br>

### Deleting a Channel and Direct Message Room:
If the user is the owner of a Channel, right clicking it will open a menu with an option of `Delete channel`. This will delete the Channel for all users part of the Channel.
<br>
Right clicking a Direct Message Room or a Channel the user is not an owner of will open a menu with only one option: `Leave chat`.

___

## Messages for Channels and Direct Message Rooms:

### Create Messages:
Users are able to send messages in Channels and Direct Message Rooms where only the user and other members of the respective chat room will be able to see the messages.

### Read Messages:
Messages will load via Redux on the Message Display box with the respective sender's name and profile picture.

### Edit/Delete Messages:
Users are able to update their sent messages in Channels and Direct Message Rooms by either editing the sent message or by deleting the messag entirely.

___

## Technologies Used:
This Slack Clone utilizes:
   1. React and Redux to manage reducers, actions, and the store to reduce the amount of times the webpage must be refreshed
   2. Flask, SQLAlchemy, and FlaskForm to manage the database and allow users to interact with the web application
<br>
Future technologies that may be utilized are Text Editors (e.g. Lexical) and Socket.io to allow users to send messages in real time and with more customization.

___

## Future Features:
Future features that would need to be added is the ability for users to upload photos/files for their profile picture or attached to messages.
<br>
A bonus feature that would need to be added is having the Channels and Direct Message Rooms playing a sound and displaying a notification note to indicate to the user when they receive a new message.



<!-- ## Getting started
1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Make sure the SQLite3 database connection URL is in the **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


<br>

## Deploy to Heroku
This repo comes configured with Github Actions. When you push to your main branch, Github will automatically pull your code, package and push it to Heroku, and then release the new image and run db migrations.

1. Write your Dockerfile. In order for the Github action to work effectively, it must have a configured Dockerfile. Follow the comments found in this [Dockerfile](./Dockerfile) to write your own!

2. Create a new project on Heroku.

3. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres".

4. Configure production environment variables. In your Heroku app settings -> config variables you should have two environment variables set:

   |    Key          |    Value    |
   | -------------   | ----------- |
   | `DATABASE_URL`  | Autogenerated when adding postgres to Heroku app |
   | `SECRET_KEY`    | Random string full of entropy |

5. Generate a Heroku OAuth token for your Github Action. To do so, log in to Heroku via your command line with `heroku login`. Once you are logged in, run `heroku authorizations:create`. Copy the GUID value for the Token key.

6. In your Github Actions Secrets you should have two environment variables set. You can set these variables via your Github repository settings -> secrets -> actions. Click "New respository secret" to create
each of the following variables:

   |    Key            |    Value    |
   | -------------     | ----------- |
   | `HEROKU_API_KEY`  | Heroku Oauth Token (from step 6)|
   | `HEROKU_APP_NAME` | Heroku app name    |

7. Push to your `main` branch! This will trigger the Github Action to build your Docker image and deploy your application to the Heroku container registry. Please note that the Github Action will automatically upgrade your production database with `flask db upgrade`. However, it will *not* automatically seed your database. You must manually seed your production database if/when you so choose (see step 8).

8. *Attention!* Please run this command *only if you wish to seed your production database*: `heroku run -a HEROKU_APP_NAME flask seed all`

## Helpful commands
|    Command            |    Purpose    |
| -------------         | ------------- |
| `pipenv shell`        | Open your terminal in the virtual environment and be able to run flask commands without a prefix |
| `pipenv run`          | Run a command from the context of the virtual environment without actually entering into it. You can use this as a prefix for flask commands  |
| `flask db upgrade`    | Check in with the database and run any needed migrations  |
| `flask db downgrade`  | Check in with the database and revert any needed migrations  |
| `flask seed all`      | Just a helpful syntax to run queries against the db to seed data. See the **app/seeds** folder for reference and more details |
| `heroku login -i`      | Authenticate your heroku-cli using the command line. Drop the -i to authenticate via the browser |
| `heroku authorizations:create` | Once authenticated, use this to generate an Oauth token |
| `heroku run -a <app name>` | Run a command from within the deployed container on Heroku | -->
