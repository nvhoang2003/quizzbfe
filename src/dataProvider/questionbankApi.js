import { deleteApi, getApi, postApi, putApi } from "@/dataProvider/baseApi";

const listPath = 'getListQuestion';
const path = 'QuestionBank';

function getAllQuestionbank(params) {
  return getApi(listPath + `/getListQuestionBank`, params);
}

function getQuestionType() {
  return getApi(`GetFixData/getListQuestionBank`);
}


function getQuestionBankById(id) {
  return getApi( path+`/getQuestionBankById/${id}`);
}

function createQb(qb) {
  return postApi(path + `/CreateNewQuesstion`,qb);
}

function updateQb(id, qb) {
  return putApi(path + `/UpdateQuesstionbank/${id}`,qb);
}

function deleteQb(id) {
  return deleteApi(path + `/DeleteQuesstionbank/${id}`);
}


export {
  getAllQuestionbank,
  getQuestionBankById,
  getQuestionType,
  createQb,
  updateQb,
  deleteQb
}
