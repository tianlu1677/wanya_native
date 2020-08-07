
# 公共业务组件
1. 双排列表 DoubleList
2. 单排列表 PostList

```
Header(Avator, Info, JoinButton)
Content(PostTopic，PostArticle, PostAccount, PostMovement, PostActivity, PostSpace, PostCourse)
Bottom(Like, Comment, Share)
```

3. 头像组件 Avator
4. 顶部搜索 TopSearch
5. 顽力值展示组件 PlayScore (建议使用 Tooltip 来弹出文字)
6. swiper展示组件 SwiperImage
7. 预览图片组件 PreviewImage
8. 分享按钮高阶组件 ShareApp
9. 标签组件 Tag
10. 徽章(头像右上角消息提醒或者右下角的加V) Bradge
11. 无数据的展示效果 Empty
12. tablist 左右滑动标签
13. ScollList 在FlatList的基础上集成，总的滑动上下拉动


- 基础图片组件 FastImage
- 基础视频组件 FastVideo

# 页面组件
1. 首页（index）
- 推荐（doubleList）
- 关注 (postList)
- 最新 (postLIst)
2. 帖子详情页（postDetail）
- 中间文本封装成组件(文本中显示，纯文本 + @我 + #话题 ) * 
- 评论列表(组件)
- 发布评论(单独的组件)


```
SwiperImage
根据不同类型去写不同顶部组件样式
```

3. 顽鸦用户列表（userList）
3. 用户主页（userDetail）
2. 发布页面（addTopic）
3. 话题（topic）
4. 话题主页（topicDetail)
3. 圈子（node）
4. 圈子主页（nodeDetail）
4. 场地（space）
5. 场地主页（spaceDetail）
5. 选择城市（chooSeCity）

# 公共的样式效果
- 公共颜色定义
- 公共icon定义

- 字体的大小
- 共用的样式集合(如垂直居中， 多行省略号)

# 页面
## 首页
- home/recommend.js (HomeRecommend 首页模式)
- home/visitor_recommend.js (VisitorRecommend 游客模式随便看看)

## 创建帖子
- topics/new-topic.js (NewTopic)
- topics/add-mention-account.json(AddMentionAccount  提及某人)
- topics/add-hashtag.json(AddHashtag 话题页面)
- topics/add-space.json(AddSpace 场地)
- topics/add-node.json(AddNode 圈子页面)

- topics/topic-detail.json (TopicDetail  帖子详情页)

## 文章(article)
- articles/article-detail( ArticleDetail 文章详情页)

## 圈子(node)
- nodes/node-detail(NodeDetail 圈子详情页)
- nodes/node-index (用户关注的圈子列表)

## 用户详情页(account)
- accounts/account-detail( AccountDetail 用户详情页)
- accounts/account-index (用户的关注人的列表)

## 话题
- hashtags/hashtag-detail (HashtagDetail  话题详情页)

## 场地
- spaces/space-detail (SpaceDetail 场地详情页)
- spaces/choose-city (ChooseCity 选择城市)


## 我的页面(mine)
- mine/account-detail ( MineDetail  我的页面 )
- mine/invite-detail (InviteDetail 我的邀请详情页)
- mine/setting-index (SettingIndex 设置详情页)
- mine/settings/edit-account (SettingsEditAccount  设置编辑我的页面)
- mine/settings/feedback (SettingsFeedback 反馈页面)
- mine/settings/about (SettingsAbout 关于顽鸦)

## 消息通知
- notify/notify-index (NotifyIndex 消息通知列表页)
- notify/praise-notify( PraiseNotify  点赞通知)
- notify/comment-notify( CommentNotify  评论通知)
- notify/follow-notify( FollowNotify 关注通知)
- notify/system-notify( SystemNotify 系统通知)

## 登录注册
- sessions/social-login (SocailLogin 微信登录页面)
- sessions/phone-login (手机注册登录)
- sessions/invite-login (邀请码登录)

## 海报
- 邀请码海报
- 帖子详情海报
- 文章海报