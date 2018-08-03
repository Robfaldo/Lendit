import React from 'react';

function HomepageDisplayToggle(props) {
  return (
    <div className="Toggle" style={{ display: "inline-block", paddingTop: "3em" }}>
      <form onSubmit={props.handleToggle}>
        <input type="button" class="waves-effect waves-light btn" value="sign-up" onClick={props.handleToggle} />
        <input type="button" class="waves-effect waves-light btn" value="sign-in" onClick={props.handleToggle} />
        <input type="button" class="waves-effect waves-light btn" value="about" onClick={props.handleToggle} />
      </form>
    </div>
  )
}

export default HomepageDisplayToggle;
