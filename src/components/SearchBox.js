import React, {useState} from 'react';
import {Icon, SearchBar} from 'react-native-elements';
import {StyleSheet, Text, TextInput, View} from "react-native";
import useInput from "../hooks/useInput";
import { SearchIcon } from 'native-base';
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";

const SearchBox = () => {
    const [keyword, onChangeKeyword] = useInput('');

    return (
        <NativeBaseProvider>
        <View style={styles.searchContainer}>
            <SearchIcon style={styles.searchIcon}/>
            <TextInput style={styles.input}
                       placeholder="Type Tag here!"
                       onChange={onChangeKeyword}
                       defaultValue={keyword}>
            </TextInput>
        </View>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        width: 180,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20
    },
    searchIcon: {
        width: 20,
        height: 20,
    },
    input: {
        marginLeft: 5
    }
});

export default SearchBox;
