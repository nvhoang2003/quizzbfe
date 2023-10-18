import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { Card, Typography } from '@mui/material';
import Details from '@/sections/@dashboard/form/questionbank/matching/details';
import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { getQuestionBankById } from '@/dataProvider/questionbankApi';

export default function index(props) {
  const [editData, setEditData] = useState({});

  const {
    query: { id }
  } = useRouter();

  async function fetchQuestionByID(id) {
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
        matchSubQuestionBanks: [],
        isPublic: q.isPublic,
        questionType: q.questionstype
      };

      q.tags?.forEach(element => {
        transformData.tagId.push(element?.id);
      });

      q.matchSubQuestionBanks?.forEach(element => {
        transformData.matchSubQuestionBanks.push({
          id: element.id,
          questionText: element.questionText,
          answerText: element.answerText
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
        {editData?.questionType === "Match" ? <Details currentLevel={editData}/> :
          <Typography>Câu Hỏi Không Đúng Định Dạng</Typography>
        }
      </Card>
    </div>
  )
}

index.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
