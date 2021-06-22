import React, { useState } from 'react';
import './addCategoriaForm.css';

function AddCategoriaForm(props){

    const initialFormState = {codigo: null, nome:''}
    const [categoria, setCategoria] = useState(initialFormState);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setCategoria({
            ...categoria,
            [name]:value
        })
    }

    return (
       <form onSubmit={ event => {
                        event.preventDefault();
                        if (!categoria.nome) return;
                        props.addCategoria(categoria);
                        setCategoria(initialFormState);
                    }}>
           <label>Nome</label>
           <input type="text"
                  value={categoria.nome}
                  name="nome"
                  onChange={handleInputChange}/>
            <button type="submit">Adicionar nova categoria</button>
       </form>
    )
}

export default AddCategoriaForm;
