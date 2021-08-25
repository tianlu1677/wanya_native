import AsyncStorage from '@react-native-community/async-storage';
import Clipboard from '@react-native-community/clipboard';

import dayjs from 'dayjs';

export default class Helper {
  static async setData(name, value) {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (e) {
      return '';
    }
  }

  static async getData(name) {
    try {
      let value = await AsyncStorage.getItem(name);
      value = value === null || value === undefined ? '' : value;
      return value;
    } catch (e) {
      return '';
    }
  }

  static async removeData(name) {
    await AsyncStorage.removeItem(name);
  }

  static async clearAllData() {
    const agree_modal = await Helper.getData('agree_policy');
    await AsyncStorage.clear();
    Helper.setData('agree_policy', agree_modal);
    return true;
  }

  static async getAllKeys() {
    const keys = await AsyncStorage.getAllKeys();
    return keys;
  }

  static async multiSet(data = []) {
    await AsyncStorage.multiSet(data);
  }

  static async multiGet(data = []) {
    const res = await AsyncStorage.multiGet(data);
    return res;
  }

  // 获取粘贴板信息
  static setClipboard(content) {
    Clipboard.setString(content);
  }

  static async getClipboard() {
    await Clipboard.getString();
  }

  // 获取uuid
  static generateUuid() {
    var result, i, j;
    result = '';
    for (j = 0; j < 32; j++) {
      if (j == 8 || j == 12 || j == 16 || j == 20) result = result + '-';
      i = Math.floor(Math.random() * 16)
        .toString(16)
        .toLowerCase();
      result = result + i;
    }
    return result;
  }

  static fromToNow(time) {
    return dayjs(time).locale('zh-cn').format();
  }

  static isNotNullAndUndefined(obj, props = []) {
    let bIsNullorUndefined = obj === null || obj === undefined;
    let curObj = null;

    if (!bIsNullorUndefined) {
      curObj = obj;
      if (props !== null) {
        for (let idx = 0; idx < props.length; idx++) {
          bIsNullorUndefined = curObj[props[idx]] === null || curObj[props[idx]] === undefined;
          curObj = curObj[props[idx]]; // Set the curObj[props[idx]] to curObj so that it will recursive down the depth of the object

          if (bIsNullorUndefined) break;
        }
      }
    }

    return !bIsNullorUndefined;
  }

  static carefullyGetValue(obj, props = [], defaultValue = '') {
    let bIsNullorUndefined = obj === null || obj === undefined;
    let curObj = null;

    if (!bIsNullorUndefined) {
      curObj = obj;
      if (props !== null) {
        for (let idx = 0; idx < props.length; idx++) {
          bIsNullorUndefined = curObj[props[idx]] === null || curObj[props[idx]] === undefined;
          curObj = curObj[props[idx]]; // Set the curObj[props[idx]] to curObj so that it will recursive down the depth of the object

          if (bIsNullorUndefined) break;
        }
      }
    }

    if (bIsNullorUndefined) return defaultValue;
    else return curObj;
  }
}
