import React from 'react';
import './categoriaTable.css';

function CategoriaTable(props){
    return (
       <table>
           <thead>
                <tr>
                    <th> Nome </th>
                    <th> Ações </th>
                </tr>
           </thead>
           <tbody>
                {
                    props.categorias.length > 0 ? (
                        props.categorias.map(categoria => (
                            <tr key={categoria.codigo}>
                                <td>{categoria.nome}</td>
                                <td>
                                    <button 
                                            onClick={() => {props.editRow(categoria)}}>Editar</button>
                                    <button 
                                            onClick={() => {props.deleteCategoria(categoria.codigo)}}>Remover</button>
                                </td>
                            </tr>
                        ))
                    )
                    :
                    (
                        <tr>
                            <td colSpan={2}>Não existem dados cadastrados</td>
                        </tr>
                    )
                }
           </tbody>
       </table>
    )
}

export default CategoriaTable;
