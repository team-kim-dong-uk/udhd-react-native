import React, {useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    FlatList,
    Image,
    StyleSheet,
    TouchableHighlight,
    View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';
import { Button } from 'react-native';
import { uploadPhotos } from '../../../core/redux/upload';

const UploadSelectScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { auth, upload } = useSelector(state => state);

  const openGoogleDrive = () => {
    navigation.navigate('GooglePicker');
  }

  const uploadSelected = () => {
    dispatch(uploadPhotos.request({
      data: upload.data,
      googleDriveToken: auth.data.googleToken,
    }));
  }

  const renderItem = ({ item }) => {
    return (
        <View style={{flex: 1}}>
            <TouchableHighlight>
              <Image source={{uri: item.thumbnailLink}} style={styles.image}></Image>
            </TouchableHighlight>
        </View>
    )
  };

  return (
     <View>
       <Button title='select from gallery' onPress={()=>alert('TODO')}></Button>
       <Button title='select from google drive' onPress={openGoogleDrive}></Button>
       <FlatList
          data={upload.data}
          renderItem={renderItem}
          numColumns={3}
          keyExtractor={item => item.id}
        />
        <Button title='upload' onPress={uploadSelected}></Button>
     </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  }
});

export default UploadSelectScreen;
