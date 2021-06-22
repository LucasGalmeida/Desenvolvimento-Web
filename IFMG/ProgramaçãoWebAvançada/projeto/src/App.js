import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';

import UsuarioNovo from './view/usuario-novo';
import Login from './view/login/';
import Home from './view/home';
import UsuarioRecuperaSenha from './view/usuario-recuperaSenha';
import EventoCadastro from './view/evento-cadastro';
import DetalheEvento from './view/evento-detalhe';

function App() {
  return (

       <BrowserRouter>
           <Route exact path="/" component={Home} />
           <Route exact path="/eventos/:parametro" component={Home} />  
           <Route exact path="/login" component={Login} />  
           <Route exact path="/novousuario" component={UsuarioNovo} />  
           <Route exact path="/recuperaSenha" component={UsuarioRecuperaSenha} />
           <Route exact path="/cadastraEvento" component={EventoCadastro} />
           <Route exact path="/detalheEvento/:id" component={DetalheEvento} /> 
           <Route exact path="/cadastraEvento/:id" component={EventoCadastro} />   
       </BrowserRouter>   

        
       
  );
}

export default App;