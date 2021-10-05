import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import UdhdHeader from "../layout/UdhdHeader";
import PhotoGrid from "../PhotoGrid";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const AlbumScreen = () => {
    const {searching, auth} = useSelector(state => state);
    const navigation = useNavigation();
    useEffect(()=>{
      if (auth.data.hasPhotos) {
        navigation.navigate('UploadSelect');
      }
    })
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
