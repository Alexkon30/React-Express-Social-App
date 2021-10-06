import React from 'react'
import { Link } from 'react-router-dom'

function Aside() {

  return (
    <div className="aside">
      <Link to="/user" className="aside__link active">My page</Link>
      <Link to="/messages" className="aside__link">Messages</Link>
      <Link to="/friends" className="aside__link">Friends</Link>
      <Link to="/settings" className="aside__link">Settings</Link>
      <Link to="/people" className="aside__link">People</Link>
    </div>
  )
}

export default Aside
