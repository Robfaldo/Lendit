import React from 'react';
import { Link } from 'react-router-dom'

const NavBar = props => {
  if (props.loggedIn){
    console.log(props.userDetails.karmaPoints);
    return(
      <div>
        <Link to="#" onClick={props._logout}>Logout</Link>
        <h1>Welcome, {props.userDetails.username}!</h1>
        <p>You have {props.userDetails.karmaPoints} karma points</p>
        <br />
      </div>
    )
  } else {
    return(<div>

    </div>)
  }
};

export default NavBar;
