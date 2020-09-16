import React, {useState, useEffect, useRef} from 'react';

import {Text} from 'react-native';
// 首页
import Recommend from '@/pages/home/recommend';
import VideoDetail from '@/pages/home/videoDetail';

// Topic
import NewTopic from '@/pages/topics/new-topic';
import GoNewTopic from '@/pages/topics/go-new-topic';
import AddMentionAccount from '@/pages/topics/add-mention-account';
import AddHashTag from '@/pages/topics/add-hashtag';
import AddSpace from '@/pages/topics/add-space';
import AddNode from '@/pages/topics/add-node';
import TopicDetail from '@/pages/topics/topic-detail';

// article
import ArticleDetail from '@/pages/articles/article-detail';

// 发布

// 圈子
import NodeIndex from '@/pages/nodes/node-index';
import NodeDetail from '@/pages/nodes/node-detail';

// 场地
import SpaceIndex from '@/pages/space/space-index';
import SpaceDetail from '@/pages/space/space-detail';

// 话题
import HashtagDetail from '@/pages/hashtags/hashtag-detail';

import AdminPhoneLogin from '@/pages/login/AdminPhoneLogin';
import InviteDetail from '@/pages/mine/invite-detail';

// 话题
// import HashtagDetail from '@/pages/hashtags/hashtag-detail'
// 我的页面
import MineDetail from '@/pages/mine/mine-detail';
import Mine from '@/pages/mine/mine';
import Settings from '@/pages/mine/settings';
import About from '@/pages/mine/settings/about';
import AccountContent from '@/pages/mine/settings/account-content';
import EditAccountContent from '@/pages/mine/settings/edit-account-content';
import Feedback from '@/pages/mine/settings/feedback';

// accounts
import AccountDetail from '@/pages/accounts/account-detail';
import FollowNodes from '@/pages/accounts/follow-nodes';
import FollowAccounts from '@/pages/accounts/follow-accounts';
import FollowerAccounts from '@/pages/accounts/follower-accounts';

// 消息通知页面
import NotifyIndex from '@/pages/notify/notify-index';
import CommentNotify from '@/pages/notify/comment-notify';
import PraiseNotify from '@/pages/notify/praise-notify';
import SystemNotify from '@/pages/notify/system-notify';
import FollowNotify from '@/pages/notify/follow-notify';
import MentionNotify from '@/pages/notify/mention-notify';

// 实验室页面
import LabIndex from '@/pages/labs/index';
import LabTabIndex from '@/pages/labs/tabindex';
import LabStorageIndex from '@/pages/labs/storageindex';

//登录页面
import SocialLogin from '@/pages/sessions/social-login';
import PhoneLogin from '@/pages/sessions/phone-login';
import InviteLogin from '@/pages/sessions/invite-login';

// 网页显示
import WebView from '@/pages/webview/webview';

// 公用页面
import ChooseCity from '@/components/List/choose-city'; //选择承受
import JoinAccountsList from '@/components/List/join-accounts-list'; //最近加入
import SharePage from '@/pages/share'; //分享

export const tabRouters = [
  {
    name: 'Recommend',
    component: Recommend,
    safeArea: true,
    options: {title: '首页'},
  },
  {
    name: 'GoNewTopic',
    component: GoNewTopic,
    options: {title: '发布'},
  },
  {
    name: 'MindDetail',
    component: MineDetail,
    options: {title: '我的'},
  },
  // {
  //   name: 'Mine',
  //   component: Mine,
  //   options: {title: '实验室'},
  // },
];

export const createTopicRouter = [
  {
    name: 'Recommend',
    component: Recommend,
    safeArea: true,
    options: {title: '首页'},
  },
  {
    name: 'NewTopic',
    component: NewTopic,
    options: {
      title: '发布帖子',
      animationEnabled: true,
    },
  },
  {
    name: 'AddHashTag',
    component: AddHashTag,
    options: {title: '@话题'},
  },
  {
    name: 'AddMentionAccount',
    component: AddMentionAccount,
    safeArea: false,
    options: {title: '提及人列表', headerShown: false},
  },
  {
    name: 'AddSpace',
    component: AddSpace,
    options: {title: '场地列表'},
  },
  {
    name: 'AddNode',
    component: AddNode,
    options: {title: '添加圈子'},
  },
];

const topicRouter = [
  {
    name: 'TopicDetail',
    component: TopicDetail,
    safeArea: false,
    options: {
      title: '帖子详情',
      headerShown: false,
    },
  },
  {
    name: 'NewTopic',
    component: NewTopic,
    options: {
      title: '发布帖子',
      animationEnabled: true,
      gestureEnabled: false,
      // mode: "modal"
    },
  },
  {
    name: 'AddHashTag',
    component: AddHashTag,
    options: {title: '@话题'},
  },
  {
    name: 'AddMentionAccount',
    component: AddMentionAccount,
    options: {title: '提及人列表', headerShown: false},
  },
  {
    name: 'AddSpace',
    component: AddSpace,
    options: {title: '场地列表'},
  },
  {
    name: 'AddNode',
    component: AddNode,
    options: {title: '添加圈子'},
  },
];

const articleRouter = [
  {
    name: 'ArticleDetail',
    component: ArticleDetail,
    options: {title: '文章详情'},
  },
  {
    name: 'HashtagDetail',
    component: HashtagDetail,
    safeArea: false,
    options: {title: '话题', headerShown: false},
  },
];

const spaceRouter = [
  {
    name: 'SpaceIndex',
    component: SpaceIndex,
    options: {title: '场地'},
  },
  {
    name: 'SpaceDetail',
    component: SpaceDetail,
    safeArea: false,
    options: {
      title: '场地详情',
      headerShown: false
    },
  },
];

const nodeRouter = [
  // {
  //   name: 'NodeIndex',
  //   component: NodeIndex,
  //   options: {title: '圈子'},
  // },
  {
    name: 'NodeDetail',
    component: NodeDetail,
    safeArea: false,
    options: {
      title: '圈子详情',
      headerShown: false,
    },
  },
];

const accountRouter = [
  {
    name: 'AccountDetail',
    component: AccountDetail,
    safeArea: false,
    options: {title: '用户详情', headerShown: false},
  },
  {
    name: 'FollowNodes',
    component: FollowNodes,
    options: {title: '用户圈子'},
  },
  {
    name: 'FollowAccounts',
    component: FollowAccounts,
    options: {title: '关注列表'},
  },
  {
    name: 'JoinAccountsList',
    component: JoinAccountsList,
    options: {title: '最近加入列表'},
  },
  {
    name: 'FollowerAccounts',
    component: FollowerAccounts,
    options: {title: '粉丝列表'},
  },
  {
    name: 'Settings',
    component: Settings,
    options: {title: '设置'},
  },
  {
    name: 'About',
    component: About,
    options: {title: '关于顽鸦'},
  },
  {
    name: 'Feedback',
    component: Feedback,
    options: {title: '反馈'},
  },
];

export const routers = [
  ...topicRouter,
  ...articleRouter,
  ...spaceRouter,
  ...nodeRouter,
  ...accountRouter,
  {
    name: 'PhoneLogin',
    component: PhoneLogin,
    safeArea: false,
    options: {
      headerStyle: {
        backgroundColor: 'black',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        color: 'white',
      },
    },
  },
  {
    name: 'SocialLogin',
    component: SocialLogin,
    options: {
      title: '微信登录',
      headerShown: false,
    },
    safeArea: false,
  },
  {
    name: 'InviteLogin',
    component: InviteLogin,
    options: {title: '输入邀请码'},
    safeArea: false,
  },
  {
    name: 'InviteDetail',
    component: InviteDetail,
    options: {title: '邀请码'},
  },
  {
    name: 'LabIndex',
    component: LabIndex,
    options: {title: '实验室主页'},
  },
  {
    name: 'LabTabIndex',
    component: LabTabIndex,
    options: {title: '实验室标签页'},
  },
  {
    name: 'LabStorageIndex',
    component: LabStorageIndex,
    options: {title: 'LabStorageIndex'},
  },
  {
    name: 'AdminPhoneLogin',
    component: AdminPhoneLogin,
    options: {title: 'AdminPhoneLogin'},
  },
  {
    name: 'NotifyIndex',
    component: NotifyIndex,
    options: {title: '消息', headerShown: true},
  },
  {
    name: 'CommentNotify',
    component: CommentNotify,
    options: {title: '评论及回复'},
  },
  {
    name: 'PraiseNotify',
    component: PraiseNotify,
    options: {title: '赞与收藏'},
  },
  {
    name: 'SystemNotify',
    component: SystemNotify,
    options: {title: '顽鸦小助手'},
  },
  {
    name: 'FollowNotify',
    component: FollowNotify,
    options: {title: '新增粉丝'},
  },
  {
    name: 'MentionNotify',
    component: MentionNotify,
    options: {title: '@我的'},
  },
  {
    name: 'WebView',
    component: WebView,
    safeArea: false,
    options: {title: 'WebView'},
  },
  {
    name: 'AccountContent',
    component: AccountContent,
    options: {title: '编辑信息'},
  },
  {
    name: 'EditAccountContent',
    component: EditAccountContent,
    options: {title: '编辑信息'},
  },
  {
    name: 'ChooseCity',
    component: ChooseCity,
    options: {title: '选择城市'},
  },
  {
    name: 'SharePage',
    component: SharePage,
    options: {title: '分享'},
  },
];
