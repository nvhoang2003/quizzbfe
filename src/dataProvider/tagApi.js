import { deleteApi, getApi } from "@/dataProvider/baseApi";

const tagPath = 'Tags';

const tagApiPath = {
  tagPath: tagPath,
  getListByCatID: tagPath + '/getListAllTagByCategoryID',
  deleteTag: tagPath +'deleteTag/?',
}


function getAllTags(params) {
  return getApi(tagApiPath.getListByCatID, params);
}
function deleteTag(id){
  return deleteApi(tagApiPath.deleteTag);
}
export {
  getAllTags,
  deleteTag
}
