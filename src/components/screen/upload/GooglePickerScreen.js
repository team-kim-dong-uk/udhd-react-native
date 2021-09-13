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
import googlePicker, { backFolder, changeFolder, selectAll, setFileList, toggleSelect, unselectAll } from '../../../core/redux/googlePicker';
import { appendCandidates } from '../../../core/redux/upload';
import { style } from 'styled-system';
import { UIButton } from '../../common/UIButton';

const GooglePickerScreen = () => {
  const naviagtion = useNavigation();
  const dispatch = useDispatch();
  const { auth, googlePicker } = useSelector(state => state);
  const currentFolderId = googlePicker.folderIdStack.slice(-1)[0];

  useEffect(() => {
    loadFile(currentFolderId);
  }, [currentFolderId]);

  const loadFile = async (folderId) => {
    try {
    const gdrive = new GDrive();
    gdrive.accessToken = auth.data.googleToken;
      const data = await gdrive.files.list({
        q: `'${folderId}' in parents and (mimeType = 'application/vnd.google-apps.folder' or mimeType contains 'image')`,
        fields: `files(id, name, mimeType, thumbnailLink, parents)`
      });
      dispatch(setFileList(data.files));
    } catch (e) {
      console.log(e.toString());
    }
  }

  const pressFolder = (item) => {
    dispatch(changeFolder({ folderId: item.id }));
  }

  const selectItem = (item) => {
    dispatch(toggleSelect({item}));
  }

  const goBackFolder = () => {
    if (currentFolderId !== 'root') {
      dispatch(backFolder());
    }
  }

  const selectAllPress = () => {
    dispatch(selectAll());
  }

  const unselectAllPress = () => {
    dispatch(unselectAll());
  }

  const confirmSelect = () => {
    dispatch(appendCandidates({data: googlePicker.data.filter(item => item.selected)}))
    naviagtion.navigate('UploadSelect');
  }

  const renderItem = ({ item }) => {
    return (
        <View style={{flex: 1}}>
          {
            item.mimeType === 'application/vnd.google-apps.folder'
            ? <TouchableHighlight onPress={() => pressFolder(item)} style={styles.touchArea}>
                <View>
                <Image source={require('../../../assets/folder.png')} style={styles.thumbnail}></Image>
                <Text style={styles.folder}>
                  {item.name}
                </Text>
                </View>
              </TouchableHighlight>
            : <TouchableHighlight onPress={() => selectItem(item)} style={styles.touchArea}>
                <View>
                <Image source={{uri: item.thumbnailLink}} style={styles.thumbnail}></Image>
                <Text style={item.selected ? styles.selected : styles.unselected}>
                  {item.name}
                </Text>
                </View>
              </TouchableHighlight>
          }
          
        </View>
    )
  };

  return (
    <View style={styles.scrollBox}>
      <View style={styles.buttonContainer}>
        <UIButton title='뒤로가기' onPress={()=>goBackFolder()} style={styles.buttons}/>
        <UIButton title='이미지 전체선택' onPress={()=>selectAllPress()} style={styles.buttons}/>
        <UIButton title='전체선택 해제' onPress={()=>unselectAllPress()} style={styles.buttons}/>
        <UIButton title='선택 완료' onPress={()=>confirmSelect()} style={styles.buttons}/>
      </View>
      <FlatList
        data={googlePicker.data}
        renderItem={renderItem}
        numColumns={3}
        keyExtractor={item => item.id}
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
    height: '80%',
  },
  touchArea: {
    height: 140,
    position: 'relative',
  },
  buttons: {
    width: '25%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  selected: {
    color: 'blue',
  },
  unselected: {
    color: 'black',
  }
});

export default GooglePickerScreen;
