import React from 'react'
import './task.css'
import { useState } from 'react'

function Task({task}) {

    const [flag, setFlag] = useState(true)

    return (
        <div className="task">
            <input type="checkbox" onClick={() => setFlag(!flag)}/>
            {flag ? <p>{task.taskname}</p> : <p><del>{task.taskname}</del></p>}
        </div>
    )
}

export default Task;