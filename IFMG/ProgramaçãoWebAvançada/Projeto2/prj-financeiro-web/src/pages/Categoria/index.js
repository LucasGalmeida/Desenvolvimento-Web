import React, { Fragment, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import './categoria.css';
import useCategAPI from '../../helpers/CategoriaApi';
import { toast } from 'react-toastify';
import Pagination from '../../components/Pagination';
import CategoriaTable from '../../components/Table/CategoriaTable';
import CategoriaSearch from '../../components/Search/CategoriaSearch';
import EditCategoriaForm from '../../components/Form/EditCategoriaForm';
import AddCategoriaForm from '../../components/Form/AddCategoriaForm';

function Categoria (){

    const apiCateg = useCategAPI();
    
    const inicialFromState = {codigo: null, nome: ''};

    const [categorias, setCategorias] = useState([]); // Vetor de categorias
    const [currentCategoria, setCurrentCategoria] = useState(inicialFromState); // Categoria atual
    const [editing, setEditing] = useState(false); // Usuario esta editando uma categoria
    const [refresh, setRefresh] = useState(false); // Precisa atualizar a página
    const [totalPages, setTotalPages] = useState(1); // Total de paginas
    const [actualPage, setActualPage] = useState(1); // Pagina atual
    const [nomeSearch, setNomeSearch] = useState("");

    

    useEffect(()=>{

        const getDados = async () => {
            const obj = await apiCateg.fetchCategoria(actualPage-1, 5, nomeSearch);
            if(obj){
                // console.log(obj)
                setCategorias(obj.dados)
                setTotalPages(obj.paginas)
                //console.log(JSON.stringify(categorias))
            }            
        }

        getDados();

    },[refresh])

    const addCategoria = async (categoria) => {
        const response = await apiCateg.addCategoria(categoria)

        if(response.msg){
            setRefresh(!refresh)
            toast.success('Registro salvo com sucesso!!!')
        } else {
            for (let m of response.msgs)
                toast.error(m)
        }
    }

    const updateCategoria = async (id, categoria) => {
        setEditing(false);
        const response = await apiCateg.updateCategoria(id, categoria)

        if(response.msg === "ok"){
            setRefresh(!refresh)
            toast.success('Registro alterado com sucesso!!!')
        } else {
            for (let m of response.msgs)
                toast.error(m)
        }
    }

    const deleteCategoria = async (id) => {
        setEditing(false);
        const response = await apiCateg.deleteCategoria(id)

        if(response.msg === "ok"){
            setRefresh(!refresh)
            toast.success('Registro removido com sucesso!!!')
        } else {
            for (let m of response.msgs)
                toast.error(m)
        }
    }
    
    const fetchCategoria = async (actualPage, size, nomeSearch) => {
        const obj = await apiCateg.fetchCategoria(actualPage, size, nomeSearch);
        if(obj){
            //console.log(obj)
            setCategorias(obj.dados)
            setTotalPages(obj.paginas)
            //console.log(JSON.stringify(categorias))
        }            
    }

    const editRow = (categoria) => {
        setEditing(true);
        setCurrentCategoria(categoria);
    }

    return (
        <>
            <Navbar/>
            <div className="container">
            <h1>Cadastro de categorias</h1>
            <div className="flex-row">
                <div className="flex-large">
                    {editing ? (
                        <Fragment>
                            <h2>Editar categoria</h2>
                            <EditCategoriaForm
                                editing={editing}
                                setEditing={setEditing}
                                currentCategoria={currentCategoria}
                                updateCategoria={updateCategoria}
                            />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <h2>Adicionar categoria</h2>
                            <AddCategoriaForm addCategoria={addCategoria} />
                        </Fragment>
                    )}
                </div>
                <div className="flex-large">
                    <h2>Categorias</h2>
                    <CategoriaSearch   nomeSearch={nomeSearch}
                                       setNomeSearch={setNomeSearch}
                                       fetchCategoria={fetchCategoria}/>
                    <CategoriaTable categorias={categorias} editRow={editRow} deleteCategoria={deleteCategoria} />
                    <Pagination fetchCategoria={fetchCategoria}
                                totalPages={totalPages}
                                actualPage={actualPage}
                                setActualPage={setActualPage}
                                nomeSearch={nomeSearch}/>
                </div>
            </div>
        </div>



        </>
    )
}

export default Categoria;