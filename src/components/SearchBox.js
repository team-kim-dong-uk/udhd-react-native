import React, {useCallback, useState} from 'react';
import {Icon, SearchBar} from 'react-native-elements';
import {StyleSheet, Text, TextInput, View} from "react-native";
import useInput from "../hooks/useInput";
import { SearchIcon } from 'native-base';
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";

const SearchBox = ({keyword, onChangeKeyword, onSubmit, targetKeyword, runByTarget}) => {
    const [showSearchIcon, setShowSearchIcon] = useState(true);

    const detectTarget = useCallback((key) => {
        if (key === targetKeyword) {
            runByTarget()
            console.log("changeKeyword ' ' " + keyword);
        }
    },[runByTarget]);

    const onChangeSearchIcon = useCallback((e) => {
        setShowSearchIcon((prev) => !prev);
    }, []);

    return (
        <NativeBaseProvider>
        <View style={styles.searchContainer}>
            {showSearchIcon && (<SearchIcon style={styles.searchIcon}/>)}

            <TextInput style={styles.input}
                       placeholder="Type Tag here!"
                       onChange={onChangeKeyword}
                       defaultValue={keyword}
                       onFocus={onChangeSearchIcon}
                       onBlur={onChangeSearchIcon}
                       onSubmitEditing={onSubmit}
                       onKeyPress={({ nativeEvent }) => {
                           detectTarget(nativeEvent.key)
                       }}
            >

            </TextInput>
        </View>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        flex:1,
        /*width: 170,*/
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20
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
