import './tasks.css'
import Task from '../Task/task'
import { useState, useEffect } from 'react';
import axios from 'axios';

function Tasks({listid}) {

    const [taskname, setTaskName] = useState('');
    const [tasks, setTasks] = useState([]);

    const getTasks = () => {
        axios.get("http://localhost:3001/task").then((response) => {
        setTasks(response.data);
        });
    };

    useEffect(() => {
        getTasks();
      }, []);

    const getTasksbyId = (listid) => {
        axios.get(`http://localhost:3001/task/${listid}`).then((response) => {
          setTasks(response.data);
        });
    }

    const addTask = () => {
        axios.post("http://localhost:3001/task", {
            taskname: taskname,
            listid: listid
        }).then((response) => {
            console.log(response.data);
        });
        setTaskName('');
    };

    return (
        <div className="nav">
            <div className="add">
                <input 
                type="text" placeholder="Add a task"
                onChange={(e) => {
                    setTaskName(e.target.value);
                }}
                />
                <button onClick={(addTask)}>+</button>
            </div>
            <div className="list">
                {listid!=0 ? getTasksbyId(listid) : getTasks}
                {tasks.map((task, index) => (
                    <Task key={index} task={task}/>
                ))}
            </div>
        </div>
    )
}

export default Tasks;