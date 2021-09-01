import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setNickname } from '../../../core/redux/auth';

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

  const onBtnClick = () => {
    dispatch(setNickname.request({
      userId: auth.data.userId,
      nickname: nicknameInput,
    }));
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>개인정보 설정</Text>
      <View style={styles.textContainer}>
        <Text>{auth.data.email}</Text>
        <TextInput
          placeholder='닉네임을 입력해주세요'
          style={styles.textInput}
          onChangeText={nicknameInput => setnicknameInput(nicknameInput)}
          defaultValue={nicknameInput}
        />
        <Text style={styles.error}>{auth.error}</Text>
      </View>
      <View style={styles.nextBtn}>
        <Button
          title='다음'
          onPress={onBtnClick}
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
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  textContainer: {
    height: '10%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    borderBottomColor: 'black'
  },
  error: {
    color: 'red'
  },
  nextBtn: {
    width: '90%'
  }
});

export default PersonalInfoScreen;
