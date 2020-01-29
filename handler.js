const express = require("express");
const cors = require("cors");
const serverlessHttp = require("serverless-http");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mysql = require("mysql")


const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: "tasks"
})

// GET 

app.get("/tasks", function (request, response) {

	connection.query("SELECT * FROM Tasks", function (err, data) {
		if (err) {
			response.status(500).json({
				error: err
			})
		} else {
			response.status(200).json({
				tasks: data
			});
		}
	});
});

// POST 

app.post("/tasks", (request, response) => {

	const addedTask = request.body;

	connection.query("INSERT INTO Tasks SET ?", [addedTask], function (err, data) {
		if (err) {
			response.status(500).json({ error: err });
		} else {
			response.status(201).json({
				message: `Successfully added the following task: ${addedTask.task_name}`
			})
		}
	})
});

// PUT 

app.put("/tasks/:id", (request, response) => {

	const updatedTask = request.body;
	const id = request.params.id;

	connection.query(`UPDATE Tasks SET task_name = ?, due_date = ?, complete = ? WHERE taskIgit add .gd = ?
	`, [updatedTask.task_name, updatedTask.due_date, updatedTask.complete, id],
		function (err) {
			if (err) {
				response.status(500).json({ error: err });
			} else {
				response.status(200).json({
					message: `Successfully updated task: ${updatedTask.task_name}`
				});
			}
		})
});

// DELETE 

app.delete("/tasks/:id", (request, response) => {

	const id = request.params.id;

	connection.query("DELETE FROM Tasks WHERE taskId = ?", [id], function (err) {
		if (err) {
			response.status(500).json({ error: err });
		} else {
			response.status(200).json({
				message: "You issued a delete request"
			})
		}
	})
});

module.exports.app = serverlessHttp(app);