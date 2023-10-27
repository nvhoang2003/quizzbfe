import PropTypes from 'prop-types';
import { Card, Grid, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getQuestionBankById } from '@/dataProvider/questionbankApi';
import { Container } from 'postcss';
import FormDetailTrueFalse from '@/sections/@dashboard/form/questionbank/trueFalse/formTrueFalseDetails';

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
    const res = await getQuestionBankById(id);
    
    if (res.status < 400) {
      const q = res.data.data;
      console.log(q);
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
        authorId: q.authorId,
        imageUrl:q.imageUrl
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
          id:element.id,
          feedback:element.feedback,
          answer:element.content,
          fraction:element.fraction,
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
    if (id) {
      fetchQuestionByID(id);
    }
  }, [id]);

  return (
    <div>
      <Card sx={{ p: 3 }}>
        <FormDetailTrueFalse currentLevel={editData}/>
      </Card>
    </div>
  );
}

Details.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
