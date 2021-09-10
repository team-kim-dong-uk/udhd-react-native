import React, {useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    TouchableHighlight,
    View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';
import { Button } from 'react-native';
import {
  GDrive,
  MimeTypes
} from "@robinbobin/react-native-google-drive-api-wrapper";
import googlePicker, { setFileList } from '../../../core/redux/googlePicker';

const GooglePickerScreen = () => {
  const dispatch = useDispatch();
  const { auth, googlePicker } = useSelector(state => state);
  const loadFile = async () => {
    const gdrive = new GDrive();
    gdrive.accessToken = auth.data.googleToken;
    try {
      const data = await gdrive.files.list();
      dispatch(setFileList(data.files));
    } catch (e) {
      console.log(e.toString());
    }
  }

  const renderItem = ({ item }) => {
    return (
        <View style={{flex: 1}}>
          <Text>{item.name}</Text>
        </View>
    )
  };

  return (
     <View><Text>hi2`</Text>
     <Button title='clickme' onPress={()=>loadFile()}/>
     <FlatList
      data={googlePicker.data}
      renderItem={renderItem}
     />
     </View>
  );
}

const styles = StyleSheet.create({
  scrollBox: {
    width: '100%',
    height: '100%',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  touchArea: {
    height: 140,
    position: 'relative',
  },
});

export default GooglePickerScreen;
