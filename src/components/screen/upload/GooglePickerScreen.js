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
  MimeTypes,
  ListQueryBuilder
} from "@robinbobin/react-native-google-drive-api-wrapper";
import googlePicker, { setFileList } from '../../../core/redux/googlePicker';

const GooglePickerScreen = () => {
  const dispatch = useDispatch();
  const { auth, googlePicker } = useSelector(state => state);

  let gdrive;

  useEffect(() => {
  }, [auth])
  const loadFile = async () => {
    
    try {

    gdrive = new GDrive();
    gdrive.accessToken = auth.data.googleToken;
      const data = await gdrive.files.list({
        q: `mimeType = 'application/vnd.google-apps.folder' or mimeType contains 'image'`
      });
      dispatch(setFileList(data.files));
    } catch (e) {
      console.log(e.toString());
    }
  }

  const renderItem = ({ item }) => {
    return (
        <View style={{flex: 1}}>
          {
            item.mimeType === 'application/vnd.google-apps.folder'
              ? <Text style={styles.folder}>{item.name}</Text>
              : <Text>{item.name}</Text>
          }
          
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
  folder: {
    color: 'blue'
  }
});

export default GooglePickerScreen;
