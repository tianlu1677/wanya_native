#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>
#import "SDImageCodersManager.h"
#import <SDWebImageWebPCoder/SDImageWebPCoder.h>
#import "RNUMConfigure.h"
#import "UMAnalyticsModule.h"
//#import "UMPushModule.h"
#import <UMAnalytics/MobClick.h>
#import "RNBootSplash.h" // <- add the header import
#import <CodePush/CodePush.h>
#import <UserNotifications/UserNotifications.h>
//#import <RNCPushNotificationIOS.h>
//#import <UMPush/UMessage.h>
#import <RCTJPushModule.h>

#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>


// #ifdef DEBUG
// #import <DoraemonKit/DoraemonManager.h>
// #endif

static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

//@interface AppDelegate() <UNUserNotificationCenterDelegate>
//@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif

  // #ifdef DEBUG
  // [[DoraemonManager shareInstance] installWithPid:@"21db7e76df6393f424c222f22efec014"];//productId为在“平台端操作指南”中申请的产品id
  // #endif

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"wanya_native"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  // JPUSH
  [JPUSHService setupWithOption:launchOptions appKey:@"7cd75000d5932000b3d4ca59" channel:@"release" apsForProduction:YES];
  
  // APNS
  JPUSHRegisterEntity * entity = [[JPUSHRegisterEntity alloc] init];
  if (@available(iOS 12.0, *)) {
    entity.types = JPAuthorizationOptionAlert|JPAuthorizationOptionBadge|JPAuthorizationOptionSound|JPAuthorizationOptionProvidesAppNotificationSettings;
  }
  [JPUSHService registerForRemoteNotificationConfig:entity delegate:self];
  [launchOptions objectForKey: UIApplicationLaunchOptionsRemoteNotificationKey];
  // 自定义消息
  NSNotificationCenter *defaultCenter = [NSNotificationCenter defaultCenter];
  [defaultCenter addObserver:self selector:@selector(networkDidReceiveMessage:) name:kJPFNetworkDidReceiveMessageNotification object:nil];
  // 地理围栏
  [JPUSHService registerLbsGeofenceDelegate:self withLaunchOptions:launchOptions];
// JPUSHEND
  
  // 使用 UNUserNotificationCenter 来管理通知
//  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  //监听回调事件
//  center.delegate = (id)self;
//
//  //iOS 10 使用以下方法注册，才能得到授权
//  [center requestAuthorizationWithOptions:(UNAuthorizationOptionAlert + UNAuthorizationOptionSound)
//                        completionHandler:^(BOOL granted, NSError * _Nullable error) {
//                            if(granted) {
//                                NSLog(@"授权成功");
//                            }
//                        }];
//
//  //获取当前的通知设置，UNNotificationSettings 是只读对象，不能直接修改，只能通过以下方法获取
//  [center getNotificationSettingsWithCompletionHandler:^(UNNotificationSettings * _Nonnull settings) {
//  }];
//
//  [[UIApplication sharedApplication] registerForRemoteNotifications];
  
  // Register WebP format support
  [SDImageCodersManager.sharedManager addCoder:SDImageWebPCoder.sharedCoder];
//  [SDWebImageCodersManager.sharedInstance addCoder:SDWebImageGIFCoder.sharedCoder];

  [UMConfigure setLogEnabled:YES];
  [RNUMConfigure initWithAppkey:@"5f32492fd30932215476edfe" channel:@"App Store"];
  [MobClick setScenarioType:E_UM_NORMAL];
  
//  UMessageRegisterEntity * entity = [[UMessageRegisterEntity alloc] init];
//  entity.types = UMessageAuthorizationOptionBadge|UMessageAuthorizationOptionAlert|UMessageAuthorizationOptionSound;
//  [UNUserNotificationCenter currentNotificationCenter].delegate=self;
//
//  [UMessage registerForRemoteNotificationsWithLaunchOptions:launchOptions Entity:nil completionHandler:^(BOOL granted, NSError * _Nullable error) {
//    if (granted) {
//      NSLog(@"deviceToken+++++++++");
//    } else {
//
//    }
//  }];
//
  [RNBootSplash initWithStoryboard:@"LaunchScreen" rootView:rootView]; // <- initialization using the storyboard file name
  
  return YES;
}

//Called when a notification is delivered to a foreground app.
//-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
//{
//  completionHandler(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge);
//}

//************************************************JPush start************************************************

//注册 APNS 成功并上报 DeviceToken
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  [JPUSHService registerDeviceToken:deviceToken];
}

//iOS 7 APNS
- (void)application:(UIApplication *)application didReceiveRemoteNotification:  (NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
  // iOS 10 以下 Required
  NSLog(@"iOS 7 APNS");
  [JPUSHService handleRemoteNotification:userInfo];
  [[NSNotificationCenter defaultCenter] postNotificationName:J_APNS_NOTIFICATION_ARRIVED_EVENT object:userInfo];
  completionHandler(UIBackgroundFetchResultNewData);
}

//iOS 10 前台收到消息
- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center  willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(NSInteger))completionHandler {
  NSDictionary * userInfo = notification.request.content.userInfo;
  if([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
    // Apns
    NSLog(@"iOS 10 APNS 前台收到消息");
    [JPUSHService handleRemoteNotification:userInfo];
    [[NSNotificationCenter defaultCenter] postNotificationName:J_APNS_NOTIFICATION_ARRIVED_EVENT object:userInfo];
  }
  else {
    // 本地通知 todo
    NSLog(@"iOS 10 本地通知 前台收到消息");
    [[NSNotificationCenter defaultCenter] postNotificationName:J_LOCAL_NOTIFICATION_ARRIVED_EVENT object:userInfo];
  }
  //需要执行这个方法，选择是否提醒用户，有 Badge、Sound、Alert 三种类型可以选择设置
  completionHandler(UNNotificationPresentationOptionAlert);
}


//iOS 10 消息事件回调
- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler: (void (^)(void))completionHandler {
  NSDictionary * userInfo = response.notification.request.content.userInfo;
  if([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
    // Apns
    NSLog(@"iOS 10 APNS 消息事件回调");
    [JPUSHService handleRemoteNotification:userInfo];
    // 保障应用被杀死状态下，用户点击推送消息，打开app后可以收到点击通知事件
    [[RCTJPushEventQueue sharedInstance]._notificationQueue insertObject:userInfo atIndex:0];
    [[NSNotificationCenter defaultCenter] postNotificationName:J_APNS_NOTIFICATION_OPENED_EVENT object:userInfo];
  }
  else {
    // 本地通知
    NSLog(@"iOS 10 本地通知 消息事件回调");
    // 保障应用被杀死状态下，用户点击推送消息，打开app后可以收到点击通知事件
    [[RCTJPushEventQueue sharedInstance]._localNotificationQueue insertObject:userInfo atIndex:0];
    [[NSNotificationCenter defaultCenter] postNotificationName:J_LOCAL_NOTIFICATION_OPENED_EVENT object:userInfo];
  }
  // 系统要求执行这个方法
  completionHandler();
}

//自定义消息
- (void)networkDidReceiveMessage:(NSNotification *)notification {
  NSDictionary * userInfo = [notification userInfo];
  [[NSNotificationCenter defaultCenter] postNotificationName:J_CUSTOM_NOTIFICATION_EVENT object:userInfo];
}

//************************************************JPush end************************************************


//
//// Required to register for notifications
//- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
//{
// [RNCPushNotificationIOS didRegisterUserNotificationSettings:notificationSettings];
//}
//// Required for the register event.
//- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
//{
// [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
//}
//// Required for the notification event. You must call the completion handler after handling the remote notification.
//- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
//fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
//{
//  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
//}
//// Required for the registrationError event.
//- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
//{
// [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
//}
//// Required for localNotification event
//- (void)userNotificationCenter:(UNUserNotificationCenter *)center
//didReceiveNotificationResponse:(UNNotificationResponse *)response
//         withCompletionHandler:(void (^)(void))completionHandler
//{
//  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
//}


- (BOOL)application:(UIApplication *)application
  continueUserActivity:(NSUserActivity *)userActivity
  restorationHandler:(void(^)(NSArray<id<UIUserActivityRestoring>> * __nullable
  restorableObjects))restorationHandler {
  // 触发回调方法
  [RCTLinkingManager application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
  return [WXApi handleOpenUniversalLink:userActivity
  delegate:self];
}


- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
            options:(NSDictionary<NSString*, id> *)options
{
//  return [RCTLinkingManager application:application openURL:url options:options];
  // Triggers a callback event.
  // 触发回调事件
  [RCTLinkingManager application:application openURL:url options:options];
  return [WXApi handleOpenURL:url delegate:self];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
//  return [[NSBundle mainBundle] URLForResource:@"bundle/index.ios" withExtension:@"jsbundle"];
  return [CodePush bundleURL];
#endif
}

@end
