import { getApi } from "@/dataProvider/baseApi";

const quizzPath = 'Quizz';

const quizzApiPath = {
    quizzPath: quizzPath,
    getListAllQuizz: quizzPath + '/getListAllQuizz',
}

function getListAllQuizz(params) {
  return getApi(quizzApiPath.getListAllQuizz, params);
}

export {
    getListAllQuizz
}

