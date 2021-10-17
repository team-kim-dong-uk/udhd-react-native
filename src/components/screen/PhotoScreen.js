import React, {useEffect, useState} from 'react';
import {Image, Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';
import { Dimensions } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {getPhoto} from "../../core/redux/photo";
import { colors, height, width } from '../../util/StyleUtil';
import CommonHeader from "../layout/CommonHeader";
import PhotoInformation from "../PhotoInformation";

const PhotoScreen = ({route, navigation}) => {
    const {auth, searching, photo, keyboard} = useSelector(state => state);
    const dispatch = useDispatch();
    const [photoLoading, setPhotoLoading] = useState(true);

    useEffect(() => {
        dispatch(getPhoto.request({
            userId: auth.data?.userId,
            photoId: route.params.photo.photoId
        }))
    }, [])

    useEffect(() => {
        if(route.params.photo.photoId === photo.data?.photoId)
            setPhotoLoading(false);
    }, [photoLoading, photo])

  return (
      <View>
          <CommonHeader title="이미지 상세" back="bottom">
          </CommonHeader>
          {!searching.data && (
              <View style={styles.container}>
                  <Pressable onPress={() => {
                                    if (keyboard.visible){
                                        Keyboard.dismiss();
                                    } else {
                                        navigation.navigate('PhotoFull', {
                                            photoId: route.params?.photo?.photoId,
                                            image: photo.data?.originalLink
                                        });
                                    }
                              }}
                             style={styles.photoContainer}>
                      <Image
                          source={{uri: route.params.photo?.thumbnailLink}}
                          style={styles.photo}
                      />
                  </Pressable>
                  <PhotoInformation tags={photo.data?.tags}
                                    isLoading={photoLoading}
                                    photoSimpleInfo={route.params?.photo}/>
              </View>
          )}
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
    },
    photoContainer: {
        width: 360 * width,
        height: 357 * height,
    },
    photo: {
        //backgroundColor: colors.grey,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

export default PhotoScreen;
