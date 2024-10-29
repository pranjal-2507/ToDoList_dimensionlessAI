// CalendarComponent.js
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../Styles/Calender.css'; 

const CalendarComponent = ({ todos = [] }) => { // Default to empty array if todos is undefined
  const today = new Date();

  // Map over todos to extract deadlines safely
  const deadlines = todos.map(todo => new Date(todo.deadline));

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        return 'highlight-today';
      }

      if (
        deadlines.some(d => 
          d.getDate() === date.getDate() &&
          d.getMonth() === date.getMonth() &&
          d.getFullYear() === date.getFullYear()
        )
      ) {
        return 'highlight-deadline';
      }
    }
  };

  return (
    <div>
      <Calendar tileClassName={tileClassName} />
    </div>
  );
};

export default CalendarComponent;
