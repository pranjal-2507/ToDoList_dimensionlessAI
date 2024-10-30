import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Moon, Sun, Edit2, Trash, Check } from 'lucide-react';
import axios from 'axios'; // Import axios
import '../Styles/ToDoList.css';
import { Link } from "react-router-dom";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeCategory, setActiveCategory] = useState('all');
  const [darkMode, setDarkMode] = useState(true);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editText, setEditText] = useState('');
  const [newPriority, setNewPriority] = useState('')

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  useEffect(() => {
    // Fetch data from the provided API using axios
    axios.get("https://dummyjson.com/todos") 
      .then(response => {
        const todosWithMediumPriority = response.data.todos.map(todo => ({
          ...todo,
          priority: 'medium', 
          
          date: new Date().toISOString().split('T')[0], 
        }));
 
        setTodos(todosWithMediumPriority);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const getProgress = () => {
    const completedTasks = todos.filter(todo => todo.completed).length;
    return (completedTasks / todos.length) * 100 || 0;
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const newTodoItem = {
      id: todos.length + 1,
      date: selectedDate.toISOString().split('T')[0],
      todo: newTodo,
      tag: 'general',
      status: 'pending',
      priority: 'medium', 
      completed: false
    };
    
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const toggleTaskCompletion = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed, status: !todo.completed ? 'completed' : 'pending' } : todo
    ));
  };

  const filterTodos = () => {
    if (activeCategory === 'all') return todos;
    return todos.filter(todo => todo.status === activeCategory);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium'; 
      case 'low': return 'priority-low';
      default: return 'priority-default';
    }
  };

  // Edit Task
  const handleEditTodo = (id, text) => {
    setEditingTodoId(id);
    setEditText(text);
  };

  const handleSaveEdit = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, todo: editText } : todo
    ));
    setEditingTodoId(null);
    setEditText('');
  };

  // Delete Task
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
    <div className="container">

      <div className="header">
        <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle">
          {darkMode ? <Sun className="icon sunIcon" /> : <Moon className="icon" />}
        </button>
        
        <div className="auth-buttons">
          <Link to="/login" className="auth-button">Login</Link>
          <Link to="/signup" className="auth-button">Signup</Link>
        </div>
      </div>
      <br />
      <br />

      <div className="heading">
        <h1>DOSIVE📜</h1>
        <h2>What's your plan for today?</h2>
        <br />
      </div>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar-bg">
          <div 
            className="progress-bar-fill"
            style={{ width: `${getProgress()}%` }}
          ></div>
        </div>
        <p className="progress-text">{getProgress().toFixed(1)}% Complete</p>
      </div>

      {/* Categories */}
      <div className="categories">
        {['all', 'pending', 'completed', 'ongoing'].map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`category-button ${activeCategory === category ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Todo Form */}
      <form onSubmit={handleAddTodo} className="todo-form">
        <div className="form-content">
          <input
            type="datetime-local"
            className="date-input"
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
          />
          <select
            value={newPriority} 
            onChange={(e) => setNewPriority(e.target.value)}
            className="priority-select"
            
          >
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new todo"
            className="todo-input"
          />
          <button type="submit" className="add-button">
            <Plus />
          </button>
        </div>
      </form>

      {/* Todo List */}
      <div className="todo-list">
      {filterTodos().map(todo => (
  <div key={todo.id} className="todo-item">
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={() => toggleTaskCompletion(todo.id)}
      className="todo-checkbox"
    />
    <div className={`todo-content ${todo.completed ? 'completed' : ''}`}>
      {editingTodoId === todo.id ? (
        <div className="edit-input-container">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-input"
          />
          <button onClick={() => handleSaveEdit(todo.id)} className="save-button">
            <Check />
          </button>
        </div>
      ) : (
        <>
          <div className="todo-header">
            <div className={`priority-indicator ${getPriorityColor(todo.priority)}`}></div>
            <span>{todo.todo}</span> 
          </div>
          <div className="todo-date">
            {new Date(todo.date).toLocaleDateString()}
          </div>
        </>
      )}
    </div>
    <div className="todo-actions">
      <Edit2 className="edit-icon" onClick={() => handleEditTodo(todo.id, todo.todo)} />
      <Trash className="delete-icon" onClick={() => handleDeleteTodo(todo.id)} />
    </div>
  </div>
))}

      </div>
    </div>
  </div>
  );
};

export default App;
