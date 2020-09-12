// 用户相关
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const PHONE_LOGIN_REQUEST = 'PHONE_LOGIN_REQUEST';
export const PHONE_LOGIN_SUCCESS = 'PHONE_LOGIN_SUCCESS';

export const ACCOUNT_SET_TOKEN = 'ACCOUNT_SET_TOKEN';

// 预览图片
export const PREVIEW_IMAGES = 'PREVIEW_IMAGES';

// 当前用户的详细信息
export const BASE_CURRENT_ACCOUNT_REQUEST = 'BASE_CURRENT_ACCOUNT_REQUEST';
export const BASE_CURRENT_ACCOUNT_SUCCESS = 'BASE_CURRENT_ACCOUNT_SUCCESS';
export const CURRENT_ACCOUNT_REQUEST = 'CURRENT_ACCOUNT_REQUEST';
export const CURRENT_ACCOUNT_SUCCESS = 'CURRENT_ACCOUNT_SUCCESS';
export const CHANGE_PROGRESS = 'CHANGE_PROGRESS';

// 用户的基本信息
export const ACCOUNT_DETAIL_REQUEST = 'ACCOUNT_DETAIL_REQUEST';
export const ACCOUNT_DETAIL_SUCCESS = 'ACCOUNT_DETAIL_SUCCESS';
export const ACCOUNT_UPDATE_INFO_REQUEST = 'ACCOUNT_UPDATE_INFO_REQUEST';
export const ACCOUNT_UPDATE_INFO_SUCCESS = 'ACCOUNT_UPDATE_INFO_SUCCESS';
export const ACCOUNT_FOLLOW_REQUEST = 'ACCOUNT_FOLLOW_REQUEST';
export const ACCOUNT_FOLLOW_SUCCESS = 'ACCOUNT_FOLLOW_SUCCESS';
export const ACCOUNT_UN_FOLLOW_REQUEST = 'ACCOUNT_UN_FOLLOW_REQUEST';
export const ACCOUNT_UN_FOLLOW_SUCCESS = 'ACCOUNT_UN_FOLLOW_SUCCESS';
export const ACCOUNT_EMPTY_SUCCESS = 'ACCOUNT_EMPTY_SUCCESS';

export const ADMIN_SIGN_SUCCESS = 'ADMIN_SIGN_SUCCESS';

// 圈子相关
export const NODE_LIST_REQUEST = 'NODE_LIST_REQUEST';
export const NODE_FOLLOW_LIST_REQUEST = 'NODE_FOLLOW_LIST_REQUEST';
export const NODE_FOLLOW_LIST_SUCCESS = 'NODE_FOLLOW_LIST_SUCCESS';
export const NODE_LIST_SUCCESS = 'NODE_LIST_SUCCESS';
export const NODE_FOLLOW_REQUEST = 'NODE_FOLLOW_REQUEST';
export const NODE_UN_FOLLOW_REQUEST = 'NODE_UN_FOLLOW_REQUEST';
export const NODE_FOLLOW_SUCCESS = 'NODE_FOLLOW_SUCCESS';
export const NODE_UN_FOLLOW_SUCCESS = 'NODE_UN_FOLLOW_SUCCESS';
export const NODE_DETAIL_REQUEST = 'NODE_DETAIL_REQUEST';
export const NODE_DETAIL_SUCCESS = 'NODE_DETAIL_SUCCESS';

export const NODE_TIP_CHANGE = 'NODE_TIP_CHANGE';

// 分类相关
export const CATEGORY_LIST_REQUEST = 'CATEGORY_LIST_REQUEST'; // 分类列表
export const CATEGORY_LIST_SUCCESS = 'CATEGORY_LIST_SUCCESS'; // 分类列表
export const CATEGORY_DETAIL_REQUEST = 'CATEGORY_DETAIL_REQUEST'; // 分类详情
export const CATEGORY_DETAIL_SUCCESS = 'CATEGORY_DETAIL_SUCCESS'; // 分类详情
export const CATEGORY_HOT_COURSES_REQUEST = 'CATEGORY_HOT_COURSES_REQUEST'; // 分类热门课程
export const CATEGORY_HOT_COURSES_SUCCESS = 'CATEGORY_HOT_COURSES_SUCCESS'; // 分类热门课程
export const CATEGORY_DAILY_COURSES_REQUEST = 'CATEGORY_DAILY_COURSES_REQUEST'; // 分类每日课程
export const CATEGORY_DAILY_COURSES_SUCCESS = 'CATEGORY_DAILY_COURSES_SUCCESS'; // 分类每日课程
export const CATEGORIES_HOME_SELECTED = 'CATEGORIES_HOME_SELECTED'; // 分类每日课程

// 首页
export const HOME_FOLLOW_CATEGORIES_REQUEST = 'HOME_FOLLOW_CATEGORIES'; // 分类列表
export const HOME_FOLLOW_CATEGORIES_SUCCESS = 'HOME_FOLLOW_CATEGORIES_SUCCESS'; // 分类列表
export const HOME_RECOMMEND_COURSES_REQUEST = 'HOME_RECOMMEND_COURSES'; // 分类详情
export const HOME_RECOMMEND_COURSES_SUCCESS = 'HOME_RECOMMEND_COURSES_SUCCESS'; // 分类详情
export const HOME_DAILY_COURSES_REQUEST = 'HOME_DAILY_COURSES'; // 分类详情
export const HOME_DAILY_COURSES_SUCCESS = 'HOME_DAILY_COURSES_SUCCESS'; // 分类详情
export const HOME_RECOMMEND_TOPICS_REQUEST = 'HOME_RECOMMEND_TOPICS'; // 分类详情
export const HOME_RECOMMEND_TOPICS_SUCCESS = 'HOME_RECOMMEND_TOPICS_SUCCESS'; // 分类详情
export const HOME_CATEGORY_RANKS_REQUEST = 'HOME_CATEGORY_RANKS'; // 分类详情
export const HOME_CATEGORY_RANKS_SUCCESS = 'HOME_CATEGORY_RANKS_SUCCESS'; // 分类详情

// 课程相关
export const COURSE_DETAIL_REQUEST = 'COURSE_DETAIL_REQUEST'; // 设置详情
export const COURSE_DETAIL_SUCCESS = 'COURSE_DETAIL_SUCCESS'; // 设置详情
export const COURSE_LIST_REQUEST = 'COURSE_LIST_REQUEST'; // 课程列表
export const COURSE_LIST_SUCCESS = 'COURSE_LIST_SUCCESS'; // 课程列表
export const COURSE_PRAISE_REQUEST = 'COURSE_PRAISE_REQUEST'; // 课程点赞
export const COURSE_PRAISE_SUCCESS = 'COURSE_PRAISE_SUCCESS'; // 课程点赞
export const COURSE_STAR_REQUEST = 'COURSE_STAR_REQUEST'; // 课程收藏
export const COURSE_STAR_SUCCESS = 'COURSE_STAR_SUCCESS'; // 课程收藏
export const COURSE_SHARE_REQUEST = 'COURSE_SHARE_REQUEST'; // 课程分享
export const COURSE_SHARE_SUCCESS = 'COURSE_SHARE_SUCCESS'; // 课程分享
export const COURSE_VIEW_REQUEST = 'COURSE_VIEW_REQUEST'; // 课程查看
export const COURSE_VIEW_SUCCESS = 'COURSE_VIEW_SUCCESS'; // 课程查看
export const COURSE_UN_PRAISE_REQUEST = 'COURSE_UN_PRAISE_REQUEST'; // 课程取消点赞
export const COURSE_UN_PRAISE_SUCCESS = 'COURSE_UN_PRAISE_SUCCESS'; // 课程取消点赞
export const COURSE_UN_STAR_REQUEST = 'COURSE_UN_STAR_REQUEST'; // 课程取消收藏
export const COURSE_UN_STAR_SUCCESS = 'COURSE_UN_STAR_SUCCESS'; // 课程取消收藏
export const COURSE_LESSON_LIST_REQUEST = 'COURSE_LESSON_LIST_REQUEST';
export const COURSE_LESSON_LIST_SUCCESS = 'COURSE_LESSON_LIST_SUCCESS';
export const COURSE_TOPIC_LIST_REQUEST = 'COURSE_TOPIC_LIST_REQUEST';
export const COURSE_TOPIC_LIST_SUCCESS = 'COURSE_TOPIC_LIST_SUCCESS';
export const COURSE_LEARNING_REQUEST = 'COURSE_LEARNING_REQUEST'; // 课程学习
export const COURSE_LEARNING_SUCCESS = 'COURSE_LEARNING_SUCCESS'; // 课程学习
export const COURSE_UPDATE_LEARNING_REQUEST = 'COURSE_UPDATE_LEARNING_REQUEST'; // 更新用户的学习状态
export const COURSE_UPDATE_LEARNING_SUCCESS = 'COURSE_UPDATE_LEARNING_SUCCESS'; // 更新用户的学习状态
export const COURSE_BASE_DETAIL_REQUEST = 'COURSE_BASE_DETAIL_REQUEST';
export const COURSE_BASE_DETAIL_SUCCESS = 'COURSE_BASE_DETAIL_SUCCESS';
export const COURSE_ENROLLMENT_REQUEST = 'COURSE_ENROLLMENT_REQUEST';
export const COURSE_ENROLLMENT_SUCCESS = 'COURSE_ENROLLMENT_SUCCESS';
export const COURSE_CREATE_ACTION = 'COURSE_CREATE_ACTION';
export const COURSE_DESTROY_ACTION = 'COURSE_DESTROY_ACTION';
export const COURSE_ENTER_ENROLLMENT_REQUEST = 'COURSE_ENTER_ENROLLMENT_REQUEST';
export const LOAD_COURSE_DETAIL_REQUEST = 'LOAD_COURSE_DETAIL_REQUEST';

// 课时相关
export const LESSON_DETAIL_REQUEST = 'LESSON_DETAIL_REQUEST'; // 设置详情
export const LESSON_DETAIL_SUCCESS = 'LESSON_DETAIL_SUCCESS'; // 设置详情
export const LESSON_BASE_DETAIL_REQUEST = 'LESSON_BASE_DETAIL_REQUEST'; // 设置基本详情
export const LESSON_BASE_DETAIL_SUCCESS = 'LESSON_BASE_DETAIL_SUCCESS'; // 设置基本详情
export const LESSON_LIST_REQUEST = 'LESSON_LIST_REQUEST'; // 课时列表
export const LESSON_LIST_SUCCESS = 'LESSON_LIST_SUCCESS'; // 课时列表
export const LESSON_PRAISE_REQUEST = 'LESSON_PRAISE'; // 课时点赞
export const LESSON_PRAISE_SUCCESS = 'LESSON_PRAISE_SUCCESS'; // 课时点赞
export const LESSON_STAR_REQUEST = 'LESSON_STAR'; // 课时收藏
export const LESSON_STAR_SUCCESS = 'LESSON_STAR_SUCCESS'; // 课时收藏
export const LESSON_SHARE_REQUEST = 'LESSON_SHARE'; // 课时分享
export const LESSON_SHARE_SUCCESS = 'LESSON_SHARE_SUCCESS'; // 课时分享
export const LESSON_VIEW_REQUEST = 'LESSON_VIEW'; // 课时查看
export const LESSON_VIEW_SUCCESS = 'LESSON_VIEW_SUCCESS'; // 课时查看
export const LESSON_UN_PRAISE_REQUEST = 'LESSON_UN_PRAISE'; // 课时取消点赞
export const LESSON_UN_PRAISE_SUCCESS = 'LESSON_UN_PRAISE_SUCCESS'; // 课时取消点赞
export const LESSON_UN_STAR_REQUEST = 'LESSON_UN_STAR_REQUEST'; // 课时取消收藏
export const LESSON_UN_STAR_SUCCESS = 'LESSON_UN_STAR_SUCCESS'; // 课时取消收藏
export const LESSON_HIT_CHANGE_REQUEST = 'LESSON_HIT_CHANGE_REQUEST';
export const LESSON_HIT_CHANGE = 'LESSON_HIT_CHANGE';
export const LESSON_HIT_REQUEST = 'LESSON_HIT_REQUEST';
export const LESSON_DIALOG_REQUEST = 'LESSON_DIALOG';
export const LESSON_DIALOG_SUCCESS = 'LESSON_DIALOG_SUCCESS';
export const LESSON_PAUSE_REQUEST = 'LESSON_PAUSE';
export const LESSON_PAUSE_SUCCESS = 'LESSON_PAUSE_SUCCESS';

export const LESSON_CREATE_ACTION = 'LESSON_CREATE_ACTION';
export const LESSON_DESTROY_ACTION = 'LESSON_DESTROY_ACTION';

// 帖子相关
export const TOPIC_CREATE_ACTION_REQUEST = 'TOPIC_CREATE_ACTION_REQUEST'; // 设置详情
export const TOPIC_DESTROY_ACTION_REQUEST = 'TOPIC_DESTROY_ACTION_REQUEST'; // 设置详情

export const TOPIC_DETAIL_REQUEST = 'TOPIC_DETAIL_REQUEST'; // 设置详情
export const TOPIC_DETAIL_SUCCESS = 'TOPIC_DETAIL_SUCCESS'; // 设置详情
export const TOPIC_UPDATE_REQUEST = 'TOPIC_UPDATE_REQUEST'; // 设置详情
export const TOPIC_EMPTY = 'TOPIC_EMPTY'; // 设置详情

export const TOPIC_UPDATE_SUCCESS = 'TOPIC_UPDATE_SUCCESS'; // 更新详情
export const TOPIC_DELETE_REQUEST = 'TOPIC_DELETE'; // 删除详情
export const TOPIC_DELETE_SUCCESS = 'TOPIC_DELETE_SUCCESS'; // 删除详情
export const TOPIC_LIST_REQUEST = 'TOPIC_LIST'; // 设置列表
export const TOPIC_LIST_SUCCESS = 'TOPIC_LIST_SUCCESS'; // 设置列表
export const TOPIC_TAGS_REQUEST = 'TOPIC_TAGS'; // 帖子分享
export const TOPIC_TAGS_SUCCESS = 'TOPIC_TAGS_SUCCESS'; // 帖子分享

export const TOPIC_PRAISE_SUCCESS = 'TOPIC_PRAISE_SUCCESS'; // 帖子点赞
export const TOPIC_STAR_SUCCESS = 'TOPIC_STAR_SUCCESS'; // 帖子收藏
export const TOPIC_SHARE_SUCCESS = 'TOPIC_SHARE_SUCCESS'; // 帖子分享
export const TOPIC_UN_PRAISE_SUCCESS = 'TOPIC_UN_PRAISE_SUCCESS'; // 帖子取消点赞
export const TOPIC_UN_STAR_SUCCESS = 'TOPIC_UN_STAR_SUCCESS'; // 帖子取消收藏

// 文章
export const ARTICLE_CREATE_ACTION_REQUEST = 'ARTICLE_CREATE_ACTION_REQUEST'; // 设置详情
export const ARTICLE_DESTROY_ACTION_REQUEST = 'ARTICLE_DESTROY_ACTION_REQUEST'; // 设置详情

export const ARTICLE_DETAIL_REQUEST = 'ARTICLE_DETAIL_REQUEST'; // 设置详情
export const ARTICLE_DETAIL_SUCCESS = 'ARTICLE_DETAIL_SUCCESS'; // 设置详情

export const ARTICLE_PRAISE_SUCCESS = 'ARTICLE_PRAISE_SUCCESS'; // 帖子点赞
export const ARTICLE_STAR_SUCCESS = 'ARTICLE_STAR_SUCCESS'; // 帖子收藏
export const ARTICLE_SHARE_SUCCESS = 'ARTICLE_SHARE_SUCCESS'; // 帖子分享
export const ARTICLE_UN_PRAISE_SUCCESS = 'ARTICLE_UN_PRAISE_SUCCESS'; // 帖子取消点赞
export const ARTICLE_UN_STAR_SUCCESS = 'ARTICLE_UN_STAR_SUCCESS'; // 帖子取消收藏

// 学习相关
export const LEARNING_RECORDS_REQUEST = 'LEARNING_RECORDS';
export const LEARNING_RECORDS_SUCCESS = 'LEARNING_RECORDS_SUCCESS';

// new topic
export const SAVE_NEW_TOPIC = 'SAVE_NEW_TOPIC';
export const SAVE_COMMENT_TOPIC = 'SAVE_COMMENT_TOPIC'; // 帖子评论
