import React, {useState, useEffect } from 'react';
import {useSelector} from 'react-redux';

import './home.css';
import NavBar from '../../components/navbar';
import EventoCard from '../../components/Card';

import firebase from '../../config/firebase'
import 'firebase/auth';


function Home({match}){

    const [eventos, setEventos] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    
    const listaEventos = [];

    const usuarioLogado = useSelector(state => state.user.usuarioEmail)

    useEffect(()=>{

        if (match.params.parametro){

            firebase.firestore().collection('eventos').where('usuario','==', usuarioLogado)
                .get()
                .then(resultado => {
                    
                    resultado.docs.forEach( doc =>{
                        if(doc.data().titulo.indexOf(pesquisa) >= 0)
                            listaEventos.push({id: doc.id,...doc.data()})                        
                    })
                    setEventos(listaEventos);
                });

        } else {

            firebase.firestore().collection('eventos').get()
                .then(resultado => {
                    
                    resultado.docs.forEach( doc =>{
                        if(doc.data().titulo)
                            if(doc.data().titulo.indexOf(pesquisa) >= 0)
                                listaEventos.push({id: doc.id,...doc.data()})                        
                    })
                    setEventos(listaEventos);
                });

        }
        
    });


    return(

        <div>

            <NavBar/>
            <div className="row p-3">                
                <h2>Eventos Publicados</h2>
                <input onChange={(e)=> setPesquisa(e.target.value)}
                    placeholder="Pesquisar evento pelo titulo..."
                    className="form-control text-center"/>
            </div>
            
            <div className="row p-3">
                {eventos.map(item => <EventoCard key={item.id}
                                                 id={item.id}
                                                 img={item.foto}
                                                 titulo={item.titulo}
                                                 detalhes={item.detalhe}
                                                 visualizacoes={item.visualizacoes}
                                                 />)}
            </div>

        </div>
        
    )
}

export default Home;