import React from 'react';
import {StyleSheet, TextInput, View} from "react-native";
import { colors, fonts, height, width } from '../../util/StyleUtil';

const SearchBox = ({keyword, onChangeKeyword, onSubmit, onFocus, style}) => {
  return (
      <View style={[styles.searchBox, style]}>
        <TextInput  //TODO: Text vertical align center
          style={styles.input}
          placeholder="검색어를 입력해주세요"
          onChangeText={onChangeKeyword}
          value={keyword}
          onFocus={onFocus}
          onSubmitEditing={onSubmit}
        />
      </View>
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
