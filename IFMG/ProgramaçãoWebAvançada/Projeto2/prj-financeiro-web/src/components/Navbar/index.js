import React from 'react';
import {Link} from 'react-router-dom';
import './navbar.css';

function Navbar (){
    return (
       <nav className="navbar navbar-expand-lg">
                <span className="navbar-brand text-white font-weight-bold">Financeiro</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" 
                   aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                   <i className="fas fa-bars text-white"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">
                     <li className="nav-item">  <Link className="nav-link" to="/">Home</Link>   </li>
                     <li className="nav-item">  <Link className="nav-link" to="/categoria">Categoria</Link>   </li>
                     <li className="nav-item">  <Link className="nav-link" to="/Login">Login</Link>   </li>
                  </ul>  
                </div>
       </nav>
    )
}
export default Navbar;
