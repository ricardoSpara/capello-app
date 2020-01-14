const INITIAL_STATE = {
    email:'',
    senha:'',
    confirmaSenha:'',
    nome:'',
    id_user:'',
    id_projetoSelected:'',
    img:'',
    descricao:'',
    id_userSelected:''
};

export default (state = INITIAL_STATE, action)=>{
    //console.log(action);
    if(action.type==='modifica_email'){
        return { ...state, email: action.payload}
    }
    if(action.type==='modifica_senha'){
        return { ...state, senha: action.payload}
    }
    if(action.type==='modifica_nome'){
        return { ...state, nome: action.payload}
    }
    if(action.type==='modifica_confirmaSenha'){
        return { ...state, confirmaSenha: action.payload}
    }
    if(action.type==='modifica_idUser'){
        return { ...state, id_user: action.payload}
    }
    if(action.type==='modifica_idProjetoSelected'){
        return { ...state, id_projetoSelected: action.payload}
    }
    if(action.type==='modifica_img'){
        return { ...state, img: action.payload}
    }
   
    if(action.type==='modifica_descricao'){
        return { ...state, descricao: action.payload}
    }

    if(action.type==='modifica_idUserSelected'){
        return { ...state, id_userSelected: action.payload}
    }

    return state;
}