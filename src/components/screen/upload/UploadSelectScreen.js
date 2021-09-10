import React, {useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    TouchableHighlight,
    View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';
import { Button } from 'react-native';

const UploadSelectScreen = () => {
  const navigation = useNavigation();

  const openGoogleDrive = () => {
    console.log('hi');
    navigation.navigate('GooglePicker');
  }

  return (
     <View>
       <Button title='upload from gallery'></Button>
       <Button title='upload from google drive' onPress={openGoogleDrive}></Button>
     </View>
  );
}

const styles = StyleSheet.create({
  scrollBox: {
    width: '100%',
    height: '100%',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  touchArea: {
    height: 140,
    position: 'relative',
  },
});

export default UploadSelectScreen;
