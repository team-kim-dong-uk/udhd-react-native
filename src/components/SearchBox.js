import React, {useState} from 'react';
import { SearchBar } from 'react-native-elements';
import {StyleSheet, TextInput, View} from "react-native";
import useInput from "../hooks/useInput";

const SearchBox = () => {
    const [keyword, onChangeKeyword] = useInput('');

    return (
        <View style={styles.box}>
            <TextInput style={styles.input}
                       placeholder="Type Tag here!"
                       onChange={onChangeKeyword}
                       defaultValue={keyword}>
            </TextInput>

        </View>
    )
}
const styles = StyleSheet.create({
    box: {
        width: 180,
    }
});

export default SearchBox;
