import React from 'react';
import './ProgressBar.css';

function ProgressBar({ bgColor, completed }) {
  return (
    <div className='progress-bar'>
      <div
        className='progress-bar__filler'
        style={{ width: `${completed}%`, backgroundColor: bgColor }}
      >
        <span className='progress-bar__label'>{`${completed}%`}</span>
      </div>
    </div>
  );
}

export default ProgressBar;
