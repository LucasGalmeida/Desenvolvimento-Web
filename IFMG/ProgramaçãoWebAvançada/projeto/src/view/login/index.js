import React, {useState} from 'react';
import './login.css';
import Logo from '../../assets/images/filhote_de_flango.svg'

import firebase from '../../config/firebase'
import 'firebase/auth';
import {Link, Redirect} from 'react-router-dom';

import{useSelector, useDispatch} from 'react-redux';

function Login(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [msg, setMsg] = useState('');

    const dispatch = useDispatch();

    function handleLogin(){

        firebase.auth()
                .signInWithEmailAndPassword(email, senha)
                .then(
                    resultado => {
                        setMsg('Sucesso');

                        setTimeout( ()=> {
                            dispatch({
                                type:'LOG_IN',
                                payload: {usuarioEmail: email}
                            });
                        }, 2000);

                        
                        //console.log(JSON.stringify(resultado));
                    }
                )
                .catch(
                    erro => {
                        setMsg('Erro');
                        //console.log(JSON.stringify(erro));
                    }
                )
    }

    return(

        <div className="login-content d-flex align-items-center text-center">
            
            {useSelector(state => state.user.usuarioLogado) === 1 ? <Redirect to="/" /> : null}

            <form className="form-signin mx-auto">
                <img className="mb-4 text-white" src={Logo} alt="flango" width="72" height="72"/>                
                <h1 className="h3 mb-3 font-weight-bold text-white">Login</h1>
                
                <input type="email" id="inputEmail" className="form-control my-2" placeholder="E-mail"
                    onChange={e => setEmail(e.target.value)}/>
                <input type="password" id="inputPassword" className="form-control my-2" placeholder="Senha"
                    onChange={e => setSenha(e.target.value)}/>

                <button className="btn btn-lg btn-login btn-block" type="button"
                    onClick={handleLogin}>
                    Logar
                </button>
                
                <div className="opcoes-login text-white my-5">
                    
                    { msg === "Sucesso" &&
                    <span>
                        WOW! <strong> Você está conectado! &#128526;</strong>
                    </span>
                    }
                    <br/>
                    {
                        msg === "Erro" &&                    
                    <span>
                        Ops! <strong> Verifique se a senha ou o usuário estão corretos! &#128549;</strong>
                    </span>
                    }

                </div>

                <div className="opcoes-login text-white my-5">
                    <a href="#" className="mx-2">Recuperar senha</a>
                    <Link to="/novousuario" className="mx-2">Quero me cadastrar</Link>
                </div>

            </form>

        </div>
        
    )
}

export default Login;