import React, {useState} from 'react';
import {View, Text, Linking, StyleSheet, Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import IconFont from '@/iconfont';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import {createAction, cancelAction} from '@/api/action_api';

const ProductFooter = props => {
  const dispatch = useDispatch();
  const {detail, navigation} = props;

  const [praise, setPraise] = useState(detail.praise);
  const [star, setStar] = useState(detail.star);

  const handleLike = async () => {
    const params = {target_id: detail.id, target_type: 'Product', type: 'praise'};
    praise ? await cancelAction(params) : await createAction(params);
    setPraise(!praise);
  };

  const handleStar = async () => {
    const params = {target_id: detail.id, target_type: 'Product', type: 'star'};
    praise ? await cancelAction(params) : await createAction(params);
    setStar(!star);
  };

  const handleComment = () => {
    navigation.navigate('ProductCommentList', {productId: detail.id});
  };

  const handleShare = () => {
    const topics = {product: detail};
    dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
    navigation.navigate('NewTopic');
  };

  const handleBuy = () => {
    console.log('detail.', detail.scheme_url);
    console.log('detail.', detail.item_url);
    Linking.canOpenURL('taobao://').then(supported => {
      if (!supported) {
        Linking.openURL(detail.item_url);
      } else {
        // Linking.openURL('taobao://s.click.taobao.com/t?e=m%3D2%26s%3DLQyTOECB43Zw4vFB6t2Z2ueEDrYVVa64Dne87AjQPk9yINtkUhsv0A0WaciqXZwUMo80ymJwxZ9ZfhJtYr1z1erKcbtvADZv8VRyRBbjGT6y53J343eyg6kBJJBSepFlUyNpxLfgKr0jWpzpm6nEC6J2WUXmXWyaEvOC1%2F2sqDJcfm37xb4PJSslmCVJhmkX8izjid29L7CiZ%2BQMlGz6FQ%3D%3D&union_lens=lensId%3AOPT%401631803865%400b5c30ab_7e9e_17bef16f956_950d%4001')
        Linking.openURL(detail.scheme_url);
      }
    });
  };

  const starIcon = star ? 'star-solid' : 'star';
  const Color = state => (state ? '#000' : '#bdbdbd');

  return (
    <View style={styles.footer}>
      <Pressable style={styles.iconView} onPress={handleLike}>
        <IconFont name="like" size={20} color={Color(praise)} />
        <Text style={[styles.iconText, {color: Color(praise)}]}>赞</Text>
      </Pressable>
      <Pressable style={styles.iconView} onPress={handleStar}>
        <IconFont name={starIcon} size={20} color={star ? '#f4ea2a' : '#bdbdbd'} />
        <Text style={[styles.iconText, {color: Color(star)}]}>收藏</Text>
      </Pressable>
      <Pressable style={styles.iconView} onPress={handleComment}>
        <IconFont name="comment" size={20} color="#bdbdbd" />
        <Text style={styles.iconText}>讨论</Text>
      </Pressable>
      <View style={styles.btnWrap}>
        <Text style={[styles.footerBtn, styles.shareBtn]} onPress={handleShare}>
          晒顽物
        </Text>
        <Text style={[styles.footerBtn, styles.buyBtn]} onPress={handleBuy}>
          立即购买
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: RFValue(60),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  iconView: {
    alignItems: 'center',
    paddingHorizontal: 4,
    marginRight: 25,
  },
  iconText: {
    fontSize: 12,
    color: '#bdbdbd',
    marginTop: 6,
  },
  btnWrap: {
    flexDirection: 'row',
    borderRadius: 20,
    overflow: 'hidden',
    marginLeft: 'auto',
  },
  footerBtn: {
    width: VWValue(85),
    height: RFValue(35),
    lineHeight: RFValue(35),
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
  shareBtn: {
    backgroundColor: '#000',
  },
  buyBtn: {
    backgroundColor: '#FF2242',
  },
});

export default ProductFooter;
