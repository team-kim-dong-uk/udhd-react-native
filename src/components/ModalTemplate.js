import React from "react";
import {
    StyleSheet,
    View
} from "react-native";
import Modal from "react-native-modal";

const ModalTemplate = ({children, show, onControlModal, onShow, style}) => {

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={show}
            onRequestClose={onControlModal}
            onBackdropPress={onControlModal}
            onShow={onShow}
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
