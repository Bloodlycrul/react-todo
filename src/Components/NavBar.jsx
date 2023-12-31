import styles from "./NavBar.module.css";
import { useRef, useState, useEffect } from "react";
import React from "react";

let getObjects = () => {
  let list = localStorage.getItem('todo');

  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
}

function NavBar() {
  let task = useRef();
  let des = useRef();
  let date = useRef();
  let searchObj = useRef();
  let [addButton, setAddButton] = useState(false);
  let [success, setSuccess] = useState(false);
  let [error, setError] = useState(false);
  let [taskList, setTaskList] = useState(getObjects());
  let [listSearch, setListSearch] = useState([]);


  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(taskList))
  }, [taskList])

  function checktodo() {
    if (!addButton) {
      setAddButton(true)
    }
  }

  function close() {
    setAddButton(false)
  }

  function addTask() {
    if (!task.current.value && !des.current.value) {
      setError(true);

      setTimeout(() => {
        setError(false)
      }, 3000);
    } else {
      setSuccess(true)

      let temp = {
        title: task.current.value,
        description: des.current.value,
        dueDate: date.current.value,
      }

      setTaskList(prevArry => [...prevArry, temp]);

      task.current.value = '';
      des.current.value = '';
      date.current.value = '';

      setAddButton(false)

      setTimeout(() => {
        setSuccess(false)
      }, 3000);
    }
  }

  useEffect(() => {
    const searchResult = () => {
      let searchItem = searchObj.current.value.trim().toLowerCase();
      if (searchItem === '') {
        alert('Search');
        return []; // or handle empty search input in an appropriate way
      }
      const filteredList = taskList.filter((task) => {
        const taskTitle = task.title.toLowerCase();

        return taskTitle.includes(searchItem);
      });
      setListSearch(filteredList)
      console.log(filteredList);
      searchObj.current.value = '';
      return filteredList;
    };

    // Call the searchResult function when the search button is clicked
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', searchResult);

    // Clean up the event listener
    return () => {
      searchButton.removeEventListener('click', searchResult);
    };
  }, [taskList])

  const handleRemoveItem = (selectedTodo) => {
    setTaskList(prevList => prevList.filter(todo => todo !== selectedTodo));
  };

  return (
    <>
      {/* Task Add PopUp  */}
      {/* Success Add PopUp  */}
      <div className={success ? "" : 'display'}>
        <div className="success">
          <h1>Task Has Been Added</h1>
        </div>
      </div>

      {/* Error Add PopUp  */}
      <div className={error ? "" : 'display'}>
        <div className="error">
          <h1>Please fill all the details</h1>
        </div>
      </div>

      {/* Task End PopUp  */}
      <nav className={styles.navbar}>
        {/* All Note Important Note   */}
        <div className={styles.btn}>
          <button>All Note</button>
          <button>Important Note</button>
        </div>

        {/* Add Note    */}
        <div className={styles.container}>
          <input ref={searchObj} type="text" placeholder="Search Your Task" />
          <button className="btn" id="searchButton">Search</button>
          <button onClick={checktodo} className={styles.addbtn}>
            +
          </button>
        </div>
      </nav>

      {/* Add Task Model Added   */}
      <div className={addButton === true ? "position" : "display"}>
        <div className='model'>
          <div>
            <h1>Enter Your Todo Here</h1>
            <button onClick={close} className='close'>x</button>
          </div>

          {/*  Use Todo List Add Start from here  */}
          <div className='addtodo'>
            <form onSubmit={e => e.preventDefault()}>
              <input ref={task} type="text" name="" id="" placeholder='Enter Task' />
              <input ref={des} type="text" placeholder='Enter Descripition' />
              <input ref={date} type="date" name="" id="" />
              <button onClick={addTask}>Add Task</button>
            </form>
          </div>
        </div>
      </div>

      <div className="flexcoloum"  >
        {taskList.map((task, index) => (
          <div className="todo" key={index} >
            <div className='coloumWidth'>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>{task.dueDate}</p>
            </div>
            <div>
              <button onClick={() => handleRemoveItem(task)} className="btn">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <h1>Search Result</h1>
      <div>
        {listSearch.map((e) => (
          <div key={e.title}>
            <h1>{e.title}</h1>
            <p>{e.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default NavBar;
