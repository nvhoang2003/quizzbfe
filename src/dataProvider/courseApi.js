import { deleteApi, getApi } from "@/dataProvider/baseApi";

const coursePath = "Course";

const courseApiPath = {
  coursePath: coursePath,
  getListCourse: coursePath + "/GetCourses"
}

function getAllCourse(params) {
  return getApi(courseApiPath.getListCourse, params);
}

export {
  getAllCourse
}
