import React from 'react';

function Input(props) {
  return (
    <div className="my__input">
      <label htmlFor={props.name}>{props.label}</label>
      <input type={props.type} name={props.name} />
    </div>
  )
}

export default Input;
