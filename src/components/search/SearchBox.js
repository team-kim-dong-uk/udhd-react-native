import React from 'react';
import {StyleSheet, TextInput, View} from "react-native";
import { colors, fonts, height, width } from '../../util/StyleUtil';
import CancelIcon from '../../../assets/cancel-icon-round.svg';
import { Pressable } from 'react-native';

const SearchBox = ({keyword, onChangeKeyword, onSubmit, onClearInput, onFocus, style}) => {
  return (
      <View style={[styles.searchBox, style]}>
        <TextInput
          style={styles.input}
          placeholder="검색어를 입력해주세요"
          onChangeText={onChangeKeyword}
          value={keyword}
          onFocus={onFocus}
          onSubmitEditing={onSubmit}
        />
        <Pressable style={styles.cancelIcon} onPress={onClearInput}>
          <CancelIcon
            width={15 * width}
            height={15 * height}
            viewBox='0 0 60 60'
          />
        </Pressable>
      </View>
  )
}

const styles = StyleSheet.create({
    searchBox: {
      width: 260 * width,
      height: 30 * height,
      borderRadius: 5 * width,
      backgroundColor: colors.inputGrey,
      flexDirection: 'row',
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
    },
    cancelIcon: {
      position: 'absolute',
      right: 10 * width,
      top: 7 * height,
    }
});

export default SearchBox;
