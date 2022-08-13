import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './EmptyPage.css';

const EmptyPage = props => {
  const {title} = props;
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default EmptyPage;
