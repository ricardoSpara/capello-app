import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Rotas from './src/Rotas';

import reducers from './src/reducers/Index';

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>

          <Rotas/>
          
      </Provider>
    );
  }
}
