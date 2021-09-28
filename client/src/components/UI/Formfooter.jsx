import React from 'react';
import { Link } from 'react-router-dom';

function Formfooter(props) {
  return (
    <div className={`${props.block}__footer`}>
      <div className={`${props.block}__footer__text`}>{props.text}</div>
      <Link to={props.href}>{props.linkText}</Link>
    </div>
  )
}

export default Formfooter;
