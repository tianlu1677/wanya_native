//循环处理时间
/**
 * 参数
 * arr：数据数组
 * key：数组中对象的时间key键。
 * 新增属性
 * show_time_type：时间的类型
 * show_time：页面展示输出的时间
 * is_show_time：间隔上个时间是否大于5分钟，大于则显示当前时间，反之。
 **/
import dayjs from 'dayjs';

export function checkShowRule(arr, key) {
  var newArr = arr.map((item, index, array) => {
    var obj = toggleTime(item[key]);
    item.show_time_type = obj.type;
    item.show_time = obj.time;
    if (index > 0) {
      item.is_show_time = compareTimeInterval(array[index - 1][key], array[index][key]);
    } else {
      item.is_show_time = true;
    }
    return item;
  });
  return newArr;
}

//根据不同时间的消息，输出不同的时间格式
function toggleTime(date) {
  var time;
  var type = getDateDiff(date);
  //1：新消息，2：当天消息,3：昨天消息，4：今年消息，5：其他消息
  if (type == 1) {
    time = '以下为最新消息'; //新消息，不显示时间，但是要显示"以下为最新消息"
  } else if (type == 2) {
    time = dayjs(date).format('H:mm'); //当天消息，显示：10:22
  } else if (type == 3) {
    time = dayjs(date).format('昨天 H:mm'); //昨天消息，显示：昨天 20:41
  } else if (type == 4) {
    time = dayjs(date)
      .format('M月D日 AH:mm')
      .replace('AM', '上午')
      .replace('PM', '下午'); //今年消息，上午下午，显示：3月17日 下午16:45
  } else if (type == 5) {
    time = dayjs(date)
      .format('YYYY年M月D日 AH:mm')
      .replace('AM', '上午')
      .replace('PM', '下午'); //其他消息，上午下午，显示：2020年11月2日 下午15:17
  }
  return {
    time: time,
    type: type,
  };
}

//判断消息类型
function getDateDiff(date) {
  var nowDate = dayjs(new Date()); //当前时间
  var oldDate = dayjs(new Date(date)); //参数时间
  var result;
  if (nowDate.year() - oldDate.year() >= 1) {
    result = 5;
  } else if (nowDate.month() - oldDate.month() >= 1 || nowDate.date() - oldDate.date() >= 2) {
    result = 4;
  } else if (nowDate.date() - oldDate.date() >= 1) {
    result = 3;
  } else if (nowDate.hour() - oldDate.hour() >= 1 || nowDate.minute() - oldDate.minute() >= 5) {
    result = 2;
  } else {
    result = 1;
  }
  return result;
}

//判断两个时间差是否大于5分钟
function compareTimeInterval(t1, t2) {
  // console.log(t1,t2,dayjs(t2)-dayjs(t1));
  return dayjs(t2) - dayjs(t1) >= 300000 ? true : false;
}

// 原文链接：https://blog.csdn.net/qq_42740797/article/details/114930843

export const translate = item => {
  let content = {};

  const {category} = item;
  if (category === 'text') {
    content = item.content;
  }

  if (category === 'image') {
    content = {
      width: 100,
      height: 100,
      uri: item.payload.url,
    };
  }

  if (category === 'video') {
    content = {
      width: 100,
      height: 100,
      uri: item.payload.url,
      poster: `${item.payload.url}?vframe/jpg/offset/0/rotate/auto`,
    };
  }

  const newItem = {
    id: item.id.toString(),
    type: category,
    content,
    targetId: item.creator.id.toString(),
    chatInfo: {
      avatar: item.creator.avatar_url,
      id: item.creator.id.toString(),
      nickName: item.creator.nickname,
    },
    renderTime: item.is_show_time,
    sendStatus: 1,
    time: new Date(item.send_at).getTime(),
  };

  return newItem;
};
