import {createConsumer} from '@rails/actioncable';
import Helper from '@/utils/helper';
import {BaseApiUrl} from '@/utils/config';

const getWebSocketURL = () => {
  const token = Helper.getData('auth_token'); // 登录凭证
  const wsURL = BaseApiUrl.replace('https://', 'ws://');
  // return `${wsURL}/cable?token=${token}`
  return `ws://localhost:5000/cable?auth_token=eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Mzc4MTAwMDEsImlzcyI6Im1laXJpeGludWUiLCJhdWQiOiJjbGllbnQiLCJhY2NvdW50X2lkIjoxfQ.KfZcB-PN3bDp5n3q13dd_qwPqR8vasYrlTgIAL5vSRY`;
};

const consumer = createConsumer(getWebSocketURL())

export default consumer;
