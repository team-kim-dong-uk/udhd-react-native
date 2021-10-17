import React from "react";
import {
    StyleSheet,
    View
} from "react-native";
import Modal from "react-native-modal";

const ModalTemplate = ({children, show, onControlModal, onShow, animation}) => {

    return (
        <Modal
            style={{margin: 0}}
            animationType={animation ? animation : 'none'}
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
