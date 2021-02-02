<h1 align="center">virus-overflow</h1>


<h3 align="center">
Virus-overflow is a question and answer webapp for people to get their covid questions answered, inspired by famous stack overflow.
</h3>

<br />
<p align="center">
<img alt="NodeJS" src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/>
<img alt="Express.js" src="https://img.shields.io/badge/express.js%20-%23404d59.svg?&style=for-the-badge"/>
<img alt="Pug" src="https://img.shields.io/badge/-PugJs-brown?&style=for-the-badge"/>
<img alt="CSS3" src="https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/>
<img alt="Postgres" src ="https://img.shields.io/badge/postgres-%23316192.svg?&style=for-the-badge&logo=postgresql&logoColor=white"/>
<img alt="Heroku" src="https://img.shields.io/badge/heroku%20-%23430098.svg?&style=for-the-badge&logo=heroku&logoColor=white"/>
</p>

## Checkout the Live App @ [virus-overflow](https://virus-overflow.herokuapp.com)
## Features

* User Authentication
  * Users can sign up, log in, and log out
  * Users can try out the app with a Demo User login
  * Most of the features will be unavailable to the guest user, such as posting a question, voting or answering a question
* Ability to ask a question
  * Members can ask a question
  * Members can delete or edit their question
* Ability to respond to a question
  * Members can respond to a question
  * Users can view questions on the questions page
* Up and Down vote
  * Members can upvote and downvote
  * Only one vote per question
* Search for a question
  * Anyone can search for a question
* Hosting on Heroku
  * Hosted on a live server that is always up

## Extras:
* User Profile
* Reputation - keep track of number of good answers
  * verification 
* Attachments on posts


## Routes

* Auth Routes
  - `POST /login` Login a User

  - `POST /users/register` User Signup

  - `POST /logout` User logout

* Question Routes
  - `GET /questions` Show all the questions

  - `POST /questions` create a new question

  - `GET /questions/:id` return a question and all associated answers, and votes

  - `DELETE /questions/:id` delete a question

  - `POST /questions/:id/vote` up/down vote a question

* Answer Routes
  - `POST /questions/:id` answer a question

  - `POST /answers/:id/vote` up/down vote a answer

  - `PATCH /answers/:id` edit answer

  - `DELET /answers/:id`  delete answer

* Search Route
  - `GET search/` seach questions/answers
