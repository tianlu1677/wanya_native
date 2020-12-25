import React from 'react';
import {
  TouchableOpacity,
  Image,
  NativeModules,
  requireNativeComponent,
  Platform,
  Text,
} from 'react-native';

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
        }}>
        <Text>Apple login</Text>
      </TouchableOpacity>
    );
  } else {
    return null;
  }
};

export default SignInWithAppleButton;
