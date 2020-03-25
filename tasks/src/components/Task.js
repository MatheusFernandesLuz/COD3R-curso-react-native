import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import commomStyes from '../commonStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import 'moment/locale/pt-br';

export default props => {
  let row;

  const doneOrNotStyle =
    props.doneAt != null ? {textDecorationLine: 'line-through'} : {};

  const date = moment(props.estimateAt)
    .locale('pt-br')
    .format('ddd, D [de] MMMM');

  const getRightContent = () => {
    return (
      <TouchableOpacity style={styles.right}>
        <Icon name="check" size={20} color="#fff" style={styles.doneIcon} />
      </TouchableOpacity>
    );
  };

  const getLeftContent = () => {
    return (
      <View style={styles.left}>
        <Icon name="trash" size={20} color="#fff" style={styles.excludeIcon} />
        <Text style={styles.excludeText}>Excluir</Text>
      </View>
    );
  };

  return (
    <Swipeable
      friction={0.85}
      ref={ref => (row = ref)}
      renderRightActions={getRightContent}
      renderLeftActions={getLeftContent}
      onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}
      onSwipeableRightOpen={() =>
        props.onToggleTask && props.onToggleTask(props.id)
      }
      onSwipeableOpen={() => row && row.close()}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)}>
          <View style={styles.checkContainer}>
            {getCheckView(props.doneAt)}
          </View>
        </TouchableWithoutFeedback>
        <View>
          <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

function getCheckView(doneAt) {
  if (doneAt != null) {
    return (
      <View style={styles.done}>
        <Icon name="check" size={15} color="#fff" />
      </View>
    );
  } else {
    return <View style={styles.pending} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: '#c9c9c9',
    borderBottomWidth: 0.5,
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  checkContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pending: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 0.8,
    borderColor: '#555',
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 13,
    backgroundColor: '#4D9525',
    alignItems: 'center',
    justifyContent: 'center',
  },
  desc: {
    fontFamily: commomStyes.fontFamily,
    color: commomStyes.colors.mainText,
    fontSize: 16,
  },
  date: {
    fontFamily: commomStyes.fontFamily,
    color: commomStyes.colors.subText,
    fontSize: 12,
  },
  right: {
    backgroundColor: '#009900',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  left: {
    flex: 1,
    backgroundColor: commomStyes.colors.today,
    flexDirection: 'row',
    alignItems: 'center',
  },
  excludeText: {
    fontFamily: commomStyes.fontFamily,
    color: '#fff',
    fontSize: 20,
    margin: 10,
  },
  excludeIcon: {
    marginLeft: 20,
  },
  doneIcon: {},
  doneText: {
    fontFamily: commomStyes.fontFamily,
    color: '#fff',
    fontSize: 20,
    margin: 10,
  },
});
