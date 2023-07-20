import { postApi } from "@/dataProvider/baseApi";

const authPath = 'Auth';

const authApiPath = {
  authPath: authPath,
  loginPath: authPath + '/login'
}

const loginAuth = (payload) => {
  return postApi(authApiPath.loginPath, payload);
};

export {
  loginAuth
}
