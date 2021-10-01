import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { height, width, colors, fonts } from '../../util/StyleUtil';
import BackButton from '../../../assets/back-button.svg';
import { Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { appendCandidates } from '../../core/redux/upload';
import { backFolder } from '../../core/redux/googlePicker';


export const GoogleDriveHeader = ({ navigation, route, options, back }) => {
  const googlePicker = useSelector(state => state.googlePicker);
  const dispatch = useDispatch();
  const naviagtion = useNavigation();
  const [count, setCount] = useState(0);

  const currentFolderId = googlePicker.folderIdStack.slice(-1)[0];

  const goBack = () => {
    if (currentFolderId === 'root') {
      navigation.goBack();
    } else {
      dispatch(backFolder());
    }
  };

  useEffect(() => {
    setCount(googlePicker.data.filter(item => item.selected).length);
  }, [googlePicker]);

  // 선택완료 클릭시 선택된 데이터들을 들고 업로드 화면으로 이동
  const confirmSelect = () => {
    dispatch(appendCandidates({data: googlePicker.data.filter(item => item.selected)}))
    naviagtion.navigate('UploadSelect');
  }

  return (
      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={goBack} hitSlop={10 * width}>
          <BackButton
            width={10 * width}
            height={20 * height}
            viewBox='0 0 40 80'
            style={{width: 10*width, height: 20*height}}
          />
        </Pressable>
        <Text style={styles.title}> {options.title} </Text>
        <Pressable onPress={confirmSelect} style={styles.finishButtonContainer}>
          {
            count ?
            <Text style={styles.numberText}>{count}</Text> : null
          }
          <Text style={styles.buttonText}>완료</Text>
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
    numberText: {
      fontFamily: fonts.NotoSansCJKkr,
      fontSize: 16 * width,
      fontWeight: "500",
      fontStyle: "normal",
      lineHeight: 22 * height,
      letterSpacing: 0,
      textAlign: "center",
      color: colors.orange,
      marginRight: 5 * width,
    },
    buttonText: {
      fontFamily: fonts.NotoSansCJKkr,
      fontSize: 16 * width,
      fontWeight: "500",
      fontStyle: "normal",
      lineHeight: 22 * height,
      letterSpacing: 0,
      textAlign: "center",
      color: colors.black
    },
});