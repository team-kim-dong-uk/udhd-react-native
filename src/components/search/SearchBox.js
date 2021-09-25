import React, {useCallback, useEffect, useState} from 'react';
import {Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import { SearchIcon } from 'native-base';
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import  {finishSearching, startSearching} from "../../core/redux/searching";
import {useDispatch, useSelector} from "react-redux";
import { colors, fonts, height, width } from '../../util/StyleUtil';

const SearchBox = ({keyword, onChangeKeyword, onChange, onSubmit, onFocus, style}) => {
  return (
    // <NativeBaseProvider>
      <View style={[styles.searchBox, style]}>
        <TextInput  //TODO: Text vertical align center
          style={styles.input}
          placeholder="검색어를 입력해주세요"
          onChangeText={onChangeKeyword}
          onChange={onChange}
          value={keyword}
          onFocus={onFocus}
          onSubmitEditing={onSubmit}
        />
      </View>
    // </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
    searchBox: {
      width: 260 * width,
      height: 30 * height,
      borderRadius: 5 * width,
      backgroundColor: colors.inputGrey,
    },
    input: {
      fontFamily: fonts.NotoSansCJKkr,
      fontSize: 12 * width,
      fontWeight: 'normal',
      fontStyle: 'normal',
      letterSpacing: 0,
      textAlign: 'left',
      textAlignVertical: 'center',
      color: colors.black,
      paddingLeft: 10 * width,
    }
});

export default SearchBox;
