import React from 'react';
import {RFValue} from '@/utils/response-fontsize';
import {Dimensions, View} from 'react-native';
import HTML from 'react-native-render-html';
import FastImg from '@/components/FastImg';
import WebView from 'react-native-webview';

const {width} = Dimensions.get('window');
const imageWidth = width - 28;

const RichContent = props => {
  const {content, baseColor, images_info} = props;
  const richHtmlPStyle = {
    p: {
      fontSize: RFValue(15),
      color: baseColor,
      letterSpacing: 1,
      lineHeight: 25,
      marginBottom: 12,
      fontWeight: '300',
    },
    figue: {
      marginTop: 10,
    },
    img: {
      width: '93%',
      marginBottom: 17,
      marginTop: 2,
      minHeight: 30,
    },
    h4: {
      fontSize: 30,
      color: baseColor,
      letterSpacing: 1,
      lineHeight: 25,
      marginBottom: 10,
      fontWeight: '300',
    },
    span: {
      fontSize: 15,
      color: baseColor,
      letterSpacing: 1,
      lineHeight: 25,
      marginBottom: 10,
      fontWeight: '300',
    },
  };
  const classesStyles = {last: {textAlign: 'center'}};

  const computeEmbeddedMaxWidth = availableWidth => {
    return Math.min(availableWidth, 500);
  };

  const renderImg = (htmlAttribs, children, convertedCSSStyles, passProps) => {
    if (!htmlAttribs || !htmlAttribs.src || !images_info) {
      return <View />;
    } else {
      const findImg = images_info.find(x => x.url === htmlAttribs.src);
      const imageHeight = (imageWidth * findImg.height) / findImg.width;
      return (
        <View style={{flex: 1, backgroundColor: '#F2F3F5', marginBottom: 12}} key={htmlAttribs.src}>
          <FastImg
            source={{uri: htmlAttribs.src}}
            style={{width: imageWidth, height: imageHeight}}
            mode={htmlAttribs.src.includes('meirixinxue') ? 'cover' : 'center'}
            tintColor={'gray'}
          />
        </View>
      );
    }
  };

  return (
    <HTML
      WebView={WebView}
      containerStyle={{paddingLeft: 14, paddingRight: 14, marginTop: 25}}
      enableExperimentalPercentWidth
      tagsStyles={richHtmlPStyle}
      classesStyles={classesStyles}
      imagesInitialDimensions={{width: width}}
      baseFontStyle={{lineHeight: 26, letterSpacing: 1}}
      source={{html: content}}
      imagesMaxWidth={Dimensions.get('window').width}
      images_info={images_info}
      contentWidth={width}
      computeEmbeddedMaxWidth={computeEmbeddedMaxWidth}
      renderers={{
        img: (htmlAttribs, children, convertedCSSStyles, passProps) => {
          return renderImg(htmlAttribs, children, convertedCSSStyles, passProps);
        },
      }}
      {...props.settings}
    />
  );
};

export default RichContent;
