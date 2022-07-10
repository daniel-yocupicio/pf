import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import GoogleSVG from '../../assets/icons/google.svg';
import Icons from '../Icons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// navigation, nameScreen
const addUser = (user, changeLoading) => {
  firestore()
    .collection('usuarios')
    .add({
      correo: user.valuesRegister.email,
      nombre: user.valuesRegister.name,
      uid: auth().currentUser.uid,
    })
    .then(() => {
      changeLoading(false);
    });
};

//navigation, nameScreen
const registerEmailUser = (user, changeLoading) => {
  auth()
    .createUserWithEmailAndPassword(
      user.valuesRegister.email,
      user.valuesRegister.password,
    )
    .then(() => {
      addUser(user, changeLoading);
    })
    .catch(error => {
      changeLoading(false);
    });
};

// navigation, nameScreen
const validateData = (user, changeAlerts, changeLoading) => {
  const list = [false, false, false, false];
  const inputs = [
    {fun: user.validateName(user)},
    {fun: user.validateEmail(user)},
    {fun: user.validatePassword(user)},
    {fun: user.validatePassword2(user)},
  ];

  inputs.forEach((item, index) => {
    list[index] = item.fun;
  });
  changeAlerts(list);

  if (list.includes(true)) {
    changeLoading(false);
  } else {
    changeLoading(true);
    registerEmailUser(user, changeLoading);
  }
};

// navigation, nameScreen, isActive
export default function ButtonsForInit({user, changeAlerts, changeLoading}) {
  return (
    <View>
      <TouchableOpacity
        style={{
          ...styles.button1,
          ...(user.getBool() ? {} : {backgroundColor: '#B09AAC'}),
        }}
        onPress={() => validateData(user, changeAlerts, changeLoading)}>
        <Text style={styles.text1}>CREAR CUENTA</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2}>
        <Text style={styles.text2}>Ingresa con:</Text>
        <Icons IconProp={GoogleSVG} style={styles.google} />
      </TouchableOpacity>
    </View>
  );
}
