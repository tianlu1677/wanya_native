// 首页
import {CardStyleInterpolators, HeaderStyleInterpolators} from '@react-navigation/stack';
import Recommend from '@/pages/home/recommend';

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

// 圈子
import NodeDetail from '@/pages/nodes/node-detail';

// 场地
import SpaceDetail from '@/pages/space/space-detail';

// 话题
import HashtagDetail from '@/pages/hashtags/hashtag-detail';

import AdminPhoneLogin from '@/pages/login/AdminPhoneLogin';
import InviteDetail from '@/pages/mine/invite-detail';

// 我的页面
import MineDetail from '@/pages/mine/mine-detail';
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

// 搜索
import SearchIndex from '@/pages/search/search-index';

// 实验室页面
import LabIndex from '@/pages/labs/index';
import LabTabIndex from '@/pages/labs/tabindex';
import LabStorageIndex from '@/pages/labs/storageindex';

//登录页面
import SocialLogin from '@/pages/sessions/social-login';
import PhoneLogin from '@/pages/sessions/phone-login';
import InviteLogin from '@/pages/sessions/invite-login';
import PasswordLogin from '@/pages/sessions/password-login';

// 网页显示
import WebView from '@/pages/webview/webview';

import SharePage from '@/pages/shares/share_page'; //分享

// 公用页面
import ChooseCity from '@/components/List/choose-city'; //选择城市
import JoinAccountsList from '@/components/List/join-accounts-list'; //最近加入好友

const topicRouter = [
  {
    name: 'TopicDetail',
    component: TopicDetail,
    safeArea: false,
    options: {
      headerShown: false,
      title: false,
      headerTransparent: true,
    },
  },
  {
    name: 'NewTopic',
    component: NewTopic,
    barColor: 'dark',
    options: {
      title: '发布帖子',
      animationEnabled: true,
      gestureEnabled: false,
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    },
  },
  {
    name: 'AddHashTag',
    barColor: 'dark',
    component: AddHashTag,
    options: {title: '@话题', headerShown: false},
  },
  {
    name: 'AddMentionAccount',
    barColor: 'dark',
    component: AddMentionAccount,
    options: {title: '提及人列表', headerShown: false},
  },
  {
    name: 'AddSpace',
    barColor: 'dark',
    component: AddSpace,
    options: {title: '场地列表', headerShown: false},
  },
  {
    name: 'AddNode',
    barColor: 'dark',
    component: AddNode,
    // options: {title: '选择圈子'},
  },
];

const articleRouter = [
  {
    name: 'ArticleDetail',
    component: ArticleDetail,
    safeArea: true,
    barColor: 'dark',
    options: {title: '文章详情', headerShown: true},
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
    name: 'SpaceDetail',
    component: SpaceDetail,
    safeArea: false,
    options: {
      title: '场地详情',
      headerShown: false,
    },
  },
];

const nodeRouter = [
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
    barColor: 'dark',
    options: {title: '圈子列表'},
  },
  {
    name: 'FollowAccounts',
    component: FollowAccounts,
    barColor: 'dark',
    options: {title: '关注列表'},
  },
  {
    name: 'FollowerAccounts',
    barColor: 'dark',
    component: FollowerAccounts,
    options: {title: '粉丝列表'},
  },
  {
    name: 'Settings',
    component: Settings,
    barColor: 'dark',
    options: {title: '设置'},
  },
  {
    name: 'About',
    component: About,
    barColor: 'dark',
    options: {title: '关于顽鸦'},
  },
  {
    name: 'Feedback',
    component: Feedback,
    safeArea: false,
    barColor: 'dark',
    options: {title: '反馈'},
  },
];

const commonRouter = [
  {
    name: 'ChooseCity',
    barColor: 'dark',
    component: ChooseCity,
    options: {title: '选择城市'},
  },
  {
    name: 'JoinAccountsList',
    barColor: 'dark',
    component: JoinAccountsList,
    options: {title: '最近加入列表'},
  },
  {
    name: 'SharePage',
    component: SharePage,
    safeArea: false,
    options: {title: '分享', headerShown: false},
  },
];

const searchRouter = [
  {
    name: 'SearchIndex',
    component: SearchIndex,
    barColor: 'dark',
    options: {title: '搜索'},
  },
];

const authRouter = [
  {
    name: 'PhoneLogin',
    component: PhoneLogin,
    safeArea: false,
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
    name: 'PasswordLogin',
    component: PasswordLogin,
    options: {title: '输入邀请码', headerShown: true},
    safeArea: false,
  },
]
export const routers = [
  ...topicRouter,
  ...articleRouter,
  ...spaceRouter,
  ...nodeRouter,
  ...accountRouter,
  ...commonRouter,
  ...searchRouter,
  ...authRouter,
  {
    name: 'InviteDetail',
    component: InviteDetail,
    safeArea: false,
    options: {title: '邀请码'},
  },
  {
    name: 'LabIndex',
    component: LabIndex,
    safeArea: false,
    options: {title: '实验室主页', headerShown: false},
  },
  {
    name: 'LabTabIndex',
    component: LabTabIndex,
    options: {title: '实验室标签页'},
  },
  {
    name: 'LabStorageIndex',
    component: LabStorageIndex,
    safeArea: false,
    options: {title: 'LabStorageIndex'},
  },
  {
    name: 'AdminPhoneLogin',
    component: AdminPhoneLogin,
    options: {title: 'AdminPhoneLogin'},
  },
  {
    name: 'MineDetail',
    component: MineDetail,
    safeArea: false,
    options: {title: 'MineDetail', headerShown: false},
  },

  {
    name: 'NotifyIndex',
    component: NotifyIndex,
    barColor: 'dark',
    options: {title: '消息', headerShown: true},
  },
  {
    name: 'CommentNotify',
    component: CommentNotify,
    barColor: 'dark',
    options: {title: '评论及回复'},
  },
  {
    name: 'PraiseNotify',
    component: PraiseNotify,
    barColor: 'dark',
    options: {title: '赞和收藏'},
  },
  {
    name: 'SystemNotify',
    component: SystemNotify,
    barColor: 'dark',
    options: {title: '顽鸦小助手'},
  },
  {
    name: 'FollowNotify',
    barColor: 'dark',
    component: FollowNotify,
    options: {title: '新增粉丝'},
  },
  {
    name: 'MentionNotify',
    barColor: 'dark',
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
    safeArea: false,
    component: EditAccountContent,
    options: {title: '编辑信息'},
  },
];
