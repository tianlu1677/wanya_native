import React from 'react';
import {Text, Pressable} from 'react-native';
import * as RootNavigation from '@/navigator/root-navigation';
import {CardStyleInterpolators} from '@react-navigation/stack';

// 默认: safeArea: false  barStyle: 'dark-content' ｜｜ 'light-content'  headerShown:true

const forVerticalIOS = {
  animationEnabled: true,
  gestureEnabled: false,
  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
};

// 搜索
import SearchIndex from '@/pages/search/search-index';

// Topic
import NewTopic from '@/pages/topics/new-topic';
import AddMentionAccount from '@/pages/topics/add-mention-account';
import AddHashTag from '@/pages/topics/add-hashtag';
import AddSpace from '@/pages/topics/add-space';
import AddNode from '@/pages/topics/add-node';
import AddRelated from '@/pages/topics/add-related/add-related-index';
import AddLink from '@/pages/topics/add-link';
import TopicDetail from '@/pages/topics/topic-detail';
import TopicLinkDetail from '@/pages/topics/topic-link-detail';

// 文章
import ArticleDetail from '@/pages/articles/article-detail';

// theory
import NewTheory from '@/pages/theories/new-theory';
import NewTheoryContent from '@/pages/theories/new-theory-content';
import TheoryPreview from '@/pages/theories/theory-preview';
import TheoryDetail from '@/pages/theories/theory-detail';

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

// Location
import LocationDetail from '@/pages/location/location-detail';

// 话题
import HashtagDetail from '@/pages/hashtags/hashtag-detail';

// activity
import Activity from '@/pages/activities/activity';
import ActivityDetail from '@/pages/activities/activity-detail';

// movement
import Movement from '@/pages/movements/movement';
import MovementDetail from '@/pages/movements/movement-detail';

// ShopStore
import ShopStore from '@/pages/shopStores/shop-store';
import ShopStoreDetail from '@/pages/shopStores/shop-store-detail';

// ShopBarnd
import ShopBrand from '@/pages/shopBrands/shop-brand';
import ShopBrandDetail from '@/pages/shopBrands/shop-brand-detail';

// Mine
import Settings from '@/pages/mine/settings';
import About from '@/pages/mine/settings/about';
import AccountContent from '@/pages/mine/settings/account-content';
import EditAccountContent from '@/pages/mine/settings/edit-account-content';
import Feedback from '@/pages/mine/settings/feedback';

// 用户
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

// 聊天
import ChatDetail from '@/pages/chats/chat-detail/index';
import ChatGroups from '@/pages/chats/chat_groups';

// 公用页面
import RelatedAccounts from '@/pages/home/related-account-list'; //关注页面相关推荐
import ChooseCity from '@/components/List/choose-city'; //选择城市
import JoinAccountsList from '@/components/List/join-accounts-list'; //最近加入好友
import WebView from '@/pages/webview/webview'; //webview
import SharePage from '@/pages/shares/share_page'; //分享
import Report from '@/pages/reports/report'; //投诉

// 实验室页面
import LabIndex from '@/pages/labs/index';
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

// 一键登录页面
import OneLogin from '@/pages/sessions/one-login'

const searchRouter = [
  {name: 'SearchIndex', component: SearchIndex, options: {title: '搜索', headerShown: false}},
];

const topicRouter = [
  {name: 'TopicDetail', component: TopicDetail, options: {headerShown: false}},
  {name: 'TopicLinkDetail', component: TopicLinkDetail, options: {headerShown: false}},
  {name: 'AddNode', component: AddNode},
  {name: 'AddRelated', component: AddRelated, options: {headerShown: false, herderColor: '#fff'}},
  {name: 'AddLink', component: AddLink},
  {name: 'AddHashTag', component: AddHashTag, options: {headerShown: false, herderColor: '#fff'}},
  {name: 'AddSpace', component: AddSpace, options: {headerShown: false, herderColor: '#fff'}},
  {
    name: 'AddMentionAccount',
    component: AddMentionAccount,
    options: {headerShown: false, herderColor: '#fff'},
  },
  {
    name: 'NewTopic',
    component: NewTopic,
    options: {...forVerticalIOS},
  },
];

const articleRouter = [{name: 'ArticleDetail', component: ArticleDetail, options: {title: ''}}];

const nodeRouter = [
  {
    name: 'NodeIndex',
    component: NodeIndex,
    options: {
      title: '全部圈子',
      headerRight: ({navigation}) => (
        <Pressable
          onPress={() => {
            RootNavigation.navigate('CreateNodeIntro');
          }}>
          <Text style={{fontSize: 15, color: '#bdbdbd'}}>创建圈子</Text>
        </Pressable>
      ),
    },
  },
  {name: 'NodeDetail', component: NodeDetail, options: {title: '圈子详情', headerShown: false}},
  {name: 'CreateNodeIntro', component: CreateNodeIntro, options: {title: '创建圈子'}},
  {name: 'CreateNodeInfo', component: CreateNodeInfo, options: {title: '填写圈子资料'}},
  {name: 'CreateNodeType', component: CreateNodeType, options: {title: '选择圈子分类或位置'}},
  {name: 'CreateNodeResult', component: CreateNodeResult},
];

const spaceRouter = [
  {name: 'Space', component: Space},
  {name: 'SpaceDetail', component: SpaceDetail, options: {title: '', headerShown: false}},
];

const theoryRouter = [
  {name: 'NewTheory', component: NewTheory, options: {...forVerticalIOS}},
  {name: 'NewTheoryContent', component: NewTheoryContent},
  {
    name: 'TheoryPreview',
    component: TheoryPreview,
    barColor: 'light',
    options: {headerShown: false, herderColor: '#000'},
  },
  {
    name: 'TheoryDetail',
    component: TheoryDetail,
    barColor: 'light',
    options: {title: '', headerShown: false, herderColor: '#000'},
  },
];

const locationRouter = [
  {name: 'LocationDetail', component: LocationDetail, options: {title: '位置'}},
];

const hashtagRouter = [
  {name: 'HashtagDetail', component: HashtagDetail, options: {title: '话题', headerShown: false}},
];

const activityRouter = [
  {name: 'Activity', component: Activity},
  {name: 'ActivityDetail', component: ActivityDetail, options: {title: '活动详情'}},
];

const movementRouter = [
  {name: 'Movement', component: Movement},
  {name: 'MovementDetail', component: MovementDetail, options: {headerShown: false}},
];

const shopStoreRouter = [
  {name: 'ShopStore', component: ShopStore},
  {name: 'ShopStoreDetail', component: ShopStoreDetail, options: {headerShown: false}},
];

const shopBrandRouter = [
  {name: 'ShopBrand', component: ShopBrand},
  {name: 'ShopBrandDetail', component: ShopBrandDetail, options: {headerShown: false}},
];

const mineRouter = [
  {name: 'Settings', component: Settings, options: {title: '设置'}},
  {name: 'AccountContent', component: AccountContent, options: {title: '编辑信息'}},
  {name: 'EditAccountContent', component: EditAccountContent, options: {title: '编辑信息'}},
  {name: 'Feedback', component: Feedback, options: {title: '反馈'}},
  {name: 'About', component: About, options: {title: '关于顽鸦'}},
];

const accountRouter = [
  {
    name: 'AccountDetail',
    component: AccountDetail,
    barColor: 'light',
    options: {headerShown: false},
  },
  {name: 'FollowNodes', component: FollowNodes, barColor: 'dark', options: {title: '圈子列表'}},
  {name: 'FollowAccounts', component: FollowAccounts, options: {title: '关注列表'}},
  {name: 'FollowerAccounts', component: FollowerAccounts, options: {title: '粉丝列表'}},
];

const commonRouter = [
  {name: 'RelatedAccounts', component: RelatedAccounts, options: {title: '相关推荐'}},
  {name: 'ChooseCity', component: ChooseCity, options: {title: '选择城市'}},
  {name: 'JoinAccountsList', component: JoinAccountsList, options: {title: '最近加入列表'}},
  {name: 'WebView', component: WebView, options: {title: 'WebView'}},
  {name: 'SharePage', component: SharePage, options: {title: '分享'}},
  {name: 'Report', component: Report, options: {title: '投诉'}},
  {name: 'OneLogin', component: OneLogin, options: {title: '一键登录'}}
];

const LabRouter = [
  {name: 'LabIndex', component: LabIndex, options: {title: '实验室主页'}},
  {name: 'LabGalley', component: LabGalley, options: {title: '最新'}},
  {name: 'LabTabIndex', component: LabTabIndex, options: {title: '实验室标签页'}},
  {name: 'LabStorageIndex', component: LabStorageIndex, options: {title: 'LabStorageIndex'}},
];

const notifyRouter = [
  {name: 'NotifyIndex', component: NotifyIndex, options: {title: '互动通知'}},
  {name: 'CommentNotify', component: CommentNotify, options: {title: '评论及回复'}},
  {name: 'PraiseNotify', component: PraiseNotify, options: {title: '赞和收藏'}},
  {name: 'FollowNotify', component: FollowNotify, options: {title: '新增粉丝'}},
  {name: 'MentionNotify', component: MentionNotify, options: {title: '@我的'}},
  {name: 'SystemNotify', component: SystemNotify, options: {title: '顽鸦小助手'}},
];

const chatRouter = [
  {name: 'ChatDetail', component: ChatDetail, options: {title: ''}},
  {name: 'ChatGroups', component: ChatGroups, options: {title: ''}},
];

const authRouter = [
  {name: 'SocialLogin', component: SocialLogin, options: {headerShown: false}},
  {name: 'PhoneLogin', component: PhoneLogin},
  {name: 'PasswordLogin', component: PasswordLogin},
  {name: 'InviteLogin', component: InviteLogin, options: {title: '输入邀请码'}},
  {name: 'InviteDetail', component: InviteDetail, options: {title: '邀请码'}},
  {name: 'AdminPhoneLogin', component: AdminPhoneLogin},
];

export const MainRouters = [
  ...searchRouter,
  ...topicRouter,
  ...articleRouter,
  ...theoryRouter,
  ...nodeRouter,
  ...spaceRouter,
  ...locationRouter,
  ...hashtagRouter,
  ...activityRouter,
  ...movementRouter,
  ...shopStoreRouter,
  ...shopBrandRouter,
  ...mineRouter,
  ...accountRouter,
  ...notifyRouter,
  ...commonRouter,
  ...LabRouter,
  ...authRouter,
  ...chatRouter,
];

export const AuthRouters = authRouter;
