import React from 'react';
import { Link } from 'react-router-dom'

const Footer = props => {
  if (props.loggedIn){
    return(
      <footer class="page-footer">
         <div class="container">
           <div class="row">
             <div class="col l6 s12">
               <h5 class="white-text">Lendit</h5>
               <p class="grey-text text-lighten-4">Share things with your neighbours</p>
             </div>
             <div class="col l4 offset-l2 s12">
               <h5 class="white-text">Links</h5>
               <ul>
                 <li><a class="grey-text text-lighten-3" href="#!">Twitter</a></li>
                 <li><a class="grey-text text-lighten-3" href="#!">Facebook</a></li>
               </ul>
             </div>
           </div>
         </div>
         <div class="footer-copyright">
           <div class="container">
           © 2018 Team Lendit - Final Project
           </div>
         </div>
       </footer>
    )
  } else {
    return(<footer>

    </footer>)
  }
};

export default Footer;
