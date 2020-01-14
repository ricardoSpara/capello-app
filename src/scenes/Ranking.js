import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Alert, Image, ScrollView, Dimensions, TouchableOpacity, StatusBar, FlatList, ActivityIndicator, Picker
} from 'react-native';


import { Button, Card, Icon, SearchBar } from 'react-native-elements';

import AnimateLoadingButton from 'react-native-animate-loading-button';


//const url="http://192.168.42.212:8000/api/v1/";
const url = "https://gugale.com.br/capello/public/api/v1/";

urlimg2 = "https://gugale.com.br/capello/public/storage/projects/";

import { modificaIdProjetoSelected } from '../actions/AutenticacaoActions';

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

    this.props.modificaIdProjetoSelected(id);
    this.props.navigation.navigate('projetoSelected',
      {
        urlproject: false
      });
  }

  componentWillMount() {

    return fetch(url + 'projects/ranking')
      .then((response) => response.json())
      .then((responseJson) => {
        
        this.setState({
          dataSource: responseJson.response,
          loading: false,
          
        }, function () {
        });

      })
      .catch((error) => {

      });
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

                <ActivityIndicator
                  size="large" color="#1E90FF"
                  style={{
                    flex: 1,
                    justifyContent: 'center'
                  }}></ActivityIndicator>

              </View>

            </ScrollView>


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
          <View style={{  width: "100%"  }}>

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

            <FlatList
              data={this.state.dataSource}
              //keyExtractor={item => item.id}
              renderItem={({ item }) => {

                if(item.image==null){
                    urlimage="https://gugale.com.br/capello/public/img/no-project.png";
                }else{
                    urlimage=urlimg2 + item.image;
                }
                return (
                  <Card
                    title={item.title} image={{ uri: urlimage }}>
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

          </ScrollView>
          <View style={{marginTop:10}}>

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
export default connect(mapStateToProps, { modificaIdProjetoSelected })(projetos);


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