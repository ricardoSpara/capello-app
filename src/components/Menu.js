import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import { List, ListItem } from 'react-native-elements';

import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';

import TopMenu from './TopMenu';

const window = Dimensions.get('window');

const list = [
  {
    title: 'Perfil',
    icon: 'person',
    name: 'perfil',
  },
  {
    title: 'Projetos',
    icon: 'library-books'
  },
  {
    title: 'Alunos',
    icon: 'people',
  },
  {
    title: 'Ranking',
    icon: 'view-list',
  },
  {
    title: 'Sair',
    icon: 'subdirectory-arrow-left',
  },
]

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#1E90FF'
  },
  avatarContainer: {
    margin: 10,
  },
  item: {
    color: 'white',
    margin: 10,
    fontSize: 20,
    fontWeight: '300',
    paddingTop: 10,
  },
  TopMenu: {
    flex: 1,
  },
});

function scene(title,val) {

  if (title == "Perfil") {
    val.navigate('profile');
  }
  if (title == "Projetos") {
   val.navigate('projetos');
  }
  if (title == "Alunos") {
    val.navigate('alunos');
  }
  if (title == "Sair") {
    val.navigate('login');
  }
  if (title == "Ranking") {
    val.navigate('ranking');
  }
  

}

export default function Menu({ onItemSelected,val } ) {


  return (
    <View style={styles.menu}>
      <ScrollView scrollsToTop={false} >
        <View style={styles.avatarContainer}>
          <TopMenu />
        </View>

        <List >
          {
            list.map((item, i) => (

              <ListItem
                // let scene={item.title}
                containerStyle={{ paddingTop: 20, backgroundColor: 'white' }}
                onPress={() => {scene(item.title,val.navigation) }}//colocar actions corretas
                key={i}
                title={
                  <View>
                    <Text style={{ fontSize: 20 }}>{item.title}</Text>
                  </View>
                }
                leftIcon={{ name: item.icon }}
              />

            ))
          }
        </List>
        <View style={{ backgroundColor: 'white', flex: 1 }}>
        </View>
      </ScrollView>
    </View>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
