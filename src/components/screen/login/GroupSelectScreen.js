import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SelectMultiple from 'react-native-select-multiple'
import { setGroup } from '../../../core/redux/auth';

const GroupSelectScreen = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const groups = ['오마이걸', '그룹1', '그룹2', '그룹3', '그룹4'];
  const [selectedGroups, setSelectedGroups] = useState([]);

  const onSelectionsChange = (selected) => {
    setSelectedGroups(selected);
  }

  const onBtnClick = () => {
    if (selectedGroups.length === 0) {
      alert('연예인을 선택하세요');
      return;
    }
    dispatch(setGroup.request({
      userId: auth.data.userId,
      group: selectedGroups.map(item => item.value)[0],
    }));
  }
  
  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.title}>어떤 연예인을 좋아하세요?</Text>
      <Text>(최대 1개)</Text>
      </View>
      <View style={styles.optionContainer}>
        <SelectMultiple
          items={groups}
          selectedItems={selectedGroups}
          onSelectionsChange={onSelectionsChange}
          maxSelect={1}
        />
      </View>
      <View style={styles.nextBtn}>
        <Button
          title='선택완료'
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
  optionContainer: {
    height: '60%',
    width: '100%',
  },
  textInput: {
    borderBottomColor: 'black'
  },
  nextBtn: {
    width: '90%'
  }
});

export default GroupSelectScreen;
