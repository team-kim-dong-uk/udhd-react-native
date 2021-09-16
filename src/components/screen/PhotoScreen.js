import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import { Dimensions } from 'react-native';
import {useNavigation} from "@react-navigation/native";
import UdhdHeader from "../layout/UdhdHeader";

const PhotoScreen = ({route}) => {
  console.log(route);
  const navigation = useNavigation();
  return (
      <View>
        <UdhdHeader/>
        <View style={styles.container}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image
                source={{uri: route.params.image}}
                style={styles.photoContainer}
            />
          </Pressable>
          {/*TODO 태그 리스트*/}
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },
  photoContainer: {
    width: '100%',
    height: '95%',
    resizeMode: 'contain',
  },
  photo: {
    width: '100',
    height: '100',
  },

});

export default PhotoScreen;
