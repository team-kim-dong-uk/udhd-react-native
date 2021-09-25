import React from "react";
import {
    Pressable,
    StyleSheet, Text, TouchableOpacity,
    View
} from "react-native";
import {useNavigation} from "@react-navigation/native";

const CommonHeader = ({back, children, title}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.headerContainer}>
            <Pressable onPress={()=>navigation.goBack()}
                       style={styles.backButton}
            >
                {back === 'left' && <Text>(((</Text>}
                {back === 'bottom' && <Text>V</Text>}
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
        height: 65,
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
        width: '15%',
        height: '100%',
        alignItems: 'center',
        justifyContent: "center",
        zIndex: 2,
    }
})
export default CommonHeader;
