import { postApi } from "@/dataProvider/baseApi";

const authPath = 'Auth';

const authApiPath = {
  authPath: authPath,
  loginPath: authPath + '/login'
}

const loginAuth = async (payload) => {
  return await postApi(authApiPath.loginPath, payload);
};

export {
  loginAuth
}
