import React from "react";
import {
    StyleSheet, Text,
    View
} from "react-native";

const Footer = ({style}) => {

    return (
        <View style={styles.container}>
            <View style={styles.boxContainer}>
                <Text>  [하투]  </Text>
                <Text>  [다운로두]  </Text>
                <Text>  [존잘공유]  </Text>
            </View>
            <View style={styles.box}>
                <Text> [사쿠제]  </Text>
            </View>
        </View>
    );
};

export default Footer;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        width: '100%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    boxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

