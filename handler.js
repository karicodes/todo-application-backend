const express = require("express");
const cors = require("cors");
const serverlessHttp = require("serverless-http");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// GET

app.get("/tasks", function (request, response) {

	console.log(request);

	response.status(200).json({

    tasks: [
      {
        id: 1,
        taskName: "Learn HTML",
        complete: true,
        dueDate: "2019-11-28",
      },
      {
        id: 2,
        taskName: "Learn CSS",
        complete: true,
        dueDate: "2019-12-02",
      },
      {
        id: 3,
        taskName: "Learn JavaScript",
        complete: true,
        dueDate: "2019-11-11",
      },
      {
        id: 4,
        taskName: "Learn React",
        complete: false,
        dueDate: "2020-01-06",
      }
    ]
	})
})

//POST

app.post("/tasks", (request, response) => {

	const addedTask = request.body;

	response.status(200).json({
		message: `Successfully added the following task: ${JSON.stringify(addedTask)}`
	})

})

//PUT

app.put("/tasks/:id", (request, response) => {

	const updatedTask = request.body;
	const id = request.params.id;

	response.status(200).json({
		message: `Successfully updated task ID with taskName: ${updatedTask.taskName}, dueDate: ${updatedTask.dueDate}, complete: ${updatedTask.complete}`
	})

})

//DELETE

app.delete("/tasks/:id", (request, response) => {

	const deletedTaskId = request.params.id;

	response.status(200).json({
		message: "You issued a delete request for ID: " + deletedTaskId
	})

})

module.exports.app = serverlessHttp(app);