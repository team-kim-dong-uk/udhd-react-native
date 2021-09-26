import React from "react";
import {
    StyleSheet,
    View
} from "react-native";
import Modal from "react-native-modal";

const ModalTemplate = ({children, show, onControlModal, style}) => {

    return (
        <Modal
            style={[style, {margin: 0}]}
            animationType="none"
            transparent={true}
            visible={show}
            onRequestClose={onControlModal}
            onBackdropPress={onControlModal}
            coverScreen={true}
        >
            {children}
        </Modal>

    );
};

export default ModalTemplate;
