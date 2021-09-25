import React from "react";
import {
    Pressable,
    StyleSheet, Text,
    View
} from "react-native";
import { colors, fonts, height, width } from "../util/StyleUtil";
import TagIcon from '../../assets/tag-icon.svg';
import UserIcon from '../../assets/user-icon.svg';

const RecommendTag = ({item, onPress}) => {

    return (
        <Pressable activeOpacity = { 0.5 } style={{backgroundColor:"red"}}
                          onPress={() => onPress(item.keyword)}>
            <View style={styles.container}>
                <View style={styles.icon}>
                    {item.type === "TAG" && (
                        <TagIcon
                            width={30 * width}
                            height={30 * height}
                            viewBox='0 0 120 120'
                      />
                    )}
                    {item.type === "USER" && (
                        <UserIcon
                            width={30 * width}
                            height={30 * height}
                            viewBox='0 0 120 120'
                      />
                    )}
                </View>
                <View style={styles.itemData}>
                    <Text style={styles.keyword}>{item.keyword}</Text>
                    <Text style={styles.count}>{item.count}개의 짤</Text>
                </View>
            </View>
        </Pressable>
    );
};
const styles = StyleSheet.create({
    container: {
        width: 360 * width,
        height: 45 * height,
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginLeft: 15 * width,
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    keyword: {
        fontFamily: fonts.NotoSansCJKkr,
        fontSize: 14 * width,
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 22 * height,
        letterSpacing: 0,
        textAlign: "left",
        color: colors.black,
        marginLeft: 10 * width,
    },
    count: {
        position: 'absolute',
        right: 15 * width,
        color: colors.grey,
    },
})
export default RecommendTag;
