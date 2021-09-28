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

const UploadSelectScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { auth, upload } = useSelector(state => state);
  const [showModal, setShowModal] = useState(false);

  // 업로드 버튼 클릭해 업로드 진행상태로 변하면 progress를 1초마다 polling하는 동작을 추가한다.
  useEffect(() => {
    let interval;
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
  }, [upload.uploading]);

  const openGoogleDrive = () => {
    navigation.navigate('GooglePicker');
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
        <View style={{flex: 1}}>
            <UIButton title='x' onPress={() => removeSelected(item.id)} style={styles.cancleBtn} textStyle={styles.cancleBtnText}/>
            <TouchableHighlight style={styles.touchArea}>
              <Image source={{uri: item.thumbnailLink}} style={styles.thumbnail}></Image>
            </TouchableHighlight>
        </View>
    )
  };

  return (
      <View style={styles.container}>
        <UploadOptionModal show={showModal} closeModal={()=>setShowModal(false)} openGoogleDrive={openGoogleDrive}/>
        <FlatList
          data={[0, ...upload.data]}
          renderItem={renderItem}
          numColumns={3}
          keyExtractor={item => item.id}
        />
        <Progress.Bar progress={upload.progress} width={410}/>
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
    height: 140,
    position: 'relative',
  },
  cancleBtn: {
    position: 'absolute',
    right: '2%',
    top: '2%',
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: '#ccc',
    zIndex: 10,
  },
  cancleBtnText: {
    fontSize: 15,
  }
});

export default UploadSelectScreen;
