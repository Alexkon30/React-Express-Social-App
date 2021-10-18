import React from 'react'
import { Link } from 'react-router-dom'

function Dialog(props) {

  return (
    <div>
      <Link
        to={`/messenger/${props.dialogId}`}
        className='dialog__link'
        onClick={props.onClick}
      > {props.name} {props.surname} </Link>
    </div>
  )
}

export default Dialog
