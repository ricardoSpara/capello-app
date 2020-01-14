import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity, StatusBar, FlatList, ActivityIndicator
} from 'react-native';
import { Button, Icon, Card } from 'react-native-elements';

import { connect } from 'react-redux';

//const url = "http://192.168.42.212:8000/api/v1/";

const url = "https://gugale.com.br/capello/public/api/v1/";

//urlimg="https://gugale.com.br/capello/public/storage/users/";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const IMAGE_SIZE = SCREEN_WIDTH - 80;

import {  modificaIdUserSelected } from '../actions/AutenticacaoActions';

import ButtonLike from '../components/ButtonLike'

class ProjetoSelected extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      tags: [],
      users: [],
      courses: [],
      loading: true,
    }

  }

  

  componentDidMount() {

    if (this.props.navigation.getParam('urlproject')) {

      urlimg = "https://gugale.com.br/capello/public/storage/projects/";
    }
    else {
      urlimg = "https://gugale.com.br/capello/public/storage/projects/";

    }

    console.log(urlimg);

    return fetch(url + 'projects/show/' + this.props.id_projetoSelected+'/'+this.props.id_user)
      .then((response) => response.json())
      .then((responseJson) => {

        dados = new Array();
        dados[0] = responseJson.dados_projeto;

        tags = new Array();
        tags[0] = responseJson.tags_projeto;

        courses = new Array();
        courses[0] = responseJson.cursos_projeto;

        this.setState({
          dataSource: dados,
          tags: responseJson.tags_projeto,
          courses: responseJson.cursos_projeto,
          users: responseJson.users_projeto,
          like: responseJson.like,
          count_likes: responseJson.count_likes,
          loading: false
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
            <ScrollView style={{ flex: 1 }}>

              <View style={{ flex: 1, height: SCREEN_HEIGHT, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
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
          <ScrollView style={{ flex: 1 }}>

            <FlatList
              data={this.state.dataSource}
              renderItem={({ item }) => {

                if(item.image==null){
                  urlimage="https://gugale.com.br/capello/public/img/no-project.png";
                }else{
                  urlimage=urlimg2 + item.image;
                }

                return (
                  <Card
                    title={item.title} image={{ uri: urlimage }}>
                    <View style={{ padding: 10 }}>
                      <Text style={{ marginBottom: 10 }}>
                        {item.description}
                      </Text>

                      <Text style={{marginTop:10,color:'#1E90FF'}}>Tags do projeto:</Text>
                      <View style={{flexDirection:'row',marginTop:5}}>

                        {
                          this.state.tags.map((index) => (

                            <Text>{index.name} </Text>

                          ))
                        }
                      </View>


                      <Text style={{marginTop:10,color:'#1E90FF'}}>Cursos do projeto:</Text>
                      <View style={{flexDirection:'row',marginTop:5}}>
                        {
                          this.state.courses.map((index) => (

                            <Text>{index.name} </Text>

                          ))
                        }
                      </View>


                      <Text style={{marginTop:10,color:'#1E90FF'}}>Alunos do projeto:</Text>
                      <View style={{marginTop:5}}>
                        {
                          this.state.users.map((index) => (
                            <Text>{index.name} </Text>
                          ))
                        }
                      </View>

                      <Text style={{marginTop:10,color:'#1E90FF'}}>Total de likes:</Text>
                      <View style={{marginTop:5}}>
                        <Text>{this.state.count_likes}</Text>
                     </View>

                    </View>
                    <View style={{width:'100%'}}>
                    <ButtonLike user_id={this.props.id_user} project_id={this.props.id_projetoSelected}  projectlike={this.state.like}/>
                    </View>
                  </Card>
                );
              }}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}


// tras os states do reducer autenticação
const mapStateToProps = state => (
  {
    id_projetoSelected: state.AutenticacaoReducer.id_projetoSelected,
    id_user: state.AutenticacaoReducer.id_user,
  }
);

//exporta o componente e mapeia com os estados a variavel login no  value da cada campo
export default connect(mapStateToProps, {modificaIdUserSelected})(ProjetoSelected);

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