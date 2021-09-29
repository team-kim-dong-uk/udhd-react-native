import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { height, width, colors, fonts } from '../../util/StyleUtil';
import BackButton from '../../../assets/back-button.svg';
import { Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPhotos } from '../../core/redux/upload';


export const UploadHeader = ({ navigation, route, options, back }) => {
  const {upload, auth} = useSelector(state => state);
  const dispatch = useDispatch();

  // 업로드 버튼 클릭 시 업로드 진행.
  const uploadAll = () => {
    dispatch(uploadPhotos.request({
      data: upload.data,
      googleDriveToken: auth.data.googleToken,
    }));
  }

  const goBack = () => {
    navigation.goBack();
  };

  return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <BackButton
            width={10 * width}
            height={20 * height}
            viewBox='0 0 40 80'
          />
        </TouchableOpacity>
        <Text style={styles.title}> {options.title} </Text>
        <Pressable 
          disabled={upload.data.length === 0} 
          onPress={uploadAll} 
          style={styles.finishButtonContainer}
        >
          <Text style={[styles.buttonText, upload.data.length ? styles.activeButtonText : null]}>업로드</Text>
        </Pressable>
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      width: 360 * width,
      height: 55 * height,
      backgroundColor: colors.white,
    },
    backButton: {
      position: 'absolute',
      left: 15 * width,
      width: 10 * width,
      height: 20 * height,
      zIndex: 1,
    },
    title: {
      fontFamily: fonts.NotoSansCJKkr,
      fontSize: 16 * width,
      fontWeight: "500",
      fontStyle: "normal",
      lineHeight: 22 * height,
      letterSpacing: 0,
      textAlign: "center",
      color: colors.black,
      //custom
      flex: 1,
    },
    finishButtonContainer: {
      position: 'absolute',
      right: 15 * width,
      flexDirection: 'row',
    },
    buttonText: {
      fontFamily: fonts.NotoSansCJKkr,
      fontSize: 16 * width,
      fontWeight: "500",
      fontStyle: "normal",
      lineHeight: 22 * height,
      letterSpacing: 0,
      textAlign: "center",
      color: colors.grey,
    },
    activeButtonText: {
      color: colors.orange,
    },
});