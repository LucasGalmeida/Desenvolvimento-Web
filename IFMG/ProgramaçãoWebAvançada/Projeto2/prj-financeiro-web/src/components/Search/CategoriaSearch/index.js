import React from 'react';
import './categoriaSearch.css';

function CategoriaSearch(props){

    function fetch(){
        props.fetchCategoria(0,5,props.nomeSearch);
    }

    return (
       <>
        <div className="searchContainer">
            <div className="inputSearchContainer">
                Buscar por nome:
                <input  type="text"
                        value={props.nomeSearch}
                        onChange={(e) =>{ props.setNomeSearch(e.target.value) }}></input>
            </div>
            <button onClick={fetch}>Filtrar</button>
        </div>
       </>
    )
}

export default CategoriaSearch;
