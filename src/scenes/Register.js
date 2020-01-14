import React, { Component } from 'react';
import { Icon } from 'react-native-elements';

import AnimateLoadingButton from 'react-native-animate-loading-button';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    TextInput,
    ScrollView,
    ImageBackground,
    Alert
} from 'react-native';

//const url="http://192.168.42.212:8000/api/v1/";

const url = "https://gugale.com.br/capello/public/api/v1/";

//pegar a dimensao da tela
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BG_IMAGE = require('../images/register.jpg');

import { connect } from 'react-redux';
import { modificaEmail } from '../actions/AutenticacaoActions';
import { modificaNome } from '../actions/AutenticacaoActions';
import { modificaSenha } from '../actions/AutenticacaoActions';
import { modificaConfirmaSenha } from '../actions/AutenticacaoActions';
import axios from 'axios';


class registrar extends Component {

    registrar() {

        let email = this.props.email;
        let nome = this.props.nome;
        let senha = this.props.senha;
        let confirmaSenha = this.props.confirmaSenha;

        if (senha != "" && nome != "" && email != "" && confirmaSenha != "") {

            if (senha != confirmaSenha) {
                this.loadingButton.showLoading(false);
                Alert.alert(
                    'Atenção',
                    'As senhas são diferentes.',
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ]
                  )
                return false;
            }
            else {
                console.log(url + 'users/' + email + '/' + senha + '/' + nome);
                axios.get(url + 'users/' + email + '/' + senha + '/' + nome)
                    .then((response) => {

                        if (response.data.success) {
                           
                                this.props.navigation.navigate('login');
                                this.loadingButton.showLoading(false);

                                Alert.alert(
                                    'Sucesso',
                                    'Cadastrado com sucesso.',
                                    [
                                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                                    ]
                                  )
                                
                                
                            
                        } else {

                            if(response.data.response){
                                Alert.alert(
                                    'Atenção',
                                    'Este email já foi utilizado.',
                                    [
                                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                                    ]
                                  )
                                this.loadingButton.showLoading(false);
                            }

                            this.loadingButton.showLoading(false);
                        }

                    })
                    .catch((response) => {
                        this.loadingButton.showLoading(false);

                        Alert.alert(
                            'Atenção',
                            'Ocorreu algum problema.',
                            [
                              {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ]
                          )

                        
                    });

            }

        } else {
            this.loadingButton.showLoading(false);
            Alert.alert(
                'Atenção',
                'Preencha todos os campos.',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ]
              )
            return false;
        }

        //Actions.login();
    }

    _onPressHandler() {
        this.loadingButton.showLoading(true);
        // mock
        setTimeout(() => {

            this.registrar();

        }, 1000);
    }


    render() {

        return (
            <ImageBackground
                source={BG_IMAGE}
                style={styles.bgImage}
            >
                <View style={{ flex: 1, backgroundColor: 'transparent', }}>
                    <View style={{ flex: 1, backgroundColor: 'transparent', width: SCREEN_WIDTH }}>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.pop() }}
                            style={styles.position}>
                            <Icon
                                name='keyboard-backspace'
                                color='white'
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <ScrollView>
                            <StatusBar backgroundColor='black' />

                            <View style={{ alignItems: 'center', marginTop: 0 }}>
                                <Text style={{ fontSize: 35, color: 'white' }}>Crie sua conta</Text>
                            </View>

                            <View style={styles.viewCima}>
                                <TextInput style={styles.input}
                                    underlineColorAndroid="#708090"
                                    placeholder="Nome"
                                    placeholderTextColor="white"
                                    autoCapitalize="none"
                                    onChangeText={(texto) => { this.props.modificaNome(texto) }} />

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


                                <TextInput style={styles.input}
                                    underlineColorAndroid="#708090"
                                    placeholder="Confirma senha"
                                    placeholderTextColor="white"
                                    autoCapitalize="none"
                                    secureTextEntry
                                    onChangeText={(texto) => { this.props.modificaConfirmaSenha(texto) }} />


                                <View style={{ marginTop: 25 }}>

                                    <AnimateLoadingButton
                                        ref={c => (this.loadingButton = c)}
                                        width={300}
                                        height={40}
                                        title="Confirmar"
                                        borderRadius={30}
                                        titleFontSize={16}
                                        titleColor="rgb(255,255,255)"
                                        backgroundColor="#1E90FF"
                                        onPress={this._onPressHandler.bind(this)}
                                    />

                                </View>

                            </View>
                        </ScrollView>
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
        confirmaSenha: state.AutenticacaoReducer.confirmaSenha,
        nome: state.AutenticacaoReducer.nome
    }
);

//exporta o componente e mapeia com os estados a variavel login no  value da cada campo
export default connect(mapStateToProps, { modificaEmail, modificaSenha, modificaConfirmaSenha, modificaNome })(registrar);

const styles = StyleSheet.create({
    container: {
        flex: 9,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    },
    position: {
        position: 'absolute',
        padding: 10,
    },
    bgImage: {
        flex: 1,
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
        marginTop: 100,
        flex: 1,
        width: 300,
        justifyContent: 'flex-end'
    },
    viewBaixo: {
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

