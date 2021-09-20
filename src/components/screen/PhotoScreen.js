import React, {useEffect, useState} from 'react';
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
  //const navigation = useNavigation();

    useEffect(() => {
        dispatch(getPhoto.request({
            userId: auth.data?.userId,
            photoId: route.params.photoId
        }));
    }, [])

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
                  <PhotoTagBox tags={photo.data?.tags}/>
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
