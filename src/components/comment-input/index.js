import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import Toast from '@/components/Toast';
import {createComment} from '@/api/comment_api';
import * as RootNavigation from '@/navigator/root-navigation';
const CommentInput = ({}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const {commentContent, commentVisible} = useSelector(state => state.home);
  const isCanComment = value ? true : false;

  // const getValueLength = str => {
  //   if (!str) {
  //     return 0;
  //   }
  //   return str.replace(/\s+/g, '').length;
  // };

  const onChangeText = text => {
    // if (getValueLength(text) >= getValueLength(value)) {
    //   if (text.substr(-1) === '@') {
    //     navigation.push('AddMentionAccount', {type: 'comment'});
    //     const saveComments = {...commentContent, content: text.substr(0, text.length - 1)};
    //     dispatch({type: action.SAVE_COMMENT_CONTENT, value: saveComments});
    //   }
    // }

    setValue(text);
  };

  const handlePublishComment = async () => {
    const params = {
      placeholder: commentContent.placeholder,
      comment: {
        comment_type: commentContent.comment_type,
        content: value,
        mention_ids: commentContent.mention_ids,
        commentable_type: commentContent.commentable_type,
        commentable_id: commentContent.commentable_id || '',
        target_comment_id: commentContent.target_comment_id || '',
      },
    };

    try {
      Toast.showLoading('发送中');
      await createComment(params);
      dispatch({type: action.SAVE_COMMENT_CONTENT, value: {content: ''}});
      dispatch({type: action.CHANGE_COMMENT_VISIBLE, value: false});
      Toast.hide();
      Toast.show('评论成功啦');
    } catch (e) {
      Toast.show('评论出错了');
      Toast.hide();
    }
  };

  const onBackdropPress = () => {
    dispatch({type: action.CHANGE_COMMENT_VISIBLE, value: false});
    dispatch({type: action.SAVE_COMMENT_CONTENT, value: {content: ''}});
  };

  useEffect(() => {
    if (commentVisible) {
      setValue('');
    }
  }, [commentVisible]);

  return (
    <Modal
      visible={commentVisible}
      transparent={true}
      onBackdropPress={onBackdropPress}
      onModalHide={onBackdropPress}
      style={{margin: 0}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={styles.content}>
          <Pressable style={styles.content} onPress={onBackdropPress} />
          <View style={styles.wrapper}>
            <TextInput
              value={value}
              onChangeText={onChangeText}
              style={styles.input}
              placeholder="写点评论吧"
              autoFocus
              selectionColor="#ff193a"
            />
            <Text
              style={[styles.sendBtn, {color: isCanComment ? '#000' : '#bdbdbd'}]}
              onPress={isCanComment ? handlePublishComment : null}>
              发送
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderTopColor: '#ebebeb',
    borderTopWidth: 1,
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    backgroundColor: '#f2f3f5',
    overflow: 'hidden',
    padding: 0,
    paddingLeft: 19,
    borderRadius: 15,
  },
  sendBtn: {
    width: 70,
    height: 40,
    lineHeight: 40,
    backgroundColor: '#f2f3f5',
    borderRadius: 15,
    overflow: 'hidden',
    textAlign: 'center',
    fontSize: 13,
    marginLeft: 10,
  },
});

export default CommentInput;
