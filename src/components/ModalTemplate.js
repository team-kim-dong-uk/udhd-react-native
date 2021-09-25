import React from "react";
import {
    StyleSheet,
    View
} from "react-native";
import Modal from "react-native-modal";

const ModalTemplate = ({children, show, onControlModal, style}) => {

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={show}
            onRequestClose={onControlModal}
            onBackdropPress={onControlModal}
            coverScreen={true}
            style={{margin: 0}}
        >
            <View style={style}>
                {children}
            </View>
        </Modal>

    );
};

export default ModalTemplate;
