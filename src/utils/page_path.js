export default class goPage {
  static goHomeUrl(params = '') {
    this.props.navigation.navigate('Recommend');
  }

  static goLogin() {
    this.props.navigation.navigate('PhoneLogin');
  }

  // 个人中心 mine
  static goMineUrl(params = '') {
    this.props.navigation.navigate('Mine');
  }

  static goNotifyUrl(params = '') {
    this.props.navigation.navigate('Notify');
  }

  // webview
  // static goWebView(webview_url = "") {
  //   Taro.navigateTo({url: '/pages/webviews/fullpage?webview_url=' + webview_url})
  // }
}
