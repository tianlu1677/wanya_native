react_native.md

# react native 相关内容
1. 阅读 [react-native 官网](#https://reactnative.cn/docs/getting-started)

2. 查看package.json中的第三方组件的使用

3. API 请求使用 axios，在 api/request.js

4. 导航使用 [react-navigation](#https://reactnavigation.org/) 需要通读一下

5. 长列表 [FlatList](#https://reactnative.cn/docs/using-a-listview) 有一个简单的封装，
components/Scroll.js

6. 第三方的组件库 react-native-elements， 需要自己二次封装

7. 抖音中的滑动效果实现 [抖音滑动效果](#https://juejin.im/post/5ec8ed8d6fb9a0480067bb1f)
可以参考 react-native-swiper 

密码
https://github.com/flexible-agency/react-native-keycode

地图
https://github.com/flexible-agency/react-native-map-link

- icon
 [npm](https://github.com/iconfont-cli/react-native-iconfont-cli)
 每次更新后 symbol 地址后
 重新运行 
`npx iconfont-rn`

- 设置绝对路径
 [网址](https://blog.csdn.net/xukongjing1/article/details/97629696)
 `yarn add babel-plugin-root-import --dev`

  修改 babel.config.js 文件

```
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["babel-plugin-root-import",{
      "rootPathSuffix": "./src/",
      "rootPathPrefix": "@/"
    }]
  ]
};
```

重新运行 `yarn start --reset-cache`

- Toast
[toast](https://github.com/magicismight/react-native-root-toast)

```
import Toast from 'react-native-root-toast';


// Add a Toast on screen.
let toast = Toast.show('This is a message', {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onShow: () => {
        // calls on toast\`s appear animation start
    },
    onShown: () => {
        // calls on toast\`s appear animation end.
    },
    onHide: () => {
        // calls on toast\`s hide animation start.
    },
    onHidden: () => {
        // calls on toast\`s hide animation end.
    }
});

// You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
setTimeout(function () {
    Toast.hide(toast);
}, 500);

```

# 750 设计稿转化
- https://github.com/bingoootang/react-native-adaptive-stylesheet

# style-components
- https://styled-components.com/docs/basics




可能会用到的
组件库
- https://github.com/madhavanmalolan/awesome-reactnative-ui

- https://github.com/oblador/react-native-lightbox
- https://github.com/oblador/react-native-progress
- https://github.com/rgommezz/react-native-offline 判断网络是否在线
- https://github.com/testshallpass/react-native-dropdownalert  顶部消息弹窗

- https://github.com/taskrabbit/react-native-parsed-text 解析文本的
- https://github.com/xcarpentier/react-native-country-picker-modal



