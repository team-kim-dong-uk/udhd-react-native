import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PhotoGrid from '../PhotoGrid';
import UdhdHeader from "../layout/UdhdHeader";
import { SafeAreaView } from 'react-native-safe-area-context';
import {useSelector} from "react-redux";
import SearchHelpModal from '../guide/SearchHelpModal';
import { getShowGuideFromStorage } from '../../util/AsyncStorageUtil';

const SearchScreen = () => {
  const {searching} = useSelector(state => state);
  const [showGuide, setShowGuide] = useState(undefined);

  useEffect(()=>{
    if (showGuide === undefined) {
      getShowGuideFromStorage(setShowGuide, 'search');
    }
  }, [showGuide])

  return (
      <View>
        {showGuide && <SearchHelpModal show={true}/>}
        <UdhdHeader type='search'/>
        {!searching.data && <PhotoGrid type='search'/>}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchScreen;
