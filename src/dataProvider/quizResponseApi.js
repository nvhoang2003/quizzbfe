import { getApi} from "@/dataProvider/baseApi";

const quỉzResponsePath = 'QuizzResponse';//Category/getListAllCategory

const quỉzesponseApiPath = {
  quỉzesponsePath: quỉzResponsePath,
  getListResponseForPeopleDoQuiz: quỉzResponsePath + "/listResponseForPeopleDoQuiz",
  getQuizzResponse: quỉzResponsePath + "/getQuizzResponse"
}

function getListResponseForPeopleDoQuiz (params) {
  return getApi(quỉzesponseApiPath.getListResponseForPeopleDoQuiz, params);
}

function getResponseByID(id){
  return getApi(quỉzesponseApiPath.getQuizzResponse + `/${id}`);
}

export {
  getListResponseForPeopleDoQuiz,
  getResponseByID,
}
