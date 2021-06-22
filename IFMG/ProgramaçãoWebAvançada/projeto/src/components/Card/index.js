import React, {useState, useEffect} from 'react';
import './Card.css';

import {Link} from 'react-router-dom';
import firebase from '../../config/firebase';


function EventoCard({id,img,titulo,detalhes,visualizacoes}){

    const [url, setUrl] = useState();
    

    useEffect(()=>{

        firebase.storage().ref(`imagens/${img}`).getDownloadURL()
                          .then(
                              url => setUrl(url)
                          )
                          .catch(erro => setUrl("https://via.placeholder.com/100x50"));
    },[url]);

    return(

        <div className="col-md-3 col-sm-12 shadow-sm pb-2">
            <img src={url} className="img-cartao card-img" alt="Banner do Evento"/>
            
            <div className="card-body">
                <h5>{titulo}</h5>
                <p className="text-cartao"> {detalhes}</p>
            </div>

            <div className="row rodape-cartao d-flex align-items-center">
                <div className="col-6">
                    <Link to={`/detalheEvento/${id}`} className="btn btn-sm btn-detalhes"> + detalhes </Link>
                </div>
                <div className="col-6">
                    <i className="fas fa-eye"> </i> <span className="ml-2">{visualizacoes}</span>
                </div>
            </div>

        </div>
        
    )
}

export default EventoCard;