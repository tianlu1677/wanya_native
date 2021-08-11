
version = '0.0.13'
`react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/bundle/main.jsbundle --assets-dest ios/bundle/ --sourcemap-output ios/bundle/main.jsbundle.map`
`sentry-cli releases -o sentry -p vanyah-production files com.vanyah.ios@#{version} upload-sourcemaps ios/bundle/main.jsbundle.map --log-level debug`
