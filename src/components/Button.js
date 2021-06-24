import React from 'react';
import './Button.css';

function Button(props) {
  return (
    <button type='submit' className={props.className}>
      {props.text}
    </button>
  );
}

export default Button;
