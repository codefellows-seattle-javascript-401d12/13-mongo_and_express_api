# Mongo and Express Two Resource API
### About
The Mongo and Express Two Resource API is a simple proof of concept RESTFUL API that accepts movie data and stores it within a Mongo database. The data once stored in the database by a `POST` request is accessible via a `GET`, `PUT`, or `DELETE` request. The database is able to receive two pieces of data, a **name** and a **rating**. It is expected that the name be a _string_ and the rating be a _number_.

### Using the API
**POST METHODS**
`http POST :<PORT NUMBER>/api/director name="<DIRECTOR NAME>"`
`http POST :<PORT NUMBER>/api/director/<DIRECTOR ID>/movie name="<MOVIE NAME>" rating=<NUMBER>`
`http POST :<PORT NUMBER>/api/movies name="<MOVIE NAME>" rating=<NUMBER>`

**GET METHODS**
`http :<PORT NUMBER>/api/director/<DIRECTOR ID>`
`http :<PORT NUBMER>/api/movies/<MOVIE ID>`

**PUT METHODS**
`http PUT :<PORT NUBMER>/api/director/<DIRECTOR ID>  name="<DIRECTOR NAME>"`
`http PUT :<PORT NUBMER>/api/movies/<MOVIE ID> name="<MOVIE NAME>" rating=<NUMBER>`

**DELETE METHODS**
`http DELETE :<PORT NUBMER>/api/director/<DIRECTOR ID> `
`http DELETE :<PORT NUBMER>/api/movies/<MOVIE ID>`


### Running Tests
In order to run tests any server instances that are currently running need to be terminated. After running the command npm run test the server will be initiated by the tests as necessary

When running my tests if I have to terminate any active servers that I am currently running. If don't then the tests will time out on the before and after hooks. Why does this happen?
