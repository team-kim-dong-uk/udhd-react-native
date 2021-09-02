import React, {useCallback, useState} from 'react';
import {Icon, SearchBar} from 'react-native-elements';
import {StyleSheet, Text, TextInput, View} from "react-native";
import useInput from "../hooks/useInput";
import { SearchIcon } from 'native-base';
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";

const SearchBox = ({keyword, onChangeKeyword, onSubmit}) => {
    const [showSearchIcon, setShowSearchIcon] = useState(true);

    /*const makeTagByKeyword = useCallback(() => {
        console.log("detect space, keyword ==" + keyword);
        setKeyword('');
    }, [keyword]);

    const onKeydownSearch = useCallback((key) => {
        if (key === ' ') {
            makeTagByKeyword()

            console.log("changeKeyword ' ' " + keyword);
        }
    },[makeTagByKeyword]);*/


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
                       /*onKeyPress={({ nativeEvent }) => {
                           onKeydownSearch(nativeEvent.key)
                       }}*/
            >

            </TextInput>
        </View>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        width: 170,
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
