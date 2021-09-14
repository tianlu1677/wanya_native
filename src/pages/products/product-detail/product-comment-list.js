import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import ScrollList from '@/components/ScrollList';
import BaseComment from '@/components/Item/base-comment';
import {getCommentList, createComment, deleteComment} from '@/api/comment_api';
import {Toast} from '@/components';

const ProductCommentList = props => {
  const dispatch = useDispatch();
  const {route, navigation} = props;
  const productId = route.params.productId;
  const comment = useSelector(state => state.home.commentContent);

  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);

  console.log('comment', comment);

  const getValueLength = str => {
    console.log('sre', str);
    if (!str) {
      return 0;
    }
    return str.replace(/\s+/g, '').length;
  };

  const onChangeValue = text => {
    console.log('asd', value);
    // 输入
    if (getValueLength(text) >= getValueLength(value)) {
      if (text.substr(-1) === '@') {
        navigation.push('AddMentionAccount', {type: 'comment'});
        const saveComments = {...comment, content: text.substr(0, text.length - 1)};
        dispatch({type: action.SAVE_COMMENT_CONTENT, value: saveComments});
      }
    }
    setValue(text);
  };

  const onCreateComment = () => {
    setVisible(true);
  };

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
      //   Toast.showLoading('发送中');
      const res = await createComment(params);
      console.log('res', res);
      dispatch({type: action.SAVE_COMMENT_CONTENT, value: {}});
      Toast.hide();
      Toast.show('评论成功啦');
    } catch {
      Toast.hide();
    }

    loadData();
    console.log('params', params);
  };

  const handlePraise = (item, index) => {
    listData[index] = item;
    setListData([...listData]);
  };

  const deleteCurrentComment = async id => {
    await deleteComment(id);
    loadData();
  };

  const handleReply = () => {
    setVisible(true);
  };

  const renderItem = ({item, index}) => {
    console.log(item);
    return (
      <BaseComment
        data={item}
        index={index}
        handlePraise={handlePraise}
        deleteComment={deleteCurrentComment}
        handleReply={handleReply}
        topicId={productId}
        commentable_type="Product"
      />
    );
  };

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
    <View>
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
    </View>
  );
};

const styles = StyleSheet.create({
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
