import React from "react";
import {
    StyleSheet, Text,
    View
} from "react-native";
import { colors, fonts, height, width } from "../../util/StyleUtil";
import UserIcon from '../../../assets/user-icon-white.svg';
import TagIcon from '../../../assets/tag-icon-white.svg';

const SearchBoxTag = ({type, keyword}) => {

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
        <Text style={styles.text}>{keyword}</Text>
      </View>

    );
};
const styles = StyleSheet.create({
  tagContainer: {
    height: 21 * height,
    borderRadius: 2 * width,
    backgroundColor: colors.tagGrey,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5 * width,
  },
  icon: {
    marginLeft: 5 * width,
    marginRight: 4 * width,
  },
  text: {
    fontFamily: fonts.NotoSansCJKkr,
    fontSize: 10 * width,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: colors.white,
    marginRight: 8 * width,
  },
})
export default SearchBoxTag;
