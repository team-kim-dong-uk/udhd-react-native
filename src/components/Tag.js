import React from "react";
import {
    StyleSheet, Text, TouchableOpacity,
    View
} from "react-native";

const Tag = ({text, onPressTag, onLayout}) => {

    return (
        <TouchableOpacity activeOpacity = { 0.5 }
                          onPress={() => onPressTag(text)}
                          onLayout={onLayout}>
            <View style={styles.tagContainer}>
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>

    );
};
const styles = StyleSheet.create({
    tagContainer: {
        marginLeft: 2,
        marginRight: 2,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "white",
        borderRadius: 20,

    }
})
export default Tag;
