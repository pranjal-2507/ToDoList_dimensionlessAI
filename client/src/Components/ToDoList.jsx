import React from 'react';
import Sidebar from '../Components/Sidebar'
import TaskList from '../Components/TaskList';
import Calendar from '../Components/Calender';
import '../Styles/ToDoList.css'


const ToDoList = () => {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <h2>Good Afternoon.</h2>
        <p>What's your plan for today?</p>
        <TaskList />
      </div>
      <Calendar />
    </div>
  );
};

export default ToDoList;
