# Express WorkShop 1

This is the first express WorkShop for the class Topicos Especiales 1 in the especialization of Software Engineering.

## Participants

**Luis Cañate** \
**Jairo Diaz**

## Installation

`npm install`

Copy `.env.example` and set your environment variables.

## Start

`npm start`

# API methods

Once you start the API, to use it. First, you have import the file **API_Postman_Methods.json** into [Postman](https://www.postman.com/downloads/).

- To get all tasks use the **Get All Tasks** method within Postman or open the url http://localhost:3000/api/v1/tasks
- To get a specific task use the method **Get a Task by Id** or open de url http://localhost:3000/api/v1/tasks/:id where :id is the task's Id. i.e. http://localhost:3000/api/v1/tasks/0
- To create a task use the Postman POST method **Create Task** and in the Body -> raw section, specify the author and description for your task.
- To update a task use the Postman PUT or PATCH method **Update a Task by Id** and pass the id of the task you want to update and in the Body -> raw section, pass the author or description to be updated.
- To delete a task use the Postman DELETE method **Delete a Task by Id** and pass the id of the task you want to delete i.e. http://localhost:3000/api/v1/tasks/0
