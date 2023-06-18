import React from 'react'
import NavBar from '../Components/NavBar';

function Home() {

  const todoRender = NavBar.length === 0 ? (
  <div className=''></div>
) : (
  NavBar.map((e) => (
    <div className='todo' key={e.title}>
      <h1>{e.title}</h1>
      <p>{e.description}</p>
      <p>{e.dueDate}</p>
    </div>
  ))
);


  return (
  <>
  {todoRender}
  </>
  )
}

export default Home