import AsyncStorage from '@react-native-community/async-storage';

export default class Store {
  static async storeData(name, value) {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (e) {
      return ''
    }
  }

  static async getData(name) {
    try {
      const value = await AsyncStorage.getItem(name);
      return value;
    } catch (e) {
      return ''
    }
  }

  static async removeData(name) {
    await AsyncStorage.removeItem(name);
  }

  static  async clearAllData() {
    await AsyncStorage.clear()
  }

  static async multiSet(data = []) {
    await AsyncStorage.multiSet(data)
  }
}

// export {storeData, getData, removeData, clearAllData};
// Window.clearData()
