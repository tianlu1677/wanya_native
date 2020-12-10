// // https://github.com/cornedor/react-native-video-player/blob/master/index.js
// import React, {Component} from 'react';
// import PropTypes from 'prop-types';
// import {
//   Image,
//   ImageBackground,
//   Platform,
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   ViewPropTypes,
//   ActivityIndicator,
//   NativeModules,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Video from 'react-native-video'; // eslint-disable-line
// import { VLCPlayer } from 'react-native-vlc-media-player';
//
// const { VideoPlayerManager } = NativeModules;
//
// const BackgroundImage = ImageBackground || Image; // fall back to Image if RN < 0.46
//
// let ViewPropTypesVar;
//
// if (ViewPropTypes) {
//   ViewPropTypesVar = ViewPropTypes;
// } else {
//   ViewPropTypesVar = View.propTypes;
// }
//
// const styles = StyleSheet.create({
//   preloadingPlaceholder: {
//     backgroundColor: 'black',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   thumbnail: {
//     backgroundColor: 'black',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   playButton: {
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   playArrow: {
//     color: 'white',
//   },
//
//   controls: {
//     backgroundColor: 'rgba(0, 0, 0, 0)',
//     height: 48,
//     marginTop: -48,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   playControl: {
//     color: 'white',
//     padding: 8,
//   },
//   extraControl: {
//     color: 'white',
//     padding: 8,
//   },
//   seekBar: {
//     alignItems: 'center',
//     height: 30,
//     flexGrow: 1,
//     flexDirection: 'row',
//     paddingHorizontal: 10,
//     marginLeft: -10,
//     marginRight: -5,
//   },
//   seekBarFullWidth: {
//     marginLeft: 0,
//     marginRight: 0,
//     paddingHorizontal: 0,
//     marginTop: -2,
//     height: 2,
//   },
//   seekBarProgress: {
//     height: 2,
//     backgroundColor: 'white',
//   },
//   seekBarKnob: {
//     width: 5,
//     height: 5,
//     marginHorizontal: -1,
//     marginVertical: 1,
//     borderRadius: 10,
//     backgroundColor: 'white',
//     transform: [{scale: 0.8}],
//     zIndex: 1,
//   },
//   seekBarBackground: {
//     backgroundColor: 'rgba(255, 255, 255, 0.5)', // 有问题
//     color: 'red',
//     height: 2,
//   },
//   overlayButton: {
//     flex: 1,
//   },
//   activityIndicator: {
//     position: 'absolute',
//     top: '45%',
//     left: '50%',
//     right: '50%',
//     bottom: '50%',
//     height: 50,
//   },
// });
//
// export default class VideoPlayer extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       isStarted: props.autoplay,
//       isPlaying: props.autoplay,
//       hasEnded: false,
//       width: 200,
//       progress: 0,
//       isMuted: props.defaultMuted,
//       isControlsVisible: !props.hideControlsOnStart,
//       duration: 100,
//       isSeeking: false,
//       opacity: 0,
//     };
//
//     this.seekBarWidth = 200;
//     this.wasPlayingBeforeSeek = props.autoplay;
//     this.seekTouchStart = 0;
//     this.seekProgressStart = 0;
//
//     this.onLayout = this.onLayout.bind(this);
//     this.onStartPress = this.onStartPress.bind(this);
//     this.onProgress = this.onProgress.bind(this);
//     this.onEnd = this.onEnd.bind(this);
//     this.onLoad = this.onLoad.bind(this);
//     this.onPlayPress = this.onPlayPress.bind(this);
//     this.onMutePress = this.onMutePress.bind(this);
//     this.showControls = this.showControls.bind(this);
//     this.onToggleFullScreen = this.onToggleFullScreen.bind(this);
//     this.onSeekBarLayout = this.onSeekBarLayout.bind(this);
//     this.onSeekGrant = this.onSeekGrant.bind(this);
//     this.onSeekRelease = this.onSeekRelease.bind(this);
//     this.onSeek = this.onSeek.bind(this);
//     this.onFullscreenPlayerDidDismiss = this.onFullscreenPlayerDidDismiss.bind(this);
//   }
//
//   componentDidMount() {
//     if (this.props.autoplay) {
//       this.hideControls();
//     }
//   }
//
//   onFullscreenPlayerDidDismiss() {
//     this.setState({
//       isPlaying: true,
//     });
//   }
//   componentWillUnmount() {
//     // console.log('xxx', 'xxxx')
//     if (this.controlsTimeout) {
//       clearTimeout(this.controlsTimeout);
//       this.controlsTimeout = null;
//     }
//   }
//
//   onLayout(event) {
//     const {width} = event.nativeEvent.layout;
//     this.setState({
//       width,
//     });
//   }
//
//   onStartPress() {
//     if (this.props.onStart) {
//       this.props.onStart();
//     }
//
//     this.setState(state => ({
//       isPlaying: true,
//       isStarted: true,
//       hasEnded: false,
//       progress: state.progress === 1 ? 0 : state.progress,
//     }));
//
//     this.hideControls();
//   }
//
//   onProgress(event) {
//     if (this.state.isSeeking) {
//       return;
//     }
//     if (this.props.onProgress) {
//       this.props.onProgress(event);
//     }
//     console.log('onProgress', event)
//     this.setState({
//       progress: event.currentTime / (this.props.duration || this.state.duration),
//     });
//   }
//
//   onEnd(event) {
//     if (this.props.onEnd) {
//       this.props.onEnd(event);
//     }
//     console.log('onEnd', event)
//
//     if (this.props.endWithThumbnail || this.props.endThumbnail) {
//       this.setState({isStarted: false, hasEnded: true});
//       // this.player.dismissFullscreenPlayer();
//     }
//
//     this.setState({progress: 1});
//     this.player.resume(false);
//     if (!this.props.loop) {
//       this.setState({isPlaying: false}, () => this.player && this.player.seek(0));
//     } else {
//       this.player.seek(0);
//     }
//   }
//
//   onLoad(event) {
//     if (this.props.onLoad) {
//       this.props.onLoad(event);
//     }
//     console.log('onLoad', event)
//     const {duration} = event;
//     this.setState({duration, opacity: 0});
//   }
//
//   onLoadStart = () => {
//     console.log('onLoadStart')
//     this.setState({opacity: 1});
//   }
//
//   onBuffer = ({isBuffering}) => {
//     console.log('onBuffer', isBuffering)
//     // console.log('onBuffer', isBuffering)
//     this.setState({opacity: isBuffering ? 1 : 0});
//   }
//
//   onPlayPress() {
//     if (this.props.onPlayPress) {
//       this.props.onPlayPress();
//     }
//
//     this.setState({
//       isPlaying: !this.state.isPlaying,
//     });
//     this.showControls();
//   }
//
//   onMutePress() {
//     const isMuted = !this.state.isMuted;
//     if (this.props.onMutePress) {
//       this.props.onMutePress(isMuted);
//     }
//     this.setState({
//       isMuted,
//     });
//     this.showControls();
//   }
//
//   onToggleFullScreen() {
//     // this.player.presentFullscreenPlayer();
//     const { video } = this.props;
//     if(Platform.OS === "android")
//     {
//       // VideoPlayerManager.showVideoPlayer(video.uri);
//       this.player.presentFullscreenPlayer();
//     }
//     else
//     {
//       this.player.presentFullscreenPlayer();
//     }
//   }
//
//   async showFullscreenAndroid(uri, position) {
//     try {
//       position = await NativeModules.BridgeModule.showFullscreen(uri, position);
//       // If position is zero, stop.
//       if (position == 0) {
//         this.setState({isPlaying: false});
//       } else {
//         position = Math.floor(position / 1000);
//         let progress = position / this.state.duration;
//         this.setState({progress,});
//         this.player.seek(position);
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   }
//
//   onSeekBarLayout({nativeEvent}) {
//     const customStyle = this.props.customStyles.seekBar;
//     let padding = 0;
//     if (customStyle && customStyle.paddingHorizontal) {
//       padding = customStyle.paddingHorizontal * 2;
//     } else if (customStyle) {
//       padding = customStyle.paddingLeft || 0;
//       padding += customStyle.paddingRight ? customStyle.paddingRight : 0;
//     } else {
//       padding = 20;
//     }
//
//     this.seekBarWidth = nativeEvent.layout.width - padding;
//   }
//
//   onSeekStartResponder() {
//     return true;
//   }
//
//   onSeekMoveResponder() {
//     return true;
//   }
//
//   onSeekGrant(e) {
//     this.seekTouchStart = e.nativeEvent.pageX;
//     this.seekProgressStart = this.state.progress;
//     this.wasPlayingBeforeSeek = this.state.isPlaying;
//     this.setState({
//       isSeeking: true,
//       isPlaying: false,
//     });
//   }
//
//   onSeekRelease() {
//     this.setState({
//       isSeeking: false,
//       isPlaying: this.wasPlayingBeforeSeek,
//     });
//     this.showControls();
//   }
//
//   onSeek(e) {
//     const diff = e.nativeEvent.pageX - this.seekTouchStart;
//     const ratio = 100 / this.seekBarWidth;
//     const progress = this.seekProgressStart + (ratio * diff) / 100;
//
//     this.setState({
//       progress,
//     });
//
//     this.player.seek(progress * this.state.duration);
//   }
//
//   getSizeStyles() {
//     const {videoWidth, videoHeight} = this.props;
//     const {width} = this.state;
//     const ratio = videoHeight / videoWidth;
//     return {
//       height: videoHeight,
//       width: videoWidth
//     };
//   }
//
//   hideControls() {
//     if (this.props.onHideControls) {
//       this.props.onHideControls();
//     }
//
//     if (this.props.disableControlsAutoHide) {
//       return;
//     }
//
//     if (this.controlsTimeout) {
//       clearTimeout(this.controlsTimeout);
//       this.controlsTimeout = null;
//     }
//     this.controlsTimeout = setTimeout(() => {
//       this.setState({isControlsVisible: false});
//     }, this.props.controlsTimeout);
//   }
//
//   showControls() {
//     if (this.props.onShowControls) {
//       this.props.onShowControls();
//     }
//
//     this.setState({
//       isControlsVisible: true,
//     });
//     this.hideControls();
//   }
//
//   seek(t) {
//     this.player.seek(t);
//   }
//
//   stop() {
//     this.setState({
//       isPlaying: false,
//       progress: 0,
//     });
//     this.seek(0);
//     this.showControls();
//   }
//
//   pause() {
//     this.setState({
//       isPlaying: false,
//     });
//     this.showControls();
//   }
//
//   resume() {
//     this.setState({
//       isPlaying: true,
//     });
//     this.showControls();
//   }
//
//   renderStartButton() {
//     const {customStyles} = this.props;
//     return (
//       <TouchableOpacity
//         style={[styles.playButton, customStyles.playButton]}
//         onPress={this.onStartPress}>
//         <Icon style={[styles.playArrow, customStyles.playArrow]} name="play-arrow" size={42} />
//       </TouchableOpacity>
//     );
//   }
//
//   renderThumbnail(thumbnail) {
//     const {style, customStyles, ...props} = this.props;
//     return (
//       <BackgroundImage
//         {...props}
//         style={[styles.thumbnail, this.getSizeStyles(), style, customStyles.thumbnail]}
//         source={thumbnail}>
//         {this.renderStartButton()}
//       </BackgroundImage>
//     );
//   }
//
//   renderSeekBar(fullWidth) {
//     const {customStyles, disableSeek} = this.props;
//     return (
//       <View
//         style={[
//           styles.seekBar,
//           fullWidth ? styles.seekBarFullWidth : {},
//           customStyles.seekBar,
//           fullWidth ? customStyles.seekBarFullWidth : {},
//         ]}
//         onLayout={this.onSeekBarLayout}>
//         <View
//           style={[
//             {flexGrow: this.state.progress},
//             styles.seekBarProgress,
//             customStyles.seekBarProgress,
//           ]}
//         />
//         {!fullWidth && !disableSeek ? (
//           <View
//             style={[
//               styles.seekBarKnob,
//               customStyles.seekBarKnob,
//               this.state.isSeeking ? {transform: [{scale: 1}]} : {},
//               this.state.isSeeking ? customStyles.seekBarKnobSeeking : {},
//             ]}
//             hitSlop={{top: 20, bottom: 20, left: 10, right: 20}}
//             onStartShouldSetResponder={this.onSeekStartResponder}
//             onMoveShouldSetPanResponder={this.onSeekMoveResponder}
//             onResponderGrant={this.onSeekGrant}
//             onResponderMove={this.onSeek}
//             onResponderRelease={this.onSeekRelease}
//             onResponderTerminate={this.onSeekRelease}
//           />
//         ) : null}
//         <View
//           style={[
//             styles.seekBarBackground,
//             {flexGrow: 1 - this.state.progress},
//             customStyles.seekBarBackground,
//           ]}
//         />
//       </View>
//     );
//   }
//
//   renderControls() {
//     const {customStyles} = this.props;
//     return (
//       <View style={[styles.controls, customStyles.controls]}>
//         <TouchableOpacity
//           onPress={this.onPlayPress}
//           style={[customStyles.controlButton, customStyles.playControl]}>
//           <Icon
//             style={[styles.playControl, customStyles.controlIcon, customStyles.playIcon]}
//             name={this.state.isPlaying ? 'pause' : 'play-arrow'}
//             size={26}
//           />
//         </TouchableOpacity>
//         {this.renderSeekBar()}
//         {this.props.muted ? null : (
//           <TouchableOpacity onPress={this.onMutePress} style={customStyles.controlButton}>
//             <Icon
//               style={[styles.extraControl, customStyles.controlIcon]}
//               name={this.state.isMuted ? 'volume-off' : 'volume-up'}
//               size={22}
//             />
//           </TouchableOpacity>
//         )}
//         {(this.props.disableFullscreen || Platform.OS !== 'ios') ? null : (
//           <TouchableOpacity onPress={this.onToggleFullScreen} style={customStyles.controlButton}>
//             <Icon
//               style={[styles.extraControl, customStyles.controlIcon]}
//               name="fullscreen"
//               size={28}
//             />
//           </TouchableOpacity>
//         )}
//       </View>
//     );
//   }
//
//   renderVideo() {
//     const {
//       video,
//       style,
//       resizeMode,
//       pauseOnPress,
//       fullScreenOnLongPress,
//       customStyles,
//       ...props
//     } = this.props;
//     return (
//       <View style={customStyles.videoWrapper}>
//         <VLCPlayer
//           style={[styles.video, this.getSizeStyles(), style, customStyles.video]}
//           ref={p => {
//             this.player = p;
//             props.playerRef = p;
//           }}
//           muted={this.props.muted || this.state.isMuted}
//           paused={
//             this.props.paused ? this.props.paused || !this.state.isPlaying : !this.state.isPlaying
//           }
//           autoAspectRatio={true}
//           onLoadStart={this.onLoadStart}
//           onProgress={this.onProgress}
//           onEnd={this.onEnd}
//           onPlaying={this.onLoad}
//           source={{uri: 'https://file.meirixinxue.com/assets/126a2cab32a121cb6c24dd4caceba755.mp4'}}
//           // resizeMode={resizeMode}
//           // progressUpdateInterval={400}
//           // hideShutterView={false}
//           // repeat={this.props.loop}
//           // onBuffer={this.onBuffer}
//           // ignoreSilentSwitch="ignore"
//           // onFullscreenPlayerDidDismiss={this.onFullscreenPlayerDidDismiss}
//           // fullscreenOrientation={'landscape'}
//         />
//         {
//           this.state.opacity > 0 && <ActivityIndicator
//             animating
//             size="small"
//             color={'white'}
//             style={[styles.activityIndicator, {opacity: this.state.opacity}]}
//           />
//         }
//
//         <View style={[this.getSizeStyles(), {marginTop: -this.getSizeStyles().height}]}>
//           <TouchableOpacity
//             style={styles.overlayButton}
//             onPress={() => {
//               this.showControls();
//               if (pauseOnPress) this.onPlayPress();
//             }}
//             onLongPress={() => {
//               if (fullScreenOnLongPress && Platform.OS !== 'android') this.onToggleFullScreen();
//             }}
//           />
//         </View>
//         {!this.state.isPlaying || this.state.isControlsVisible
//           ? this.renderControls()
//           : this.renderSeekBar(true)}
//       </View>
//     );
//   }
//
//   renderContent() {
//     const {thumbnail, endThumbnail, style} = this.props;
//     const {isStarted, hasEnded} = this.state;
//
//     if (hasEnded && endThumbnail) {
//       return this.renderThumbnail(endThumbnail);
//     } else if (!isStarted && thumbnail) {
//       return this.renderThumbnail(thumbnail);
//     } else if (!isStarted) {
//       return (
//         <View style={[styles.preloadingPlaceholder, this.getSizeStyles(), style]}>
//           {this.renderStartButton()}
//         </View>
//       );
//     }
//     return this.renderVideo();
//   }
//
//
//   render() {
//     // console.log('xxxxxxxxxxxxx')
//     return (
//       <View onLayout={this.onLayout} style={this.props.customStyles.wrapper}>
//         {this.renderContent()}
//       </View>
//     );
//   }
// }
//
// VideoPlayer.propTypes = {
//   video: Video.propTypes.source,
//   thumbnail: Image.propTypes.source,
//   endThumbnail: Image.propTypes.source,
//   videoWidth: PropTypes.number,
//   videoHeight: PropTypes.number,
//   duration: PropTypes.number,
//   autoplay: PropTypes.bool,
//   paused: PropTypes.bool,
//   defaultMuted: PropTypes.bool,
//   muted: PropTypes.bool,
//   style: ViewPropTypesVar.style,
//   controlsTimeout: PropTypes.number,
//   disableControlsAutoHide: PropTypes.bool,
//   disableFullscreen: PropTypes.bool,
//   loop: PropTypes.bool,
//   resizeMode: Video.propTypes.resizeMode,
//   hideControlsOnStart: PropTypes.bool,
//   endWithThumbnail: PropTypes.bool,
//   disableSeek: PropTypes.bool,
//   pauseOnPress: PropTypes.bool,
//   fullScreenOnLongPress: PropTypes.bool,
//   customStyles: PropTypes.shape({
//     wrapper: ViewPropTypesVar.style,
//     video: Video.propTypes.style,
//     videoWrapper: ViewPropTypesVar.style,
//     controls: ViewPropTypesVar.style,
//     playControl: ViewPropTypesVar.style,
//     controlButton: ViewPropTypesVar.style,
//     controlIcon: Icon.propTypes.style,
//     playIcon: Icon.propTypes.style,
//     seekBar: ViewPropTypesVar.style,
//     seekBarFullWidth: ViewPropTypesVar.style,
//     seekBarProgress: ViewPropTypesVar.style,
//     seekBarKnob: ViewPropTypesVar.style,
//     seekBarKnobSeeking: ViewPropTypesVar.style,
//     seekBarBackground: ViewPropTypesVar.style,
//     thumbnail: Image.propTypes.style,
//     playButton: ViewPropTypesVar.style,
//     playArrow: Icon.propTypes.style,
//   }),
//   onEnd: PropTypes.func,
//   onProgress: PropTypes.func,
//   onLoad: PropTypes.func,
//   onStart: PropTypes.func,
//   onPlayPress: PropTypes.func,
//   onHideControls: PropTypes.func,
//   onShowControls: PropTypes.func,
//   onMutePress: PropTypes.func,
// };
//
// VideoPlayer.defaultProps = {
//   videoWidth: 750,
//   videoHeight: 720,
//   autoplay: false,
//   controlsTimeout: 2000,
//   loop: true,
//   resizeMode: 'contain',
//   disableSeek: false,
//   pauseOnPress: false,
//   fullScreenOnLongPress: false,
//   customStyles: {},
// };