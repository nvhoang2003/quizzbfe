import { getQuestionById } from '@/dataProvider/questionApi';
import { getQuestionBankById } from '@/dataProvider/questionbankApi';
import FormDetailDragAndDrop from '@/sections/@dashboard/form/questionbank/dragDrops/formDragAndDropDetail';
import { Card } from '@mui/material';
import { useRouter } from 'next/router';
import { React, useEffect, useState } from 'react'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
//------------------------------------------------------------

export default function DragAndDropDetail() {
  const [data, setData] = useState([]);
  const {
    query: {id}
  } = useRouter();

  const urlParams = new URLSearchParams(window.location.search);

  const question = urlParams.get('question');


  async function fetchQuestionBankByID(id) {
    const res = await getQuestionBankById(id);
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

      q.tags?.filter((tag) => {
        if (!tag || tag == undefined || tag == "") {
          return false;
        }

        return true;
      }).forEach(element => {
        transformData.tagId.push(element.id);
      });

      q.quizbankAnswers?.forEach(element => {
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
      // snackbarUtils.error(res);
      return res;
    }
  };

  async function fetchQuestionByID(id) {
    const res = await getQuestionById(id);
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

      q.tags?.filter((tag) => {
        if (!tag || tag == undefined || tag == "") {
          return false;
        }

        return true;
      }).forEach(element => {
        transformData.tagId.push(element.id);
      });

      q.questionAnswers?.forEach(element => {
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
      // props.changeLastPath(transformData.name)
    } else {
      return res;
    }
  };

  useEffect(() => {
    if (urlParams.get('question')) {
      fetchQuestionByID(question);
    } else {
      fetchQuestionBankByID(id);
    }

  }, [id]);

  return (
    <div>
      <Card sx={{ p: 3 }}>
        <FormDetailDragAndDrop currentLevel={data}/>
      </Card>
    </div>
  )
}

DragAndDropDetail.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
