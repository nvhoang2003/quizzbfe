import { deleteApi, getApi, postApi, putApi } from "@/dataProvider/baseApi";
const listPath = 'getListQuestion';
const multi = 'MultiQuestion';
///getListQuestion/DeleteQuestion/56


function getAllQuestion(params) {
  return getApi(listPath + `/getListQuestion`, params);
}

function addMultiQuestions(qb){
  return postApi(listPath + `/AddMultiQuestions`,qb);
}

function getMultiById(id){
  return getApi(multi + `/GetQuestionBankById/${id}`);
}

// function getQuestionBankByID(id){
//   return getApi(qbPath + `/GetMultipeQuestionBankById/ ${id}`);
// }

// function updateCateByID(id,cate){
//   return putApi(catePath +`/updateCategories/${id}`,cate);
// }

function deleteQuestionById(id){
  return deleteApi(listPath + `/DeleteQuestion/${id}`);
}




export {
    getAllQuestion,
    getMultiById,
    deleteQuestionById,
    addMultiQuestions
}
