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
import { checkProgress, uploadPhotos } from '../../../core/redux/upload';
import * as Progress from 'react-native-progress';

const UploadSelectScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { auth, upload } = useSelector(state => state);

  useEffect(() => {
    let interval;
    if (upload.uploading) {
      interval = setInterval(() => dispatch(checkProgress.request({pollingKey: upload.pollingKey})), 1000);
    }
    return () => {
      if (upload.uploading) {
        clearInterval(interval);
        alert('업로드 완료!');
        navigation.navigate('Search');
      }
    }
  }, [upload.uploading]);

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
            <TouchableHighlight style={styles.touchArea}>
              <Image source={{uri: item.thumbnailLink}} style={styles.thumbnail}></Image>
            </TouchableHighlight>
        </View>
    )
  };

  return (
     <View style={styles.scrollBox}>
       <Button title='select from gallery' onPress={()=>alert('TODO')}></Button>
       <Button title='select from google drive' onPress={openGoogleDrive}></Button>
       <FlatList
          data={upload.data}
          renderItem={renderItem}
          numColumns={3}
          keyExtractor={item => item.id}
        />
        <Progress.Bar progress={upload.progress} width={410}/>
        <Button title='upload' onPress={uploadSelected}></Button>
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

export default UploadSelectScreen;
