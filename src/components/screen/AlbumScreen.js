import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import UdhdHeader from "../layout/UdhdHeader";
import PhotoGrid from "../PhotoGrid";
import { SafeAreaView } from 'react-native-safe-area-context';

const AlbumScreen = () => {
  const {isSearching} = useSelector(state => state);
  /*console.log(auth);*/
  return (
    /*<SafeAreaView>*/
      <View>
        <UdhdHeader/>
          {!isSearching.data && (<PhotoGrid show={!isSearching.data} type='album'/>)}
      </View>
    /*</SafeAreaView>*/
  );
}

const styles = StyleSheet.create({
});

export default AlbumScreen;
