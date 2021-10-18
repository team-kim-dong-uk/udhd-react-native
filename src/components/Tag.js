import React from "react";
import {Platform, Pressable, StyleSheet, Text, Vibration} from "react-native";
import {colors, fonts, height, width} from "../util/StyleUtil";
import TagIcon from '../../assets/tag-icon-no-border.svg';

const Tag = ({text, onPressTag, onLayout, onLongPress}) => {
    const ONE_SECOND_IN_MS = 1000;

    const PATTERN = [
        100, 100, 50, 100
    ];

    return (
        <Pressable
            activeOpacity = { 0.5 }
            onPress={() => {if(onPressTag) onPressTag(text)}}
            onLongPress={() => {
                if(onLongPress) {
                    onLongPress();
                    Vibration.vibrate(Platform.OS === 'ios' ? 500 : PATTERN);
                }
            }}
            onLayout={onLayout}
            style={styles.tagContainer}
        >
            <TagIcon
                width={12 * width}
                height={12 * height}
                viewBox='0 0 48 48'
            />
            <Text style={styles.text}>{text}</Text>
        </Pressable>

    );
};
const styles = StyleSheet.create({
    tagContainer: {
        marginRight: 5 * width,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 8 * width,
        paddingRight: 10 * width,
        borderRadius: 5 * width,
        borderStyle: "solid",
        borderWidth: 1 * width,
        borderColor: colors.grey,
        height: 24 * height,
        marginBottom: 5 * height,
    },
    text: {
        fontFamily: fonts.NotoSansCJKkr,
        fontSize: 10 * width,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: colors.black,
        marginLeft: 5 * width,
    },
})
export default Tag;
