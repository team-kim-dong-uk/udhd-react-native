import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import UdhdHeader from "../layout/UdhdHeader";
import PhotoGrid from "../PhotoGrid";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../util/StyleUtil';
import AlbumHelpModal from '../guide/AlbumHelpModal';
import { getShowGuideFromStorage } from '../../util/AsyncStorageUtil';

const AlbumScreen = () => {
    const {searching, auth} = useSelector(state => state);
    const navigation = useNavigation();
    const [showGuide, setShowGuide] = useState(undefined);
    
    useEffect(()=>{
      if (auth.data.hasPhotos) {
        navigation.navigate('UploadSelect');
      } else if (showGuide === undefined) {
        getShowGuideFromStorage(setShowGuide, 'album');
      }
    }, [auth, showGuide])
  return (
      <View style={styles.container}>
        {showGuide && <AlbumHelpModal show={true}/>}
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
