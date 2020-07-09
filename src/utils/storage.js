import AsyncStorage from '@react-native-community/async-storage';

async function storeData(name, value) {
  try {
    await AsyncStorage.setItem(name, value);
  } catch (e) {
    return ''
  }
}

async function getData(name) {
  try {
    const value = await AsyncStorage.getItem(name);
    return value;
  } catch (e) {
    // error reading value
  }
}

function removeData(name) {
  AsyncStorage.removeItem(name);
}

function clearAllData() {
  AsyncStorage.clear()
}

export {storeData, getData, removeData, clearAllData};
