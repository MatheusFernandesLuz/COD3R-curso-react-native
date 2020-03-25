import React, {Component} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import commonStyles from '../commonStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/pt-br';

const initialState = {
  desc: '',
  date: new Date(),
  showDatePicker: false,
};

export default class AddTask extends Component {
  state = {
    ...initialState,
  };

  save = () => {
    const newTask = {
      desc: this.state.desc,
      date: this.state.date,
    };

    this.props.onSave && this.props.onSave(newTask);
    this.setState({...initialState});
  };

  getDatePicker = () => {
    let datePicker = (
      <DateTimePicker
        value={this.state.date}
        onChange={(_, date) => this.setState({date, showDatePicker: false})}
        mode={'date'}
      />
    );

    const dateString = moment(this.state.date)
      .locale('pt-br')
      .format('ddd, D [de] MMMM [de] YYYY');

    if (Platform.OS === 'android') {
      datePicker = (
        <View>
          <TouchableOpacity
            onPress={() => this.setState({showDatePicker: true})}>
            <Text style={styles.date}>{dateString}</Text>
          </TouchableOpacity>
          {this.state.showDatePicker && datePicker}
        </View>
      );
    }
    return datePicker;
  };

  render() {
    return (
      <Modal
        transparent={false}
        visible={this.props.isVisible}
        onRequestClose={this.props.onCancel}
        animationType="fade">
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              returnKeyType="go"
              style={styles.input}
              autoFocus
              placeholder="Descrição"
              onChangeText={desc => this.setState({desc})}
              value={this.state.desc}
            />
            {this.getDatePicker()}
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={this.props.onCancel}>
              <Text style={styles.button}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.save}>
              <Text style={styles.button}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    alignSelf: 'center',
    width: '90%',
    height: '50%',
    marginTop: '20%',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  form: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 55,
  },
  button: {
    fontSize: 16,
    color: commonStyles.colors.today,
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 25,
    fontWeight: 'bold',
    height: 60,
    margin: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#c4c4c4',
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    margin: 20,
  },
});
