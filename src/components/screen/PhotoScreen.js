import React, {useCallback, useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import { Dimensions } from 'react-native';
import {useNavigation} from "@react-navigation/native";
import UdhdHeader from "../layout/UdhdHeader";
import Footer from "../Footer";
import {useDispatch, useSelector} from "react-redux";
import PhotoTagBox from "../PhotoTagBox";
import {getPhoto} from "../../core/redux/photo";

const PhotoScreen = ({route, navigation}) => {
    const {auth, searching, photo } = useSelector(state => state);
    const dispatch = useDispatch();
    const windowWidth = Dimensions.get('window').width;
    const [tagLines, setTagLines] = useState([]);

    useEffect(() => {
        dispatch(getPhoto.request({
            userId: auth.data?.userId,
            photoId: route.params.photoId
        }))
    }, [])

    useEffect(()=>{
        setTagLines(makeTagLines(photo.data?.tags));
    }, [photo])

    const getTagSize = (text) => {
        const space = 11;
        const textSize = 12;
        return 2*space + textSize*text.length;
    }
    const makeTagLines = (tags) => {
        const tagBoxSize = windowWidth * 0.8;
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
        <UdhdHeader/>
          {!searching.data && (
              <View style={styles.container}>
                  <Pressable onPress={() => navigation.goBack()}
                             style={styles.photoContainer}>
                      <Image
                          source={{uri: route.params.image}}
                          style={styles.photo}
                      />
                  </Pressable>
                  {/*<PhotoTagBox tags={photo.data?.tags}/>*/}
                  <PhotoTagBox tags={tagLines}/>
                  <Footer/>
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
    height: '90%',
  },
    photo: {
        backgroundColor: "gray",
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }
});

export default PhotoScreen;
