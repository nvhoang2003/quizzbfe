import { deleteApi, getApi, postApi, putApi } from "@/dataProvider/baseApi";

const listPath = 'getListQuestion';
const qbPath = 'MultiQuestionBank';



function getAllQuestionbank(params) {
  return getApi(listPath + `/getListQuestionBank`, params);
}

function create(qb) {
  return postApi(qbPath + `/CreateNewMultipeChoiceQuestionBank`, qb);
}


function update(id, qb) {
  return putApi(qbPath + `/UpdateMultipeChoiceQuestionBank/${id}`, qb);
}

// function deleteCateByID(id){
//   return deleteApi(catePath + `/deleteCategory/${id}`);
// }

export {
  getAllQuestionbank,
  //   getCateByID,
  update,
  //   deleteCateByID,
  create
}
