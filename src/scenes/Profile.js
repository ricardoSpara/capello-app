import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity, StatusBar, ActivityIndicator
} from 'react-native';
import { Button, Icon } from 'react-native-elements';



const urlimg = "https://gugale.com.br/capello/public/storage/users/";


import ProjetosUser from '../components/ProjetosUser';
import { connect } from 'react-redux';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const IMAGE_SIZE = SCREEN_WIDTH - 80;

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      uri: urlimg + this.props.img
    };

  }

  componentWillMount() {
    if (this.props.img == null) {

      this.setState({ uri: 'https://gugale.com.br/capello/public/img/profile.png' });

    }

  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
        />

        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{backgroundColor:'#1E90FF'}}>
            <TouchableOpacity
              onPress={() => { this.props.navigation.pop() }}
              style={styles.back}>
              <Icon
                name='keyboard-backspace'
                color='white'
              />
            </TouchableOpacity>

          </View>

          <ScrollView style={{ flex: 1 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
              <Image
                source={{ uri: this.state.uri }}
                style={{ width: IMAGE_SIZE, height: IMAGE_SIZE, borderRadius: 10 }}
              />
            </View>

            <View style={{ alignContent: 'center', alignSelf: 'center', alignItems: 'center' }}>


            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, marginHorizontal: 40, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ flex: 1, fontSize: 26, color: 'black', fontFamily: 'bold' }}>
                {this.props.nome}
              </Text>
            </View>


            <View style={{ flex: 1, marginTop: 20, width: SCREEN_WIDTH - 80, marginLeft: 40 }}>
              <Text style={{ flex: 1, fontSize: 15, color: 'black', fontFamily: 'regular' }}>
                {this.props.descricao}
                </Text>
            </View>

            <View style={{ flex: 1, marginTop: 30 }}>
              <Text style={{ flex: 1, fontSize: 15, color: '#1E90FF', fontFamily: 'regular', marginLeft: 40 }}>
                Projetos:
                </Text>
              <View style={{ margin: 10 }}>

                <ProjetosUser nav={this.props.navigation} />
              </View>
            </View>

          </ScrollView>
        </View>
      </View>
    );
  }
}


// tras os states do reducer autenticação
const mapStateToProps = state => (
  {
    id_user: state.AutenticacaoReducer.id_user,
    nome: state.AutenticacaoReducer.nome,
    img: state.AutenticacaoReducer.img,
    descricao: state.AutenticacaoReducer.descricao,
  }
);

//exporta o componente e mapeia com os estados a variavel login no  value da cada campo
export default connect(mapStateToProps, null)(Profile);

const styles = StyleSheet.create({
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
    margin: 10,
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
  }
});