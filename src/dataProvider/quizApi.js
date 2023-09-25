import { deleteApi, getApi } from "@/dataProvider/baseApi";

const quizPath = "Quizz";

const quizApiPath = {
  quizPath: quizPath,
  getListQuizz: quizPath + "/getListAllQuizz",
  getQuizById: quizPath + "/getQuizById",
  addQuiz: quizPath + "/CreateNewQuizz",
  editQuiz: quizPath + "/updateQuiz",
  addQuestion: quizPath + "/AddQuestion",
  deleteQuizById: quizPath + "/deleteQuiz"
}

function getAllQuiz(params) {
  return getApi(quizApiPath.getListQuizz, params);
}

function getQuizById(quizId) {
  return getApi(quizApiPath.getListQuizz + `/${quizId}`, {});
}

function deleteQuizById(quizId) {
  return deleteApi(quizApiPath.deleteQuizById + `/${quizId}`, {});
}

export {
  getAllQuiz,
  getQuizById,
  deleteQuizById
}
