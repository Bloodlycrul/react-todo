import styles from "./NavBar.module.css";
import { useRef, useState } from "react";
import React from "react";
import { TaskList } from "./TaskList";




function NavBar() {

  let task = useRef();
  let des = useRef();
  let date = useRef();

  let [addButton, setAddButton] = useState(false);
  let[success, setSuccess] = useState(false)
  let[error, setError] = useState(false)

  

  function checktodo(){
    if(!addButton){
      setAddButton(true)
  }
}
function close(){
  setAddButton(false)
}

function addTask (){
  if(!task.current.value && !des.current.value){
    setError(true);

    setTimeout(() => {
      setError(false)
    }, 3000);
  }else{

  setSuccess(true)

  let temp = {
    title: task.current.value,
    description:des.current.value,
    dueDate:date.current.value,
  }
  TaskList.push(temp);

  task.current.value = '';
  des.current.value = '';
  date.current.value = '';

  setAddButton(false)

  setTimeout(() => {
    setSuccess(false)
  }, 3000);
}
}

  return (
    <>

    {/* Task Add PopUp  */}

    {/* Success Add PopUp  */}

    <div className={success ? "" : 'display'} >
    <div className="success">
    <h1>Task Has Been Added</h1>
    </div>
    </div>


    {/* Error Add PopUp  */}

    <div className={error ? "" : 'display'}  >
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
          <button onClick={checktodo} className={styles.addbtn}>
            +
          </button>
        </div>
      </nav>

      {/* Add Task Model Added   */}
      <div className={addButton ? '' : 'display'}>
    <div className='model'>
    <div>
    <h1>Enter Your Todo Here</h1>
    <button onClick={close} className='close'>x</button>
    </div>

    {/*  Use Todo List Add Start from here  */}

    <div className='addtodo'>
    <form onSubmit={e => e.preventDefault()} >
    <input ref={task}  type="text" name="" id="" placeholder='Enter Task' />
    <input  ref={des} type="text" placeholder='Enter Descripition' />
    <input ref={date}  type="date" name="" id="" />
    <button onClick={addTask}>Add Task</button>
    </form>

    </div>
    </div>
    </div>


    
    </>
  );
}


export default NavBar;
