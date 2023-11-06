import { deleteApi, getApi, postApi, putApi } from "@/dataProvider/baseApi";
const listPath = 'getListQuestion';
const multi = 'MultiQuestion';
const path = 'Question';
//Question/AddMultiQuestions
///getListQuestion/DeleteQuestion/56
//Question/GetQuestionById/5


function getAllQuestion(params) {
  return getApi(listPath + `/getListQuestion`, params);
}

function addMultiQuestions(qb){
  return postApi(path + `/AddMultiQuestions`,qb);
}

function getQuestionById(id){
  return getApi(path + `/GetQuestionById/${id}`);
}

// function getQuestionBankByID(id){
//   return getApi(qbPath + `/GetMultipeQuestionBankById/ ${id}`);
// }

// function updateCateByID(id,cate){
//   return putApi(catePath +`/updateCategories/${id}`,cate);
// }

///api/Question/DeleteQuestion/5
function deleteQuestionById(id){
  return deleteApi(path + `/DeleteQuestion/${id}`);
}




export {
    getAllQuestion,
    getQuestionById,
    deleteQuestionById,
    addMultiQuestions
}
