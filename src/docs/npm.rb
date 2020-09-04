list = %w[
  https://raw.githubusercontent.com/react-native-community/async-storage/master/README.md
  https://raw.githubusercontent.com/react-native-community/clipboard/master/README.md
  https://raw.githubusercontent.com/react-native-community/masked-view/master/README.md
  https://raw.githubusercontent.com/react-native-community/react-native-netinfo/master/README.md
  https://raw.githubusercontent.com/axios/axios/master/README.md
  https://raw.githubusercontent.com/iamkun/dayjs/master/README.md
  https://raw.githubusercontent.com//ea/master/README.md
  https://raw.githubusercontent.com/formium/formik/master/README.md
  https://raw.githubusercontent.com/lodash/lodash/master/README.md
  https://raw.githubusercontent.com/react-native-community/lottie-react-native/master/README.md
  https://raw.githubusercontent.com/blueimp/md5/master/README.md
  https://raw.githubusercontent.com/sindresorhus/query-string/master/README.md
  https://raw.githubusercontent.com/oblador/react-native-animatable/master/README.md
  https://raw.githubusercontent.com/ocetnik/react-native-background-timer/master/README.md
  https://raw.githubusercontent.com/Vydia/react-native-background-upload/master/README.md
  https://raw.githubusercontent.com/luggit/react-native-config/master/README.md
  https://raw.githubusercontent.com/react-native-community/react-native-device-info/master/README.md
  https://raw.githubusercontent.com/DylanVann/react-native-fast-image/master/README.md
  https://raw.githubusercontent.com/Agontuk/react-native-geolocation-service/master/README.md
  https://raw.githubusercontent.com/ivpusic/react-native-image-crop-picker/master/README.md
  https://raw.githubusercontent.com/react-native-community/react-native-image-picker/master/README.md
  https://raw.githubusercontent.com/ascoders/react-native-image-zoom-viewer/master/README.md
  https://raw.githubusercontent.com/react-native-community/react-native-linear-gradient/master/README.md
  https://raw.githubusercontent.com/react-native-community/react-native-modal/master/README.md
  https://raw.githubusercontent.com/react-native-community/react-native-permissions/master/README.md
  https://raw.githubusercontent.com/zo0r/react-native-push-notification/master/README.md
  https://raw.githubusercontent.com/software-mansion/react-native-reanimated/master/README.md
  https://raw.githubusercontent.com/archriss/react-native-render-html/master/README.md
  https://raw.githubusercontent.com/magicismight/react-native-root-toast/master/README.md
  https://raw.githubusercontent.com/th3rdwave/react-native-safe-area-context/master/README.md
  https://raw.githubusercontent.com/archriss/react-native-snap-carousel/master/README.md
  https://raw.githubusercontent.com/react-native-community/react-native-svg/master/README.md
  https://raw.githubusercontent.com/jemise111/react-native-swipe-list-view/master/README.md

  https://raw.githubusercontent.com/leecade/react-native-swiper/master/README.md
  https://raw.githubusercontent.com/syanbo/react-native-syan-image-picker/master/README.md
  https://raw.githubusercontent.com/ptomasroos/react-native-tab-view/master/README.md
  https://raw.githubusercontent.com/react-native-community/react-native-video/master/README.md
  https://raw.githubusercontent.com/gre/react-native-view-shot/master/README.md
  https://raw.githubusercontent.com/react-native-community/react-native-webview/master/README.md
  https://raw.githubusercontent.com/little-snow-fox/react-native-wechat-lib/master/README.md
  https://raw.githubusercontent.com/osdnk/react-native-reanimated-bottom-sheet/master/README.md
]

new_list = %w[
#    https://raw.githubusercontent.com/osdnk/react-native-reanimated-bottom-sheet/master/README.md
   https://raw.githubusercontent.com/AdilKhn/react-native-tiny-toast/master/README.md
]

new_list.each do |url|
  name = url.split('/').last(3).first
  cmd = "wget -O /Users/jacksontom/Documents/circle_projects/jixianyundong/wanya_native/src/docs/npmreadme/#{name}.md #{url}"
  puts cmd
  system("wget -O /Users/jacksontom/Documents/circle_projects/jixianyundong/wanya_native/src/docs/npmreadme/#{name}.md #{url}")
end
