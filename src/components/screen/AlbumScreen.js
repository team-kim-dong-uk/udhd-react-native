import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import UdhdHeader from "../layout/UdhdHeader";
import PhotoGrid from "../PhotoGrid";
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../util/StyleUtil';
import AlbumHelpModal from '../guide/AlbumHelpModal';

const AlbumScreen = () => {
    const {searching, auth} = useSelector(state => state);
    const navigation = useNavigation();
    useEffect(()=>{
      if (auth.data.hasPhotos) {
        navigation.navigate('UploadSelect');
      }
    })
  return (
      <View style={styles.container}>
        <AlbumHelpModal show={true}/>
        <UdhdHeader type='album'/>
          {!searching.data && <PhotoGrid type='album'/>}
      </View>
  ); 
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGrey,
    flex: 1,
  }
});

export default AlbumScreen;
