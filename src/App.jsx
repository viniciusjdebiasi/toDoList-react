import React from "react";
import { HeartFilledIcon, HeartIcon, CheckCircledIcon, ListBulletIcon, TrashIcon, PlusCircledIcon } from "@radix-ui/react-icons";

import "./App.css";

function App() {
  return (
    <div className="main">
      <div className="container-choose" >
        <button className="button-choose" > <HeartFilledIcon className="icons" />&nbsp;&nbsp;&nbsp;<p>Favorites</p> </button>
        <button className="button-choose" > <CheckCircledIcon className="icons" />&nbsp;&nbsp;&nbsp;<p>Completed</p> </button>
        <button className="button-choose" > <ListBulletIcon className="icons" />&nbsp;&nbsp;&nbsp;<p>All</p> </button>
      </div>

      <div className="container_tasks" >
        <h1 className="title" >Create and manage your tasks!</h1>

        <div className="container-add" >
          <input type="text" className="input-add" /> <button className="button-add" >Add Task&nbsp;&nbsp;&nbsp;<PlusCircledIcon className="icons" /></button>
        </div>

        <div className="tasks">
          <p className="task"> <input type="checkbox" className="input-checkbox" /> Varrer a sala Varrer a sala Varrer a sala <button className="button-task"><HeartIcon className="icons" /></button> <button className="button-task"><TrashIcon className="icons" /></button> </p>
          
          <p className="task"> <input type="checkbox" className="input-checkbox" /> Varrer a sala <button className="button-task"> <HeartIcon className="icons" /> </button> <button className="button-task"> <TrashIcon className="icons" /> </button> </p>
          
          <p className="task"> <input type="checkbox" className="input-checkbox" /> Varrer a sala <button className="button-task"> <HeartIcon className="icons" /> </button> <button className="button-task"> <TrashIcon className="icons" /> </button> </p>
          
          <p className="task"> <input type="checkbox" className="input-checkbox" /> Varrer a sala <button className="button-task"> <HeartIcon className="icons" /> </button> <button className="button-task"> <TrashIcon className="icons" /> </button> </p>
        </div>
      </div>
    </div>
  )
}

export default App;
