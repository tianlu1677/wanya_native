import React, {useEffect, useState, useRef, useCallback, useLayoutEffect} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Swiper from 'react-native-swiper';
import {useFocusEffect} from '@react-navigation/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import VideoPlayerContent from '@/components/react-native-video-player';
import {dispatchTopicDetail, dispatchPreviewImage} from '@/redux/actions';
import Loading from '@/components/Loading';
import FastImg from '@/components/FastImg';
import IconFont from '@/iconfont';
import Toast from '@/components/Toast';
import CommentList from '@/components/List/comment-list';
import {PlainContent} from '@/components/Item/single-list-item';
import {GoBack} from '@/components/NodeComponents';
import {PublishAccount, PublishRelated, ActionComment} from '@/components/Item/single-detail-item';
import {getTopic, deleteTopic} from '@/api/topic_api';
import {getTopicCommentList, createComment, deleteComment} from '@/api/comment_api';
import {BOTTOM_HEIGHT, NAV_BAR_HEIGHT, STATUS_BAR_HEIGHT, SAFE_TOP} from '@/utils/navbar';
import * as action from '@/redux/constants';
import ActionSheet from '@/components/ActionSheet';
import VideoPlayImg from '@/assets/images/video-play.png';
import TopHeaderView from '@/components/TopHeadView';
const {width: screenWidth} = Dimensions.get('window');
const topHeight = BOTTOM_HEIGHT > 0 ? BOTTOM_HEIGHT + 5 : 0;

const TopicDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const currentAccount = useSelector(state => state.account.currentAccount);
  const currentTopic = useSelector(state => state.topic.topicDetail);

  const [topicId] = useState(route.params.topicId);
  const [detail, setDetail] = useState();
  const [visible, setVisible] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionItems, setActionItems] = useState([]);

  const loadData = async () => {
    const res = await getTopic(topicId);
    if (res.data.status === 404) {
      Toast.show('该帖子已删除');
      navigation.goBack();
    } else {
      setDetail(res.data.topic);
      dispatch(dispatchTopicDetail(res.data.topic));
    }
  };

  const publishComment = async data => {
    console.log(data);
    const params = {
      comment_type: data.comment_type,
      placeholder: data.placeholder,
      comment: {
        content: data.content,
        mention_ids: data.mention_ids,
        commentable_type: data.commentable_type,
        comment_type: data.comment_type,
        commentable_id: data.commentable_id,
      },
    };
    console.log(params);

    try {
      setVisible(false);
      Toast.showLoading('发送中');
      const comment_res = await createComment(params);
      console.log('comment_res', comment_res);
      dispatch({type: action.SAVE_COMMENT_TOPIC, value: {}});
      Toast.hide();
      Toast.show('评论成功啦');
      loadData();
    } catch (e) {
      Toast.show('评论出错了');
      Toast.hide();
    }
  };

  const deleteTopicComment = async id => {
    await deleteComment(id);
    loadData();
  };

  const onReportClick = () => {
    const isCurrentTopic = detail.account_id === currentAccount.id;
    const actions = [
      {
        id: 1,
        label: isCurrentTopic ? '删除' : '举报',
        onPress: async () => {
          if (isCurrentTopic) {
            // 删除
            await deleteTopic(detail.id);
            Toast.show('已删除');
            navigation.goBack();
          } else {
            navigation.push('Report', {report_type: 'Account', report_type_id: detail.id});
          }
        },
      },
    ];
    setActionItems(actions);
    setShowActionSheet(true);
  };

  const ExcellentBtn = ({style}) => <Text style={[styles.excellentLabel, {...style}]}>精选</Text>;

  // 外链 纯文本 带header
  const isHeader = () => {
    if (detail && (detail.content_style === 'link' || detail.content_style === 'text')) {
      return true;
    }
    return false;
  };

  useFocusEffect(
    useCallback(() => {
      if (videoRef && videoRef.current) {
        // 是否继续播放
        if (videoRef.current.state.isControlsVisible && !videoRef.current.state.isPlaying) {
          videoRef.current.resume();
        }
      }
      return () => {
        videoRef && videoRef.current && videoRef.current.pause();
      };
    }, [])
  );

  useEffect(() => {
    loadData();
    // 清空外链，评论数据
    return () => {
      dispatch(dispatchTopicDetail(null));
      dispatch({type: action.SAVE_COMMENT_TOPIC, value: {}});
    };
  }, []);

  useEffect(() => {
    setDetail(currentTopic);
  }, [currentTopic]);

  // useLayoutEffect(() => {
  //   const goHome = () => {
  //     navigation.reset({
  //       index: 0,
  //       routes: [{name: 'Recommend'}],
  //     });
  //   };
  //   const goBack = () => {
  //     navigation.goBack();
  //   };
  //
  //   if (detail) {
  //     if (isHeader()) {
  //       navigation.setOptions({
  //         headerTitle: '帖子详情',
  //         headerShown: true,
  //         headerStyle: {
  //           borderBottomColor: '#EBEBEB',
  //           borderBottomWidth: StyleSheet.hairlineWidth,
  //         },
  //         headerLeft: () => (
  //           <View
  //             style={{
  //               flexDirection: 'row',
  //               alignItems: 'center',
  //             }}>
  //             <Pressable
  //               onPress={navigation.canGoBack() ? goBack : goHome}
  //               hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}>
  //               <IconFont
  //                 name={navigation.canGoBack() ? 'arrow-left' : 'home-recommend'}
  //                 color="#000"
  //                 size={15}
  //               />
  //             </Pressable>
  //             {detail.excellent && <ExcellentBtn style={{marginLeft: 10}} />}
  //           </View>
  //         ),
  //         headerRight: () => (
  //           <Pressable onPress={onReportClick} hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}>
  //             <IconFont name="ziyuan" color="#000" size={20} />
  //           </Pressable>
  //         ),
  //       });
  //     } else {
  //       navigation.setOptions({
  //         headerShown: false,
  //         title: false,
  //         headerTransparent: true,
  //       });
  //     }
  //   }
  // }, [navigation, detail]);

  const renderImg = () => {
    let {media_images} = detail;
    let maxHeight = 100;
    (media_images || []).map(img => {
      let imgHeight = Math.floor((screenWidth / img.width) * img.height);
      if (imgHeight > maxHeight) {
        maxHeight = imgHeight;
      }
    });

    media_images = (media_images || []).map(img => {
      let imgHeight = (screenWidth / img.width) * img.height;
      if (imgHeight < maxHeight) {
        return {...img, imgHeight: imgHeight, paddingTop: (maxHeight - imgHeight) / 2};
      } else {
        return {...img, imgHeight: imgHeight, paddingTop: 0};
      }
    });

    const onPreview = index => {
      const data = {
        images: media_images.map(v => {
          return {url: v.image_url.split('?')[0]};
        }),
        visible: true,
        index,
      };
      dispatch(dispatchPreviewImage(data));
    };

    return (
      <View style={{minHeight: maxHeight, width: screenWidth}}>
        <Swiper
          index={0}
          loop={false}
          activeDotColor={'yellow'}
          dotColor={'white'}
          removeClippedSubviews={false}
          loadMinimal
          style={{height: maxHeight, backgroundColor: 'black'}}
          showsPagination={detail.media_images.length > 0}>
          {media_images.map((media, index) => (
            <Pressable
              onPress={() => onPreview(index)}
              key={media.image_url}
              style={{paddingTop: media.paddingTop, height: media.imgHeight}}>
              <FastImg
                key={media.image_url}
                source={{uri: media.image_url}}
                style={{width: screenWidth, height: media.imgHeight}}
                mode={'contain'}
              />
            </Pressable>
          ))}
        </Swiper>
      </View>
    );
  };

  const renderVideo = () => {
    const {width, height} = detail.media_video;
    let videoWidth = screenWidth;
    let videoHeight = height ? height * (screenWidth / width) : screenWidth;
    return (
      <View style={{backgroundColor: 'black'}}>
        <VideoPlayerContent
          ref={videoRef}
          customStyles={{position: 'absolute', zIndex: 100, bottom: videoHeight}}
          video={{uri: detail.video_content_m3u8}}
          videoWidth={videoWidth}
          videoHeight={videoHeight}
          poster={`${detail.video_content_m3u8}?vframe/jpg/offset/0/rotate/auto`}
          posterResizeMode={'contain'}
          hideControlsOnStart
          pauseOnPress
          muted={false}
          resizeMode={'cover'}
          autoplay={true}
          loop
        />
      </View>
    );
  };

  const renderLink = () => {
    const onGoDetail = () => {
      dispatch(dispatchTopicDetail(null));
      navigation.push('TopicLinkDetail', {topicId: detail.id});
    };

    return (
      <Pressable onPress={onGoDetail}>
        <View style={styles.linkWrapper}>
          <View style={styles.linkImageWrap}>
            <FastImg
              source={{uri: detail.topic_link.cover_url}}
              mode={'cover'}
              style={{width: 45, height: 45}}
            />
            {detail.topic_link.outlink_type === 'music' && (
              <IconFont name="sanjiaoxing" size="12" style={styles.linkImage} />
            )}
          </View>
          <Text style={styles.linkText} numberOfLines={2}>
            {detail.topic_link.title || detail.topic_link.raw_link}
          </Text>
        </View>
      </Pressable>
    );
  };

  return detail ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: '#fff', position: 'relative'}}>
      {/* 不带header */}
      {/*{!isHeader() && (*/}
      {/*  <>*/}
      {/*    <GoBack name={navigation.canGoBack() ? '' : 'home-recommend'} color={'#fff'} />*/}
      {/*    <Pressable*/}
      {/*      onPress={onReportClick}*/}
      {/*      style={styles.report}*/}
      {/*      hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}>*/}
      {/*      <IconFont name="ziyuan" color="#fff" size={20} />*/}
      {/*    </Pressable>*/}
      {/*  </>*/}
      {/*)}*/}
      {(detail.content_style === 'video' || detail.content_style === 'img') && (
        <>
          <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
          <GoBack
            color={'white'}
            report={{
              report_type: 'Topic',
              report_id: detail.id,
            }}
          />
        </>
      )}
      {(detail.content_style === 'link' || detail.content_style === 'text') && (
        <>
          <TopHeaderView
            Title={'帖子详情'}
            leftButtonColor={'black'}
            excellent={detail.excellent}
            RightButton={() => (
              <Pressable
                onPress={onReportClick}
                hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
                style={{paddingRight: 10}}>
                <IconFont name="ziyuan" color="#000" size={20} />
              </Pressable>
            )}
          />
          <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
        </>
      )}
      <CommentList
        type="Topic"
        detail={detail}
        enableLoadMore={false}
        changeVisible={value => setVisible(value)}
        deleteComment={deleteTopicComment}
        request={{api: getTopicCommentList, params: {id: detail.id}}}
        ListHeaderComponent={
          <>
            {(detail.content_style === 'video' || detail.content_style === 'img') && (
              <View style={{position: 'relative'}}>
                <View style={{height: SAFE_TOP, backgroundColor: 'black'}} />
                {detail.excellent && <ExcellentBtn style={styles.excellentHeader} />}
                {detail.content_style === 'video' && renderVideo()}
                {detail.content_style === 'img' && renderImg()}
              </View>
            )}
            {(detail.content_style === 'link' || detail.content_style === 'text') && (
              <View>
                <PublishAccount
                  data={detail}
                  showFollow={currentAccount.id !== detail.account_id}
                />
              </View>
            )}
            {detail.content_style === 'link' && (
              <>
                <View>{renderLink()}</View>
              </>
            )}
            {detail.plain_content ? (
              <View
                style={{
                  padding: 15,
                  paddingRight: 24,
                  paddingBottom: detail.content_style === 'text' ? 0 : 10,
                }}>
                <PlainContent data={detail} style={styles.multiLineText} numberOfLines={0} />
              </View>
            ) : null}

            {detail.content_style === 'video' || detail.content_style === 'img' ? (
              <PublishAccount data={detail} showFollow={currentAccount.id !== detail.account_id} />
            ) : null}

            <PublishRelated data={detail} />
            <View style={{backgroundColor: '#FAFAFA', height: 9}} />
            <Text style={styles.commentTitle}>全部评论</Text>
          </>
        }
      />
      <ActionComment
        visible={visible}
        detail={detail}
        publishComment={publishComment}
        type="Topic"
        changeVisible={value => setVisible(value)}
      />
      <ActionSheet
        actionItems={actionItems}
        showActionSheet={showActionSheet}
        changeModal={() => setShowActionSheet(false)}
      />
    </KeyboardAvoidingView>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  report: {
    position: 'absolute',
    right: 16,
    height: 44,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    top: Math.max(getStatusBarHeight(), 20),
    zIndex: 1,
  },
  commentTitle: {
    fontSize: 15,
    fontWeight: '500',
    paddingLeft: 16,
    paddingTop: 20,
    marginTop: 5,
    backgroundColor: '#fff',
    paddingBottom: 5,
  },
  excellentLabel: {
    width: 30,
    height: 16,
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 16,
    backgroundColor: '#FF2242',
    borderRadius: 2,
    overflow: 'hidden',
    color: 'white',
  },
  excellentHeader: {
    marginTop: 14,
    position: 'absolute',
    left: 40,
    zIndex: 100,
    top: SAFE_TOP,
  },
  multiLineText: {
    fontSize: 14,
    lineHeight: 23,
    color: '#000',
  },
  linkWrapper: {
    flex: 1,
    backgroundColor: '#F2F3F5',
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    marginLeft: 14,
    marginRight: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  linkImageWrap: {
    position: 'relative',
  },
  linkImage: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginTop: -6,
    marginLeft: -6,
  },
  linkText: {
    fontSize: 13,
    lineHeight: 20,
    marginVertical: 3,
    color: '#3F3F3F',
    marginLeft: 10,
    textAlign: 'justify',
    flex: 1,
  },
});

export default TopicDetail;
