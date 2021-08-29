import React, {useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotos } from '../core/redux/photos.js';
import { useInView } from 'react-intersection-observer';
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    TouchableHighlight,
    View
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import {StatusBar} from "expo-status-bar";

// TODO 3XN 구현하기
const PhotoGrid = () => {
  const [numCols, setColumnNo] = useState(3);
  const dispatch = useDispatch();
  const { auth, photos, loading } = useSelector(state => state);
  const navigation = useNavigation();
  const {ref, inView} = useInView();

    const loadPhotos = useCallback((e) => {
        console.log("load photo :)");
    }, []);

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
    console.log(photos.data.length)
  return (
      /*<View style={styles.scrollBox}>*/
        <SafeAreaView style={styles.scrollBox}>
        <FlatList
            columnWrapperStyle={{justifyContent:'space-between'}}
            data={photos.data}
            renderItem={renderItem}
            keyExtractor={item => item.photoId}
            numColumns={numCols}
            key={numCols}
            onEndReached={loadPhotos}
            ListFooterComponent={<View style={{height: 195}}/>}
        />
        </SafeAreaView>
      /*</View>*/
        /*<ScrollView>
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
           {!photos.isEnd && <Text ref={ref}>로딩중...</Text>}
      </ScrollView>
      </View>*/
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

export default PhotoGrid;
