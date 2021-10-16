import React from 'react'

function Message(props) {
  return (
    <div className="message">
      <div className="message__header">{props.author} {props.date}</div>
      <div className="message__content">{props.content}</div>
    </div>
  )
}

export default Message
