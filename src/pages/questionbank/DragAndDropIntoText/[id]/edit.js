import PropTypes from 'prop-types';
import { Card, Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { React, useEffect, useState } from 'react';
import Form from '@/sections/@dashboard/form/questionbank/dragDrops/drag-and-drop-form';
import { useRouter } from 'next/router';
import { getDDQuestionBankByID } from '@/dataProvider/dragAndDropApi';

// ----------------------------------------------------------------------

export default function Edit(props) {
  const [editData, setEditData] = useState({});
  const {
    query: { id }
  } = useRouter()

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
        <Form isEdit={true} currentLevel={editData} />
      </Card>
    </div>
  );
}

Edit.propTypes = {
  isEdit: PropTypes.bool,
  currentLevel: PropTypes.object,
};

Edit.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);