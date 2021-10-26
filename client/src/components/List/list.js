import React from 'react'
import './list.css'

function List(props) {

    return (
        <div className="task" onClick={() => props.setListId(props.list.listid)}>
           <p>{props.list.listname}</p>
        </div>
    )
}

export default List;