import React from 'react';
import { Link } from 'react-router-dom'


const NavBar = props => {
  if (props.loggedIn){
    return(
      <div>
        <Link to="#" onClick={props._logout}>Logout</Link>
        <br />
      </div>
    )
  } else {
    return(<div>

    </div>)
  }
};

export default NavBar;