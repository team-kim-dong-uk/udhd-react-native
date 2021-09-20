import React from 'react';
import { FlatList } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, height, width } from '../../util/StyleUtil';
import SettingIcon from '../../../assets/setting.svg';
import UserInfo from '../UserInfo';

const MyPageScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.nickname}>Nickname</Text>
        <SettingIcon
          width={22 * width}
          height={22 * height}
          viewBox='0 0 88 88'
          style={styles.settingIcon}
        />
      </View>
      <UserInfo/>
      <FlatList/>
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
  header: {
    width: 360 * width,
    height: 55 * height,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nickname: {
    fontFamily: fonts.NotoSansCJKkr,
    fontSize: 16 * width,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 22 * height,
    letterSpacing: 0,
    textAlign: "left",
    color: colors.black,
    position: 'absolute',
    left: 15 * width,
  },
  settingIcon: {
    position: 'absolute',
    right: 15 * width,
  },
});

export default MyPageScreen;
