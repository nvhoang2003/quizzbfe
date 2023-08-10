import { getApi } from "@/dataProvider/baseApi";

const catePath = 'Category';//Category/getListAllCategory

const CateApiPath = {
  catePath: catePath,
  getAllCate: catePath + '/getListAllCategory'
}


function getAllCate(params) {
  return getApi(CateApiPath.getAllCate, params);
}

export {
  getAllCate
}
