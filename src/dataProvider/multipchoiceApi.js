import { deleteApi, getApi, postApi, putApi } from "@/dataProvider/baseApi";

const listPath = 'getListQuestion';
const qbPath = 'MultiQuestionBank';



function getAllQuestionbank(params) {
  return getApi(listPath + `/getListQuestionBank`, params);
}

function create(qb){
  return postApi(qbPath + `/CreateNewMultipeChoiceQuestionBank`,qb);
}

// function getCateByID(id){
//   return getApi(catePath+ `/getCategoryById/ ${id}`);
// }

// function updateCateByID(id,cate){
//   return putApi(catePath +`/updateCategories/${id}`,cate);
// }

// function deleteCateByID(id){
//   return deleteApi(catePath + `/deleteCategory/${id}`);
// }

export {
    getAllQuestionbank,
//   getCateByID,
//   updateCateByID,
//   deleteCateByID,
  create
}
