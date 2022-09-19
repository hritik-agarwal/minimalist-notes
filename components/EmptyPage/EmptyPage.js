import {View, Image, Text} from 'react-native';
import React from 'react';
import {styles} from './EmptyPage.css';

const EmptyPage = props => {
  const {title} = props;
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={{width: 100, height: 100, tintColor: 'gray'}}
          source={require('./../../src/images/icons/panda.png')}
        />
        <Text style={{color: 'grey', fontSize: 18, padding: 10}}>{title}</Text>
      </View>
    </View>
  );
};

export default EmptyPage;
