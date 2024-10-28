import React from 'react';
import '../Styles/Calender.css';

const Calendar = () => {
  return (
    <div className="calendar">
      <div className="calendar-header">
        <h3>2023</h3>
        <p>Feb</p>
      </div>
      <div className="calendar-body">
        {/* Render a simple calendar grid */}
        <div className="calendar-grid">
          {Array.from({ length: 28 }, (_, i) => (
            <div key={i} className="calendar-day">{i + 1}</div>
          ))}
        </div>
      </div>
      <div className="sort-method">
        <h4>Sort Method</h4>
        <button>Date</button>
        <button>Priority</button>
        <button>Tag</button>
      </div>
    </div>
  );
};

export default Calendar;
