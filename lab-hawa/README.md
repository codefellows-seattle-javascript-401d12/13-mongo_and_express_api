__Mongo and Express API__
======
This server-side application creates a single resource REST API implementing [MongoDB](https://www.mongodb.com/) and [Express.js](http://expressjs.com/) which allows the user to POST, GET and DELETE requests via the terminal.

---
## Cloning the Repository
Clone down this repository:  https://github.com/abdih17/13-mongo_and_express_api.git

```
$ git clone https://github.com/abdih17/13-mongo_and_express_api.git
```

## Installation

Install any dependency from the `package.json` file into the project root
directory, and start the server.

```sh
$ cd lab-hawa
$ npm i
$ npm start
```

You should receive the following result: `Server up: 3000` or whichever port number have preset in your environment variables.

## Set Up Necessary Directories

Before writing our POST requests in our server, we need to create a directory were the data can be stored. In order to do so, you need to create a folder called 'spiritAnimal', inside of a folder called 'data'

```sh
$ cd lab-hawa
$ mkdir data
$ cd data
$ mkdir spiritAnimal
```

## POST, GET, and DELETE Requests

**POST Request:**
The POST request must include name, spiritAnimal, and spiritAnimalName parameters.

>**In an new terminal window, send a POST request by using the command:**
>`http POST localhost:3000/api/spiritAnimal name=<name> spiritAnimal=<creature> spiritAnimalName=<creature name>`.

A successful response should return a JSON object with values you entered along with a unique **id number** and a status code of **200**. This will also create a new `.json` file into the `data` folder with the `id` as the file name.

Here's an example of a POST request and the successful response:
```
$ http POST localhost:3000/api/spiritAnimal name="Hawa" spiritAnimal="Pink Dragon" spiritAnimalName="Simba"

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 115
Content-Type: application/json; charset=utf-8
Date: Tue, 20 Dec 2016 18:10:12 GMT
ETag: W/"73-9UbvR26KBJnG17ThN4YOOg"
X-Powered-By: Express

{
    "id": "8cd78500-c6df-11e6-aae4-8d9fefc8cd83",
    "name": "Hawa",
    "spiritAnimal": "Pink Dragon",
    "spiritAnimalName": "Simba"
}
```

**GET Request:**

>**In a new terminal window, send a `GET` request by using the command:**
>`http localhost:3000/api/spiritAnimal?id=<id>`.

A successful response should return a JSON object with a status of **200**.

Using the unique **id** number from, here's an example of a successful GET request and response:
```
$ http localhost:3000/api/spiritAnimal?id=8cd78500-c6df-11e6-aae4-8d9fefc8cd83

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 115
Content-Type: application/json; charset=utf-8
Date: Tue, 20 Dec 2016 18:13:52 GMT
ETag: W/"73-CYiHeGR1flyV0Ocsh21Z9w"
X-Powered-By: Express

{
    "id": "8cd78500-c6df-11e6-aae4-8d9fefc8cd83",
    "name": "Hawa",
    "spiritAnimal": "Pink Dragon",
    "spiritAnimalName": "Simba"
}

```

**DELETE Request:**

>**In a new terminal window, send a `DELETE` request by using the command:**
>`http DELETE localhost:8000/api/spiritAnimal?id=<id>`

The a successful response should return a **204** status code with no content.
Here's a successful DELETE request and response (which returns no content):
```
$ http DELETE localhost:3000/api/spiritAnimal?id=8cd78500-c6df-11e6-aae4-8d9fefc8cd83

HTTP/1.1 204 No Content
Connection: keep-alive
Date: Tue, 20 Dec 2016 18:25:21 GMT
ETag: W/"0-1B2M2Y8AsgTpgAmY7PhCfg"
X-Powered-By: Express



```

## Exit the Server

Go back to the terminal where your server is running with the port number and press **Ctrl+C** in order to exit the server.

---
