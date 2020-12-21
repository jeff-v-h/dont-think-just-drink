import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const storeData = async (storageKey, value) => {
  try {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    await AsyncStorage.setItem(storageKey, stringValue);
  } catch (e) {
    Alert.alert('Storage Error', 'Unable to save to phone storage.');
  }
};

const getData = async (storageKey) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    Alert.alert('Storage Error', 'Unable to get data from phone storage.');
  }
};

const StorageService = {
  storeData,
  getData
};

export default StorageService;
