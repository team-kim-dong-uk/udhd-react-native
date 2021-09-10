import React, {useCallback, useEffect, useState} from 'react';
import {Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import { SearchIcon } from 'native-base';
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import  {finishSearching, startSearching} from "../core/redux/searching";
import {useDispatch, useSelector} from "react-redux";

const SearchBox = ({keyword, onChangeKeyword, onChange, onSubmit, onFocus}) => {
    const { isSearching } = useSelector(state => state);

    return (
        <NativeBaseProvider>
                <View style={styles.searchBox}>
                    {!isSearching && (<SearchIcon style={styles.searchIcon}/>)}

                    <TextInput style={styles.input}
                               placeholder="Type Tag here!"
                               onChangeText={onChangeKeyword}
                               onChange={onChange}
                               value={keyword}
                               onFocus={onFocus}
                               onSubmitEditing={onSubmit}
                    />
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
