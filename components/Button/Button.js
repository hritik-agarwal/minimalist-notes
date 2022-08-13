import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './Button.css';

const Button = props => {
  const {title, onPress, disabled} = props;
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      disabled={disabled}
      onPress={onPress}>
      <Text style={[styles.title, disabled ? {color: 'grey'} : null]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
