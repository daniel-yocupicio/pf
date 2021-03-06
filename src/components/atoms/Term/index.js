import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import CheckSVG from '../../../assets/icons/check.svg';

export default function Term({text, isSelect = false, change, term}) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={(x, y) => change(!isSelect, term)}
          style={{
            ...styles.touchable,
            ...(isSelect
              ? {backgroundColor: '#6FCF97'}
              : {backgroundColor: '#fff', borderWidth: 1}),
          }}>
          {isSelect ? <CheckSVG /> : null}
        </TouchableOpacity>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}
