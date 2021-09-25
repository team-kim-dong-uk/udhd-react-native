import React from "react";
import {
    StyleSheet, Text,
    View
} from "react-native";
import { colors, fonts, height, width } from "../../util/StyleUtil";
import CancelIcon from '../../../assets/cancel-icon-no-border.svg';
import UserIcon from '../../../assets/user-icon-no-border.svg';
import TagIcon from '../../../assets/tag-icon-no-border.svg';
import { Pressable } from "react-native";

const Tag = ({text, type, onPressTag}) => {

    return (
      <View style={styles.tagContainer}>
        {
          type === 'TAG' ? <TagIcon
                            width={12 * width}
                            height={12 * height}
                            viewBox='0 0 48 48'
                            style={styles.icon}
                          />
          : type === 'USER' ? <UserIcon
                                width={12 * width}
                                height={12 * height}
                                viewBox='0 0 48 48'
                                style={styles.icon}
                              />
          : null
        }
        <Text style={styles.text}>{text}</Text>
        <Pressable onPress={() => onPressTag(text)}>
          <CancelIcon
            width={12 * width}
            height={12 * height}
            viewBox='0 0 48 48'
            style={styles.cancelBtn}
          />
        </Pressable>
      </View>

    );
};
const styles = StyleSheet.create({
  tagContainer: {
    height: 24 * height,
    borderRadius: 5 * width,
    borderWidth: 1 * width,
    borderColor: colors.grey,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5 * width,
  },
  icon: {
    marginLeft: 8 * width,
    marginRight: 5 * width,
  },
  text: {
    fontFamily: fonts.NotoSansCJKkr,
    fontSize: 10 * width,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: colors.black,
  },
  cancelBtn: {
    marginLeft: 8 * width,
    marginRight: 6 * width,
  }
})
export default Tag;
