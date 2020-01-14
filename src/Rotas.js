import React, { Component } from 'react';

import { Text, View } from 'react-native';


import { createStackNavigator } from 'react-navigation';


import Login from './scenes/Login';
import Home from './scenes/Home';
import Profile from './scenes/Profile';
import Register from './scenes/Register';
import Projetos from './scenes/Projetos';
import ProjetoSelected from './scenes/ProjetoSelected';
import Alunos from './scenes/Alunos';
import userSelected from './scenes/UserSelected';
import Ranking from './scenes/Ranking';


export default createStackNavigator({
  login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  alunos: {
    screen: Alunos,
    navigationOptions: {
      header: null
    }
  },
  profile: {
    screen: Profile,
    navigationOptions: {
      header: null
    }
  },
  projetos: {
    screen: Projetos,
    navigationOptions: {
      header: null
    }
  },
  register: {
    screen: Register,
    navigationOptions: {
      header: null
    }
  },
  projetoSelected: {
    screen: ProjetoSelected,
    navigationOptions: {
      header: null
    }
  },
  userSelected: {
    screen: userSelected,
    navigationOptions: {
      header: null
    }
  },
  ranking: {
    screen: Ranking,
    navigationOptions: {
      header: null
    }
  },
});

const Rotas = () => {
  return (
    <Router>
      <Stack key="root">
        <Scene key="login" hideNavBar="true" component={Login} initial />
        <Scene key="home" hideNavBar="true" component={Home} />
        <Scene key="profile" hideNavBar="true" component={Profile} />
        <Scene key="register" hideNavBar="true" component={Register} />
        <Scene key="projetos" hideNavBar="true" component={Projetos} />
        <Scene key="projetoSelected" hideNavBar="true" component={ProjetoSelected} />
      </Stack>
    </Router>
  );
}

//export default Rotas;
