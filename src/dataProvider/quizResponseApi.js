import { getApi} from "@/dataProvider/baseApi";

const quỉzesponsePath = 'QuizzResponse';//Category/getListAllCategory

function getResponseByID(id){
  return getApi(quỉzesponsePath+ `/getQuizzResponse/ ${id}`);
}

export {
  getResponseByID,
}
