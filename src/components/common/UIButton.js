import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { height, width } from '../../util/StyleUtil';


export const UIButton = (props) => {
    const { title = 'Enter', style = {}, textStyle = {}, onPress, disabled } = props;

    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]} disabled={disabled}>
            <Text style={[styles.text, textStyle]}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        height: 50 * height,
        borderRadius: 5 * width,
        borderWidth: 1 * width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },

    text: {
      textAlign: 'center',
      margin: 8,
      fontSize: 16,
      color: 'black',
    },
});