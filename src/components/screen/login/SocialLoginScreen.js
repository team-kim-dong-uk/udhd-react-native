import React, { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../core/redux/auth';
import LoginWebviewModal from './LoginWebviewModal';
import { API_URL } from "@env";
import { UIButton } from '../../common/UIButton';
import { colors, fonts, height, width } from '../../../util/StyleUtil';
import KakaoIcon from '../../../../assets/kakao.svg';
import AppleIcon from '../../../../assets/apple.svg';

const SocialLogin = () => {
  const dispatch = useDispatch();
  const [source, setSource] = useState(undefined);

  signupWithSocial = async (social) => {
    setSource(`${API_URL}/oauth2/authorization/${social}`);
  };

  closeSocialModal = (data) => {
    dispatch(loginSuccess(data));
      // setSource(undefined);
  };

  return (
    <View style={styles.container}>
      {source !== undefined ? (
        <LoginWebviewModal
          source={source}
          closeSocialModal={closeSocialModal}
        />
      ) : null}
      <View>
        <Text style={styles.logo}>로고 여기</Text>
      </View>
      <View style={styles.buttonContainer}>
        <UIButton
          title='카카오 계정으로 로그인하기'
          icon={
            <KakaoIcon
              width={25.8 * width}
              height={23.9 * height}
              viewBox='0 0 103.2 95.5'
              style={styles.socialIcons}
            />
          }
          onPress={() => signupWithSocial('kakao')}
          style={[styles.socialButtons, styles.kakao]}
          textStyle={styles.socialButtonTexts}
        />
        <UIButton
          title='구글 계정으로 로그인하기'
          icon={
            <KakaoIcon
              width={25.8 * width}
              height={23.9 * height}
              viewBox='0 0 103.2 95.5'
              style={styles.socialIcons}
            />
          }
          onPress={() => signupWithSocial('google')}
          style={[styles.socialButtons, styles.google]}
          textStyle={styles.socialButtonTexts}
        />
        {
          Platform.OS === 'ios' ?
          <UIButton
            title='애플 계정으로 로그인하기'
            icon={
              <AppleIcon
                width={25 * width}
                height={25 * height}
                viewBox='0 0 100 100'
                style={styles.socialIcons}
              />
            }
            onPress={() => signupWithSocial('apple')}
            style={[styles.socialButtons, styles.apple]}
            textStyle={[styles.socialButtonTexts, styles.appleText]}
          /> : null
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  logo: {
    marginTop: 164 * height,
    width: 100 * width,
    height: 143 * height,
    backgroundColor: '#eee',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  socialButtons: {
    width: 320 * width,
    height: 50 * height,
    borderRadius: 5 * width,
    marginBottom: 10* height,
  },
  socialButtonTexts: {
    fontFamily: fonts.NotoSansCJKkr,
    fontSize: 15 * width,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: colors.black
  },
  socialIcons: {
    position: 'absolute',
    left: 25 * width,
  },
  kakao: {
    backgroundColor: colors.kakaoYellow,
    borderWidth: 0,
  },
  google: {
    backgroundColor: colors.white,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: colors.grey,
  },
  apple: {
    backgroundColor: colors.black,
    borderWidth: 0,
  },
  appleText: {
    color: colors.white,
  }
});

export default SocialLogin;
