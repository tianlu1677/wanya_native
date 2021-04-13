import React from 'react';
import {Text, Pressable} from 'react-native';
import * as RootNavigation from '@/navigator/root-navigation';
// 首页
import {CardStyleInterpolators} from '@react-navigation/stack';
import RelatedAccounts from '@/pages/home/related-account-list';

// Topic
import NewTopic from '@/pages/topics/new-topic';
import AddMentionAccount from '@/pages/topics/add-mention-account';
import AddHashTag from '@/pages/topics/add-hashtag';
import AddSpace from '@/pages/topics/add-space';
import AddNode from '@/pages/topics/add-node';
import AddLink from '@/pages/topics/add-link';
import TopicDetail from '@/pages/topics/topic-detail';
import TopicLinkDetail from '@/pages/topics/topic-link-detail';

// theory
import NewTheory from '@/pages/theories/new-theory';
import NewTheoryContent from '@/pages/theories/new-theory-content';
import TheoryPreview from '@/pages/theories/theory-preview';
import TheoryDetail from '@/pages/theories/theory-detail';

// 文章
import ArticleDetail from '@/pages/articles/article-detail';

// 圈子
import NodeIndex from '@/pages/nodes/node-index';
import NodeDetail from '@/pages/nodes/node-detail';
import CreateNodeIntro from '@/pages/nodes/create-node-intro';
import CreateNodeInfo from '@/pages/nodes/create-node-info';
import CreateNodeType from '@/pages/nodes/create-node-type';
import CreateNodeResult from '@/pages/nodes/create-node-result';

// 场地
import Space from '@/pages/spaces/space';
import SpaceDetail from '@/pages/spaces/space-detail';

// 话题
import HashtagDetail from '@/pages/hashtags/hashtag-detail';

// Location
import LocationDetail from '@/pages/location/location-detail';

// activity
import Activity from '@/pages/activities/activity';
import ActivityDetail from '@/pages/activities/activity-detail';

// movement
import Movement from '@/pages/movements/movement';
import MovementDetail from '@/pages/movements/movement-detail';

// van store
import ShopStore from '@/pages/shopStores/shop-store';
import ShopStoreDetail from '@/pages/shopStores/shop-store-detail';

// shopbarnd
import ShopBrand from '@/pages/shopBrands/shop-brand';
import ShopBrandDetail from '@/pages/shopBrands/shop-brand-detail';

// 我的页面
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
import LabNewest from '@/pages/labs/newest';
import LabGalley from '@/pages/labs/galley';
import LabTabIndex from '@/pages/labs/tabindex';
import LabStorageIndex from '@/pages/labs/storageindex';

//登录页面
import SocialLogin from '@/pages/sessions/social-login';
import PhoneLogin from '@/pages/sessions/phone-login';
import InviteLogin from '@/pages/sessions/invite-login';
import PasswordLogin from '@/pages/sessions/password-login';
import AdminPhoneLogin from '@/pages/login/AdminPhoneLogin';
import InviteDetail from '@/pages/mine/invite-detail';

// 网页显示
import WebView from '@/pages/webview/webview';
import SharePage from '@/pages/shares/share_page'; //分享

// 投诉
import Report from '@/pages/reports/report';
// clubhouse
import ClubhouseIndex from '@/pages/clubhouse/club';

// 公用页面
import ChooseCity from '@/components/List/choose-city'; //选择城市
import JoinAccountsList from '@/components/List/join-accounts-list'; //最近加入好友

import List from '@/pages/lottileList/list';

const topicRouter = [
  {
    name: 'TopicDetail',
    component: TopicDetail,
    safeArea: false,
    barColor: 'dark',
    options: {
      headerShown: false,
    },
  },
  {
    name: 'TopicLinkDetail',
    component: TopicLinkDetail,
    safeArea: false,
    options: {
      headerShown: false,
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
    options: {
      title: '@话题',
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    },
  },
  {
    name: 'AddMentionAccount',
    barColor: 'dark',
    component: AddMentionAccount,
    options: {
      title: '提及人列表',
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    },
  },
  {
    name: 'AddSpace',
    barColor: 'dark',
    component: AddSpace,
    options: {
      title: '场地列表',
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    },
  },
  {
    name: 'AddNode',
    barColor: 'dark',
    component: AddNode,
    options: {
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    },
  },
  {
    name: 'AddLink',
    barColor: 'dark',
    component: AddLink,
  },
];

const theoryRouter = [
  {
    name: 'NewTheory',
    component: NewTheory,
    barColor: 'dark',
    options: {
      animationEnabled: true,
      gestureEnabled: false,
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    },
  },
  {
    name: 'NewTheoryContent',
    component: NewTheoryContent,
    safeArea: false,
    barColor: 'dark',
  },
  {
    name: 'TheoryPreview',
    component: TheoryPreview,
    safeArea: false,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'TheoryDetail',
    component: TheoryDetail,
    safeArea: false,
    options: {
      headerShown: false,
    },
  },
];

const articleRouter = [
  {
    name: 'ArticleDetail',
    component: ArticleDetail,
    safeArea: false,
    barColor: 'dark',
    options: {
      title: '',
      // animationEnabled: true,
      // gestureEnabled: true,
      // cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    },
  },
  {
    name: 'HashtagDetail',
    component: HashtagDetail,
    safeArea: false,
    options: {
      title: '话题',
      headerShown: false,
    },
  },
];

const spaceRouter = [
  {
    name: 'Space',
    component: Space,
    safeArea: false,
    options: {title: '场地列表'},
  },
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

const activityRouter = [
  {
    name: 'Activity',
    component: Activity,
    safeArea: false,
    barColor: 'dark',
    options: {title: '活动'},
  },
  {
    name: 'ActivityDetail',
    component: ActivityDetail,
    safeArea: false,
    barColor: 'dark',
    options: {title: '活动详情'},
  },
];

const movementRouter = [
  {
    name: 'Movement',
    component: Movement,
    safeArea: false,
    barColor: 'dark',
    options: {title: 'Movement'},
  },
  {
    name: 'MovementDetail',
    component: MovementDetail,
    safeArea: false,
    barColor: 'dark',
    options: {title: 'MovementDetail'},
  },
];

const shopStoreRouter = [
  {
    name: 'ShopStore',
    component: ShopStore,
    safeArea: false,
    barColor: 'dark',
    options: {title: 'Van Store'},
  },
  {
    name: 'ShopStoreDetail',
    component: ShopStoreDetail,
    safeArea: false,
    barColor: 'dark',
    options: {title: 'Van Store详情'},
  },
];

const shopBrandRouter = [
  {
    name: 'ShopBrand',
    component: ShopBrand,
    safeArea: false,
    barColor: 'dark',
    options: {title: 'ShopBrand'},
  },
  {
    name: 'ShopBrandDetail',
    component: ShopBrandDetail,
    safeArea: false,
    barColor: 'dark',
    options: {title: 'ShopBrand详情'},
  },
];

const clubRouter = [
  {
    name: 'ClubhouseIndex',
    component: ClubhouseIndex,
    safeArea: false,
    barColor: 'dark',
    options: {
      title: 'clubhouse',
    },
  },
];

const nodeRouter = [
  {
    name: 'NodeIndex',
    component: NodeIndex,
    barColor: 'dark',
    safeArea: false,
    options: {
      title: '全部圈子',
      headerRight: ({navigation}) => (
        <Pressable
          onPress={() => {
            RootNavigation.navigate('CreateNodeIntro');
          }}>
          <Text
            style={{
              fontSize: 15,
              color: '#bdbdbd',
            }}>
            创建圈子{' '}
          </Text>
        </Pressable>
      ),
    },
  },
  {
    name: 'NodeDetail',
    component: NodeDetail,
    safeArea: false,
    options: {
      title: '圈子详情',
      headerShown: false,
    },
  },
  {
    name: 'CreateNodeIntro',
    component: CreateNodeIntro,
    safeArea: true,
    barColor: 'dark',
    options: {
      title: '创建圈子',
    },
  },
  {
    name: 'CreateNodeInfo',
    component: CreateNodeInfo,
    safeArea: false,
    barColor: 'dark',
    options: {
      title: '填写圈子资料',
    },
  },
  {
    name: 'CreateNodeType',
    component: CreateNodeType,
    safeArea: false,
    barColor: 'dark',
    options: {
      title: '选择圈子分类或位置',
    },
  },
  {
    name: 'CreateNodeResult',
    component: CreateNodeResult,
    safeArea: false,
    barColor: 'dark',
  },
];

const locationRouter = [
  {
    name: 'LocationDetail',
    component: LocationDetail,
    safeArea: false,
    barColor: 'dark',
    options: {
      title: '位置',
    },
  },
];

const accountRouter = [
  {
    name: 'AccountDetail',
    component: AccountDetail,
    safeArea: false,
    options: {
      title: '用户详情',
      headerShown: false,
    },
  },
  {
    name: 'FollowNodes',
    component: FollowNodes,
    barColor: 'dark',
    options: {
      title: '圈子列表',
    },
  },
  {
    name: 'FollowAccounts',
    component: FollowAccounts,
    safeArea: false,
    barColor: 'dark',
    options: {
      title: '关注列表',
    },
  },
  {
    name: 'FollowerAccounts',
    barColor: 'dark',
    component: FollowerAccounts,
    safeArea: false,
    options: {
      title: '粉丝列表',
    },
  },
  {
    name: 'Settings',
    component: Settings,
    barColor: 'dark',
    options: {
      title: '设置',
    },
  },
  {
    name: 'About',
    component: About,
    barColor: 'dark',
    options: {
      title: '关于顽鸦',
    },
  },
  {
    name: 'Feedback',
    component: Feedback,
    safeArea: false,
    barColor: 'dark',
    options: {
      title: '反馈',
    },
  },
];

const commonRouter = [
  {
    name: 'ChooseCity',
    barColor: 'dark',
    component: ChooseCity,
    options: {
      title: '选择城市',
    },
  },
  {
    name: 'JoinAccountsList',
    barColor: 'dark',
    component: JoinAccountsList,
    options: {
      title: '最近加入列表',
    },
  },
  {
    name: 'SharePage',
    component: SharePage,
    safeArea: false,
    barColor: 'dark',
    options: {
      title: '分享',
      headerShown: true,
    },
  },
  {
    name: 'Report',
    component: Report,
    safeArea: false,
    barColor: 'dark',
    options: {
      title: '投诉',
      headerShown: true,
    },
  },
];

const searchRouter = [
  {
    name: 'SearchIndex',
    component: SearchIndex,
    safeArea: false,
    barColor: 'dark',
    options: {
      title: '搜索',
      headerShown: false,
    },
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
    options: {
      title: '输入邀请码',
    },
    safeArea: false,
  },
  {
    name: 'PasswordLogin',
    component: PasswordLogin,
    options: {
      title: '输入邀请码',
      headerShown: true,
    },
    safeArea: false,
  },
];
export const routers = [
  ...topicRouter,
  ...theoryRouter,
  ...articleRouter,
  ...spaceRouter,
  ...activityRouter,
  ...movementRouter,
  ...shopStoreRouter,
  ...shopBrandRouter,
  ...nodeRouter,
  ...locationRouter,
  ...accountRouter,
  ...commonRouter,
  ...searchRouter,
  ...authRouter,
  ...clubRouter,
  {
    name: 'RelatedAccounts',
    component: RelatedAccounts,
    safeArea: false,
    barColor: 'dark',
    options: {
      title: '相关推荐',
    },
  },
  {
    name: 'InviteDetail',
    component: InviteDetail,
    safeArea: false,
    options: {
      title: '邀请码',
    },
  },
  {
    name: 'LabIndex',
    component: LabIndex,
    safeArea: true,
    barColor: 'dark',
    options: {
      title: '实验室主页',
      headerShown: true,
    },
  },
  {
    name: 'LabNewest',
    component: LabNewest,
    safeArea: true,
    barColor: 'dark',
    options: {
      title: '最新',
      headerShown: true,
    },
  },
  {
    name: 'LabGalley',
    component: LabGalley,
    safeArea: true,
    barColor: 'dark',
    options: {
      title: '最新',
      headerShown: true,
    },
  },
  {
    name: 'LabTabIndex',
    component: LabTabIndex,
    options: {
      title: '实验室标签页',
    },
  },
  {
    name: 'LabStorageIndex',
    component: LabStorageIndex,
    safeArea: false,
    options: {
      title: 'LabStorageIndex',
    },
  },
  {
    name: 'AdminPhoneLogin',
    component: AdminPhoneLogin,
    options: {
      title: 'AdminPhoneLogin',
    },
  },

  {
    name: 'NotifyIndex',
    component: NotifyIndex,
    barColor: 'dark',
    options: {
      title: '消息',
      headerShown: true,
    },
  },
  {
    name: 'CommentNotify',
    component: CommentNotify,
    barColor: 'dark',
    options: {
      title: '评论及回复',
    },
  },
  {
    name: 'PraiseNotify',
    component: PraiseNotify,
    barColor: 'dark',
    options: {
      title: '赞和收藏',
    },
  },
  {
    name: 'SystemNotify',
    component: SystemNotify,
    barColor: 'dark',
    options: {
      title: '顽鸦小助手',
    },
  },
  {
    name: 'FollowNotify',
    barColor: 'dark',
    component: FollowNotify,
    options: {
      title: '新增粉丝',
    },
  },
  {
    name: 'MentionNotify',
    barColor: 'dark',
    component: MentionNotify,
    options: {
      title: '@我的',
    },
  },
  {
    name: 'WebView',
    component: WebView,
    safeArea: false,
    options: {
      title: 'WebView',
    },
  },
  {
    name: 'AccountContent',
    component: AccountContent,
    options: {
      title: '编辑信息',
    },
  },
  {
    name: 'EditAccountContent',
    safeArea: false,
    component: EditAccountContent,
    options: {
      title: '编辑信息',
    },
  },
  {
    name: 'list',
    safeArea: false,
    component: List,
    options: {
      title: '列表',
    },
  },
];
