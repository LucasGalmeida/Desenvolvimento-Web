import axios from "axios";

const endPoint = axios.create({
    baseURL: "http://localhost:8080"
})

const API = {
    fetchCategoria: async (page, size, nome) =>{
        try{
            const query = (nome && nome !== "")
                            ? `categorias?page=${page}&size=${size}&nome=${nome}`
                            : `categorias?page=${page}&size=${size}`
            const response = await endPoint.get(query);

            return {
                dados: response.data.content,
                paginas: response.data.totalPages
            }

        } catch(error){
            return {
                dados: [],
                paginas: 0
            }
        }
    },
    addCategoria: async (categoria) =>{
        try{            
            const response = await endPoint.post("categorias/",{nome: categoria.nome});

            return {
                msg: "ok"
            }

        } catch(error){
            let msg = [];
            for (let m of error.response.data){
                msg.push(m.mensagemUsuario)
            }
            return {
                msgs: msg
            }
        }
    },
    updateCategoria: async (id, categoria) =>{
        try{            
            const response = await endPoint.put(`categorias/${id}`,{nome: categoria.nome});

            return {
                msg: "ok"
            }

        } catch(error){
            let msg = [];
            for (let m of error.response.data){
                msg.push(m.mensagemUsuario)
            }
            return {
                msgs: msg
            }
        }
    },
    deleteCategoria: async (id) =>{
        try{            
            const response = await endPoint.delete(`categorias/${id}`);

            return {
                msg: "ok"
            }

        } catch(error){
            let msg = [];
            for (let m of error.response.data){
                msg.push(m.mensagemUsuario)
            }
            return {
                msgs: msg
            }
        }
    }

}

export default () => API