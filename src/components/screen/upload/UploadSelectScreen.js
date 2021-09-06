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

const UploadSelectScreen = () => {
  

  const renderItem = ({ item }) => {
    return (
        <View style={{flex: 1}}>
          <TouchableHighlight
              style={styles.touchArea}
              key={item.photoId}
              onPress={() =>
                  navigation.navigate('PhotoDetail', { photoId: item.photoId })
              }
          >
            <Image
                source={{uri: item.thumbnailLink}}
                style={styles.thumbnail}
            />
          </TouchableHighlight>
        </View>
    )
  };
   
  return (
     <View><Text>hi</Text></View>
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
