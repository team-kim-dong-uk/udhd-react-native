import React, {useCallback, useState} from 'react';
import {Icon, SearchBar} from 'react-native-elements';
import {StyleSheet, Text, TextInput, View} from "react-native";
import useInput from "../hooks/useInput";
import { SearchIcon } from 'native-base';
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";

const SearchBox = ({keyword, setKeyword, onChangeKeyword, onSubmit, targetKeyword, runByTarget}) => {
    const [showSearchIcon, setShowSearchIcon] = useState(true);

    const detectTarget = useCallback((key) => {
        if (targetKeyword.includes(key)) {
            runByTarget();
            setKeyword("");
            console.log("3. changeKeyword : " + keyword);
        }
    },[runByTarget, keyword]);

    const onChangeSearchIcon = useCallback((e) => {
        setShowSearchIcon((prev) => !prev);
    }, []);

    return (
        <NativeBaseProvider>
        <View style={styles.searchBox}>
            {showSearchIcon && (<SearchIcon style={styles.searchIcon}/>)}

            <TextInput style={styles.input}
                       placeholder="Type Tag here!"
                       onChangeText={onChangeKeyword}
                       value={keyword}
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
    searchBox: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
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
