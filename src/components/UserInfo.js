import React from "react";
import {
    StyleSheet, Text, TouchableOpacity,
    View
} from "react-native";
import { colors, fonts, height, width } from "../util/StyleUtil";

const UserInfo = ({user}) => {
  
  return (
    user ?
    <View style={styles.container}>
      {/*TODO: profile image setting*/}
      <View style={styles.profileImage}></View>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={styles.infoType}>등급</Text>
          <Text style={styles.infoContent}>일반회원</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoType}>업로드</Text>
          <Text style={styles.infoContent}>{user.numUploadedPhotos}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoType}>보유사진</Text>
          <Text style={styles.infoContent}>{user.numAlbumPhotos}</Text>
        </View>
      </View>
    </View>
    : <View style={styles.container}></View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 360 * width,
    height: 75 * height,
  },
  profileImage: {
    width: 50 * width,
    height: 50 * height,
    marginLeft: 15 * width,
    borderRadius: 25 * width,
    backgroundColor: colors.grey,
  },
  infoContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: -5 * width,
  },
  info: {
    marginRight: 40 * width,
    alignItems: 'center',
  },
  infoType: {
    lineHeight: 20 * height,
    fontFamily: fonts.NotoSansCJKkr,
    fontSize: 13 * width,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.33 * width,
    textAlign: "center",
    color: colors.black,
  },
  infoContent: {
    lineHeight: 20 * height,
    fontFamily: fonts.NotoSansCJKkr,
    fontSize: 13 * width,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: -0.33 * width,
    textAlign: "center",
    color: colors.black
  }
})
export default UserInfo;
