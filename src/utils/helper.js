import AsyncStorage from '@react-native-community/async-storage';

import dayjs from 'dayjs';

export default class Helper {
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

  static async multiGet(data = []) {

  }

  static fromToNow(time) {
    console.log('time', time)
    return dayjs(time).locale('zh-cn').format()
  }

  static isNotNullAndUndefined(obj, props = []) {
    let bIsNullorUndefined =  obj === null || obj === undefined;
    let curObj = null;

    if(!bIsNullorUndefined) {
      curObj = obj;
      if(props !== null) {
        for(let idx=0; idx < props.length; idx++) {
          bIsNullorUndefined = curObj[props[idx]] === null || curObj[props[idx]] === undefined;
          curObj =  curObj[props[idx]]; // Set the curObj[props[idx]] to curObj so that it will recursive down the depth of the object

          if(bIsNullorUndefined)
            break;
        }
      }
    }

    return !bIsNullorUndefined;
  }

  static carefullyGetValue(obj, props = [], defaultValue='') {
    let bIsNullorUndefined =  obj === null || obj === undefined;
    let curObj = null;

    if(!bIsNullorUndefined) {
      curObj = obj;
      if(props !== null) {
        for(let idx=0; idx < props.length; idx++) {
          bIsNullorUndefined = curObj[props[idx]] === null || curObj[props[idx]] === undefined;
          curObj =  curObj[props[idx]]; // Set the curObj[props[idx]] to curObj so that it will recursive down the depth of the object

          if(bIsNullorUndefined)
            break;
        }
      }
    }

    if(bIsNullorUndefined)
      return defaultValue;
    else
      return curObj;
  }

}
