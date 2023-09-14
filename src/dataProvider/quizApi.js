import { deleteApi, getApi } from "@/dataProvider/baseApi";

const quizPath = "Quizz";

const quizApiPath = {
  quizPath: quizPath,
  getListQuizz: quizPath + "/getListAllQuizz"
}

function getAllQuiz(params) {
  return getApi(quizApiPath.getListQuizz, params);
}

export {
  getAllQuiz
}