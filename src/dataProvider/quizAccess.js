import { postApi, putApi, getApi, deleteApi } from "@/dataProvider/baseApi";

const quizAccessPath = "QuizAccess";
//QuizAccess/GetListQuizzAccess?courseId=5
////api/QuizAccess/GetListQuizzAccess?pageIndex=2&pageSize=10
const quizAccessApiPath = {
  quizAccessPath: quizAccessPath,
  addQuizAccess: quizAccessPath + "/CreateNewQuizzAccess",
  updStatusQuizAccess: quizAccessPath + "/updateStausQuizzAccess"
}

function getQuizAccess(params) {
  return getApi(quizAccessPath + "/GetListQuizzAccess", params);
}

function addQuizAccess(params) {
  return postApi(quizAccessApiPath.addQuizAccess, params);
}

function updStatusQuizAccess(id, bodyParams) {
  return putApi(quizAccessApiPath.updStatusQuizAccess + `/${id}`, bodyParams);
}
function getAll(params) {
  return getApi(quizAccessApiPath.quizAccessPath + `/GetListQuizzAccess`, params);
}
///api/QuizAccess/deleteQuizAccess/3333
function deleteQuizAccess(id) {
  return deleteApi(quizAccessApiPath.quizAccessPath +`/deleteQuizAccess/${id}`);
}

function getListExamForStudent(params){
  return getApi(quizAccessApiPath.quizAccessPath + `/GetListExamForStudent`, params)
}

export {
  addQuizAccess,
  updStatusQuizAccess,
  getQuizAccess,
  getAll,
  deleteQuizAccess,
  getListExamForStudent
}
