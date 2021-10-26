const express = require('express');
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const port= 3001;

const db = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "1234",
  database: "todolist"
});

//getlist
app.get('/list', (req, res) => {
  db.query("select * from list", (err, result) => {
    if(err){
      console.log(err);
    }
    else{
      res.send(result);
    }
  });
});

//addList
app.post('/list', (req,res) => {
  const listname = req.body.listname;

  db.query("insert into list (listname) values (?)", [listname], 
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

//getTasksbyId
app.get('/task/:id', (req, res) => {
const id = req.params.id;
  db.query("select * from task where listid = ?", id, (err, result) => {
    if(err){
      console.log(err);
    }
    else{
      res.send(result);
    }
  });
});

app.post('/task', (req,res) => {
  const taskname = req.body.taskname;
  const listid = req.body.listid;

  db.query("insert into task (taskname, listid) values (?, ?)", [taskname, listid], 
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