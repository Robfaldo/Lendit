import React from 'react';

function HomepageDisplayToggle(props) {
  return (
    <form onSubmit={props.handleToggle}>
      <input type="button" value="sign-up" onClick={props.handleToggle} />
      <input type="button" value="sign-in" onClick={props.handleToggle} />
      <input type="button" value="about" onClick={props.handleToggle} />
    </form>
  )
}

export default HomepageDisplayToggle;
