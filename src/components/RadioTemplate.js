import React from "react";
import {
    Pressable,
    StyleSheet, Text,
    View
} from "react-native";
import {width} from "../util/StyleUtil";
import { RadioButton } from 'react-native-paper';

const RadioTemplate = ({currentChecked, value, text, onPress}) => {
    return (
        <Pressable style={styles.sortBox}
                    onPress={() => {onPress(value); console.log("얍!!!" +value)}}>
            <RadioButton
                value={value}
                status={ currentChecked === value ? 'checked' : 'unchecked' }
            />
            <Text>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    sortBox: {
        flexDirection: 'row',
        width: '50%',
        paddingLeft: 15 * width,
    }
})
export default RadioTemplate;
