import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import IconFont from '@/iconfont';
import {IsIos, BOTTOM_HEIGHT} from '@/utils/navbar';
import {dispatchTopicDetail, dispatchArticleDetail, dispatchShareItem} from '@/redux/actions';
import {createAction, cancelAction} from '@/api/action_api';
import * as action from '@/redux/constants';
import Helper from "@/utils/helper"

const ActionComment = props => {
  const navigation = useNavigation();
  const comment = useSelector(state => state.home.commentContent);
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [praise, setPraise] = useState(props.detail.praise);
  const [star, setStar] = useState(props.detail.star);

  const getValueLength = str => {
    if (!str) {
      return 0;
    }
    return str.replace(/\s+/g, '').length;
  };

  const onChangeValue = text => {
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

  const onCreateComment = v => {
    const commentContent = {
      placeholder: '写点评论吧',
      comment_type: 'topic',
      commentable_type: props.type,
      commentable_id: props.detail.id,
      content: '',
    };
    dispatch({type: action.SAVE_COMMENT_CONTENT, value: commentContent});
    props.changeVisible(true);
  };

  const publishComment = () => {
    const data = {...comment, content: value};
    const params = {
      placeholder: data.placeholder,
      comment: {
        comment_type: data.comment_type,
        content: data.content,
        mention_ids: data.mention_ids,
        commentable_type: data.commentable_type,
        commentable_id: data.commentable_id,
        target_comment_id: data.target_comment_id || '',
      },
    };
    props.publishComment(params);
  };

  const dispatchData = params => {
    switch (props.type) {
      case 'Article':
        dispatch(dispatchArticleDetail(params));
        break;
      case 'Topic':
        dispatch(dispatchTopicDetail(params));
        break;
      case 'Theory':
        dispatch({type: action.THEORY_DETAIL, value: params});
        break;
    }
  };

  const onCreate = async type => {
    switch (props.type) {
      case 'Article':
      case 'Topic':
      case 'Theory':
        if (type === 'praise') {
          if (praise) {
            await cancelAction({
              target_id: props.detail.id,
              target_type: props.type,
              type: 'praise',
            });
          } else {
            Helper.impactLight();
            await createAction({
              target_id: props.detail.id,
              target_type: props.type,
              type: 'praise',
            });
          }
        }
        if (type === 'star') {
          if (star) {
            await cancelAction({target_id: props.detail.id, target_type: props.type, type: 'star'});
          } else {
            await createAction({target_id: props.detail.id, target_type: props.type, type: 'star'});
          }
        }
        break;
    }

    switch (type) {
      case 'praise':
        const praiseCount = props.detail.praises_count + (praise === true ? -1 : 1);
        setPraise(!praise);
        dispatchData({...props.detail, praise: !praise, praises_count: praiseCount});
        break;
      case 'star':
        const startCount = props.detail.stars_count + (star === true ? -1 : 1);
        setStar(!star);
        dispatchData({...props.detail, star: !star, stars_count: startCount});
        break;
    }
  };

  const onShare = () => {
    if (props.onShare) {
      props.onShare();
      return;
    }

    const shareContent = {item_type: props.type, item_id: props.detail.id, visible: true};
    dispatch(dispatchShareItem(shareContent));
  };

  useEffect(() => {
    setPraise(props.detail.praise);
    setStar(props.detail.star);
    if (!props.visible) {
      setValue(null);
    }
  }, [props]);

  useEffect(() => {
    if (comment.content) {
      setTimeout(() => {
        props.changeVisible(true);
        setValue(comment.content);
      }, 500);
    }
  }, [comment]);

  return (
    <>
      <View style={styles.actionWrapper}>
        {!props.visible && (
          <>
            <Text style={styles.text} onPress={onCreateComment}>
              快来评论吧
            </Text>
            <View style={styles.wrapBottomBtns}>
              <Pressable style={styles.btnWrap} onPress={() => onCreate('praise')}>
                <IconFont name="like" size={19} color={praise ? '#000' : '#bdbdbd'} />
                <Text style={[styles.btnText, {color: praise ? '#000' : '#bdbdbd'}]}>
                  {props.detail.praises_count > 0 ? props.detail.praises_count : ''}
                </Text>
              </Pressable>
              <Pressable style={styles.btnWrap} onPress={() => onCreate('star')}>
                <IconFont
                  name={star ? 'star-solid' : 'star'}
                  size={22}
                  color={star ? '#f4ea2a' : '#bdbdbd'}
                />
                <Text style={[styles.btnText, {color: star ? '#000' : '#bdbdbd'}]}>
                  {props.detail.stars_count > 0 ? props.detail.stars_count : ''}
                </Text>
              </Pressable>
              <Pressable
                hitSlop={{right: 20, left: 5}}
                style={[styles.btnWrap, {minWidth: 25}]}
                onPress={() => {
                  onShare();
                }}>
                <IconFont name="zhuanfa" size={18} />
              </Pressable>
            </View>
          </>
        )}

        {props.visible && (
          <>
            <TextInput
              style={styles.input}
              placeholder={comment.placeholder}
              onChangeText={onChangeValue}
              value={value}
              autoFocus
              onBlur={() => props.changeVisible(false)}
            />
            <Text
              style={[styles.sendBtn, {color: value ? '#000' : '#bdbdbd'}]}
              onPress={publishComment}>
              发送
            </Text>
          </>
        )}
      </View>
      {IsIos && <View style={styles.safaAreaBottom} />}
    </>
  );
};

const styles = StyleSheet.create({
  actionWrapper: {
    height: 57,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    borderTopColor: '#ebebeb',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  safaAreaBottom: {
    height: BOTTOM_HEIGHT,
  },
  wrapBottomBtns: {
    height: 57,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    width: 174,
    height: 35,
    lineHeight: 35,
    overflow: 'hidden',
    backgroundColor: '#f2f3f5',
    color: '#bdbdbd',
    paddingLeft: 19,
    marginRight: 10,
    fontSize: 13,
    borderRadius: 18,
  },
  btnWrap: {
    minWidth: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  btnText: {
    marginLeft: 5,
    fontSize: 12,
    minWidth: 5,
  },
  input: {
    flex: 1,
    height: 35,
    alignItems: 'center',
    backgroundColor: '#f2f3f5',
    borderRadius: 18,
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

export default ActionComment;
