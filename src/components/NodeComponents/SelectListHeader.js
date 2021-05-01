import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import PropTypes from 'prop-types';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';

const ReturnSaveData = data =>
  data.map(item => {
    const {type, content} = item;
    if (type === 'single') {
      item = {...item, value: content[0].search_key};
    }
    if (type === 'multi') {
      const newContent = content.map(itemContent => {
        return {...itemContent, check: false};
      });
      item = {...item, value: [], content: newContent};
    }
    return item;
  });

const returnParams = data => {
  let query = '';
  data.map(item => {
    if (item.type === 'single' && item.value) {
      query += item.value;
    }
    if (item.type === 'multi' && item.value.length > 0) {
      query += `&${item.keyin}=${item.value}`;
    }
  });
  return query;
};

const SelectListHeader = props => {
  const {data, getParams} = props;
  const [visible, setVisible] = useState(false);
  const [saveData, setSaveData] = useState(ReturnSaveData(data));
  const [current, setCurrent] = useState(saveData[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const loadParams = value => {
    getParams(returnParams(value));
  };

  const handleOpenModal = (item, index) => {
    setCurrentIndex(index);
    setCurrent(item);
    setVisible(true);
  };

  const handleSingleItem = item => {
    const {name, search_key} = item;
    const copyData = JSON.parse(JSON.stringify(saveData));
    copyData[currentIndex] = {...copyData[currentIndex], name, value: search_key};
    setSaveData(copyData);
    setCurrent(copyData[currentIndex]);
    setVisible(false);
    loadParams(copyData);
  };

  const handleMultiItem = (item, index) => {
    const copyData = JSON.parse(JSON.stringify(saveData));
    const activeContent = current.content[index];
    copyData[currentIndex].content[index] = {...activeContent, check: !activeContent.check};
    setSaveData(copyData);
    setCurrent(copyData[currentIndex]);
  };

  const updateData = checkValue => {
    const copyData = JSON.parse(JSON.stringify(saveData));
    copyData[currentIndex].value = checkValue;
    copyData[currentIndex].content.map(item => {
      item.check = checkValue.includes(item.id) ? true : false;
    });
    setSaveData(copyData);
    setCurrent(copyData[currentIndex]);
    setVisible(false);
    return copyData;
  };

  const handleCloseModal = () => {
    const checkValue = current.value;
    updateData(checkValue);
  };

  const handleSuccess = () => {
    const checkValue = current.content.filter(item => item.check).map(item => item.id);
    const copyData = updateData(checkValue);
    loadParams(copyData);
  };

  const handleRemove = () => {
    const copyData = JSON.parse(JSON.stringify(saveData));
    copyData[currentIndex] = {
      ...copyData[currentIndex],
      value: [],
      content: copyData[currentIndex].content.map(item => {
        return {...item, check: false};
      }),
    };
    setSaveData(copyData);
    setCurrent(copyData[currentIndex]);
    setVisible(false);
  };

  useEffect(() => {
    const copyData = JSON.parse(JSON.stringify(saveData));
    loadParams(copyData);
  }, []);

  return (
    <>
      <View style={styles.wrapper}>
        {saveData.map((item, index) => {
          const isCurrent = current.name === item.name;
          const colorStyle = isCurrent
            ? {color: '#000', fontWeight: '500'}
            : {color: '#7F7F81', fontWeight: '400'};
          return (
            <Pressable
              key={index}
              style={styles.itemWrapper}
              onPress={() => handleOpenModal(item, index)}>
              <Text style={[styles.name, colorStyle]}>{item.name}</Text>
              <IconFont size={RFValue(7)} name={isCurrent ? 'upper' : 'down'} color={colorStyle} />
            </Pressable>
          );
        })}
      </View>

      <View style={[styles.modalWrapper, {display: visible ? 'flex' : 'none'}]}>
        <Pressable style={styles.opacity} onPress={() => handleCloseModal()} />
        <View style={styles.modalContent}>
          {/* 单选 */}
          {current.type === 'single' && (
            <View style={styles.singleWrapper}>
              {current.content.map((item, index) => {
                const isCurrent = current.name === item.name;
                const colorStyle = {color: isCurrent ? '#FF8D00' : '#000'};
                return (
                  <Pressable
                    key={index}
                    style={styles.bottomLine}
                    onPress={() => handleSingleItem(item)}>
                    <Text style={[styles.contentText, colorStyle]}>{item.name}</Text>
                  </Pressable>
                );
              })}
            </View>
          )}
          {/* 多选 */}
          {current.type === 'multi' && (
            <View style={styles.multipleWrapper}>
              <View style={styles.multipleContent}>
                <Text style={styles.multipleTitle}>{current.name}</Text>
                <View style={styles.multipleTagsWrapper}>
                  {current.content.map((item, index) => {
                    const colorStyle = {color: item.check ? '#FF8D00' : '#000'};
                    return (
                      <Text
                        key={index}
                        style={[styles.multipleTag, colorStyle]}
                        onPress={() => handleMultiItem(item, index)}>
                        {item.name}
                      </Text>
                    );
                  })}
                </View>
              </View>
              <View style={styles.multipleBottom}>
                <Text style={[styles.multipleBtn, styles.removeBtn]} onPress={handleRemove}>
                  清空
                </Text>
                <Text style={[styles.multipleBtn, styles.successBtn]} onPress={handleSuccess}>
                  完成
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

const position = {position: 'absolute', left: 0, right: 0, top: RFValue(40), bottom: 0};
const styles = StyleSheet.create({
  wrapper: {
    height: RFValue(40),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  itemWrapper: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  name: {
    marginRight: 6,
  },
  modalWrapper: {
    ...position,
    zIndex: 1,
  },
  opacity: {
    ...position,
    backgroundColor: '#000',
    opacity: 0.5,
  },
  modalContent: {
    backgroundColor: '#fff',
  },
  contentText: {
    height: RFValue(40),
    lineHeight: RFValue(40),
  },
  bottomLine: {
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  singleWrapper: {
    paddingLeft: 14,
  },
  multipleContent: {
    paddingHorizontal: 14,
  },
  multipleTitle: {
    height: RFValue(45),
    lineHeight: RFValue(45),
  },
  multipleTagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: RFValue(20),
  },
  multipleTag: {
    height: RFValue(30),
    lineHeight: RFValue(30),
    paddingHorizontal: 25,
    backgroundColor: '#F2F3F5',
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  multipleBottom: {
    height: RFValue(45),
    lineHeight: RFValue(45),
    flexDirection: 'row',
    backgroundColor: '#000000',
  },
  multipleBtn: {
    textAlign: 'center',
    lineHeight: RFValue(45),
    fontSize: 15,
  },
  removeBtn: {
    width: '27%',
    backgroundColor: '#FAFAFA',
    color: '#000',
  },
  successBtn: {
    width: '73%',
    color: '#fff',
    backgroundColor: '#000000',
  },
});

SelectListHeader.propTypes = {
  data: PropTypes.array.isRequired,
  getParams: PropTypes.func.isRequired,
};

export default SelectListHeader;
