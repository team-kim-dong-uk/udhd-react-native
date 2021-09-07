import React, {useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotos } from '../core/redux/photos.js';
import { useInView } from 'react-intersection-observer';
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet, Text,
    TouchableHighlight,
    View
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import {StatusBar} from "expo-status-bar";

const mockData = [
    "지호",
    "지호123",
    "오마이걸",
    "옴걸",
    "오마이걸123123"
]
const SearchList = ({show}) => {

  const renderItem = ({ item }) => {
    return (
        <View style={{flex: 1}}>
            <Text>{item}</Text>
        </View>
    )
  };
  if(!show)
    return null;
  return (
      /*<View style={styles.scrollBox}>*/
        <FlatList
            data={mockData}
            renderItem={renderItem}
            keyExtractor={item => item}
            ListFooterComponent={<View style={{height: 65}}/>}
        />
      /*</View>*/
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

export default SearchList;
