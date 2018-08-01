import React from 'react';
import { Link } from 'react-router-dom'

const NavBar = props => {
  if (props.loggedIn){
    console.log(props.userDetails.karmaPoints);
    return(
      <div>
        <Link to="/profile"> Profile </Link>
        <Link to="/"> Listings </Link>
        <Link to="#" onClick={props._logout}> Logout </Link>
      </div>
    )
  } else {
    return(<div>

    </div>)
  }
};

export default NavBar;
