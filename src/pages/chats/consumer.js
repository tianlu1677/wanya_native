import {createConsumer} from '@rails/actioncable';
import {BaseApiUrl} from '@/utils/config';
import {useSelector, useDispatch} from 'react-redux';;

const consumerFunc = (auth_token) => {
  const wsURL = BaseApiUrl.replace('https://', 'wss://');
  const wssUrl = `${wsURL}/cable?auth_token=${auth_token}`;
  console.log('wssUrl', wssUrl);
  return createConsumer(wssUrl);
};

// console.log('consumer', Consumer);
export default consumerFunc;
