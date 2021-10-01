import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import { Dimensions } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {getPhoto} from "../../core/redux/photo";
import CommonHeader from "../layout/CommonHeader";
import PhotoInformation from "../PhotoInformation";

const PhotoScreen = ({route, navigation}) => {
    const {auth, searching, photo } = useSelector(state => state);
    const dispatch = useDispatch();
    const windowWidth = Dimensions.get('window').width;
    const [tagLines, setTagLines] = useState([]);
    const [photoLoading, setPhotoLoading] = useState(true);

    useEffect(() => {
        dispatch(getPhoto.request({
            userId: auth.data?.userId,
            photoId: route.params.photo.photoId
        }))
    }, [])

    useEffect(()=>{
        setTagLines(makeTagLines(photo.data?.tags));
    }, [photo])

    useEffect(() => {
        if(route.params.photo.photoId === photo.data?.photoId)
            setPhotoLoading(false);
    }, [photoLoading, photo])

    const getTagSize = (text) => {
        const space = 11;
        const textSize = 12;
        return 2*space + textSize*text.length;
    }
    const makeTagLines = (tags) => {
        const tagBoxSize = windowWidth;
        let resultLines = [];
        let line = [];
        let sumSize = 0;
        tags?.map((tag) => {
            sumSize += getTagSize(tag);
            if(sumSize <= tagBoxSize){
                line.push(tag);
            } else {
                resultLines.push(line);
                line = [tag];
                sumSize = getTagSize(tag);
            }
        })
        resultLines.push(line);
        return resultLines;
    }


  return (
      <View>
          <CommonHeader title="이미지 상세" back="bottom">
          </CommonHeader>
          {!searching.data && (
              <View style={styles.container}>
                  <Pressable onPress={() => {
                                  navigation.navigate('PhotoFull', {
                                      photoId: route.params?.photo?.photoId,
                                      image: photo.data?.originalLink
                                  });
                              }}
                             style={styles.photoContainer}>
                      <Image
                          source={{uri: route.params.photo?.thumbnailLink}}
                          style={styles.photo}
                      />
                  </Pressable>
                  <PhotoInformation tags={tagLines}
                                    isLoading={photoLoading}
                                    photoSimpleInfo={route.params?.photo}/>
              </View>
          )}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width: '100%',
    height: '90%',
  },
  photoContainer: {
    width: '100%',
  minHeight: '50%',
    maxHeight: '70%',
  },
    photo: {
        backgroundColor: "gray",
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

export default PhotoScreen;
