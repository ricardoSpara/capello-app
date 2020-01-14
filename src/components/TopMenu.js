import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';

const urlimg="https://gugale.com.br/capello/public/storage/users/";


const uri = require('../images/user.jpeg');

const styles = StyleSheet.create({
    TopMenu:{
      flex:1,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        flex: 1,
      },
    name: {
        flex:1,
        color:'white',
        position: 'absolute',
        left: 65,
        top: 20,
        fontSize: 22,
    },
  });


class TopMenu extends Component{

    constructor(props){
        super(props);
        this.state={
            uri:urlimg+this.props.img
        }
    }

    tira_nome(nome){

        primeiro_nome = nome.replace(/\s.*/, '');
        return primeiro_nome;

    };

    componentWillMount(){
        if(this.props.img==null){

            this.setState({uri:'https://gugale.com.br/capello/public/img/profile.png'});
        
          }
    }    
    
    render(){
        return(
            <View style={styles.topMenu}>
            <Image
            style={styles.avatar}
            source={ {uri: this.state.uri} }
            />
            <Text style={styles.name}>{this.tira_nome(this.props.nome)}</Text>
            </View>
        );
    }    
}


// tras os states do reducer autenticação
const mapStateToProps = state => (
    {
        nome:state.AutenticacaoReducer.nome,
        img:state.AutenticacaoReducer.img,
    }
);

//exporta o componente e mapeia com os estados a variavel login no  value da cada campo
export default connect(mapStateToProps, null)(TopMenu);
