import './App.css';
import Lists from './components/Lists/lists';
import Tasks from './components/Tasks/tasks';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [list, setList] = useState([]);
  const [listid, setListId] = useState(0);

  useEffect(() => {
    const getList = () => {
      axios.get("http://localhost:3001/list").then((response) => {
      setList(response.data);
      });
    };
    getList();
  }, [list])

  return (
    <div className="App">
      <header>Todo-List</header>
      <Lists list={list} setListId={(listid) => setListId(listid)}/>
      <Tasks listid={listid}/>
    </div>
  );
}

export default App;
