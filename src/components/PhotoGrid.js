import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotos } from '../core/redux/photos.js';
import { useInView } from 'react-intersection-observer';
import { Image, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

// TODO 3XN 구현하기
const PhotoGrid = () => {
  const dispatch = useDispatch();
  const { auth, photos, loading } = useSelector(state => state);
  const navigation = useNavigation();

  const {ref, inView} = useInView();
  useEffect(() => {
    // if (inView && auth.data) {
    //   if (photos.data.length == 0) {
    //     dispatch(getPhotos.request({userId: auth.data?.userId}));
    //   } else {
    //     dispatch(getPhotos.request({
    //       userId: auth.data?.userId,
    //       findAfter: photos.data[photos.data.length - 1].photoId,
    //     }));
    //   }
    // }
    if (photos.data.length == 0) {
      dispatch(getPhotos.request({userId: auth.data?.userId}));
    }
  // }, [inView, dispatch, auth, photos])
  }, [])

  return (
      <View style={styles.scrollBox}>
      <ScrollView>
          {photos.data.map(photo => (
            <TouchableHighlight
              style={styles.touchArea}
              key={photo.photoId}
              onPress={() =>
                navigation.navigate('PhotoDetail', { photoId: photo.photoId })
              }
            >
              <Image
                source={{uri: photo.thumbnailLink}}
                style={styles.thumbnail}
                />
            </TouchableHighlight>
          ))}
          {/* {!photos.isEnd && <Text ref={ref}>로딩중...</Text>} */}
      </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  scrollBox: {
    height: '100%'
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  touchArea: {
    width: '33%',
    height: 140,
    position: 'relative',
  }
});

export default PhotoGrid;
