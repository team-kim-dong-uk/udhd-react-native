import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PhotoGrid from '../PhotoGrid';
import UdhdHeader from "../layout/UdhdHeader";
import { SafeAreaView } from 'react-native-safe-area-context';
import {useSelector} from "react-redux";

const SearchScreen = () => {
  const {searching} = useSelector(state => state);
  return (
      <View>
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
