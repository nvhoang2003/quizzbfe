import { deleteApi, getApi, postApi, putApi } from "@/dataProvider/baseApi";

const listPath = 'getListQuestion';
const qbPath = 'MultiQuestionBank';



function getAllQuestionbank(params) {
  return getApi(listPath + `/getListQuestionBank`, params);
}

function create(qb){
  return postApi(qbPath + `/CreateNewMultipeChoiceQuestionBank`,qb);
}

function getQuestionType(){
  return getApi(`GetFixData/getListQuestionBank`);
}

function getQuestionBankByID(id){
  return getApi(qbPath + `/GetMultipeQuestionBankById/ ${id}`);
}

// function updateCateByID(id,cate){
//   return putApi(catePath +`/updateCategories/${id}`,cate);
// }

function deleteById(id){
  return deleteApi(qbPath + `/DeleteMultipeChoiceQuestionBank/${id}`);
}

export {
    getAllQuestionbank,
//   getCateByID,
//   updateCateByID,
  deleteById,
  create,
  getQuestionType,
  getQuestionBankByID
}
