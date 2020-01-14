import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Alert, Image, ScrollView, Dimensions, TouchableOpacity, StatusBar, FlatList, ActivityIndicator, Picker
} from 'react-native';

import { Button, Card, Icon, SearchBar, Avatar } from 'react-native-elements';

import AnimateLoadingButton from 'react-native-animate-loading-button';

const url = "https://gugale.com.br/capello/public/api/v1/";

const urlimg = "https://gugale.com.br/capello/public/storage/users/";

import { modificaIdProjetoSelected, modificaIdUserSelected } from '../actions/AutenticacaoActions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

import { connect } from 'react-redux';

const IMAGE_SIZE = SCREEN_WIDTH - 80;

class projetos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projetos: [],
            loading: true,
            string_pesquisa: '',
            page: 1
        }

    }

    scene(id) {

        this.props.modificaIdUserSelected(id);

        this.props.navigation.navigate('userSelected');

    }

    componentWillMount() {

        return fetch(url + 'usersFind/show')
            .then((response) => response.json())
            .then((responseJson) => {

                console.log(responseJson.response);

                this.setState({
                    dataSource: responseJson.response,
                    loading: false,

                }, function () {
                });

            })
            .catch((error) => {

            });

    }

    pesquisar() {

        return fetch(url + 'usersFind/show/name/' +  this.state.string_pesquisa + '?page=' + this.state.page)
            .then((response) => response.json())
            .then((responseJson) => {

                this.loadingButton.showLoading(false);

                if (responseJson.response != "") {

                    this.setState({
                        dataSource: responseJson.response,
                        loading: false
                    }, function () {
                    });

                } else {

                    Alert.alert(
                        'Atenção',
                        'Nenhum aluno foi encontrado',
                        [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ]
                    )
                }

            })
            .catch((error) => {
                this.loadingButton.showLoading(false);
                this.setState({ loading: false });
            });

    }

    _onPressHandler() {
        if (this.state.string_pesquisa != '') {
            this.loadingButton.showLoading(true);

            setTimeout(() => {

                this.pesquisar();

            }, 1000);

        }
    }

    render() {
        if (this.state.loading) {

            return (
                <View style={{ flex: 1 }}>
                    <StatusBar
                        barStyle="light-content"
                    />

                    <View style={{ flex: 1, backgroundColor: 'white' }}>
                        <View style={{ width: "100%" }}>

                            <View style={{ backgroundColor: '#1E90FF' }}>

                                <TouchableOpacity
                                    onPress={() => { this.props.navigation.pop() }}
                                    style={styles.back}>
                                    <Icon
                                        name='keyboard-backspace'
                                        color='white'
                                    />
                                </TouchableOpacity>

                            </View>


                        </View>

                        <ScrollView style={{ flex: 1, }}>

                            <View style={{ flex: 1, height: 500, width: '100%' }}>

                                <View>
                                    <SearchBar
                                        noIcon
                                        lightTheme
                                        round
                                        onChangeText={(string_pesquisa) => { this.setState({ string_pesquisa }) }}
                                        onClearText={() => { }}
                                        placeholder='Digite algo...' />
                                </View>

                                <ActivityIndicator
                                    size="large" color="#1E90FF"
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center'
                                    }}></ActivityIndicator>

                            </View>

                        </ScrollView>

                        <View style={{ paddingBottom: 10, paddingTop: 5 }}>

                            <AnimateLoadingButton
                                ref={c => (this.loadingButton = c)}
                                width={300}
                                height={40}
                                title="Pesquisar"
                                borderRadius={30}
                                titleFontSize={16}
                                titleColor="rgb(255,255,255)"
                                backgroundColor="#1E90FF"
                                onPress={this._onPressHandler.bind(this)}
                            />

                        </View>

                    </View>
                </View>
            );

        }

        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    barStyle="light-content"
                />

                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={{ width: "100%" }}>

                        <View style={{ backgroundColor: '#1E90FF' }}>
                            <TouchableOpacity
                                onPress={() => { this.props.navigation.pop() }}
                                style={styles.back}>
                                <Icon
                                    name='keyboard-backspace'
                                    color='white'
                                />
                            </TouchableOpacity>

                        </View>


                    </View>

                    <ScrollView style={{ flex: 1 }}>

                        <View>

                            <SearchBar
                                lightTheme
                                round
                                noIcon
                                onChangeText={(string_pesquisa) => { this.setState({ string_pesquisa }) }}
                                onClearText={() => { }}
                                placeholder='Digite algo...' />

                        </View>

                        <FlatList
                            data={this.state.dataSource}
                            //keyExtractor={item => item.id}
                            renderItem={({ item }) => {

                                

                                if(item.image==null){
                                    urlimage="https://gugale.com.br/capello/public/img/profile.png";
                                  }else{
                                    urlimage=urlimg + item.image;
                                  }

                                return (
                                    <TouchableOpacity onPress={() => { this.scene(item.id) }}>

                                        <View style={styles.alunos}>

                                            <Avatar
                                                medium
                                                rounded
                                                source={{ uri: urlimage }}
                                                onPress={() => {}}
                                                activeOpacity={0.7}
                                            />

                                            <View style={{ width: '82%' }}>

                                                <Text style={{ marginLeft: 10,fontWeight: 'bold', color:'black' }}>{item.name}</Text>

                                            </View>

                                            {/* <Icon
                                                name='keyboard-arrow-right'
                                                color='#1E90FF' /> */}

                                        </View>

                                    </TouchableOpacity>
                                );
                            }}
                        />

                    </ScrollView>

                    <View style={{ paddingBottom: 10, paddingTop: 5 }}>

                        <AnimateLoadingButton
                            ref={c => (this.loadingButton = c)}
                            width={300}
                            height={40}
                            title="Pesquisar"
                            borderRadius={30}
                            titleFontSize={16}
                            titleColor="rgb(255,255,255)"
                            backgroundColor="#1E90FF"
                            onPress={this._onPressHandler.bind(this)}
                        />

                    </View>

                </View>
            </View>
        );
    }
}


// tras os states do reducer autenticação
const mapStateToProps = state => (
    {
        id_projetoSelected: state.AutenticacaoReducer.id_projetoSelected,
    }
);

//exporta o componente e mapeia com os estados a variavel login no  value da cada campo
export default connect(mapStateToProps, { modificaIdProjetoSelected, modificaIdUserSelected })(projetos);


const styles = StyleSheet.create({
    alunos: {
        alignItems: 'center',
        width: '95%',
        height: 40,
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        // borderColor: '#1E90FF',
        // borderWidth: 1
    },
    navBar: {
        backgroundColor: '#1E90FF',
        height: 60,
        justifyContent: 'center',
        alignContent: 'center'
    },
    nameHeader: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center'
    },
    back: {
        width: 25,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        alignItems: 'flex-start'
    },
    infoTypeLabel: {
        fontSize: 15,
        textAlign: 'right',
        color: 'rgba(126,123,138,1)',
        fontFamily: 'regular',
        paddingBottom: 10,
    },
    infoAnswerLabel: {
        fontSize: 15,
        color: 'white',
        fontFamily: 'regular',
        paddingBottom: 10,
    },
    buttonContainer: {
        width: '90%',
        borderRadius: 30,
        backgroundColor: '#00aced',
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