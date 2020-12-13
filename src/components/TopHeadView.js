import React from 'react';
import PropTypes from 'prop-types';
import {
  ViewPropTypes,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {NAVIGATION_BAR_HEIGHT, IsIos, STATUS_BAR_HEIGHT, NAV_BAR_HEIGHT} from '@/utils/navbar';

const TopHeaderView = props => {
  const LeftButton = props.LeftButton;
  const RightButton = props.RightButton;
  const Title = props.Title;
  const isAtRoot = props.isAtRoot;
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={{}}>
      {props.statusBar.hidden ? null : (
        <View style={styles.statusBar}>
          <StatusBar {...props.statusBar} />
        </View>
      )}
      <View style={[styles.header, props.headerStyles]}>
        <View style={styles.leftButton}>
          {LeftButton ? (
            <LeftButton />
          ) : (
            <TouchableOpacity
              style={{marginLeft: 10,}}
              onPress={() => {
                if (!navigation.canGoBack() || isAtRoot) {
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'Recommend'}],
                  })
                } else {
                  navigation.goBack();
                }
              }}>
              <Icon
                name="chevron-back-outline"
                size={22}
                color={props.leftButtonColor || 'white'}
                iconStyle={{marginRight: 1}}
              />
            </TouchableOpacity>
          )}
        </View>
        {Title ? (
          <View style={styles.title}>
            {Title && typeof Title === 'string' ? (
              <Text numberOfLines={1} style={styles.titleText}>
                {Title}
              </Text>
            ) : (
              <Title />
            )}
          </View>
        ) : null}
        <View style={styles.rightButton}>{RightButton && <RightButton />}</View>
      </View>
    </View>
  );
};
export default TopHeaderView;
TopHeaderView.propTypes = {
  // Title: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  // LeftButton: PropTypes.object,
  RightButton: PropTypes.object,
  isAtRoot: PropTypes.bool,
};

TopHeaderView.defaultProps = {
  Title: '',
  LeftButton: null,
  RightButton: null,
  isAtRoot: false,
  statusBar: {
    barStyle: 'light-content',
    hidden: false,
  },
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginTop: 5,
    height: NAV_BAR_HEIGHT,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EBEBEB',
  },
  leftButton: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: '500',
    fontSize: 16,
    color: 'black',
  },
  rightButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  statusBar: {
    height: IsIos ? STATUS_BAR_HEIGHT : 0,
  },
});
