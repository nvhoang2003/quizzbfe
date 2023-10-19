import { deleteApi, getApi, postApi, putApi } from "@/dataProvider/baseApi";

const listPath = 'getListQuestion';
const qbPath = 'MultiQuestionBank';
///getListQuestion/DeleteQuestionBank/4
//QuestionBank/GetQuestionBankById/111
const questionBank = 'QuestionBank';

function getAllQuestionbank(params) {
  return getApi(listPath + `/getListQuestionBank`, params);
}

function getQuestionType() {
  return getApi(`GetFixData/getListQuestionBank`);
}

///multichoice
function create(qb) {
  return postApi(qbPath + `/CreateNewMultipeChoiceQuestionBank`, qb);
}

function getQuestionBankByID(id) {
  return getApi(questionBank + `/GetQuestionBankById/ ${id}`);
}

function deleteByID(id) {
  return deleteApi(listPath + `/DeleteQuestionBank/${id}`);
}
export {
  getAllQuestionbank,
  deleteByID,
  create,
  getQuestionType,
  getQuestionBankByID,
}
