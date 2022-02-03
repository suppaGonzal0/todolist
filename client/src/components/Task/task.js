import React, { useEffect } from 'react'
import './task.css'
import axios from 'axios'

function Task({task}) {

    const changeStat = () => {
        axios.put("http://localhost:3001/task", {
            taskid: task.taskid
        }).then((response) => {
            console.log(response.data);
        });
    }
    

    return (
        <div>
            
            {!task.status ? 
            <div className="task">
                <input type="checkbox" onChange={changeStat}/>
                <p>{task.taskname}</p> 
            </div>
            : 
            <div className="task">
                <input type="checkbox" onChange={changeStat} checked/>
                <p><del>{task.taskname}</del></p>
            </div>
            }
        </div>
    )
}

export default Task;