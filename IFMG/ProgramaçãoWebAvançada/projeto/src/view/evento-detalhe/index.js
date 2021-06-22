import React, {useState, useEffect} from 'react';


import './EventoDetalhe.css';
import NavBar from '../../components/navbar';

import firebase from '../../config/firebase'
import 'firebase/auth';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

function EventoDetalhe({match}){

    const [evento, setEvento] = useState({});
    const [imagem, setImagem] = useState();
    const [excluido, setExcluido] = useState(0);
    const usuarioLogado = useSelector(state => state.user.usuarioEmail);

    const [carregando, setCarregando] = useState(1);

    useEffect(()=>{        
        
        if (carregando){
        
            firebase.firestore().collection('eventos').doc(match.params.id).get()
                .then(resultado => {
                    setEvento(resultado.data())

                    firebase.firestore().collection('eventos').doc(match.params.id)
                                        .update('visualizacoes', resultado.data().visualizacoes+1);

                    firebase.storage().ref(`imagens/${resultado.data().foto}`).getDownloadURL()
                            .then(url => {setImagem(url); setCarregando(0)})
                });

        }
        
    },[]);

    function remover(){
        firebase.firestore().collection('evento').doc(match.params.id).delete()
                .then(()=>setExcluido(1));
    }

    return(
        <>
        {excluido === 1 ? <Redirect to="/"/> : null}

        <NavBar/>
        <div className="container-fluid">

            {carregando === 1 ?
                <div className="row mx-auto">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                </div>
                
                :        

                <div>
                    <div className="row">
                        <img src={imagem} className="img-banner" alt="Banner do Evento"/>
                        
                        <div className="col-12 text-right mt-1 visualizacoes">
                            <i className="fas fa-eye"></i><span className="mx-2">{evento.visualizacoes+1}</span>
                        </div>

                        <h3 className="col-12 text-center">{evento.titulo}</h3>
                        
                    </div>

                    <div className="row mt-5 d-flex justify-content-around">
                        
                        <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                            <i className="fas fa-ticket-alt fa-2x"></i>
                            <h5> <strong> Tipo </strong> </h5>
                            <span className="mt-2">{evento.tipo}</span>
                        </div>
                                    
                        <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                            <i className="fas fa-ticket-alt fa-2x"></i>
                            <h5> <strong> Data </strong> </h5>
                            <span className="mt-2">{evento.data}</span>
                        </div>
                                    
                        <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                            <i className="fas fa-ticket-alt fa-2x"></i>
                            <h5> <strong> Hora </strong> </h5>
                            <span className="mt-2">{evento.hora}</span>
                        </div>

                    </div>

                    <div className="row mt-5">

                        <div className="col-12 text-center mx-5">
                            <h5>Detalhes do evento</h5>
                        </div>

                        <p className="col-12 mx-5"> {evento.detalhe} </p>

                    </div>

                    {usuarioLogado === evento.usuario ? 
                        <Link to={`/editaEvento/${match.params.id}`} className="btn-editar" >
                            <i className="fas fa-pen-square fa-3x"></i>
                        </Link>    
                        : ''
                    }

                    {usuarioLogado === evento.usuario ?
                        <div className="row">
                            <div className="col-3">
                                <button type="button" className="btn btn-lg btn-block mt-3 btn-remove"    
                                onClick={remover}>Excluir evento</button>
                            </div>
                        </div>
                    :
                        null
                    }
                    </div>
                
            }
        </div>
        </>
    );    
}
export default EventoDetalhe;