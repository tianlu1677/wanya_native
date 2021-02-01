import React from 'react';
import {Dimensions} from 'react-native';
import {RFValue} from '@/utils/response-fontsize';
import RichHtml from '@/components/RichHtml';

const {width} = Dimensions.get('window');

const RichContent = props => {
  const {content, baseColor} = props;

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

  return (
    <RichHtml
      containerStyle={{paddingLeft: 14, paddingRight: 14, marginTop: 25}}
      enableExperimentalPercentWidth
      // allowFontScaling={true}
      tagsStyles={richHtmlPStyle}
      classesStyles={classesStyles}
      imagesInitialDimensions={{width: width}}
      baseFontStyle={{lineHeight: 26, letterSpacing: 1}}
      content={content}
      {...props.settings}
    />
  );
};

export default RichContent;
