import React, {useState} from 'react';
import './usuario-novo.css';

import firebase from '../../config/firebase'
import 'firebase/auth';
import NavBar from '../../components/navbar';


function UsuarioNovo(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [msg, setMsg] = useState('');
    const [msgTipo, setMsgTipo] = useState('');
    const [carregando, setCarregando] = useState(false);

    function handleNewUser(){

        setMsgTipo('');
        setMsg('');

        if(!email || !senha || email === '' || senha === ''){
            setMsgTipo('Erro');
            setMsg('E-mail e Senha são obrigatórios.');
            return;
        }

        setCarregando(true);

        firebase.auth()
                .createUserWithEmailAndPassword(email, senha)
                .then(
                    resultado => {
                        setMsgTipo('Sucesso');
                        setCarregando(false);
                        //console.log(JSON.stringify(resultado));
                    }
                )
                .catch(
                    erro => {
                        setMsgTipo('Erro');
                        setCarregando(false);

                        switch(erro.message){
                            case 'Password should be at least 6 characters':
                                setMsg('A senha deve ter pelo menos 6 caracteres!');  
                                break;
                            case 'The email address is already in use by another account.':
                                setMsg('Este email já está sendo utilizado por outro usuário!'); 
                                break; 
                            case 'The email address is badly formatted.':
                                setMsg('O formato do seu email é inválido!');
                                break;
                            default:
                                setMsg('Não foi possivel cadastrar. Tente novamente mais tarde!');
                                break;
                        }

                        //console.log(JSON.stringify(erro));
                    }
                )
    }

    return(
        <>
        <NavBar/>
        <div className="login-content d-flex align-items-center text-center">
            
            <form className="form-signin mx-auto">
                               
                <h1 className="h3 mb-3 font-weight-bold text-white">Cadastrar</h1>
                
                <input type="email" id="inputEmail" className="form-control my-2" placeholder="E-mail"
                    onChange={e => setEmail(e.target.value)}/>
                <input type="password" id="inputPassword" className="form-control my-2" placeholder="Senha"
                    onChange={e => setSenha(e.target.value)}/>

                { carregando ?

                    <div class="spinner-border text-danger" role="status">
                        <span class="sr-only">Carregando...</span>
                    </div>

                :
                    <button className="btn btn-lg btn-login btn-block" type="button"
                        onClick={handleNewUser}> Cadastrar
                    </button>
                }
                <div className="opcoes-login text-white my-5">
                    
                    { msgTipo === "Sucesso" &&
                    <span>
                       WOW! <strong> {msg} &#128526;</strong>
                    </span>
                    }
                    <br/>
                    {
                        msgTipo === "Erro" &&                    
                    <span>
                        Ops! <strong> {msg} &#128549;</strong>
                    </span>
                    }

                </div>
               

            </form>


        </div>
        </>
    )
}

export default UsuarioNovo;