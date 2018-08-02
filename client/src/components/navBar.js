import React from 'react';
import { Link } from 'react-router-dom'

const NavBar = props => {
  if (props.loggedIn){
    console.log(props.userDetails.karmaPoints);
    return(
      <nav>
          <div class="nav-wrapper">
            <a href="#" class="brand-logo">Lendit</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li><Link to="/profile"> Profile </Link>Sass</li>
              <li ><Link to="/"> Listings </Link></li>
              <li><Link to="#" onClick={props._logout}> Logout </Link></li>
            </ul>
          </div>
      </nav>
    )
  } else {
    return(<nav>

    </nav>)
  }
};

export default NavBar;
