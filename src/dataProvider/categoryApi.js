import { deleteApi, getApi, postApi, putApi } from "@/dataProvider/baseApi";

const catePath = 'Category';//Category/getListAllCategory

const CateApiPath = {
  catePath: catePath,
  getAllCate: catePath + '/getListAllCategory',
}


function getAllCate(params) {
  return getApi(CateApiPath.getAllCate, params);
}

function createCate(cate){
  return postApi(catePath + `/CreateNewCategory`,cate);
}

function getCateByID(id){
  return getApi(catePath+ `/getCategoryById/ ${id}`);
}

function updateCateByID(id,cate){
  return putApi(catePath +`/updateCategories/${id}`,cate);
}

function deleteCateByID(id){
  return deleteApi(catePath + `/deleteCategory/${id}`);
}

export {
  getAllCate,
  getCateByID,
  updateCateByID,
  deleteCateByID,
  createCate
}
