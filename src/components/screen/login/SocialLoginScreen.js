import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../../core/redux/auth';
import LoginWebviewModal from './LoginWebviewModal';
import { API_URL } from "@env";
import { UIButton } from '../../common/UIButton';
import { colors, fonts, height, width } from '../../../util/StyleUtil';
import KakaoIcon from '../../../../assets/kakao.svg';
import AppleIcon from '../../../../assets/apple.svg';
import BrandTextIcon from '../../../../assets/brand-text.svg';
import { Image } from 'react-native';

const SocialLogin = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state  => state.auth);
  const [source, setSource] = useState(undefined);

  signupWithSocial = async (social) => {
    setSource(`${API_URL}/oauth2/authorization/${social}`);
  };

  closeSocialModal = (data) => {
    dispatch(loginSuccess(data));
      // setSource(undefined);
  };

  // 소셜로그인 진행중에 종료했었다면 중단 지점부터 다시 시작
  useEffect(() => {
    if (auth.data && !auth.data.nickname) {
      navigation.navigate('PersonalInfo');
    }
  }, [auth]);

  return (
    <View style={styles.container}>
      {source !== undefined ? (
        <LoginWebviewModal
          source={source}
          closeSocialModal={closeSocialModal}
        />
      ) : null}
      <View style={{alignItems: 'center'}}>
        <Image
          style={styles.logo}
          source={require('../../../../assets/drawable-xxxhdpi/symbol_black.webp')}
        />
        <Image
          style={styles.brandText}
          source={require('../../../../assets/drawable-xxxhdpi/brand_text.webp')}
        />
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
            <Image
              style={[styles.socialIcons, styles.googleIcon]}
              source={require('../../../../assets/drawable-hdpi/google_logo.webp')}
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
    marginTop: 142 * height,
    width: 100 * width,
    height: 100 * height,
  },
  brandText: {
    marginTop: 10 * height,
    width: 120.5 * width,
    /*width: 106.5 * width,*/
    height: 33 * height,
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
  googleIcon: {
    width: 25 * width,
    height: 25 * height,
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
