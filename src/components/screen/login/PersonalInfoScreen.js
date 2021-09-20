import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setNickname } from '../../../core/redux/auth';
import { colors, fonts, height, width } from '../../../util/StyleUtil';
import { UIButton } from '../../common/UIButton';

const PersonalInfoScreen = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const navigation = useNavigation();

  // 소셜로그인 진행중에 종료했었다면 중단 지점부터 다시 시작
  useEffect(() => {
    if (auth.data && auth.data.nickname) {
      navigation.navigate('GroupSelect');
    }
  }, [auth]);

  const [nicknameInput, setnicknameInput] = useState('');
  const [focused, setFocused] = useState(false);

  const onBtnClick = () => {
    dispatch(setNickname.request({
      userId: auth.data.userId,
      nickname: nicknameInput,
    }));
  }

  // 불리지 않는 함수. 에러메시지 방지를 위해 만들었다.
  // PersonalInfo screen 으로 이동하는 코드가 웹뷰쪽에 있지만, rn에서 이를 인식하지 못해 에러를 뱉음.
  // 이 에러를 해결하기 위해 PersonalInfo screen 으로 navigate하는 함수를 만듦. (불리진 않음)
  const dummy = () => {
    useNavigation('PersonalInfo');
  }

  if (false) {
    dummy();
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.emailContainer}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.emailInput}
          value={auth.data.email}
          editable={false}
        />
      </View>
      <View style={styles.nicknameContainer}>
        <Text style={styles.label}>닉네임</Text>
        <TextInput
          placeholder='닉네임을 입력해주세요'
          placeholderTextColor={colors.grey}
          style={[styles.nicknameInput, focused ? styles.nicknameInputFocused : null]}
          onChangeText={nicknameInput => setnicknameInput(nicknameInput)}
          onFocus={()=>setFocused(true)}
          onBlur={()=>setFocused(false)}
          defaultValue={nicknameInput}
        />
        <Text style={styles.error}>{auth.error}</Text>
      </View>
      <View style={styles.bottom}>
        <UIButton
          style={[styles.nextButton, nicknameInput !== '' ? styles.nextButtonSubmitable : null]}
          textStyle={styles.buttonText}
          title='다음'
          onPress={onBtnClick}
          disabled={nicknameInput === ''}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  emailContainer: {
    //custom
    marginTop: 25 * height,
  },
  nicknameContainer: {
    //custom
    marginTop: 30 * height,
  },
  label: {
    width: 40.8 * width,
    height: 22.3 * height,
    fontFamily: fonts.NotoSansCJKkr,
    fontSize: 15 * width,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: -0.38 * width,
    textAlign: "left",
    color: colors.black,
    //custom
    marginBottom: 10 * height,
  },
  emailInput: {
    width: 330 * width,
    height: 45 * height,
    borderRadius: 5 * width,
    backgroundColor: colors.inputGrey,
    // text
    fontFamily: fonts.NotoSansCJKkr,
    fontSize: 15 * width,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 24 * height,
    letterSpacing: 0 * width,
    color: colors.black,
    // custom
    paddingLeft: 10 * width,
  },
  nicknameInput: {
    width: 330 * width,
    height: 45 * height,
    borderRadius: 5 * width,
    borderStyle: "solid",
    borderWidth: 1 * width,
    borderColor: colors.grey,
    //text
    fontFamily: fonts.NotoSansCJKkr,
    fontSize: 15 * width,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: colors.black,
    //custom
    paddingLeft: 10 * width,
  },
  nicknameInputFocused: {
    borderColor: colors.black,
  },
  error: {
    //custom
    fontSize: 15 * width,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.red,
    marginTop: 10 * height,
    marginLeft: 10 * width,
  },
  bottom: {
    //custom
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36 * height,
  },
  nextButton: {
    width: 330 * width,
    height: 50 * height,
    backgroundColor: colors.grey,
    borderWidth: 0,
  },
  nextButtonSubmitable: {
    backgroundColor: colors.orange,
  },
  buttonText: {
    fontFamily: fonts.NotoSansCJKkr,
    fontSize: 15 * width,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0 * width,
    textAlign: "center",
    color: colors.white,
  },
});

export default PersonalInfoScreen;
