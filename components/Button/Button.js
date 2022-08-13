import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './Button.css';

const Button = props => {
  const {title, onPress, disabled, styleContainer, styleText} = props;
  return (
    <TouchableOpacity
      style={[styles.container, styleContainer]}
      activeOpacity={0.6}
      disabled={disabled}
      onPress={onPress}>
      <Text
        style={[styles.title, disabled ? {color: 'grey'} : null, styleText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
