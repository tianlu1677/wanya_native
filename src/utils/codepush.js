import Toast from '@/components/Toast';

export default CodePush => {
  CodePush.sync(
    {
      // installMode: CodePush.InstallMode.ON_NEXT_RESTART,
      installMode: CodePush.InstallMode.IMMEDIATE,
      // mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
      updateDialog: {
        // 是否显示更新描述
        appendReleaseDescription: true,
        // 更新描述的前缀。 默认为"Description"
        descriptionPrefix: '\n\n更新内容：\n',
        // 强制更新按钮文字，默认为continue
        mandatoryContinueButtonLabel: '立即更新',
        // 强制更新时的信息. 默认为"An update is available that must be installed."
        mandatoryUpdateMessage: '必须更新后才能使用',
        // 非强制更新时，按钮文字,默认为"ignore"
        optionalIgnoreButtonLabel: '稍后',
        // 非强制更新时，确认按钮文字. 默认为"Install"
        optionalInstallButtonLabel: '后台更新',
        // 非强制更新时，检查到更新的消息文本
        optionalUpdateMessage: '有新版本了，是否更新？',
        // Alert窗口的标题
        title: '更新',
      },
    },
    status => {
      switch (status) {
        case CodePush.SyncStatus.CHECKING_FOR_UPDATE: // 检查更新
          Toast.showError('正在检测更新...');
          break;
        case CodePush.SyncStatus.DOWNLOADING_PACKAGE: // 正在下载
          break;
        case CodePush.SyncStatus.AWAITING_USER_ACTION: // 等待用户操作
          break;
        case CodePush.SyncStatus.INSTALLING_UPDATE: // 下载更新
          Toast.showError('下载更新');
          break;
        case CodePush.SyncStatus.UP_TO_DATE: // 已更新
          Toast.showError('已更新为最新版本');
          break;
        case CodePush.SyncStatus.UPDATE_IGNORED: // 忽略更新
          break;
        case CodePush.SyncStatus.UPDATE_INSTALLED:
          break;
        case CodePush.SyncStatus.UNKNOWN_ERROR: // 未知错误
          break;
        default:
          break;
      }
    },
    ({receivedBytes, totalBytes}) => {
      // const progress = parseFloat(receivedBytes / totalBytes).toFixed(2)
      if (receivedBytes >= totalBytes) {
        CodePush.allowRestart(); // 强制更新
      }
    }
  );
};
