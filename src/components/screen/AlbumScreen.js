import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import UdhdHeader from "../layout/UdhdHeader";
import PhotoGrid from "../PhotoGrid";
import { SafeAreaView } from 'react-native-safe-area-context';

const AlbumScreen = () => {
    const {searching} = useSelector(state => state);
  return (
      <View>
        <UdhdHeader type='album'/>
          {!searching.data && <PhotoGrid type='album'/>}
      </View>
  );
}

const styles = StyleSheet.create({
});

export default AlbumScreen;
