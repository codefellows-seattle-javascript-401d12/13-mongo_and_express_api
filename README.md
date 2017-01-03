# Two-Resource Express REST API

## Overview

This is a basic Express API app that allows a developer to POST, GET, PUT and DELETE data from an API. A developer will be able to view the appropriate response statuses when interacting with the API.

## How do I use this app?

* Clone this repo and run the command `npm i` in your terminal to install all of the dependencies.

* You will also need to run the command `brew install httpie`. For this app, the requests used in the terminal are formatted via HTTPie CLI.

* Open 2 panes in your terminal to get started. You should see the type of requests and response status codes in both terminal panes.

* Be sure that you are in the root of the repo directory before attempting to initiate the port to the server. To do this, run `node server.js` in the first terminal pane.
  * `server running:` followed by your PORT number should be logged in the terminal

### POST requests
  * **i.e.** 200 OK request: `http POST localhost:3000/api/pin title="sample title" skill="sample skill"`
    * You should receive a response with the content of the appropriate pin you just posted.
  * **i.e.** 400 BAD request: `http POST localhost:3000/api/pin` (no title and skill is attached to POST request)
    * You should receive a response with a 'Bad Request' message.


### GET requests
  * **i.e.** 200 OK request: `http localhost:3000/api/pin?id=17b389b0-c2ff-11e6-9794-69f9c8e1c4f5`
    * You must pass in a query string equal to the unique id of the pin you want to retrieve.
    * You should receive a response with the content of the appropriate pin.
  * **i.e.** 400 BAD request: `http localhost:3000/api/pin`
    * You should receive a response with a 'Bad Request' message.

### PUT requests
  * **i.e.** 200 OK request: `http PUT localhost:3000/api/pin?id=292873e0-c7af-11e6-8037-af3dde2fd6df title="different title" skill="different skill"`
    * You must pass in a query string equal to the unique id of the pin you want to delete.
    * You can change the title and skill content by passing them in after the unique pin id.
  * **i.e.** 400 BAD request: `http localhost:3000/api/pin`
    * You should receive a response with a 'Bad Request' message.

POST, GET, PUT and DELETE request commands should be run in the second terminal pane. JSON content for boards and pins will be posted in a MongoDB collection.
