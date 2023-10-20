import { deleteApi, getApi, postApi, putApi } from "@/dataProvider/baseApi";

const qbPath = 'QuestionShortAnswer';

const shortAnswerhQApiPath = {
  mainPath: qbPath,
  getById: qbPath + "/GetQuestionBankById",
  createShortAnswer: qbPath + "/CreateNewQuesstionShortAnswer",
  updateShortAnswer: qbPath + "/UpdateQuestionBank",
  deleteShortAnswer: qbPath + "/DeleteQuestionBank"
}

function getById(id) {
  return getApi(`${shortAnswerhQApiPath.getById}/${id}`);
}

function createQb(qb) {
  return postApi(shortAnswerhQApiPath.createShortAnswer, qb);
}

function updateQb(id, qb) {
  return putApi(`${shortAnswerhQApiPath.updateShortAnswer}/${id}`, qb);
}

function deleteQb(id) {
  return deleteApi(`${shortAnswerhQApiPath.deleteShortAnswer}/${id}`);
}

export {
  getById,
  createQb,
  updateQb,
  deleteQb
}
