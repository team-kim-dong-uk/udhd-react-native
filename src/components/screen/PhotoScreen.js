import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import { Dimensions } from 'react-native';
import {useNavigation} from "@react-navigation/native";
import UdhdHeader from "../layout/UdhdHeader";
import Footer from "../Footer";

const PhotoScreen = ({route, navigation}) => {
  console.log(route);
  //const navigation = useNavigation();
  return (
      <View>
        <UdhdHeader/>
        <View style={styles.container}>
          <Pressable onPress={() => navigation.goBack()}
                     style={styles.photoContainer}>
            <Image
                source={{uri: route.params.image}}
            />
          </Pressable>
          {/*TODO 태그 리스트*/}
        </View>
        <Footer/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    width: '100%',
    height: '90%',
  },
  photoContainer: {
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
  },
});

export default PhotoScreen;
