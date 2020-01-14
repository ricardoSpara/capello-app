import React, { Component } from 'react';

import { Header, Icon, Card } from 'react-native-elements';

import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import SideMenu from 'react-native-side-menu';
import Menu from '../components/Menu';

const SCREEN_WIDTH = Dimensions.get('window').width;
const teste = SCREEN_WIDTH / 2.4;

//const image = require('../images/login2.jpeg');

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    padding: 10,
  },
  header: {
    backgroundColor: '#1E90FF',
    height: 60,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignContent: 'center'
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  views:{ 
    flex: 1, 
    marginTop: 25, 
    marginHorizontal: 40,
    alignItems: 'center'
  },
  textBox:{ 
    fontSize: 20, 
    color: '#1E90FF', 
    fontFamily: 'bold', 
    textAlign: 'center' 
  },
  textConteudo:{
    textAlign:'justify',    
    color: 'black',
    justifyContent:'center'
  },
  imageProp:{
    width: 150, 
    height: 150
  },
  headerText: {
    fontSize: 20,
    marginLeft: teste,
    color: 'white',
  },
  bootom:{
    paddingBottom:20
  }
});

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'About',
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    });

  render() {

    const menu = <Menu onItemSelected={this.onMenuItemSelected} val={this.props}/>;

    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={this.toggle}
            style={styles.button}
          >
            <Icon name='menu' color='white' />
          </TouchableOpacity>
          <Text style={styles.headerText}>Home</Text>
        </View>

        <View style={styles.container}>
        <ScrollView>
      <View style={styles.container}>

        <View style={{flex: 1}}>
            <View style={{alignItems:'center', justifyContent:'center'}} >
              <Image source={require('../images/cti.jpg')} style={{width: SCREEN_WIDTH, height: 150}} />
            </View>
          <View style={styles.views}>

          <Image source={require('../images/textomedio.png')} style={{width: SCREEN_WIDTH, height: 160,margin:10}} />

          </View>
        </View>
        
        <View style={{marginTop:20}}>
            <Text style={styles.textBox}>
              Cursos
            </Text>
        </View>
        
        <View style={{flex: 1}}>
          <View style={styles.views}>
            <Image source={require('../images/informatica.png')} 
                style={{width: 150, height: 150 }} borderRadius={75} />
          </View>
        <View style={styles.views}>
          <Text style={styles.textBox}>
            Informática
          </Text>

          <Image source={require('../images/textoinformatica.png')} style={{width: SCREEN_WIDTH-20, height: 160,margin:10}} />
        
        </View>
      </View>
      
        <View style={{flex: 1}}>
        <View style={styles.views}>
            <Image source={require('../images/eletronica.png')} 
                  style={{width: 150, height: 150 }} borderRadius={75} />
        </View>
        <View style={styles.views}>
          <Text style={styles.textBox}>
            Eletrônica
          </Text>

          <Image source={require('../images/textoeletronica.png')} style={{width: SCREEN_WIDTH-20, height: 160, margin:10}} />
        
        </View>
        </View>

        <View style={{flex: 1}}>
          <View style={styles.views}>
            <Image source={require('../images/mecanica.png')} 
                  style={styles.imageProp} borderRadius={75} />
          </View>
          <View style={styles.views}>
         
            <Text style={styles.textBox}>
              Mecânica
            </Text> 

            <Image source={require('../images/textomecanica.png')} style={{width: SCREEN_WIDTH-20, height: 160, margin:10}} />

            
        </View>
        </View>

      </View>
      </ScrollView>
        </View>
      </SideMenu>
    );
  }
}
