import './tasks.css'
import Task from '../Task/task'
import { useState, useEffect } from 'react';
import axios from 'axios';

function Tasks() {

    const [taskname, setTaskName] = useState();
    const [tasks, setTasks] = useState([]);
    const [tasksLeft, setTasksLeft] = useState(0)

    const getTasks = () => {
        axios.get("http://localhost:3001/task").then((response) => {
            setTasks(response.data);
        });
    };

    const getTasksLeft = () => {
        axios.get("http://localhost:3001/tasksLeft").then((response) => {
            setTasksLeft(response.data[0].tasksLeft);
        });
    };

    const getTasksActive = () => {
        axios.get("http://localhost:3001/tasksActive").then((response) => {
            setTasks(response.data);
        });
    };

    const getTasksCompleted = () => {
        axios.get("http://localhost:3001/tasksCompleted").then((response) => {
            setTasks(response.data);
        });
    };

    const clear = () => {
        axios.delete("http://localhost:3001/clear").then((response) => {
            // getTasks()
        });
    };

    useEffect(() => {
        getTasks();
        getTasksLeft();
    }, [tasks,tasksLeft]);

    const addTask = () => {
        if (taskname !== "") {
            axios.post("http://localhost:3001/task", {
                taskname: taskname
            }).then((response) => {
                console.log(response.data);
            });
        }
    };

    return (
        <div className="nav">
            <div className="add">
                <input className='addT'
                    type="text" placeholder="Add a task"
                    onChange={(e) => {
                        setTaskName(e.target.value);
                    }}
                />
                <button className='plus' onClick={(addTask)}>+</button>
            </div>

            <div className="list">
                {tasks.map((task, index) => (
                    <Task key={index} task={task} />
                ))}
            </div>
            <div className="btmBar">
                <p className='p1'>{tasksLeft} Tasks Left</p>
                <p className='p2' onClick={getTasks}>All</p>
                <p className='p2' onClick={getTasksActive}>Active</p>
                <p className='p2' onClick={getTasksCompleted}>Completed</p>
                <p className='p3' onClick={clear}>Clear Completed</p>
            </div>
        </div>
    )
}

export default Tasks;