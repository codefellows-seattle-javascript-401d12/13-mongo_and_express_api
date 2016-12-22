#Single Resource MongoDB API
###Steven Bateman's Lab 13 for 401 JS

###Overview
This is an app that will allow you to practice POST, PUT, GET, and DELETE requests using HTTPIE against a database created with MongoDB that tracks a single resource, in the form of students with a name and age field.

###Installation
####Dependencies
You will need to install HTTPIE and MongoDB prior to getting this app working. For HTTPIE:

* On Macs: `brew install httpie`
* On Linux: `sudo apt install httpie`

For MongoDB, please visit [The Little MongoDB Book](http://openmymind.net/mongodb.pdf) and find instructions there.

####Main app
Once you have installed HTTPIE and MongoDB, clone down this repository, then navigate to the `lab-steven` directory and run `npm i`.

###Usage
This app makes use of Mongoose, which will require a running process of MongoDB in the background. Within your terminal, type `mongod` to begin a process of a Mongo database. Then in another tab/shell, run `npm start` for debug mode or `node server.js` to just run the basic server.

###POST Requests
To make a POST request, you will need to use HTTPIE to connect to `localhost:<port#>/api/student` and pass in a header object with name and age fields.

* Ex: `http POST localhost:8080/api/student name="Tester" age=45`

###GET Requests
To make a GET request, connect to the api/student path and additionally pass in the ID of the student you want to look at. If you do not pass in an ID, you will get back an array of all possible IDs.

* Ex: `http localhost:8080/api/student` (Will return all available student IDs)
* Ex: `http localhost:8080/api/student/3838u8ad98f9` (Will return back the student with that ID)

###PUT Requests
To update a student in the database, do the same thing you would to GET an ID, but also include a header object with the fields you wish to update. This app will not currently upsert any students, so you cannot POST a student by doing a PUT request for an ID that doesn't exist.

* Ex: `http PUT localhost:8080/api/student/3838u8ad98f9 name="Weasel" age=9999`

###DELETE Requests
To delete a student from the database, simply perform the same task as a GET request.

* Ex: `http DELETE localhost:8080/api/student/3838u8ad98f9`
