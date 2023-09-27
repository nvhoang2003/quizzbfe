import { deleteApi, getApi, postApi } from "@/dataProvider/baseApi";

const quizPath = "Quizz";

const quizApiPath = {
  quizPath: quizPath,
  getListQuizz: quizPath + "/getListAllQuizz"
}

function getAllQuiz(params) {
  return getApi(quizApiPath.getListQuizz, params);
}

function getQuizForTestID(id){
  return getApi(quizPath + `/getQuizForTest/ ${id}`);
}

function submitQuiz(id, params){
  return postApi(`Score/SubmitQuizz/${id}`, params);
}

export {
  getAllQuiz,
  getQuizForTestID,
  submitQuiz,
}
