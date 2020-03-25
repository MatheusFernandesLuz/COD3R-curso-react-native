import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import {Gravatar} from 'react-native-gravatar';
import commonStyles from '../commonStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

export default props => {
  const optionsGravatar = {
    email: props.navigation.getParam('email'),
    secure: true,
  };

  const logout = () => {
    delete axios.defaults.headers.common['Authorization'];
    AsyncStorage.removeItem('userData');
    props.navigation.navigate('AuthOrApp');
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.title}>Tarefas</Text>
        <Gravatar style={styles.avatar} options={optionsGravatar} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{props.navigation.getParam('name')}</Text>
          <Text style={styles.email}>{props.navigation.getParam('email')}</Text>
        </View>
      </View>
      <DrawerItems {...props} />
      <TouchableOpacity onPress={logout}>
        <View style={styles.logoutIcon}>
          <Icon name="sign-out" size={30} color="#800" />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  title: {
    color: '#000',
    fontFamily: commonStyles.fontFamily,
    fontSize: 30,
    paddingTop: 30,
    padding: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderWidth: 3,
    borderRadius: 30,
    margin: 10,
  },
  userInfo: {
    marginLeft: 10,
    alignItems: 'center',
  },
  name: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    color: commonStyles.colors.mainText,
    marginBottom: 5,
  },
  email: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.subText,
    marginBottom: 10,
  },
  logoutIcon: {
    marginVertical: 10,
    marginLeft: 15,
  },
});
