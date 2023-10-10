import PropTypes from 'prop-types';
import { Card, Grid, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getQuestionBankByID } from '@/dataProvider/questionbankApi';
import { Container } from 'postcss';
import FormDetailMultichoice from '@/sections/@dashboard/form/questionbank/formMultichoiceDetails';

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

  async function fetchQuestionByID(id) {
    const res = await getQuestionBankByID(id);
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
        isPublic: q.isPublic
      };

      q.tags?.forEach(element => {
        transformData.tagId.push(element.id);
      });

      q.answers?.forEach(element => {
        transformData.answer_content.push({
          id: element.id,
          answer: element.content,
          feedback: element.feedback,
          fraction: element.fraction,
          quizBankId: element.quizBankId,
          questionId: element.questionId
        });
      });
      setEditData(transformData);
      props.changeLastPath(transformData.name)
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
