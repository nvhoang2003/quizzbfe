import { deleteApi, getApi, postApi, putApi } from "@/dataProvider/baseApi";

const listPath = 'getListQuestion';
const qbPath = 'QuestionBankDragAndDrop';

function create(qb) {
  return postApi(qbPath + `/CreateNewQuesstion`, qb);
}

function getDDQuestionBankByID(id){
  return getApi(qbPath + `/GetQuestionBankById/ ${id}`);
}


function update(id, qb) {
  return putApi(qbPath + `/UpdateQuestionBank/${id}`, qb);
}

export {
  update,
  create,
  getDDQuestionBankByID,
}
