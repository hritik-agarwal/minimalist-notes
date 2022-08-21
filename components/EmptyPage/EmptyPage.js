import {View, Image} from 'react-native';
import React from 'react';
import {styles} from './EmptyPage.css';

const EmptyPage = props => {
  const {title} = props;
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{width: 100, height: 100, tintColor: 'gray'}}
          source={require('./../../src/images/icons/panda.png')}
        />
      </View>
    </View>
  );
};

export default EmptyPage;
