import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";
import { SearchIcon } from 'native-base';
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import  {finishSearching, startSearching} from "../core/redux/searching";
import {useDispatch, useSelector} from "react-redux";

const SearchBox = ({keyword, onChangeKeyword, onSubmit}) => {
    const dispatch = useDispatch();
    const { isSearching } = useSelector(state => state);
    //TODO 뒤로가기시에 searching 종료
    return (
        <NativeBaseProvider>
        <View style={styles.searchBox}>
            {!isSearching && (<SearchIcon style={styles.searchIcon}/>)}

            <TextInput style={styles.input}
                       placeholder="Type Tag here!"
                       onChangeText={onChangeKeyword}
                       value={keyword}
                       onFocus={() => {dispatch(startSearching())}}
                       /*onBlur={() => {dispatch(finishSearching())}}*/
                       onSubmitEditing={onSubmit}
            >

            </TextInput>
        </View>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    searchBox: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    searchIcon: {
        width: 20,
        height: 20,
    },
    input: {
        marginLeft: 5,
        width: '100%',
    }
});

export default SearchBox;
