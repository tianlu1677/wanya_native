import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, Text, TouchableHighlight, ActionSheetIOS, View} from 'react-native';

const PRIMARY_COLOR = 'rgb(0,98,255)';
const WHITE = '#ffffff';
const BORDER_COLOR = '#DBDBDB';

const ActionSheet = props => {
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
    actionItem.onPress();
    setShowActionSheet(false);
    if (props.changeModal) {
      props.changeModal(false);
    }
  };

  // console.log('showActionSheet1', actionSheetItems)
  return (
    <>
      {
        showActionSheet && ActionSheetIOS.showActionSheetWithOptions(
          {
            options: actionSheetItems.map((x) => x.label),
            destructiveButtonIndex: actionSheetItems.length - 1,
            // cancelButtonIndex: 2//actionSheetItems.length - 1
          },
          buttonIndex => {
            onPressItem(actionSheetItems[buttonIndex])
          }
        )
      }
    </>
  )
};

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

ActionSheet.propTypes = {
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

ActionSheet.defaultProps = {
  actionItems: [],
  onCancel: () => {},
  actionTextColor: null,
  actionSheet: false,
};

export default ActionSheet;

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
