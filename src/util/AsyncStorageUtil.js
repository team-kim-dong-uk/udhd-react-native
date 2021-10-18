import AsyncStorage from "@react-native-async-storage/async-storage";

export const getShowGuideFromStorage = async (setState, type) => {
  const val = await AsyncStorage.getItem(`showGuide.${type}`);
  if (val === 'false') {
    setState(false);
  } else {
    await AsyncStorage.setItem(`showGuide.${type}`, 'false')
    setState(true);
  }
}