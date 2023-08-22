import { deleteApi, getApi, postApi, putApi } from "@/dataProvider/baseApi";

const Path = 'Course';//Category/getListAllCategory

const ApiPath = {
  Path: Path,
  getAllCourse: Path + '/GetCourses',
}


function getAll(params) {
  return getApi(ApiPath.getAllCourse, params);
}
function getAllByUser(params) {
    return getApi(Path + `/GetCoursesByUser`,params);
  }

function create(course){
  return postApi(Path + `/CreateCourse`,course);
}

function getCourseByID(id){
  return getApi(Path+ `/GetCourses/ ${id}`);
}

function updateCourseByID(id,course){
  return putApi(Path +`/UpdateCourse/${id}`,course);
}

function deleteCourseByID(id){
  return deleteApi(Path + `/deleteCategory/${id}`);
}

export {
  getAll,
  getAllByUser,
  updateCourseByID,
  deleteCourseByID,
  create,
  getCourseByID
}
