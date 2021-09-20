import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import FowardButton from '../../../assets/foward-button.svg';
import { colors, height, width } from '../../util/StyleUtil';
import ToggleSwitch from 'toggle-switch-react-native'

const SettingScreen = () => {

  const [toggleSwitch, setToggleSwitch] = useState({
    email: false,
    push: false,
  });

  const list = [{
      'text': '도움말',
      'type': 'navigate',
      'destination': 'Help',
    },{
      'text': '결제 정보',
      'type': 'navigate',
      'destination': 'Help',
    },{
      'text': '이메일 수신',
      'type': 'toggle',
      'key': 'email',
    },{
      'text': '앱 푸시',
      'type': 'toggle',
      'key': 'push',
    },{
      'text': '정보',
      'type': 'navigate',
      'destination': 'Help',
    },{
      'text': '정보수정',
      'type': 'navigate',
      'destination': 'Help',
    },{
      'text': '로그아웃',
      'type': 'navigate',
      'destination': 'Help',
    },{
      'text': '의견 보내기',
      'type': 'navigate',
      'destination': 'Help',
    },
  ];

  const renderItem = ({ item }) => {
    return (
        <View style={styles.row}>
          <Text>{item.text}</Text>
          {
            item.type === 'navigate'
            ? <TouchableOpacity style={styles.fowardButton}>
                <FowardButton
                  width={10 * width}
                  height={20 * height}
                  viewBox='0 0 40 80'
                />
              </TouchableOpacity>
            : <ToggleSwitch
            isOn={toggleSwitch[item.key]}
            onColor={colors.orange}
            offColor={colors.switchGrey}
            size="medium"
            onToggle={isOn => {
              setToggleSwitch({
                ...toggleSwitch,
                [item.key]: isOn,
              });
            }}
          />
          }
        </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item.text}
      />
      <Text>SettingScreen</Text>
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
  list: {
    marginTop: 5 * height,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 330 * width,
    height: 50 * height,
    borderBottomWidth: 0.5 * height,
    borderBottomColor: "#e2e2e2"
  },
  fowardButton: {

  },
});

export default SettingScreen;
