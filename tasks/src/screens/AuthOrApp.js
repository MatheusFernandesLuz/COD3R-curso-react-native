import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import axios from 'axios';
import AsyncStore from '@react-native-community/async-storage';

export default class AuthOrApp extends Component {
  componentDidMount = async () => {
    const userDateJson = await AsyncStore.getItem('userData');
    let userData = null;

    try {
      userData = JSON.parse(userDateJson);
    } catch (err) {}

    if (userData && userData.token) {
      axios.defaults.headers.common['Authorization'] = `bearer ${
        userData.token
      }`;
      this.props.navigation.navigate('Home', userData);
    } else {
      this.props.navigation.navigate('Auth');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
