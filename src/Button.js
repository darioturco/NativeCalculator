import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Button(props) {
  return (
    <TouchableOpacity style={getStyle(props.style)} onPress={props.onPress}>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
}

function getStyle(style){
  return (style == undefined) ? styles.default : style;
}

const styles = StyleSheet.create({
  default: {
    width: '50px',
    height: '50px',
    backgroundColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
  }
});