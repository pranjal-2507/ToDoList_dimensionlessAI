import React, { useState } from 'react';
import '../Styles/Sidebar.css';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { CiSaveDown2 } from "react-icons/ci";
import { MdCancel } from "react-icons/md";

const Sidebar = () => {
  const [lists, setLists] = useState([]);
  const [newList, setNewList] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  const addList = () => {
    if (newList.trim()) {
      setLists([...lists, newList.trim()]);
      setNewList('');
    }
  };

  const deleteList = (index) => {
    const updatedLists = lists.filter((_, i) => i !== index);
    setLists(updatedLists);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(lists[index]);
  };

  const saveEdit = () => {
    if (editingText.trim()) {
      const updatedLists = lists.map((list, index) =>
        index === editingIndex ? editingText.trim() : list
      );
      setLists(updatedLists);
      cancelEdit();
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditingText('');
  };

  return (
    <div className="sidebar">
      <h1>📜DOSIVE</h1>
      <h3>My Lists</h3>
      <ul>
        {lists.map((list, index) => (
          <li key={index} className={`list-item ${index === 0 ? 'selected' : ''}`}>
            {editingIndex === index ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              list
            )}
            <div className="list-actions">
              {editingIndex === index ? (
                <>
                  <button onClick={saveEdit}><CiSaveDown2 /></button>
                  <button onClick={cancelEdit}><MdCancel /></button>
                </>
              ) : (
                <>
                  <button onClick={() => startEditing(index)}><CiEdit /></button>
                  <button onClick={() => deleteList(index)}><MdDeleteOutline /></button>
                </>
              )}
            </div>
          </li>
        ))}
        <li className="list-item new-list">
          <input
            type="text"
            placeholder="+ New List"
            value={newList}
            onChange={(e) => setNewList(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addList()}
          />
          <button onClick={addList}>+</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
