import React from 'react';

function Input(props) {
  return (
    <div className={props.className}>
      <label htmlFor={props.name}>{props.label}</label>
      <input {...props.input} name={props.name} />
    </div>
  )
}

export default Input;
