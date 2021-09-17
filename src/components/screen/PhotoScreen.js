import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import { Dimensions } from 'react-native';
import {useNavigation} from "@react-navigation/native";
import UdhdHeader from "../layout/UdhdHeader";
import Footer from "../Footer";
import {useSelector} from "react-redux";
import PhotoTagBox from "../PhotoTagBox";

const PhotoScreen = ({route, navigation}) => {
    const { searching } = useSelector(state => state);
  //const navigation = useNavigation();

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
                  <PhotoTagBox/>
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
    height: '80%',
  },
    photo: {
        backgroundColor: "gray",
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }
});

export default PhotoScreen;
