import React from "react";
import { Image } from "react-native";
import { Text } from "react-native";
import {
    StyleSheet,
    View
} from "react-native";
import { colors, fonts, height, width } from "../util/StyleUtil";
import { UIButton } from "./common/UIButton";
import ModalTemplate from "./ModalTemplate";
import CancelIcon from '../../assets/cancel-icon-black.svg';
import { Pressable } from "react-native";

const UploadOptionModal = ({show, closeModal, openGoogleDrive}) => {

    return (
      <ModalTemplate style={styles.container} show={show} onControlModal={closeModal}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>업로드 선택</Text>
            <Pressable onPress={closeModal} style={styles.closeButton}>
              <CancelIcon
                width={20 * width}
                height={20 * height}
                viewBox='0 0 80 80'
              />
            </Pressable>
          </View>
          <View style={styles.buttonContainer}>
            <UIButton
              title='구글 드라이브로 업로드'
              icon={
                <Image
                  style={[styles.optionIcons, styles.googleIcon]}
                  source={require('../../assets/drawable-hdpi/google_logo.webp')}
                />
              }
              onPress={openGoogleDrive}
              style={styles.optionButtons}
              textStyle={styles.optionButtonTexts}
            />
          </View>
        </View>
     </ModalTemplate>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0.125,0.125,0.125,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    backgroundColor: colors.white,
    borderRadius: 8 * width,
  },
  header: {
    width: 320 * width,
    height: 55 * height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: fonts.NotoSansCJKkr,
    fontSize: 16 * width,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 22 * height,
    letterSpacing: 0,
    textAlign: "center",
    color: colors.black,
  },
  closeButton: {
    position: 'absolute',
    right: 20 * width,
  },
  buttonContainer: {
    width: 320 * width,
    height: 130 * height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionIcons: {
    position: 'absolute',
    left: 25 * width,
  },
  googleIcon: {
    width: 25 * width,
    height: 25 * height,
  },
  optionButtons: {
    width: 280 * width,
    height: 60 * height,
    borderRadius: 5 * width,
    borderWidth: 0.5 * width,
    borderColor: colors.grey,
  },
  optionButtonTexts: {
    fontFamily: fonts.NotoSansCJKkr,
    fontSize: 15 * width,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: colors.black,
  },
});

export default UploadOptionModal;
