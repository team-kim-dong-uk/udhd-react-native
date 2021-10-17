import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import UdhdHeader from "../layout/UdhdHeader";
import PhotoGrid from "../PhotoGrid";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../util/StyleUtil';
import AlbumHelpModal from '../guide/AlbumHelpModal';

const AlbumScreen = () => {
    const {searching, auth} = useSelector(state => state);
    const navigation = useNavigation();
    const [showGuide, setShowGuide] = useState(undefined);
    const getShowGuideStorage = async (setState, type) => {
      const val = await AsyncStorage.getItem(`showGuide.${type}`);
      if (val === 'false') {
        setState(false);
      } else {
        await AsyncStorage.setItem(`showGuide.${type}`, 'false')
        setState(true);
      }
    }
    
    useEffect(()=>{
      if (auth.data.hasPhotos) {
        navigation.navigate('UploadSelect');
      } else if (showGuide === undefined) {
        getShowGuideStorage(setShowGuide, 'album');
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
