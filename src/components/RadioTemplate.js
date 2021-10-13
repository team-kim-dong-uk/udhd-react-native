import React from "react";
import {Pressable, StyleSheet, Text} from "react-native";
import {fonts} from "../util/StyleUtil";
import {RadioButton} from 'react-native-paper';

const RadioTemplate = ({currentChecked, value, text, onPress}) => {
    return (
        <Pressable style={styles.sortBox}
                    onPress={() => onPress(value)}
        >
            <RadioButton
                value={value}
                status={ currentChecked === value ? 'checked' : 'unchecked' }
                onPress={() => onPress(value)}
                color="#fbae17"
            />
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    sortBox: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
    },
    text:{
        fontFamily: fonts.NotoSansCJKkr,
        fontSize: 15,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 22,
        letterSpacing: 0,
        textAlign: "left",
        color: "#222222",
    }
})
export default RadioTemplate;
