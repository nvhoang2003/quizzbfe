import PropTypes from 'prop-types';
import { Card, Grid, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getQuestionBankById } from '@/dataProvider/questionbankApi';
import { Container } from 'postcss';
import FormDetailMultichoice from '@/sections/@dashboard/form/questionbank/multichoice/formMultichoiceDetails';
import { getQuestionById } from '@/dataProvider/questionApi';

// ----------------------------------------------------------------------

Details.propTypes = {
  isEdit: PropTypes.bool,
  currentLevel: PropTypes.object,
};

export default function Details(props) {
  const [editData, setEditData] = useState({});
  
  const {
    query: { id }
  } = useRouter()

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
        answer_content: [],
        isPublic: q.isPublic,
        imageUrl: q.imageUrl
      };

      q.tags?.filter((tag) => {
        if (!tag || tag == undefined || tag == "") {
          return false;
        }

        return true;
      }).map((element) => {
        transformData.tagId.push(element.id);
      });

      q.quizbankAnswers?.forEach((element) => {
        transformData.answer_content.push({
          id: element.id,
          answer: element.content,
          feedback: element.feedback,
          fraction: element.fraction,
          quizBankId: element.quizBankId,
          questionId: element.questionId,
        });
      });

      setEditData(transformData);
      props.changeLastPath(transformData.name);
    } else {
      return res;
    }
  }

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
        answer_content: [],
        isPublic: q.isPublic,
        authorId: q.authorId,
        imageUrl: q.imageUrl,
        questionstype:q.questionstype
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
        transformData.answer_content.push({
          id: element.id,
          feedback: element.feedback,
          answer: element.content,
          fraction: element.fraction,
          quizBankId: element.quizBankId
        });
      });
      setEditData(transformData);
      props.changeLastPath(transformData.name)
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
        <FormDetailMultichoice currentLevel={editData}/>
      </Card>
    </div>
  );
}

Details.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
