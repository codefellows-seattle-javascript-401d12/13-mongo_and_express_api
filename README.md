# Mongo and Express Two Resource API
### About
The Mongo and Express Two Resource API is a simple proof of concept RESTFUL API that accepts movie data and stores it within a Mongo database. The data once stored in the database by a `POST` request is accessible via a `GET`, `PUT`, or `DELETE` request. The database is able to receive two pieces of data, a **name** and a **rating**. It is expected that the name be a _string_ and the rating be a _number_.

### Examples of Movies and Directors Data Objects

**DIRECTOR**
``` javascript
{
    "__v": 2,
    "_id": "5864a1684027e53e19d6c48c",
    "movies": [{ "5864a1c24027e53e19d6c48d", "5864a25c4027e53e19d6c48e" }],
    "name": "George Lucas",
    "timestamp": "2016-12-29T05:38:48.793Z"
}
```

**MOVIE**
``` javascript
{
    "__v": 0,
    "_id": "5864a1c24027e53e19d6c48d",
    "directorID": "5864a1684027e53e19d6c48c",
    "name": "Star Wars",
    "rating": 10,
    "timestamp": "2016-12-29T05:40:18.190Z"
}
```

### Using the API
**POST METHODS**
* `http POST :<PORT NUMBER>/api/director name="<DIRECTOR NAME>"`

* `http POST :<PORT NUMBER>/api/director/<DIRECTOR ID>/movie name="<MOVIE NAME>" rating=<NUMBER>`

* `http POST :<PORT NUMBER>/api/movies name="<MOVIE NAME>" rating=<NUMBER>`

**GET METHODS**
* `http :<PORT NUMBER>/api/director/<DIRECTOR ID>`

* `http :<PORT NUBMER>/api/movies/<MOVIE ID>`

**PUT METHODS**
* `http PUT :<PORT NUBMER>/api/director/<DIRECTOR ID>  name="<DIRECTOR NAME>"`

* `http PUT :<PORT NUBMER>/api/movies/<MOVIE ID> name="<MOVIE NAME>" rating=<NUMBER>`

**DELETE METHODS**
* `http DELETE :<PORT NUBMER>/api/director/<DIRECTOR ID> `

* `http DELETE :<PORT NUBMER>/api/movies/<MOVIE ID>`


### Running Tests
In order to run tests any server instances that are currently running need to be terminated. After running the command `npm run test`.

### Walkthrough
**POST METHODS**
* `http POST :<PORT NUMBER>/api/director name="<DIRECTOR NAME>"`

* 1.

* 2.

* 3.

* 4.

* `http POST :<PORT NUMBER>/api/director/<DIRECTOR ID>/movie name="<MOVIE NAME>" rating=<NUMBER>`

* `http POST :<PORT NUMBER>/api/movies name="<MOVIE NAME>" rating=<NUMBER>`
