import React, { useState } from 'react';
import '../Styles/TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Call Max', date: '2023-02-04', tag: '#reminder' },
    { id: 2, text: 'Go to gym', date: '2023-02-05', tag: '#life' },
    { id: 3, text: 'Take out the bins', date: '2023-02-06', tag: '#life' },
    { id: 4, text: 'Brainstorm blog post ideas', date: '2023-02-09', tag: '#blog' },
  ]);

  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    setTasks([...tasks, { id: tasks.length + 1, text: newTask, date: new Date().toISOString().split('T')[0], tag: '' }]);
    setNewTask('');
  };

  return (
    <div className="task-list">
      <input
        type="text"
        placeholder="Add Todo"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTask()}
      />
      {tasks.map(task => (
        <div key={task.id} className="task-item">
          <span>{task.date}</span>
          <p>{task.text}</p>
          <span className="tag">{task.tag}</span>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
