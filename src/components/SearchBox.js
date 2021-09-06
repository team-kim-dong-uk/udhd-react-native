import React, {useCallback, useState} from 'react';
import {Icon, SearchBar} from 'react-native-elements';
import {StyleSheet, Text, TextInput, View} from "react-native";
import useInput from "../hooks/useInput";
import { SearchIcon } from 'native-base';
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";

const SearchBox = ({keyword, setKeyword, onChangeKeyword, onSubmit, runByTarget}) => {
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const [showSearchIcon, setShowSearchIcon] = useState(true);

    const detectTarget = useCallback((key) => {
        if(runByTarget(key)){
            // IF 안으로 들어와도 setKeyword가 작동하지 않음. 다만 setKeyword가 조건문 안에 없으면 바로 작동함
            //setKeyword('');
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
