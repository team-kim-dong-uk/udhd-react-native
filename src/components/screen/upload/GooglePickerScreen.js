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
import SelectedIcon from '../../../../assets/selected-icon.svg';
import { colors, height, width } from '../../../util/StyleUtil';

const GooglePickerScreen = () => {
  const naviagtion = useNavigation();
  const dispatch = useDispatch();
  const { auth, googlePicker } = useSelector(state => state);
  const currentFolderId = googlePicker.folderIdStack.slice(-1)[0];

  useEffect(() => {
    loadFile(currentFolderId);
  }, [currentFolderId]);

  // 해당 폴더에 있는 google drive item 들을 가져온다.
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

  // 폴더 클릭시 해당 폴더로 이동
  const pressFolder = (item) => {
    dispatch(changeFolder({ folderId: item.id }));
  }

  // 이미지 클릭 시 해당 이미지 선택 / 선택해제
  const selectItem = (item) => {
    dispatch(toggleSelect({item}));
  }

  // 뒤로가기 클릭 시 상위 폴더로 이동
  const goBackFolder = () => {
    if (currentFolderId !== 'root') {
      dispatch(backFolder());
    }
  }

  // 이미지 전체선택
  const selectAllPress = () => {
    dispatch(selectAll());
  }

  // 이미지 전체선택 해제
  const unselectAllPress = () => {
    dispatch(unselectAll());
  }

  

  //google drive의 각 item 그리기. folder / image 종류에 따라 동작이 다르다.
  const renderItem = ({ item }) => {
    return (
        <View style={{flex: 1}}>
          {
            item.mimeType === 'application/vnd.google-apps.folder'
            ? <TouchableHighlight onPress={() => pressFolder(item)} style={styles.touchArea}>
                <View>
                <Image source={require('../../../../assets/folder.png')} style={styles.thumbnail}></Image>
                <Text style={styles.folder}>
                  {item.name}
                </Text>
                </View>
              </TouchableHighlight>
            : <TouchableHighlight onPress={() => selectItem(item)} style={styles.touchArea}>
                <View>
                <Image source={{uri: item.thumbnailLink}} style={styles.thumbnail}></Image>
                {
                  item.selected ? 
                  <SelectedIcon
                    width={20 * width}
                    height={20 * height}
                    viewBox='0 0 80 80'
                    style={styles.selectedIcon}
                  /> : null
                }
                </View>
              </TouchableHighlight>
          }
          
        </View>
    )
  };

  return (
    <View style={styles.scrollBox}>
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
    height: '100%',
  },
  touchArea: {
    width: 119 * width,
    height: 118 * height,
    marginBottom: 1.5 * height,
  },
  buttons: {
    width: '25%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  selectedIcon: {
    position: 'absolute',
    top: 5 * height,
    right: 5 * width,
  },
});

export default GooglePickerScreen;
