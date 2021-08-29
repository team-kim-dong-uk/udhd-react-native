import React from "react";
import {
    StyleSheet,

    View
} from "react-native";
import Modal from "react-native-modal";

const Filter = ({children, show, onControlModal}) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={show}
            onRequestClose={onControlModal}
            onBackdropPress={onControlModal}
            coverScreen={true}
        >
            <View style={styles.menuView}>
                {children}
            </View>
        </Modal>

    );
};

const styles = StyleSheet.create({
    menuView: {
        position: 'absolute',
        top: 35,
        right: 40,
        width: 100,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 5,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    menuText: {
        marginBottom: 15,
        textAlign: "center",
        width: '100%',
        height: '28',
        padding: '4',
    }
});

export default Filter;
