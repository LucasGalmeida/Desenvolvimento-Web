import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import './navbar.css';

function NavBar() {

    const dispatch = useDispatch();

    function handleLogout() {
        dispatch({
           type: 'LOG_OUT'
        });
    }

    return (
        <nav className="navbar navbar-expand-lg">
            <Link className="nav-link" to="/"> <span className="navbar-brand text-white font-weight-bold">IFMGEventos</span> </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                      <i className="fas fa-bars text-white"></i>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              { useSelector(state => state.user.usuarioLogado) === 0 &&
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/novousuario">Cadastrar <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login <span className="sr-only">(current)</span></Link>
                    </li>                    
                </ul>
              }

              { useSelector(state => state.user.usuarioLogado) === 1 &&
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/eventos/meus">Meus eventos <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/cadastraEvento">Publicar eventos <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                       <Link className="nav-link" to="#" onClick={handleLogout} >Sair <span className="sr-only">(current)</span> </Link>
                    </li>                    
                </ul>
              }


            </div>
         </nav>         
    )
}

export default NavBar;