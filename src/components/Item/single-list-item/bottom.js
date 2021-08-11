import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Vibration} from 'react-native';
import {useDispatch} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import IconFont from '@/iconfont';
import Toast from '@/components/Toast';
import {dispatchShareItem} from '@/redux/actions';
import {cancelAction, createAction} from '@/api/action_api';

export const Bottom = props => {
  const {data} = props;
  const dispatch = useDispatch();
  const [praise, setPraise] = useState(props.data.praise);
  const [praiseCount, setPraiseCount] = useState(props.data.praises_count);
  const [an, setAn] = useState('');

  const onPraise = async () => {
    let res = null;
    switch (props.type) {
      case 'article':
        const params = {target_id: data.id, target_type: 'Article', type: 'praise'};
        res = praise ? await cancelAction(params) : await createAction(params);
        break;
      case 'topic':
        const query = {target_id: data.id, target_type: 'Topic', type: 'praise'};
        res = praise ? await cancelAction(query) : await createAction(query);
        break;
    }
    if (res.data.status === 404) {
      Toast.showError('该帖子已删除');
      return false;
    }
    setPraise(!praise);
    const count = praiseCount + (praise === true ? -1 : 1);
    if (!praise) {
      setAn(zoomOut);
      Vibration.vibrate();
    } else {
      setAn('');
    }
    setPraiseCount(count);
  };

  const onShare = () => {
    let shareOptions = {item_type: '', item_id: '', visible: true};

    switch (props.type) {
      case 'article':
        shareOptions = {item_type: 'Article', item_id: data.id};
        break;
      case 'topic':
        shareOptions = {item_type: 'Topic', item_id: data.id};
        break;
      default:
        shareOptions;
        break;
    }

    const shareContent = {...shareOptions, visible: true};
    dispatch(dispatchShareItem(shareContent));
  };

  const zoomOut = {
    0: {opacity: 0, scale: 1},
    0.5: {opacity: 1, scale: 1.5},
    1: {opacity: 1, scale: 1},
    duration: 600,
  };

  const hitSlop = {left: 10, right: 10, top: 10, bottom: 10};

  return (
    <View style={[bstyles.botView, props.style]}>
      <Pressable style={bstyles.botCon} onPress={onPraise} hitSlop={hitSlop}>
        <Animatable.View animation={an} useNativeDriver easing="ease-out" iterationCount={1}>
          <IconFont name={'like'} size={20} color={praise ? '#000' : '#bdbdbd'} />
        </Animatable.View>
        {praiseCount > 0 ? (
          <Animatable.Text style={{...bstyles.botNum, color: praise ? '#000' : '#bdbdbd'}}>
            {praiseCount}
          </Animatable.Text>
        ) : null}
      </Pressable>
      <View style={[bstyles.botCon, bstyles.botConComment]}>
        <IconFont name="comment" size={20} color={'#bdbdbd'} />
        {data.comments_count > 0 ? <Text style={bstyles.botNum}>{data.comments_count}</Text> : null}
      </View>
      {props.share ? (
        <Pressable style={{marginLeft: 'auto'}} onPress={onShare} hitSlop={hitSlop}>
          <IconFont name="zhuanfa" size={18} />
        </Pressable>
      ) : null}
    </View>
  );
};

const bstyles = StyleSheet.create({
  botView: {
    flexDirection: 'row',
    paddingBottom: 18,
    paddingTop: 15,
    alignItems: 'center',
  },
  botCon: {
    marginRight: 35,
    flexDirection: 'row',
    alignItems: 'center',
  },
  botConComment: {
    marginRight: 0,
  },
  botNum: {
    marginLeft: 5,
    color: '#bdbdbd',
    fontSize: 12,
  },
});

export default Bottom;
