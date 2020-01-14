import React,{ Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';

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

export default class TopProfile extends Component{
    render(){
        return(
            <View style={styles.topMenu}>
            <Text>teste</Text>
            </View>
        );
    }
    
}
