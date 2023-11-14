import { deleteApi, getApi } from "@/dataProvider/baseApi";

const coursePath = "Course";

const courseApiPath = {
  coursePath: coursePath,
  getListCourse: coursePath + "/GetCourses"
}
///Course/GetCoursesByUser

function getAllCourse(params) {
  return getApi(courseApiPath.getListCourse, params);
}

function getCourseByUser(){
  return getApi(courseApiPath.coursePath + "/GetCoursesByUser");
}

export {
  getAllCourse,
  getCourseByUser
}
