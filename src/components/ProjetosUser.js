import React, { Component } from 'react';

import { Button, Card } from 'react-native-elements';

const url = "https://gugale.com.br/capello/public/api/v1/";

import {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
    FlatList,
    ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';

import { modificaIdProjetoSelected } from '../actions/AutenticacaoActions';

const uri = require('../images/user.jpeg');

const urlimg = "https://gugale.com.br/capello/public/storage/projects/";

const styles = StyleSheet.create({
    TopMenu: {
        flex: 1,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        flex: 1,
    },
    name: {
        flex: 1,
        color: 'white',
        position: 'absolute',
        left: 65,
        top: 20,
        fontSize: 22,
    },
});


class ProjetosUser extends Component {

    constructor(props) {

        super(props);

        this.state = {
            dataSource: [],
            loading: true,
            nada:true
        };

        //console.log(this.props);
    }


    componentWillMount() {

        return fetch(url + 'projects/user/' + this.props.id_user)
            .then((response) => response.json())
            .then((responseJson) => {


                x = new Array();
                x = responseJson.response;

                //console.log(x);

                if(responseJson.response!=""){
                    this.setState({
                        dataSource: x,
                        loading: false,
                        nada:false
                    }, function () {
                    });

                }else{
                    this.setState({loading:false})
                }


            })
            .catch((error) => {
                this.setState({ loading: false });
            });
    }

    scene(id) {

        this.props.modificaIdProjetoSelected(id);

        this.props.nav.navigate('projetoSelected', {
            urlproject: true
        });
    }



    render() {
        if (this.state.loading) {

            return (
                <View style={{ flex: 1 }}>

                    <View style={{ flex: 1, backgroundColor: 'white' }}>

                        <ActivityIndicator
                            size="large" color="#1E90FF"
                            style={{
                                flex: 1,
                                justifyContent: 'center'
                            }}></ActivityIndicator>


                    </View>
                </View>
            );

        }
        else if(this.state.nada){
            return(
                <View style={{flex:1, alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                    <Text style={{color:'black'}}>Você não possui nenhum projeto ainda :(</Text>
                </View>
            );
        }

        return (
            <View style={{ flex: 1 }}>

                <FlatList
                    data={this.state.dataSource}
                    //keyExtractor={item => item.id}
                    renderItem={({ item }) => {

                        if(item.image==null){
                            urlimage2="https://gugale.com.br/capello/public/img/no-project.png";
                        }else{
                            urlimage2=urlimg2 + item.image;
                        }

                        return (
                            <Card
                                title={item.title} image={{ uri: urlimage2 }}>
                                <Text style={{ marginBottom: 10 }}>
                                    {item.description}

                                </Text>
                                <Button
                                    backgroundColor='#1E90FF'
                                    fontFamily='Lato'
                                    onPress={() => { this.scene(item.project_id) }}
                                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                    title='Ver mais...' />
                            </Card>
                        );
                    }}
                />

            </View>
        );
    }

}

// tras os states do reducer autenticação
const mapStateToProps = state => (
    {
        id_user: state.AutenticacaoReducer.id_user,
        id_projetoSelected: state.AutenticacaoReducer.id_projetoSelected,
    }
);

//exporta o componente e mapeia com os estados a variavel login no  value da cada campo
export default connect(mapStateToProps, { modificaIdProjetoSelected })(ProjetosUser);
