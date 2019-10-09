import axios from 'axios';
import { serverUrl } from '../constant/constant';

// export const fetchData = async () => {
//   try {
//     const response = await fetch(`${serverUrl}/health`);
//     const data = await response.toString();
//     console.log('data-----------', data);
//     return data;
//   } catch (e) {
//     console.log(e);
//   }
// };

// export const fetchData = () => {
//   try {
//     fetch(`${serverUrl}/health`)
//       .then((res) => {
//         console.log('res------------------', res);

//         console.log('res---------json---------', res.json());
//         return res;
//       });
//   } catch (e) {
//     console.log(e);
//   }
// };


export function fetchData() {
  return axios.get(`${serverUrl}/health`)
    .then((res) => {
      return Promise.resolve(res.data);
    });
}

export function updateUserInfoApi(action) {
  return axios.post(`${serverUrl}/login`, action)
    .then((res) => {
      return Promise.resolve(res.data);
    });
}
