import { deleteApi, getApi, postApi, putApi } from "@/dataProvider/baseApi";

const quizPath = "Quizz";
///Quizz/getListAllQuizz
const quizApiPath = {
  quizPath: quizPath,
  getListQuizz: quizPath + "/getListAllQuizz",
  getQuizById: quizPath + "/getQuizById",
  addQuiz: quizPath + "/CreateNewQuizz",
  editQuiz: quizPath + "/updateQuiz",
  editQuizPoint: quizPath + "/updateQuizPoint",
  addQuestion: quizPath + "/AddQuestion",
  deleteQuizById: quizPath + "/deleteQuiz",
};
///api/Score/SubmitQuizz
// params: {
//   courseId: courseId
// }

function getAllQuiz(params) {
  return getApi(quizApiPath.getListQuizz, params);
}

function getQuizForTestID(id) {
  return getApi(quizPath + `/getQuizForTest/${id}`);
}

function submitQuiz(params) {
  return postApi(`Score/SubmitQuizz`, params);
}

function getQuizById(quizId) {
  return getApi(quizApiPath.getQuizById + `/${quizId}`);
}

function postAddQuiz(data) {
  return postApi(quizApiPath.addQuiz, data);
}

function putEditQuiz(quizId, data) {
  return putApi(`${quizApiPath.editQuiz}/${quizId}`, data);
}

function putEditQuizPoint(quizId, data) {
  return putApi(`${quizApiPath.editQuizPoint}/${quizId}`, data);
}

function postAddQuestion (data) {
  return postApi(quizApiPath.addQuestion, data);
}

function deleteQuizById(quizId) {
  return deleteApi(quizApiPath.deleteQuizById + `/${quizId}`);
}

export {
  getAllQuiz,
  getQuizForTestID,
  postAddQuiz,
  putEditQuiz,
  submitQuiz,
  getQuizById,
  putEditQuizPoint,
  postAddQuestion,
  deleteQuizById,
};
