1. newtopic.js 实现视频的上传
2. 图片预览
```
在App.js 中定义了 PreviewImage 组件
在 labs/index 中定义了 调用

 const previewImg = () => {
    console.log('previewImg')

    const images = [
      {
        // Simplest usage.
        url: 'http://file.meirixinxue.com/assets/2020/15bf8a6a-0429-4122-8107-0d0d3b724d61.jpeg',

        // width: number
        // height: number
        // Optional, if you know the image size, you can set the optimization performance

        // You can pass props to <Image />.
        props: {
          // headers: ...
        },
      },
      {
        url: 'http://file.meirixinxue.com/assets/2020/852febda-3dcd-46ee-ab8e-a6cc1322b7c5.jpg',
        props: {
          // Or you can set source directory.
          // source: require('../background.png')
        },
      },
    ];
    # 定义全局redux来调用
    const data = {images: images, visible: true, index: 1}
    dispatch(dispatchPreviewImage(data))

  }

```

3. 权限判断
在 labs/index.js 定义了权限判断 checkPermission
https://github.com/react-native-community/react-native-permissions 
