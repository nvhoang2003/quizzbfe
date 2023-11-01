import { postApi, putApi, getApi } from "@/dataProvider/baseApi";

const quizAccessPath = "QuizAccess";

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

export {
  addQuizAccess,
  updStatusQuizAccess,
  getQuizAccess
}
