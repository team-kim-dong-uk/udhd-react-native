import React from "react";
import {
    StyleSheet, Text, TouchableOpacity,
    View
} from "react-native";

const Tag = ({show, text, onPressTag}) => {

    if(!show)
        return;
    return (
        <TouchableOpacity activeOpacity = { 0.5 } onPress={onPressTag}>
            <View>
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>

    );
};

export default Tag;
