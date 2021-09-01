import React, { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../core/redux/auth';
import LoginWebviewModal from './LoginWebviewModal';
import { API_URL } from "@env";
import { UIButton } from '../../common/UIButton';

const SocialLogin = () => {
  const dispatch = useDispatch();
  const [source, setSource] = useState(undefined);

  signupWithSocial = async (social) => {
    console.log(social);
    setSource(`${API_URL}/oauth2/authorization/${social}`);
  };

  closeSocialModal = () => {
      console.log('close');
      setSource(undefined);
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
        <Text>로고 여기</Text>
      </View>
      <View>
        <UIButton
          title='카카오 계정으로 로그인하기'
          onPress={() => signupWithSocial('kakao')}
          style={styles.kakao}
        />
        <UIButton
          title='구글 계정으로 로그인하기'
          onPress={() => signupWithSocial('google')}
          style={styles.google}
        />
        <UIButton
          title='애플 계정으로 로그인하기'
          onPress={() => signupWithSocial('apple')}
          style={styles.apple}
          textStyle={styles.appleText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kakao: {
    backgroundColor: '#ffdf00',
    width: '90%',
  },
  google: {
    backgroundColor: 'white'
  },
  apple: {
    backgroundColor: 'black'
  },
  appleText: {
    color: 'white'
  }
});

export default SocialLogin;
