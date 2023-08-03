import { getApi } from "@/dataProvider/baseApi";

const tagPath = 'Tags';

const tagApiPath = {
  tagPath: tagPath,
  getListByCatID: tagPath + '/getListAllTagByCategoryID',
}

function getAllTags(params) {
  return getApi(tagApiPath.getListByCatID, params);//thay 1 = tagApiPath.getListByCatID
}

export {
  getAllTags
}

