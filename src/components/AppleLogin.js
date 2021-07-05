import React from 'react';
import {
  TouchableOpacity,
  Image,
  NativeModules,
  requireNativeComponent,
  Platform,
  Text,
} from 'react-native';
import FastImg from "@/components/FastImg"

const {AppleAuthentication} = NativeModules;

// export const RNSignInWithAppleButton = requireNativeComponent('RNCSignInWithAppleButton');
const appleAuth = async callBack => {
  await AppleAuthentication.requestAsync({
    requestedScopes: [AppleAuthentication.Scope.FULL_NAME, AppleAuthentication.Scope.EMAIL],
  }).then(
    response => {
      callBack(response); //Display response
    },
    error => {
      callBack(error); //Display error
    }
  );
};

// 使用此组件来登录
export const SignInWithAppleButton = ({buttonText = '', callBack}) => {
  if (Platform.OS === 'ios') {
    return (
      <TouchableOpacity
        onPress={async () => {
          await appleAuth(callBack);
        }} style={{width: 35, height: 35 }}>
        <FastImg source={require('../assets/login/apple.png')} style={{flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: 35,
          height: 35,}} />
      </TouchableOpacity>
    );
  } else {
    return null;
  }
};

export default SignInWithAppleButton;

// import { SignInWithAppleButton } from 'components/AppleLogin'
// <View style={styles.footerContent}>
//   {SignInWithAppleButton({
//     callBack: appleSignIn,
//   })}

// const appleSignIn = (result) => {
//   // const { currnet } = route.params;
//   const { fullName, identityToken, user } = result;
//   try {
//     let params = {
//       user_id: user,
//       identity_token: identityToken,
//       nickname: fullName.givenName || fullName.familyName,
//     }
//     postAppleLogin(params).then(res => {
//       // navigation.navigate(currnet)
//       storeData('guide_auth', 'true')
//       resetFun&&resetFun();
//       setTimeout(() => {
//         navigation.reset({
//           index: 0,
//           routes: [{ name: 'Home' }],
//         });
//       }, 0)
//     })
//   } catch {
//     alert('登录失败')
//   }
// }