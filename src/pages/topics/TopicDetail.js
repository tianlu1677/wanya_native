// import React, {useEffect, useState} from 'react';
// import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
// import Loading from '@/components/Loading';
// import {Avator} from '@/components/NodeComponents';
// import {getTopic, getTopicCommentList, createComment} from '@/api/home_api';
// import {Header, BaseTopicContent} from '@/components/Item/PostListItem';
// import IconFont from '@/iconfont';
// import {PostDetailStyle, CommentStyle, CommentActionStyle} from './styles';
// import Video from 'react-native-video';
//
// const TopicContent = props => {
//   const {medias, video_content, video_content_m3u8} = props.data;
//   return (
//     <View>
//       {medias.length > 0 && <Image style={{height: 300}} source={{uri: medias[0]}} />}
//
//       {video_content && (
//         <Video
//           style={{height: 300}}
//           source={{uri: video_content_m3u8}}
//           posterResizeMode={'center'}
//           onBuffer={this.onBuffer}
//           onError={this.videoError}
//           controls
//           reportBandwidth
//           repeat
//         />
//       )}
//
//       <View style={{paddingLeft: 16, paddingRight: 16, marginTop: 20}}>
//         <Header data={props.data} />
//         <BaseTopicContent data={props.data} />
//       </View>
//     </View>
//   );
// };
//
// const CommentList = props => {
//   const {list} = props;
//   const choseAction = v => {
//     props.onReplyComment(v);
//     // 区分删除和回复
//   };
//
//   return (
//     <CommentWrapper>
//       <CommentTitle>全部评论</CommentTitle>
//       {list.map(v => (
//         <View key={v.id} style={{marginTop: 16}}>
//           <CommentInfo style={{flexDirection: 'row', alignItems: 'center'}}>
//             <Avator account={v.account} size={25} />
//             <Text style={{marginLeft: 7}}>{v.account.nickname}</Text>
//             <View style={{marginLeft: 'auto', flexDirection: 'row'}}>
//               <IconFont name="xihuan" size={16} />
//               <Text style={{marginLeft: 5}}>{v.praises_count}</Text>
//             </View>
//           </CommentInfo>
//           <TouchableOpacity style={{marginLeft: 32}} onPress={() => choseAction(v)}>
//             <CommentContent>
//               <CommentText>{v.content}</CommentText>
//               {v.target_account_id && (
//                 <CommentMore>
//                   <Text style={{fontWeight: '500'}}>{v.target_account_nickname}: </Text>
//                   <Text>{v.target_comment_content ? v.target_comment_content : '评论已删除'}</Text>
//                 </CommentMore>
//               )}
//               <Text style={{color: '#bdbdbd', fontSize: 11}}>
//                 {v.created_at_text} · 回复 {v.child_comments_count ? v.child_comments_count : ''}
//               </Text>
//             </CommentContent>
//           </TouchableOpacity>
//         </View>
//       ))}
//     </CommentWrapper>
//   );
// };
//
// const PostDetail = () => {
//   const [detail, setDetail] = useState(null);
//   const [commentList, setCommentList] = useState([]);
//   const [actionVisible, setActionVisible] = useState(false);
//   const [value, setChangeValue] = useState(null);
//   const [comment, setComment] = useState({
//     commentable_type: '',
//     commentable_id: '',
//     content: '',
//     comment_type: '',
//     placeholder: '写点评论吧',
//   });
//
//   const loadData = async () => {
//     const res = await getTopic(897);
//     setDetail(res.data.topic);
//   };
//
//   const loadComments = async () => {
//     const ret = await getTopicCommentList(897);
//     setCommentList(ret.data.comments);
//   };
//
//   // 回复
//   const onReplyComment = v => {
//     if (v.id) {
//       setComment({
//         placeholder: `回复: @${v.account.nickname}`,
//         comment_type: 'comment',
//         commentable_type: 'Topic',
//         commentable_id: detail.id,
//         content: '',
//         target_comment_id: v.id,
//       });
//     } else {
//       setComment({
//         placeholder: '写点评论吧',
//         comment_type: 'topic',
//         commentable_type: 'Topic',
//         commentable_id: detail.id,
//         content: '',
//       });
//       setActionVisible(true);
//     }
//     setChangeValue(null);
//     setActionVisible(true);
//   };
//
//   const publishComment = async () => {
//     const data = {...comment, content: value};
//     const res = await createComment(data);
//     // 发布成功
//     loadComments();
//     setActionVisible(false);
//   };
//
//   useEffect(() => {
//     loadData();
//     loadComments();
//   }, []);
//
//   return detail ? (
//     <DetailWrapper>
//       <ScrollView>
//         <TopicContent data={detail} />
//         <SpaceWrapper>
//           <IconFont name="changdiweizhi" size={16} color={'#45ea6a'} />
//           <SpaceText>中国</SpaceText>
//         </SpaceWrapper>
//         <TagsWrapper>
//           {['滑板', '基础', '长伴'].map(v => (
//             <TagsText key={v}>{v}</TagsText>
//           ))}
//         </TagsWrapper>
//         <FromWrapper>
//           <View>
//             <FromTitle>来自{detail.node.name}</FromTitle>
//             <Text>
//               {detail.node.topics_count}篇帖子 · {detail.node.accounts_count}位
//               {detail.node.nickname || '圈友'}
//             </Text>
//           </View>
//           <FromImage source={{uri: detail.node.cover_url}} />
//         </FromWrapper>
//         {/* 评论列表 */}
//         <CommentList list={commentList} onReplyComment={onReplyComment} />
//       </ScrollView>
//
//       {/* 评论按钮 */}
//       <ActionWrapper>
//         {!actionVisible && (
//           <>
//             <ActionText onPress={onReplyComment}>快来评论吧</ActionText>
//             <ActionBtn>
//               <IconFont name="xihuan" size={16} />
//               <Text style={{marginLeft: 5}}>{detail.praises_count}</Text>
//             </ActionBtn>
//             <ActionBtn>
//               <IconFont name="xihuan" size={16} />
//               <Text style={{marginLeft: 5}}>{detail.stars_count}</Text>
//             </ActionBtn>
//           </>
//         )}
//         {actionVisible && (
//           <>
//             <ActionInput
//               placeholder={comment.placeholder}
//               onChangeText={text => setChangeValue(text)}
//               value={value}
//               autoFocus
//               onBlur={() => setActionVisible(false)}
//             />
//             <ActionSendBtn onPress={publishComment}>发送</ActionSendBtn>
//           </>
//         )}
//       </ActionWrapper>
//     </DetailWrapper>
//   ) : (
//     <Loading />
//   );
// };
//
// const {
//   CommentWrapper,
//   CommentTitle,
//   CommentInfo,
//   CommentContent,
//   CommentText,
//   CommentMore,
// } = CommentStyle;
// const {
//   DetailWrapper,
//   SpaceWrapper,
//   SpaceText,
//   TagsWrapper,
//   TagsText,
//   FromWrapper,
//   FromTitle,
//   FromImage,
// } = PostDetailStyle;
// const {ActionWrapper, ActionText, ActionInput, ActionBtn, ActionSendBtn} = CommentActionStyle;
//
// export default PostDetail;
