import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setGroup } from '../../../core/redux/auth';
import { colors, fonts, width, height } from '../../../util/StyleUtil';
import CheckBox from '@react-native-community/checkbox';
import { UIButton } from '../../common/UIButton';
import { TouchableOpacity } from 'react-native';

const GroupSelectScreen = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth); 

  const groups = ['오마이걸', '프로미스나인', '에스파', '트와이스', '더보이즈', '블랙핑크',
                  '소녀시대', '걸스데이', '이달의소녀'];
  const [state, setState] = useState({
    groups: groups.map((groupname) => ({
      name: groupname,
      selected: false,
    })),
    hasSelected: false,
  });

  

  const onBtnClick = () => {
    dispatch(setGroup.request({
      userId: auth.data.userId,
      group: state.groups.filter(item => item.selected)[0].name,
    }));
  }

  const changeCheckbox = (index, newValue) => {
    setState({
      groups: state.groups.map((item, groupIndex) => 
        groupIndex === index
        ? { ...item, selected: newValue }
        : { ...item, selected: false }
      ),
      hasSelected: newValue,
    });
  }

  const renderItem = ({ item, index }) => {
    return (
        <TouchableOpacity
          style={styles.row} 
          onPress={() => changeCheckbox(index, !state.groups[index].selected)}
        >
          <CheckBox
            style={styles.checkbox}
            value={item.selected}
            tintColors={{true: colors.orange}}
            onValueChange={ (newValue) => changeCheckbox(index, newValue)}
          />
          <Text style={styles.option}>{item.name}</Text>
        </TouchableOpacity>
    )
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>어떤 연예인을 좋아하세요?</Text>
      <FlatList
        contentContainerStyle={styles.list}
        data={state.groups}
        renderItem={renderItem}
        keyExtractor={item => item.name}
      />
      <View style={styles.buttonContainer}>

      <UIButton
        title='다음'
        onPress={onBtnClick}
        style={[styles.nextBtn, state.hasSelected ? styles.nextBtnValid : null]}
        textStyle={styles.nextBtnText}
        disabled={!state.hasSelected}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15 * height,
  },
  question: {
    lineHeight: 22.2 * height,
    fontFamily: fonts.NotoSansCJKkr,
    fontSize: 15 * width,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: -0.38 * width,
    textAlign: "left",
    color: colors.black,
    marginLeft: 15 * width,
    marginTop: 25 * height,
  },
  list: {
    marginTop: 25 * height,
    padding: 0,
  },
  checkbox: {
    width: 20 * width,
    height: 20 * width,
    borderRadius: 3 * width,
    left: -6 * width,
    marginLeft: 15 * width,
  },
  option: {
    fontFamily: fonts.NotoSansCJKkr,
    fontSize: 15 * width,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.38 * width,
    textAlign: "left",
    color: colors.black,
    lineHeight: 22.2 * height,
    marginLeft: 10 * width,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 15 * height,
  },
  nextBtn: {
    width: 330 * width,
    height: 50 * height,
    backgroundColor: colors.grey,
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

export default GroupSelectScreen;
