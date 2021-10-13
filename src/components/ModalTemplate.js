import React from "react";
import {
    StyleSheet,
    View
} from "react-native";
import Modal from "react-native-modal";

const ModalTemplate = ({children, show, onControlModal, onShow, style}) => {

    return (
        <Modal
            style={[style, {margin: 0}]}
            animationType="slide"
            transparent={true}
            visible={show}
            onRequestClose={onControlModal}
            onBackdropPress={onControlModal}
            onShow={onShow}
            coverScreen={true}
        >
            {children}
        </Modal>

    );
};

export default ModalTemplate;
