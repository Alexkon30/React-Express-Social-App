import React from 'react'

function Person(props) {
  return (
    <div className="person">
      <div className="person__photo">
        photo
      </div>
      <div className="person__info">
        {props.name} {props.surname}
      </div>
    </div>
  )
}

export default Person
