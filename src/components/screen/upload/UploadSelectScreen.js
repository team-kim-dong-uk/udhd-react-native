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
import { checkProgress, removeCandidate, uploadPhotos } from '../../../core/redux/upload';
import * as Progress from 'react-native-progress';
import { UIButton } from '../../common/UIButton';
import PlusIcon from '../../../../assets/plus-icon.svg';
import { colors, height, width } from '../../../util/StyleUtil';
import { Pressable } from 'react-native';
import ModalTemplate from '../../ModalTemplate';
import UploadOptionModal from '../../UploadOptionModal';
import CancelIcon from '../../../../assets/cancel-icon-grey.svg';
import UploadHelpModal from '../../guide/UploadHelpModal';
import { getShowGuideFromStorage } from '../../../util/AsyncStorageUtil';

const UploadSelectScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { auth, upload } = useSelector(state => state);
  const [showModal, setShowModal] = useState(false);
  const [showGuide, setShowGuide] = useState(undefined);

  // 업로드 버튼 클릭해 업로드 진행상태로 변하면 progress를 1초마다 polling하는 동작을 추가한다.
  useEffect(() => {
    let interval;
    if (upload.data.length > 0 && showGuide === undefined) {
      getShowGuideFromStorage(setShowGuide, 'upload');
    }
    if (upload.uploading) {
      interval = setInterval(() => dispatch(checkProgress.request({pollingKey: upload.pollingKey})), 1000);
    }
    // 업로드가 끝나면 위의 progress polling 동작을 제거한다.
    return () => {
      if (upload.uploading) {
        clearInterval(interval);
        alert('업로드 완료!');
        navigation.navigate('Search');
      }
    }
  }, [upload, showGuide]);

  const openGoogleDrive = () => {
    navigation.navigate('GooglePicker');
    setShowModal(false);
  }

  const removeSelected = (id) => {
    dispatch(removeCandidate({id}));
  }

  

  const renderItem = ({ item, index }) => {
    if (index == 0) {
      return (
        <Pressable onPress={()=> setShowModal(true)} style={styles.addButton}>
          <PlusIcon
            width={25 * width}
            height={25 * height}
            viewBox='0 0 100 100'
          />
        </Pressable>)
    }
    return (
        <View style={styles.touchArea}>
            <Pressable onPress={() => removeSelected(item.id)} style={styles.cancleBtn}>
              <CancelIcon
                width={20 * width}
                height={20 * height}
                viewBox='0 0 80 80'
              />
            </Pressable>
            <TouchableHighlight >
              <Image source={{uri: item.thumbnailLink}} style={styles.thumbnail}></Image>
            </TouchableHighlight>
        </View>
    )
  };

  return (
      <View style={styles.container}>
        {showGuide && <UploadHelpModal show={true}/>}
        <UploadOptionModal show={showModal} closeModal={()=>setShowModal(false)} openGoogleDrive={openGoogleDrive}/>
        {
          upload.uploading && 
          <Progress.Bar progress={upload.progress} width={360 * width} height={10 * height} color={colors.orange}/>
        }
        <FlatList
          data={[0, ...upload.data]}
          renderItem={renderItem}
          numColumns={3}
          keyExtractor={item => item.id}
          />
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  addButton: {
    width: 119 * width,
    height: 118 * height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrey,
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
  cancleBtn: {
    position: 'absolute',
    right: 5 * width,
    top: 5 * height,
    height: 20 * height,
    width: 20 * width,
    zIndex: 1,
  },
});

export default UploadSelectScreen;
