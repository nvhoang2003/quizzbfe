import { deleteApi, getApi, postApi, putApi } from "@/dataProvider/baseApi";

const listPath = 'getListQuestion';
const qbPath = 'QuestionBankMatching';

const matchQApiPath = {
  mainPath: qbPath,
  getById: qbPath + "/GetById",
  createMatch: qbPath + "/Create",
  updateMatch: qbPath + "/Update",
  deleteMatch: qbPath + "/Delete"
}

function getById(id) {
  return getApi(`${matchQApiPath.getById}/${id}`);
}

function createQb(qb) {
  return postApi(matchQApiPath.createMatch, qb);
}

function updateQb(id, qb) {
  return putApi(`${matchQApiPath.updateMatch}/${id}`, qb);
}

function deleteQb(id) {
  return deleteApi(`${matchQApiPath.deleteMatch}/${id}`);
}

export {
  getById,
  createQb,
  updateQb,
  deleteQb
}
