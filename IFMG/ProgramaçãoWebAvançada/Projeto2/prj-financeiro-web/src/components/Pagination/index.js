import React, {useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import qs from 'query-string';

import './pagination.css';

function Pagination(props){

    let location = useLocation(); //Da acesso aos parametros da url
    const history = useHistory(); //Manipula a URL

    useEffect(() => {

        props.setActualPage(getCurrentPage() || 1);

    },[]);

    useEffect(() => {

        const queryParans = qs.parse(location.source);
        history.push({
            search: qs.stringify({
                ...queryParans,
                page: props.actualPage
            })
        })

    }, [props.actualPage]);

    function getCurrentPage(){
        const queryParans = qs.parse(location.source);
        const page = queryParans.page;
        return page ? Number(page) : undefined;
    }

    return (
       <>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '15px'}}>
                {
                Array(props.totalPages).fill('').map((_,index) => {
                    return  <button  key={index}
                                    disabled={index === (props.actualPage-1)}
                                    onClick={() => {
                                        props.setActualPage(index+1);
                                        props.fetchCategoria(index,5,props.nomeSearch);
                                    }}>
                                    {index+1}
                            </button>
                })
                }
            </div>
       </>
    )
}

export default Pagination;
