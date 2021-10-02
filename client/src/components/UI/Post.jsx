import React from 'react'

function Post(props) {
  return (
    <div className="post">
      <div className="post__header">
        <div className="post__author">
          {props.author}
        </div>
        <div className="post__date">
          {props.date}
        </div>
      </div>
      <div className="post__content">
        {props.content}
      </div>
    </div>
  )
}

export default Post
