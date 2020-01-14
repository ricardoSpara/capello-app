import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    TextInput,
    Image,
    ScrollView,
    ImageBackground,
    Alert
} from 'react-native';

//const url = "http://192.168.42.212:8000/api/v1/";

const url = "https://gugale.com.br/capello/public/api/v1/";

import AnimateLoadingButton from 'react-native-animate-loading-button';

//pegar a dimensao da tela
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BG_IMAGE = require('../images/bg1.jpg');


import { connect } from 'react-redux';
import { modificaEmail } from '../actions/AutenticacaoActions';
import { modificaSenha } from '../actions/AutenticacaoActions';
import { modificaIdUser, modificaNome, modificaImg, modificaDescricao } from '../actions/AutenticacaoActions';


import axios from 'axios';


class login extends Component {

    logar() {
        let email = this.props.email;
        let senha = this.props.senha;
        
        // if(email!="" & senha!=""
        
            axios.get(url+'users/'+email+'/'+senha)
            //axios.get(url + 'users/gabi.imbriani@hotmail.com/123456')
            //axios.get(url + 'users/ricardo.jrsparapan@gmail.com/123456')
            .then((response) => {
                if (response.data.success) {

                    this.props.modificaNome(response.data.data.name);
                    this.props.modificaDescricao(response.data.data.description);
                    this.props.modificaIdUser(response.data.data.id);
                    this.props.modificaImg(response.data.data.image);

                    this.props.navigation.navigate('home');
                    this.loadingButton.showLoading(false);

                }
                else {
                    Alert.alert(
                        'Atenção',
                        'Usuário ou senha inválidos.',
                        [
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ]
                      )
                    
                    this.loadingButton.showLoading(false);
                }
            })
            .catch((response) => {
                Alert.alert(
                    'Atenção',
                    'Ocorreu algum problema.',
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ]
                  )
                this.loadingButton.showLoading(false);
            });
        // }
        // else{
        //     alert("Preencha todos os campos");
        //     return false;
        // }

    }


    _onPressHandler() {

        this.loadingButton.showLoading(true);
        // mock
        this.logar();
  
    }


    render() {
        return (
            <ImageBackground
                source={BG_IMAGE}
                style={styles.bgImage}
            >
                <View style={styles.container}>

                    <StatusBar backgroundColor='black' />

                    <View style={{ alignItems: 'center' }}>
                        <Image source={require('../images/logo.png')} style={{ width: 200, height: 60 }} />
                    </View>

                    <View style={styles.viewCima}>
                        <TextInput style={styles.input}
                            underlineColorAndroid="#708090"
                            placeholder="Email"
                            placeholderTextColor="white"
                            autoCapitalize="none"
                            onChangeText={(texto) => { this.props.modificaEmail(texto) }} />
                    </View>

                    <View style={styles.viewBaixo}>

                        <TextInput style={styles.input}
                            underlineColorAndroid="#708090"
                            placeholder="Senha"
                            placeholderTextColor="white"
                            autoCapitalize="none"
                            secureTextEntry
                            onChangeText={(texto) => { this.props.modificaSenha(texto) }} />

                        <View style={{ marginTop: 25 }}>

                            <AnimateLoadingButton
                                ref={c => (this.loadingButton = c)}
                                width={300}
                                height={40}
                                title="Entrar"
                                borderRadius={30}
                                titleFontSize={16}
                                titleColor="rgb(255,255,255)"
                                backgroundColor="#1E90FF"
                                onPress={this._onPressHandler.bind(this)}
                            />

                        </View>

                        <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>

                            <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: 'white' }}>Não tem um cadastro?</Text>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('register'); }}>
                                    <Text style={{ color: '#1E90FF' }}>   Cadastre-se!</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>
            </ImageBackground>
        );

    }

}


// tras os states do reducer autenticação
const mapStateToProps = state => (
    {
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        id_user: state.AutenticacaoReducer.id_user,
        nome: state.AutenticacaoReducer.nome
    }
);

//exporta o componente e mapeia com os estados a variavel login no  value da cada campo
export default connect(mapStateToProps, {modificaDescricao, modificaEmail, modificaIdUser, modificaSenha, modificaNome, modificaImg })(login);

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tinput: {
        color: 'white'
    },
    input: {
        margin: 15,
        height: 40,
        color: 'white'
    },
    viewCima: {
        flex: 1,
        width: 300,
        justifyContent: 'flex-end'
    },
    viewBaixo: {
        marginTop: 20,
        flex: 2,
        width: 300,
    },
    button: {
        backgroundColor: '#1E90FF',
        borderRadius: 6,
        marginTop: 20,
        height: 56,
    },
    buttonContainer: {
        backgroundColor: '#1E90FF',
        paddingVertical: 15,
        height: 40,
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    }
});

