import { deleteApi, getApi, postApi, putApi } from "@/dataProvider/baseApi";
//MultiQuestion/GetQuestionBankById/19
const listPath = 'getListQuestion';
const multi = 'MultiQuestion';



function getAllQuestion(params) {
  return getApi(listPath + `/getListQuestion`, params);
}

// function create(qb){
//   return postApi(qbPath + `/CreateNewMultipeChoiceQuestionBank`,qb);
// }

function getMultiById(id){
  return getApi(multi + `/GetQuestionBankById/${id}`);
}

// function getQuestionBankByID(id){
//   return getApi(qbPath + `/GetMultipeQuestionBankById/ ${id}`);
// }

// function updateCateByID(id,cate){
//   return putApi(catePath +`/updateCategories/${id}`,cate);
// }

function deleteMultiById(id){
  return deleteApi(multi + `/DeleteQuestionBank/${id}`);
}




export {
    getAllQuestion,
    getMultiById,
    deleteMultiById
}
