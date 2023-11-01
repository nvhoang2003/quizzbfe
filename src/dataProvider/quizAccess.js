import { postApi, putApi, getApi } from "@/dataProvider/baseApi";

const quizAccessPath = "QuizAccess";
//QuizAccess/GetListQuizzAccess?courseId=5

const quizAccessApiPath = {
  quizAccessPath: quizAccessPath,
  addQuizAccess: quizAccessPath + "/CreateNewQuizzAccess",
  updStatusQuizAccess: quizAccessPath + "/updateStausQuizzAccess"
}

function getQuizAccess(params){
  return getApi(quizAccessPath + "/GetListQuizzAccess", params);
}

function addQuizAccess(params) {
  return postApi(quizAccessApiPath.addQuizAccess, params);
}

function updStatusQuizAccess(id, bodyParams){
  return putApi(quizAccessApiPath.updStatusQuizAccess + `/${id}`, bodyParams);
}
function getAll(params){
  return getApi(quizAccessApiPath.quizAccessPath+ `/GetListQuizzAccess?courseId=${params}`);
}

export {
  addQuizAccess,
  updStatusQuizAccess,
  getQuizAccess,
  getAll
}
