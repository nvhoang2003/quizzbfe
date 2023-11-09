///api/User/GetAllUser?courseId=5

import { getApi } from "./baseApi";

const userPath = "User";

const userApiPath = {
  userPath: userPath
}

function getAllUser(params) {
  return getApi(userApiPath.userPath + `/GetAllUser`, params);
}

export {
  getAllUser
}

