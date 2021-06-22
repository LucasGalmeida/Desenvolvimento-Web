import React, { useEffect, useState } from 'react';
import './editCategoriaForm.css';

function EditCategoriaForm(props){

    // const initialFormState = {codigo: null, nome:''}
    const [categoria, setCategoria] = useState(props.currentCategoria);

    useEffect(()=>{
        setCategoria(props.currentCategoria)
    },[props.currentCategoria])

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
                        props.updateCategoria(categoria.codigo, categoria);
                        setCategoria(props.currentCategoria);
                    }}>
           <label>Nome</label>
           <input type="text"
                  value={categoria.nome}
                  name="nome"
                  onChange={handleInputChange}/>
            <button>Atualizar categoria</button>
            <button onClick={() => props.setEditing(false)}>Cancelar</button>
       </form>
    )
}

export default EditCategoriaForm;
