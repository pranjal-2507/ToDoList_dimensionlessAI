import React, { useState } from 'react';
import { Plus, Calendar, Moon, Sun } from 'lucide-react';
import '../Styles/ToDoList.css';

const App = () => {
  const [todos, setTodos] = useState([
    { 
      id: 1, 
      date: '2023-02-04', 
      text: 'Call Max', 
      tag: 'reminder',
      status: 'pending',
      priority: 'high',
      completed: false 
    }
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeCategory, setActiveCategory] = useState('all');
  const [darkMode, setDarkMode] = useState(true);
  const [selectedPriority, setSelectedPriority] = useState('medium');

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
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
      text: newTodo,
      tag: 'general',
      status: 'pending',
      priority: selectedPriority,
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

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="container">
        {/* Theme Toggle */}
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="theme-toggle"
        >
          {darkMode ? <Sun className="icon" /> : <Moon className="icon" />}
        </button>

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
              value={selectedDate.toISOString().slice(0, 16)}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
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
            <div 
              key={todo.id}
              className="todo-item"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTaskCompletion(todo.id)}
                className="todo-checkbox"
              />
              <div className={`todo-content ${todo.completed ? 'completed' : ''}`}>
                <div className="todo-header">
                  <div className={`priority-indicator ${getPriorityColor(todo.priority)}`}></div>
                  <span>{todo.text}</span>
                </div>
                <div className="todo-date">
                  {new Date(todo.date).toLocaleString()}
                </div>
              </div>
              <span className="todo-tag">
                {todo.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;