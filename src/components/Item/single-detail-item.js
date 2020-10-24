import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, Pressable, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import IconFont from '@/iconfont';
import {Avator} from '@/components/NodeComponents';
import {followAccount, unfollowAccount} from '@/api/account_api';
import {createTopicAction, destroyTopicAction} from '@/api/topic_api';
import {createArticleAction, destroyArticleAction} from '@/api/article_api';
import * as action from '@/redux/constants';
import SharePageModal from '@/components/SharePageModal';
import {BOTTOM_HEIGHT} from '@/utils/navbar';
import {dispatchShareItem} from '@/redux/actions';
import * as WeChat from 'react-native-wechat-lib';

export const PublishAccount = props => {
  const {data} = props;
  const navigation = useNavigation();
  const [followed, setFollowed] = useState(props.data.account.followed);

  const goAccountDetail = () => {
    navigation.push('AccountDetail', {accountId: data.account.id});
  };

  const onFollow = async () => {
    if (followed) {
      await unfollowAccount(data.account_id);
    } else {
      await followAccount(data.account_id);
    }
    setFollowed(!followed);
  };

  return (
    <View style={hstyles.headerView}>
      <Avator account={data.account} size={40} />
      <Pressable style={hstyles.content} onPress={goAccountDetail}>
        <Text style={hstyles.nameText}>{data.account.nickname}</Text>
        <Text style={hstyles.timeText}>{data.published_at_text}</Text>
      </Pressable>
      {props.showFollow && (
        <Text style={[hstyles.joinBtn, {color: followed ? '#bdbdbd' : '#000'}]} onPress={onFollow}>
          {followed ? '已关注' : '关注'}
        </Text>
      )}
    </View>
  );
};

export const PublishRelated = props => {
  const {data} = props;
  const navigation = useNavigation();

  const goNodeDetail = () => {
    navigation.push('NodeDetail', {nodeId: data.node.id});
  };

  const goSpaceDetail = () => {
    navigation.push('SpaceDetail', {spaceId: data.space.id});
  };

  return (
    <>
      {data.space && (
        <Pressable style={pstyles.spaceWrapper} onPress={goSpaceDetail}>
          <IconFont name="space-point" size={16} color={'#45ea6a'} />
          <Text style={pstyles.spaceText}>{data.space.name}</Text>
        </Pressable>
      )}

      {data.tag_list.length > 0 && (
        <View style={pstyles.tagsWrapper}>
          {data.tag_list.map((v, index) => (
            <Text style={pstyles.tagsText} key={index}>
              {v}
            </Text>
          ))}
        </View>
      )}

      <View style={{backgroundColor: '#FAFAFA', height: 9}} />

      {data.node && (
        <Pressable style={pstyles.fromWrapper} onPress={goNodeDetail}>
          <View>
            <View style={pstyles.formTitleWrap}>
              <Text style={pstyles.formTitle}>来自</Text>
              <IconFont name="node-solid" size={16} color={'#000'} style={{marginLeft: 10}} />
              <Text style={pstyles.formTitle}>{data.node.name}</Text>
            </View>

            <Text style={pstyles.formInfo}>
              {data.node.topics_count}篇帖子 · {data.node.accounts_count}位
              {data.node.nickname || '圈友'}
            </Text>
          </View>
          <Image style={pstyles.formImage} source={{uri: data.node.cover_url}} />
        </Pressable>
      )}
    </>
  );
};

export const ActionComment = props => {
  const navigation = useNavigation()
  const comment = useSelector(state => state.home.commentTopic);
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);
  const [praise, setPraise] = useState(props.detail.praise);
  const [star, setStar] = useState(props.detail.star);
  const [shareModelVisible, setShareModelVisible] = useState(false);

  const onCreateComment = v => {
    const commentTopic = {
      placeholder: '写点评论吧',
      comment_type: 'topic',
      commentable_type: props.type,
      commentable_id: props.detail.id,
      content: '',
    };
    dispatch({type: action.SAVE_COMMENT_TOPIC, value: commentTopic});
    props.changeVisible(true);
  };

  const publishComment = () => {
    const data = {...comment, content: value};
    props.publishComment(data);
  };

  const onCreate = async type => {
    switch (props.type) {
      case 'Article':
        if (type === 'praise') {
          if (praise) {
            await destroyArticleAction({id: props.detail.id, type});
          } else {
            await createArticleAction({id: props.detail.id, type});
          }
        }
        if (type === 'star') {
          if (star) {
            await destroyArticleAction({id: props.detail.id, type});
          } else {
            await createArticleAction({id: props.detail.id, type});
          }
        }
        break;
      case 'Topic':
        if (type === 'praise') {
          if (praise) {
            await destroyTopicAction({id: props.detail.id, type});
          } else {
            await createTopicAction({id: props.detail.id, type});
          }
        }
        if (type === 'star') {
          if (star) {
            await destroyTopicAction({id: props.detail.id, type});
          } else {
            await createTopicAction({id: props.detail.id, type});
          }
        }
        break;
    }

    switch (type) {
      case 'praise':
        const praiseCount = props.detail.praises_count + (praise === true ? -1 : 1);
        props.setDetail({...props.detail, praises_count: praiseCount});
        setPraise(!praise);
        break;
      case 'star':
        const startCount = props.detail.stars_count + (star === true ? -1 : 1);
        props.setDetail({...props.detail, stars_count: startCount});
        setStar(!star);
        break;
    }
  };

  // 分享
  const onShare = () => {
    console.log('onShare', props);
    const {detail} = props;
    // const detail = data.detail
    let shareOptions = {
      title: '顽鸦',
      userName: 'gh_c2b50fe8e928',
      webpageUrl: '',
      path: '',
      thumbImageUrl: detail.wx_share_image_url,
      scene: 0,
    };
    switch (props.type) {
      case 'Article':
        shareOptions = {
          ...shareOptions,
          title: detail.plain_content,
          path: '/pages/articles/article-detail?article_id=' + detail.id,
          thumbImageUrl: detail.wx_share_image_url,
        };
        break;
      case 'Topic':
        shareOptions = {
          ...shareOptions,
          title: detail.plain_content,
          path: '/pages/topics/topic-detail?topic_id=' + detail.id,
          thumbImageUrl: detail.wx_share_image_url,
        };
        break;
      default:
        shareOptions;
        break;
    }

    const shareContent = {...shareOptions, visible: true};
    // console.log('xxx', shareContent)
    // dispatch(dispatchShareItem(shareContent));
    // WeChat.shareMiniProgram(shareOptions);
  };

  useEffect(() => {
    setValue(null);
  }, [props.visible]);

  return (
    <View style={astyles.actionWrapper}>
      {!props.visible && (
        <>
          <Text style={astyles.text} onPress={onCreateComment}>
            快来评论吧
          </Text>
          <View style={astyles.wrapBottomBtns}>
            <Pressable style={astyles.btnWrap} onPress={() => onCreate('praise')}>
              <IconFont name="like" size={19} color={praise ? '#000' : '#bdbdbd'} />
              <Text style={[astyles.btnText, {color: praise ? '#000' : '#bdbdbd'}]}>
                {props.detail.praises_count > 0 ? props.detail.praises_count : ''}
              </Text>
            </Pressable>
            <Pressable style={astyles.btnWrap} onPress={() => onCreate('star')}>
              <IconFont
                name={star ? 'star-solid' : 'blank-star'}
                size={19}
                color={star ? '#f4ea2a' : '#bdbdbd'}
              />
              <Text style={[astyles.btnText, {color: star ? '#000' : '#bdbdbd'}]}>
                {props.detail.stars_count > 0 ? props.detail.stars_count : ''}
              </Text>
            </Pressable>
            <Pressable
              style={[astyles.btnWrap, {minWidth: 25}]}
              onPress={() => {
                navigation.navigate('SharePage', {item_type: props.type, item_id: props.detail.id})
                // setShareModelVisible(true);
              }}>
              <IconFont name="zhuanfa" size={19} />
            </Pressable>

            {/*<View style={{}}>*/}
            {/*  <SharePageModal*/}
            {/*    shareModelVisible={shareModelVisible}*/}
            {/*    onShowShare={status => setShareModelVisible(status)}*/}
            {/*    assetable={{*/}
            {/*      type: props.type,*/}
            {/*      id: props.detail.id,*/}
            {/*      assetable_name: 'app_share_image',*/}
            {/*    }}*/}
            {/*    pageShareContent={{*/}
            {/*      account: props.detail.account,*/}
            {/*      node_name: props.detail.node.name,*/}
            {/*      content: props.detail.plain_content,*/}
            {/*      bg_img_url: props.detail.wx_share_image_url,*/}
            {/*    }}*/}
            {/*  />*/}
            {/*</View>*/}
          </View>
        </>
      )}

      {props.visible && (
        <>
          <TextInput
            style={astyles.input}
            placeholder={comment.placeholder}
            onChangeText={text => setValue(text)}
            value={value}
            autoFocus
            onBlur={() => props.changeVisible(false)}
          />
          <Text
            style={[astyles.sendBtn, {color: value ? '#000' : '#bdbdbd'}]}
            onPress={publishComment}>
            发送
          </Text>
        </>
      )}
    </View>
  );
};

const hstyles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingLeft: 15,
    paddingRight: 14,
    marginTop: 20,
  },
  content: {
    marginLeft: 12,
    paddingTop: 4,
  },
  nameText: {
    color: '#9c9c9c',
    fontSize: 12,
    lineHeight: 20,
  },
  timeText: {
    color: '#bdbdbd',
    marginRight: 6,
    fontSize: 11,
  },
  joinBtn: {
    paddingLeft: 12,
    paddingRight: 12,
    height: 34,
    lineHeight: 34,
    marginLeft: 'auto',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});

const pstyles = StyleSheet.create({
  spaceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginBottom: 18,
  },
  spaceText: {
    color: '#45ea6a',
    marginLeft: 6,
    fontSize: 14,
    lineHeight: 20,
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 15,
    paddingRight: 53,
    marginBottom: 12,
  },
  tagsText: {
    paddingLeft: 9,
    paddingRight: 9,
    lineHeight: 24,
    backgroundColor: '#f2f3f5',
    marginRight: 8,
    marginBottom: 8,
    fontSize: 11,
  },
  fromWrapper: {
    height: 90,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 19,
    alignItems: 'center',
  },
  formTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    marginBottom: 7,
  },
  formTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  formInfo: {
    fontSize: 12,
    lineHeight: 20,
  },
  formImage: {
    width: 55,
    height: 55,
    borderWidth: 3,
    borderColor: '#ffff00',
    marginLeft: 'auto',
    borderRadius: 5,
    overflow: 'hidden',
  },
});

const astyles = StyleSheet.create({
  actionWrapper: {
    height: 57,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    borderTopColor: '#ebebeb',
    borderTopWidth: StyleSheet.hairlineWidth,
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
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#f2f3f5',
    color: '#bdbdbd',
    paddingLeft: 19,
    marginRight: 10,
    fontSize: 13,
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
    fontSize: 14,
    minWidth: 5,
  },
  input: {
    flex: 1,
    height: 35,
    alignItems: 'center',
    backgroundColor: '#f2f3f5',
    paddingLeft: 19,
    borderRadius: 15,
    overflow: 'hidden',
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
