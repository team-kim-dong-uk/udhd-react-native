import React from "react";
import {
    Pressable,
    StyleSheet, Text, TouchableOpacity,
    View
} from "react-native";
import {useNavigation} from "@react-navigation/native";
import BackButton from '../../../assets/back-button.svg';
import DownButton from '../../../assets/down-arrow.svg';
import { colors, fonts, height, width } from "../../util/StyleUtil";

const CommonHeader = ({back, children, title}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.headerContainer}>
            <Pressable onPress={()=>navigation.goBack()}
                       style={styles.backButton}
            >
                {back === 'left' && <BackButton
                                        width={10 * width}
                                        height={20 * height}
                                        viewBox='0 0 40 80'
                                    />}
                {back === 'bottom' && <DownButton
                                        width={20 * width}
                                        height={20 * height}
                                        viewBox='0 0 80 80'
                                    />}
            </Pressable>
            <Text style={styles.title}>
                {title}
            </Text>
            <View style={styles.rightBox}>
                {children}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        height: 55 * height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
    },
    title:{
        fontFamily: fonts.NotoSansCJKkr,
        fontSize: 16 * width,
        fontWeight: "500",
        fontStyle: "normal",
        lineHeight: 22 * height,
        letterSpacing: 0,
        textAlign: "center",
        color: colors.black,
    },
    rightBox:{
        position: 'absolute',
        alignItems: 'center',
        justifyContent: "center",
    },
    backButton:{
        position: 'absolute',
        left: 15 * width,
        width: 20 * width,
        height: 20 * height,
    }
})
export default CommonHeader;
