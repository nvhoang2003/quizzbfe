import PropTypes from 'prop-types';
import { Card, Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getMultiById } from '@/dataProvider/questionApi';
import Form from '../form_question';

// ----------------------------------------------------------------------

Details.propTypes = {
  isEdit: PropTypes.bool,
  currentLevel: PropTypes.object,
};

export default function Details() {
  const [editData, setEditData] = useState({});
  const {
    query: { id }
  } = useRouter()

  async function fetchQuestionByID() {
    const res = await getMultiById(id);
    if (res.status < 400) {
      const q = res.data.data;
      const transformData = {
        id: q.id,
        name: q.name,
        generalfeedback:q.generalfeedback,
        content: q.content,
        defaultMark: q.defaultMark,
        author : q.author,
        answers:[],
        questionsType: q.questionstype,
      };

      q.answers?.forEach(element => {
        transformData.answers.push({
          id: element.id,
          content: element.content,
          fraction: element.fraction,
          questionId: element.questionId
        });
      });

      setEditData(transformData);
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
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <Card sx={{ p: 3 }}>
            <Form isEdit={false} currentLevel={editData} />
          </Card>
        </Grid>
      </Grid>
    </div>

  );
}

Details.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
