import { deleteApi, getApi, postApi, putApi } from "@/dataProvider/baseApi";

const listPath = 'getListQuestion';
const path = 'QuestionBank';
const qbPath = 'MultiQuestionBank';
const tfPath = 'TrueFalseQuestionBank';
///getListQuestion/DeleteQuestionBank/4


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
  return getApi(qbPath + `/GetMultipeQuestionBankById/ ${id}`);
}

function deleteByID(id) {
  return deleteApi(listPath + `/DeleteQuestionBank/${id}`);
}
//truefalse
//TrueFalseQuestionBank/updateTrueFalseQuestionBank/

function getTFQuestionBankByID(id) {
  return getApi(tfPath + `/getTrueFalseQuestionBankById/ ${id}`);
}

function createTFQestionBank(qb) {
  return postApi(tfPath + `/createNewTrueFalseQuestionBank`, qb);
}
function updateTFQuestionBank(id, qb) {
  return putApi(tfPath + `/updateTrueFalseQuestionBank/${id}`, qb);
}

function getById(id) {
  return getApi(path + `/GetQuestionBankById/${id}`);
}

function getQuestionBankById(id) {
  return getApi(`QuestionBank/getQuestionBankById/${id}`);
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
  //   getCateByID,
  //   updateCateByID,
  getQuestionBankById,
  deleteByID,
  create,
  getQuestionType,
  getQuestionBankByID,
  getTFQuestionBankByID,
  createTFQestionBank,
  updateTFQuestionBank,
  getById,
  createQb,
  updateQb,
  deleteQb
}
