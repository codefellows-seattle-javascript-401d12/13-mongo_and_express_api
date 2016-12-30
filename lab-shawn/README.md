# **RESTful API using Express**

## Overview

  This application is an HTTP RESTful API that uses 2 route resources. It utilizes the GET,POST,PUT & DELETE methods to fetch, add, update, and delete records in a MongoDB.

## **How To Use API**

  * Clone this repository
  * Open a terminal and run `npm i` to install all the application dependencies

### **Start up MongoDB & Server**

  * run `mongod` in your terminal

  * run `npm run start` in a separate tab


In a new terminal window/tab run your HTTP method commands

### **POST Request**

  * To add a library to the database.   
    `http POST localhost:[port]/api/library name='[name]'`

  * To add a book to the library.  
    `http POST localhost:[port]/api/library/[libraryID]/book title='[book title]' author=[author name]`

### **GET Request**

  * To retrieve a library.  
    `http GET localhost:[port]/api/library/[libraryID]'`

  * To retrieve a book.  
    `http GET localhost:[port]/api/library/[libraryID]/book/[bookID]'`

### **PUT Requests**
  * To update the name of the library.  
    `http PUT localhost:[port]/api/library name='[new name]'`

  * To update book information.
    `http PUT localhost:[port]/api/library/[libraryID]/book/[bookID] title='[new title]' and/or author='[new author]'`

### **DELETE Request**

  * To delete a library.  
    `http DELETE localhost:[port number]/api/library/[libraryID]`

  * To delete a book.  
    `http DELETE localhost:[port]/api/library/[libraryID]/book/[bookID]`
