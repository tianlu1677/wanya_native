import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, Dimensions, Text, TouchableHighlight, View} from 'react-native';

const PRIMARY_COLOR = 'rgb(0,98,255)';
const WHITE = '#ffffff';
const BORDER_COLOR = '#DBDBDB';

const ActionSheetAndroid = props => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const {actionItems} = props;

  const cancelItem = {
    id: '#cancel',
    label: '取消',
    type: 'cancel',
    onPress: props?.onCancel,
  };

  const actionSheetItems = [...actionItems, cancelItem];

  useEffect(() => {
    setShowActionSheet(props.showActionSheet);
  }, [props.showActionSheet]);

  const onPressItem = actionItem => {
    // console.log('xxxxxxxxxxx');

    actionItem.onPress();
    setShowActionSheet(false);
    if (props.changeModal) {
      props.changeModal(false);
    }
  };

  // console.log('showActionSheet1', props)
  return (
    <Modal
      onBackdropPress={() => onPressItem(cancelItem)}
      isVisible={showActionSheet}
      transparent={true}
      animationIn={'slideInUp'}
      statusBarTranslucent
      useNativeDriver={false}
      animationInTiming={400}
      // deviceHeight={Dimensions.get("window").height}
      // animationOutTiming={400}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
      }}>
      <View style={styles.modalContent}>
        {actionSheetItems.map((actionItem, index) => {
          return (
            <TouchableHighlight
              style={[
                styles.actionSheetView,
                index === 0 && {
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                },
                index === actionSheetItems.length - 2 && {
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                },
                index === actionSheetItems.length - 1 && {
                  borderBottomWidth: 0,
                  backgroundColor: WHITE,
                  marginTop: 8,
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                },
              ]}
              underlayColor={'#f7f7f7'}
              key={index}
              onPress={() => onPressItem(actionItem)}>
              <Text
                allowFontScaling={false}
                style={[styles.actionSheetText, actionItem.type && styles[actionItem.type]]}>
                {actionItem.label}
              </Text>
            </TouchableHighlight>
          );
        })}
      </View>
    </Modal>
  );
};

// const onChangeImage1 = () => {
//   ActionSheetIOS.showActionSheetWithOptions(
//     {
//       options: ['更换背景图', '取消'],
//     },
//     async buttonIndex => {
//       if (buttonIndex === 0) {
//         props.removeAllPhoto();
//         const options = {
//           imageCount: 1,
//           isCrop: true,
//           CropW: screenW * 1,
//           CropH: HEADER_HEIGHT,
//           isCamera: false,
//         };
//         props.imagePick(options, async (err, res) => {
//           if (err) {
//             return;
//           }
//           Toast.showLoading('更换中...');
//           await props.uploadAvatar({
//             uploadType: 'multipart',
//             account_id: currentAccount.id,
//             keyParams: 'account[profile_attributes][background_img]',
//             ...res[0],
//           });
//           dispatch(dispatchCurrentAccount());
//           Toast.hide();
//           Toast.showError('已完成', {duration: 500});
//         });
//       }
//     }
//   );
// };

const styles = StyleSheet.create({
  modalContent: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 20,
  },
  actionSheetText: {
    fontSize: 18,
    color: PRIMARY_COLOR,
  },
  actionSheetView: {
    backgroundColor: WHITE,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: BORDER_COLOR,
  },
  primary: {
    color: PRIMARY_COLOR,
  },
  cancel: {
    color: '#fa1616',
  },
  destroy: {
    color: '#fa1616',
  },
});

ActionSheetAndroid.propTypes = {
  actionItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      label: PropTypes.string,
      onPress: PropTypes.func,
    })
  ).isRequired,
  onCancel: PropTypes.func,
  actionTextColor: PropTypes.string,
};

ActionSheetAndroid.defaultProps = {
  actionItems: [],
  onCancel: () => {},
  actionTextColor: null,
  actionSheet: false,
};

export default ActionSheetAndroid;

// const actionItems = [
//   {
//     id: 1,
//     label: 'Action Item 1',
//     onPress: () => {
//     }
//   },
//   {
//     id: 2,
//     label: 'Action Item 2',
//     onPress: () => {
//     }
//   },
//   {
//     id: 3,
//     label: 'Action Item 3',
//     type: 'primary',
//     onPress: () => {
//     }
//   },
//   {
//     id: 4,
//     type: 'cancel',
//     label: 'Action Item 4',
//     onPress: () => {
//     }
//   },
// ];
