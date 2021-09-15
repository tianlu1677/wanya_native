import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Platform, KeyboardAvoidingView} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import {ScrollList, Toast} from '@/components';
import BaseComment from '@/components/Item/base-comment';
import {IsIos, STATUS_BAR_HEIGHT} from '@/utils/navbar';
import {getCommentList, createComment} from '@/api/comment_api';

const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

const ProductCommentList = props => {
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  const Offset = IsIos ? headerHeight : STATUS_BAR_HEIGHT + 55;
  const {route, navigation} = props;
  const productId = route.params.productId;
  const comment = useSelector(state => state.home.commentContent);

  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);

  const getValueLength = str => (str ? str.replace(/\s+/g, '').length : 0);

  const onChangeValue = text => {
    if (getValueLength(text) >= getValueLength(value)) {
      if (text.substr(-1) === '@') {
        navigation.push('AddMentionAccount', {type: 'comment'});
        const saveComments = {...comment, content: text.substr(0, text.length - 1)};
        dispatch({type: action.SAVE_COMMENT_CONTENT, value: saveComments});
      }
    }
    setValue(text);
  };

  const onCreateComment = () => setVisible(true);

  const publishComment = async () => {
    setVisible(false);
    const data = {...comment, content: value};
    const params = {
      placeholder: '写点评论吧',
      comment: {
        comment_type: 'topic',
        content: data.content,
        mention_ids: data.mention_ids || '',
        commentable_type: 'Product',
        commentable_id: productId,
        target_comment_id: data.target_comment_id || '',
      },
    };

    try {
      Toast.showLoading('发送中');
      await createComment(params);
      Toast.hide();
      dispatch({type: action.SAVE_COMMENT_CONTENT, value: {}});
      Toast.show('评论成功啦');
      setValue('');
    } catch {
      Toast.hide();
    }

    loadData();
  };

  const handlePraise = (item, index) => {
    listData[index] = item;
    setListData([...listData]);
  };

  const handleReply = () => setVisible(true);

  const renderItem = ({item, index}) => (
    <BaseComment
      index={index}
      data={item}
      handlePraise={handlePraise}
      handleReply={handleReply}
      loadData={loadData}
      topicId={productId}
      commentable_type="Product"
    />
  );

  const loadData = async (page = 1) => {
    if (page === 1) {
      setLoading(true);
    }
    const params = {item_id: productId, item_type: 'Product', page};
    const res = await getCommentList(params);
    const data = res.data.comments;
    setHeaders(res.headers);
    setListData(page === 1 ? data : [...listData, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [props.detail]);

  return (
    <KeyboardAvoidingView
      behavior={behavior}
      keyboardVerticalOffset={Offset}
      style={styles.wrapper}>
      <ScrollList
        data={listData}
        loading={loading}
        onRefresh={loadData}
        headers={headers}
        renderItem={renderItem}
        enableRefresh={false}
        bounces={false}
        renderSeparator={() => <View style={styles.separator} />}
        settings={{showsVerticalScrollIndicator: false}}
        from="comment"
        {...props}
      />
      {visible ? (
        <View style={styles.actionWrapper}>
          <TextInput
            style={styles.input}
            placeholder={comment.placeholder}
            onChangeText={onChangeValue}
            value={value}
            autoFocus
            onBlur={() => setVisible(false)}
          />
          <Text
            style={[styles.sendBtn, {color: value ? '#000' : '#bdbdbd'}]}
            onPress={publishComment}>
            发送
          </Text>
        </View>
      ) : (
        <View style={styles.actionWrapper}>
          <Text style={styles.text} onPress={onCreateComment}>
            快来评论吧
          </Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },
  separator: {
    borderBottomColor: '#ebebeb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginLeft: 49,
  },
  actionWrapper: {
    height: 57,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    borderTopColor: '#ebebeb',
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fff',
  },
  text: {
    flex: 1,
    height: 35,
    lineHeight: 35,
    color: '#BDBDBD',
    fontSize: 13,
    backgroundColor: '#f2f3f5',
    borderRadius: 17,
    overflow: 'hidden',
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 35,
    alignItems: 'center',
    backgroundColor: '#f2f3f5',
    borderRadius: 15,
    overflow: 'hidden',
    padding: 0,
    paddingLeft: 19,
  },
  sendBtn: {
    width: 60,
    height: 35,
    backgroundColor: '#f2f3f5',
    lineHeight: 35,
    borderRadius: 15,
    overflow: 'hidden',
    textAlign: 'center',
    fontSize: 13,
    marginLeft: 10,
  },
});

export default ProductCommentList;
