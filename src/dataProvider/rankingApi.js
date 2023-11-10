import { getApi } from "./baseApi";

const rankingPath = "Ranking";

function getRanking(id,params) {
  return getApi(rankingPath + `/GetRanking/${id}`, params);
}

export {
  getRanking
}
