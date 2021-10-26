import './lists.css'
import List from '../List/list'
import { useState } from 'react';
import axios from 'axios';

function Lists(props) {

    const [listName, setListName] = useState('');

    const addList = () => {
        axios.post("http://localhost:3001/list", {listname: listName}).then((response) => {
            console.log(response.data);
        });
        setListName('')
    };

    return (
        <div className="nav">
            <div className="add">
                <input 
                type="text" placeholder="Add a list"
                onChange={(e) => {
                    setListName(e.target.value);
                }}
                />
                <button onClick={addList}>+</button>
            </div>
            <div className="list">
                {props.list.map((list, index) => (
                    <List key={index} list={list} setListId={props.setListId}/>
                ))}
            </div>
        </div>
    )
}

export default Lists;