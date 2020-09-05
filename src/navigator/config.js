// 首页
import Recommend from '@/pages/home/recommend';
import VideoDetail from '@/pages/home/videoDetail';

// Topic
import NewTopic from '@/pages/topics/new-topic';
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

import AdminPhoneLogin from '@/pages/login/AdminPhoneLogin';
import InviteDetail from '@/pages/mine/invite-detail';

// 我的页面
import Mine from '@/pages/mine/mine';
import Settings from '@/pages/mine/settings';
import About from '@/pages/mine/settings/about';
import AccountContent from '@/pages/mine/settings/account-content';
import EditAccountContent from '@/pages/mine/settings/edit-account-content';
import Feedback from '@/pages/mine/settings/feedback';
import AccountDetail from '@/pages/accounts/account-detail';

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
import LabWebview from '@/pages/labs/webview';
import LabStorageIndex from '@/pages/labs/storageindex';

//登录页面
import SocialLogin from '@/pages/sessions/social-login';
import PhoneLogin from '@/pages/sessions/phone-login';
import InviteLogin from '@/pages/sessions/invite-login';

// 网页显示
import WebView from '@/pages/webview/webview';

export const tabRouters = [
  {
    name: 'Recommend',
    component: Recommend,
    options: {title: '发布'},
  },
  {
    name: 'Mine',
    component: Mine,
    options: {title: '我的'},
  },
  {
    name: 'NotifyIndex',
    component: NotifyIndex,
    options: {title: '消息'},
  },
];

const topicRouter = [
  {
    name: 'TopicDetail',
    component: TopicDetail,
    options: {title: '帖子详情'},
  },
  {
    name: 'NewTopic',
    component: NewTopic,
    options: {title: '发布帖子'},
  },
  {
    name: 'AddHashTag',
    component: AddHashTag,
    options: {title: '@话题'},
  },
  {
    name: 'AddMentionAccount',
    component: AddMentionAccount,
    options: {title: '提及人列表'},
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
    options: {title: '场地详情'},
  },
];

const nodeRouter = [
  {
    name: 'NodeIndex',
    component: NodeIndex,
    options: {title: '圈子'},
  },
  {
    name: 'NodeDetail',
    component: NodeDetail,
    options: {title: '圈子详情'},
  },
];

export const routers = [
  ...topicRouter,
  ...articleRouter,
  ...spaceRouter,
  ...nodeRouter,
  {
    name: 'AccountDetail',
    component: AccountDetail,
    options: {title: '用户详情'},
  },
  {
    name: 'PhoneLogin',
    component: PhoneLogin,
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
  },
  {
    name: 'InviteLogin',
    component: InviteLogin,
    options: {title: '输入邀请码'},
  },
  {
    name: 'InviteDetail',
    component: InviteDetail,
    options: {title: '我的邀请'},
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
    name: 'LabWebview',
    component: LabWebview,
    options: {title: 'LabWebview'},
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
    options: {title: '评论通知'},
  },
  {
    name: 'PraiseNotify',
    component: PraiseNotify,
    options: {title: '点赞通知'},
  },
  {
    name: 'SystemNotify',
    component: SystemNotify,
    options: {title: '系统通知'},
  },
  {
    name: 'FollowNotify',
    component: FollowNotify,
    options: {title: '关注通知'},
  },
  {
    name: 'MentionNotify',
    component: MentionNotify,
    options: {title: '@我的'},
  },
  {
    name: 'WebView',
    component: WebView,
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
];
