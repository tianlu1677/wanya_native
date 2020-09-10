import React, {Component} from 'react';
import RootSiblings from 'react-native-root-siblings';
import ToastContainer, {position, duration} from './ToastContainer';

class Toast extends Component {
  static propTypes = ToastContainer.propTypes;
  static position = position;
  static duration = duration;

  static showSuccess(message, options = {}) {
    this.show(message, {
      containerStyle: {
        minWidth: 105,
        minHeight: 105,
        backgroundColor: 'rgba(30,30,30,.85)',
      },
      imgStyle: {
        width: 45,
        height: 45,
      },
      textStyle: {
        marginTop: 10,
      },
      position: this.position.CENTER,
      // imgSource: require('./icon_success.png'),
      ...options,
    });
  }

  static showLoading(message, options = {}) {
    this.show(message, {
      containerStyle: {
        minWidth: 90,
        minHeight: 80,
        backgroundColor: 'rgba(30,30,30,.85)',
      },
      textStyle: {
        fontSize: 14,
        top: 6,
      },
      mask: true,
      duration: 0,
      loading: true,
      position: this.position.CENTER,
      ...options,
    });
  }


  static showError(message, options = {}) {
    this.show(message, {
      containerStyle: {
        minHeight: 43,
        backgroundColor: '#222222',
        borderRadius: 2,
      },

      textStyle: {
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 15,
        letterSpacing: 1,
        fontWeight: '500',
        color: '#ffffff'
      },
      position: this.position.CENTER,
      // imgSource: require('./icon_success.png'),
      ...options,
    });
  }


  static show(message, options = {}) {
    let onHidden = options.onHidden;
    let toast;
    options.onHidden = function () {
      toast && toast.destroy();
      onHidden && onHidden();
    };
    toast = new RootSiblings(
      (
        <ToastContainer {...options} visible={true} showText={!!message}>
          {message}
        </ToastContainer>
      )
    );
    this.toast = toast;
    return toast;
  }

  static hide(toast) {
    if (toast instanceof RootSiblings) {
      toast.destroy();
    } else if (this.toast instanceof RootSiblings) {
      this.toast.destroy();
    }
  }

  toast = null;

  componentWillMount() {
    this.toast = new RootSiblings(<ToastContainer {...this.props} duration={0} />);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.toast.update(<ToastContainer {...nextProps} duration={0} />);
  }

  componentWillUnmount() {
    this.toast && this.toast.destroy();
  }

  render() {
    return null;
  }
}

export {RootSiblings as Manager};
export default Toast;