const express = require('express');
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "1234",
  database: "todolist"
});

//getAllTasks
app.get('/task', (req, res) => {
  db.query("select * from task", (err, result) => {
    if(err){
      console.log(err);
    }
    else{
      res.send(result);
    }
  });
});

//getActive
app.get('/tasksActive', (req, res) => {
  db.query("select * from task where status=false", (err, result) => {
    if(err){
      console.log(err);
    }
    else{
      res.send(result);
    }
  });
});

//getCompleted
app.get('/tasksCompleted', (req, res) => {
  db.query("select * from task where status=true", (err, result) => {
    if(err){
      console.log(err);
    }
    else{
      res.send(result);
    }
  });
});

//getTasksLeft
app.get('/tasksLeft', (req, res) => {
  db.query("select count(taskname) as tasksLeft from task where status=false", (err, result) => {
    if(err){
      console.log(err);
    }
    else{
      res.send(result);
    }
  });
});

//addTask
app.post('/task', (req,res) => {
  const taskname = req.body.taskname;

  db.query("insert into task (taskname) values (?)", [taskname], 
    (err, result) => {
      if(err){
        console.log(err);
      }
      else{
        res.send(result);
      }
    }
  );
});

//changeStatus
app.put('/task', (req,res) => {

  const taskid = req.body.taskid;

  db.query("update task set status = if (status, false, true) where taskid=?", [taskid], 
    (err, result) => {
      if(err){
        console.log(err);
      }
      else{
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});