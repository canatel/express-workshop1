const fs = require("fs");

const filepath = "data.json";

let tasks;

try {
  const data = fs.readFileSync(filepath, "utf-8");
  tasks = JSON.parse(data);
} catch (error) {
  tasks = [];
}

exports.all = (req, res, next) => {
  res.json({
    tasks,
  });
};

exports.create = (req, res, next) => {
  const { body = {} } = req;
  let task = {
    id: `${tasks.length}`,
    author: body.author,
    description: body.description,
    createdAt: new Date(),
  };
  tasks.push(task);
  try {
    fs.writeFileSync(filepath, JSON.stringify(tasks, null, 2));
    res.json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500);
    res.json({
      message: "Some error occurred while creating the task.",
    });
  }
};

exports.read = (req, res, next) => {
  const { params = {} } = req;
  let task = tasks.filter((item) => item.id === params.id);
  task.length > 0
    ? res.json({
      task,
    })
    : res.json({
      message: "There is no task with the provided id.",
    });
};

exports.update = (req, res, next) => {
  const { params = {}, body = {} } = req;
  if (tasks.find((task) => task.id == params.id) === undefined) {
    res.status(404);
    res.json({
      message: `Document with id ${params.id} does not exist`,
    });
  }
  else {
    let aux = tasks.findIndex((task) => task.id == params.id)
    tasks[aux] = { ...tasks[aux], ...body }
    tasks[aux].updatedAt = new Date()
    fs.writeFileSync(filepath, JSON.stringify(tasks, null, 2));
    res.json({
      message: 'Document updated',
      document: tasks[aux]
    });
  }

};

exports.delete = (req, res, next) => {
  const { params = {} } = req;
  if (tasks.find((task) => task.id == params.id) === undefined) {
    res.status(404);
    res.json({
      message: `Document with id ${params.id} does not exist`,
    });
  }
  else {
    tasks = tasks.filter((task) => task.id !== params.id)
    try {
      fs.writeFileSync(filepath, JSON.stringify(tasks, null, 2));
      res.json({
        message: 'Task deleted'
      });
    } catch (error) {
      res.status(500);
      res.json({
        message: "Error at delete tasnk",
      });
    }
  }

};
