import React from "react";
import {
    Pressable,
    StyleSheet, Text, TouchableOpacity,
    View
} from "react-native";
import {useNavigation} from "@react-navigation/native";
import BackButton from '../../../assets/back-button.svg';
import DownButton from '../../../assets/down-arrow.svg';
import { height, width } from "../../util/StyleUtil";

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
            <View style={styles.title}>
                    <Text>
                        {title}
                    </Text>
            </View>
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
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    title:{
        position: 'absolute',
        width: '100%',
        height: '100%',
        minHeight: 65,
        alignItems: 'center',
        justifyContent: "center",
        zIndex: 1
    },
    rightBox:{
        width: '25%',
        height: '100%',
        alignItems: 'center',
        justifyContent: "center",
        zIndex: 2,
    },
    backButton:{
        position: 'absolute',
        left: 15 * width,
        width: 20 * width,
        height: 20 * height,
        zIndex: 2,
    }
})
export default CommonHeader;
