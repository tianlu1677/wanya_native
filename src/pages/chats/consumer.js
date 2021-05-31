import {createConsumer} from '@rails/actioncable';
import Helper from '@/utils/helper';
import {BaseApiUrl} from '@/utils/config';

// const getWebSocketURL = async () => {
//   const token = await Helper.getData('auth_token'); // 登录凭证
//   const wsURL = BaseApiUrl.replace('https://', 'wss://');
//   const wssUrl = `${wsURL}/cable?auth_toke=${token}`;
//   console.log('wssUrl', wssUrl);
//   return wssUrl;
//   // return "wss://xinxue.meirixinxue.com//cable?auth_token=eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Mzc4MDc3NjQsImlzcyI6Im1laXJpeGludWUiLCJhdWQiOiJjbGllbnQiLCJhY2NvdW50X2lkIjozMTB9.VZ1DPwh1FUytUgQ9qUzemictbkdYF85d-fGbYuANu7I"
//   // return `ws://localhost:5000/cable?auth_token=eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Mzc4MTAwMDEsImlzcyI6Im1laXJpeGludWUiLCJhdWQiOiJjbGllbnQiLCJhY2NvdW50X2lkIjoxfQ.KfZcB-PN3bDp5n3q13dd_qwPqR8vasYrlTgIAL5vSRY`;
// };

const getWebSocketURL = async token => {
  // const token = await Helper.getData('auth_token'); // 登录凭证
  const wsURL = BaseApiUrl.replace('https://', 'wss://');
  const wssUrl = `${wsURL}/cable?auth_toke=${token}`;
  console.log('wssUrl', wssUrl);
  return wssUrl;
};

// console.log('createConsumer url', createConsumer);
const consumer = token => createConsumer(getWebSocketURL(token));
// const consumer = createConsumer(
//   'wss://xinxue.meirixinxue.com//cable?auth_token=eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Mzc4MDc3NjQsImlzcyI6Im1laXJpeGludWUiLCJhdWQiOiJjbGllbnQiLCJhY2NvdW50X2lkIjozMTB9.VZ1DPwh1FUytUgQ9qUzemictbkdYF85d-fGbYuANu7I'
// );

console.log('consumer', consumer);

export default consumer;
