import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setGroup, setHasPhotosSignUp } from '../../../core/redux/auth';
import { colors, fonts, width, height } from '../../../util/StyleUtil';
import CheckBox from '@react-native-community/checkbox';
import { UIButton } from '../../common/UIButton';
import { TouchableOpacity } from 'react-native';
import { Pressable } from 'react-native';
import CheckIcon from '../../../../assets/check-icon.svg';
import CheckIconWhite from '../../../../assets/check-icon-white.svg';

const HasPhotosScreen = () => {
  const [hasPhotos, setHasPhotos] = useState(undefined);
  const dispatch = useDispatch();

  const onBtnClick = () => {
    dispatch(setHasPhotosSignUp(hasPhotos)); 
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.question}>이미 가지고 있는 연예인 사진이 있나요?</Text>
        <Pressable onPress={()=>setHasPhotos(true)} style={[styles.option, hasPhotos === true ? styles.selectedOption : null]}>
          <Text style={[styles.text, hasPhotos === true ? styles.selectedText : null]}>네, 있어요</Text>
          {
            hasPhotos === true ? <CheckIconWhite width={20*width} height={20*height} viewBox='0 0 80 80' style={styles.check}/>
                               : <CheckIcon      width={20*width} height={20*height} viewBox='0 0 80 80' style={styles.check}/>
          }
        </Pressable>
        <Pressable onPress={()=>setHasPhotos(false)} style={[styles.option, hasPhotos === false ? styles.selectedOption : null]}>
          <Text style={[styles.text, hasPhotos === false ? styles.selectedText : null]}>아니요</Text>
          {
            hasPhotos === false ? <CheckIconWhite width={20*width} height={20*height} viewBox='0 0 80 80' style={styles.check}/>
                                : <CheckIcon      width={20*width} height={20*height} viewBox='0 0 80 80' style={styles.check}/>
          }
        </Pressable>
      </View>

      <UIButton
        title='다음'
        onPress={onBtnClick}
        style={[styles.nextBtn, hasPhotos !== undefined ? styles.nextBtnValid : null]}
        textStyle={styles.nextBtnText}
        disabled={hasPhotos === undefined}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  question: {
    lineHeight: 26.8 * height,
    fontFamily: fonts.NotoSansCJKkr,
    fontSize: 18 * width,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: -0.45 * width,
    textAlign: "left",
    color: colors.black,
    marginTop: 20 * height,
    marginBottom: 40 * height,
  },
  option: {
    width: 330 * width,
    height: 45 * height,
    borderRadius: 5 * width,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: colors.grey,
    marginBottom: 12 * height,
  },
  selectedOption: {
    backgroundColor: colors.black,
  },
  text: {
    fontFamily: fonts.NotoSansCJKkr,
    fontSize: 15 * width,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: colors.grey,
    marginLeft: 15 * width,
  },
  selectedText: {
    color: colors.white,
  },
  check: {
    position: 'absolute',
    top: 12.5 * height,
    right: 15 * width,
  },
  nextBtn: {
    width: 330 * width,
    height: 50 * height,
    backgroundColor: colors.grey,
    marginBottom: 15 * height,
    borderWidth: 0,
  },
  nextBtnValid: {
    backgroundColor: colors.orange,
  },
  nextBtnText: {
    fontFamily: fonts.NotoSansCJKkr,
    fontSize: 15 * width,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: colors.white,
  },
});

export default HasPhotosScreen;
