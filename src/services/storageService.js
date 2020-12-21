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
    const test = JSON.parse('hello');
    console.log(test);
    console.log(typeof test);
    const test2 = JSON.parse(
      JSON.stringify({
        hey: 'sup'
      })
    );
    console.log(test2);
    console.log(typeof test2);
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
