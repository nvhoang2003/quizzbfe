import PropTypes from 'prop-types';
import { Card, Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getQuestionBankByID, getTFQuestionBankByID } from '@/dataProvider/questionbankApi';
import FormTrueFalseQuestionBank from '@/sections/@dashboard/form/questionbank/formTrueFalseQuestion';

// ----------------------------------------------------------------------

Edit.propTypes = {
  isEdit: PropTypes.bool,
  currentLevel: PropTypes.object,
};

export default function Edit(props) {
  const [editData, setEditData] = useState({});
  const {
    query: { id }
  } = useRouter()

  async function fetchQuestionByID(id) {
    const res = await getTFQuestionBankByID(id);
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
        if (element.fraction === 1) {
          transformData.answers.push({
            feedback:element.feedback,
            answer:element.content,
          });
        }
      });

      // q.answers?.forEach(element => {
      //   transformData.answers.push({
      //     id: element.id,
      //     answer: element.content,
      //     feedback: element.feedback,
      //     fraction: element.fraction,
      //     quizBankId: element.quizBankId,
      //     questionId: element.questionId
      //   });
      // });

      
      setEditData(transformData);
      props.changeLastPath(transformData.name)
    } else {
      return res;
    }
  };
  console.log(editData);

  useEffect(() => {
    if (id) {
      fetchQuestionByID(id);
    }
  }, [id]);

  return (
    <div>
      <Card sx={{ p: 3 }}>
        <FormTrueFalseQuestionBank isEdit={true} currentLevel={editData} />
      </Card>
    </div>
  );
}

Edit.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
