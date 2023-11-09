const { getQuizById } = require("@/dataProvider/quizApi");
const { useEffect } = require("react");

const AddQuestion = (props) => {
  const fetchQuizById = async (quizId) => {
    const res = await getQuizById(quizId);
    if (res.status < 400) {
      const q = res.data.data;
      const transformData = {
        id: q.id,
        name: q.name,
        timeOpen: q.timeOpen,
        timeClose: q.timeClose,
        timeLimit: q.timeLimit,
        description: q.description,
        pointToPass: q.pointToPass,
        maxPoint: q.maxPoint,
        isPublic: q.isPublic,
        isValid: q.isValid,
        courseid: q.courseid,
        listQuestion: q.listQuestion,
      };

      setEditData(transformData);
      props.changeLastPath(transformData.name);
      props.changeBreadCrumbsStatus(true);
    } else {
      return res;
    }
  }

  useEffect(() => {
    if (quizId) {
      fetchQuizById(quizId);
    }
  }, [quizId]);
};
