import React from 'react';
import '../Styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1>📜DOSIVE</h1>
      <h3>My Lists</h3>
      <ul>
        <li className="list-item selected">Life</li>
        <li className="list-item">Work</li>
        <li className="list-item">Project A</li>
        <li className="list-item">+ New List</li>
      </ul>
    </div>
  );
};

export default Sidebar;
