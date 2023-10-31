import { deleteApi, getApi, postApi } from "@/dataProvider/baseApi";

const quizPath = "Quizz";
///Quizz/getListAllQuizz
const quizApiPath = {
  quizPath: quizPath,
  getListQuizz: quizPath + "/getListAllQuizz",
  getQuizById: quizPath + "/getQuizById",
  addQuiz: quizPath + "/CreateNewQuizz",
  editQuiz: quizPath + "/updateQuiz",
  addQuestion: quizPath + "/AddQuestion",
  deleteQuizById: quizPath + "/deleteQuiz"
}
// params: {
//   courseId: courseId
// }
function getAllQuiz(params) {
  console.log(params);
  return getApi(quizApiPath.getListQuizz, params);
}

function getQuizForTestID(id){
  return getApi(quizPath + `/getQuizForTest/${id}`);
}

function submitQuiz(id, params){
  return postApi(`Score/SubmitQuizz/${id}`, params);
}

function getQuizById(quizId) {
  return getApi(quizApiPath.getQuizById + `/${quizId}`);
}

function deleteQuizById(quizId) {
  return deleteApi(quizApiPath.deleteQuizById + `/${quizId}`);
}

export {
  getAllQuiz,
  getQuizForTestID,
  submitQuiz,
  getQuizById,
  deleteQuizById,
}
