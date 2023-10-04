import { useRouter } from 'next/router';
import { React, useState } from 'react'

export default function index() {
  const [data, setData] = useState({});
  const {
    query: {id}
  } = useRouter();

  async function fetchQuestionByID(id) {
    const res = await getDDQuestionBankByID(id);
    if (res.status < 400) {
      const q = res.data.data;
      const transformData = {
        id: q.id,
        name: q.name,
        generalfeedback: q.generalfeedback,
        content: q.content,
        defaultMark: q.defaultMark,
        categoryId: q.categoryId,
        tagId: [],
        answers: [],
        isPublic: q.isPublic,
        authorId: q.authorId
      };

      q.tags?.forEach(element => {
        transformData.tagId.push(element.id);
      });

      q.answers?.forEach(element => {
        transformData.answers.push({
          id: element.id,
          answer: element.content,
          feedback: element.feedback,
          fraction: element.fraction,
          quizBankId: element.quizBankId,
          questionId: element.questionId
        });
      });

      setData(transformData);
    } else {
      return res;
    }
  };

  useEffect(() => {
    if (id) {
      fetchQuestionByID(id);
    }
  }, [id]);

  return (
    <div>index</div>
  )
}

Edit.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
