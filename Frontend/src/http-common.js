import axios from 'axios'
import Cookies from 'js-cookie'
import { env } from './utils/myVariable';
const accessToken = Cookies.get("token");
export const apiAuthClient = axios.create({
    // baseURL : 'http://103.56.162.78:8000',
     baseURL :env.hostServer ,
    headers : {
        withCredentials: true,
        headers: { "Access-Control-Allow-Credentials": true ,
      },
    }
  
});

// export const apiClient = axios.create({
//     // baseURL: "http://103.56.162.78:8000",  
//     baseURL : env.hostServer,
//     headers: {
//       token: `Bearer ${accessToken}`,
//     },
// });

export function apiClient(cookie) {
  return axios.create({
      baseURL: env.hostServer,
      // @ts-ignore
      headers: { token: `Bearer ${cookie}`  },
  });
}