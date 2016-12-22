# Mongo and Express Single Resource API
### About
The Mongo and Express Single Resource API is a simple proof of concept RESTFUL API that accepts movie data and stores it within a Mongo database. The data once stored in the database by a `POST` request is accessible via a `GET`, `PUT`, or `DELETE` request. The database is able to receive two pieces of data, a **name** and a **rating**. It is expected that the name be a _string_ and the rating be a _number_. 
