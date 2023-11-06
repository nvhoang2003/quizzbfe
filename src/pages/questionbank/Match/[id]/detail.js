import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { Card, Typography } from '@mui/material';
import Details from '@/sections/@dashboard/form/questionbank/matching/details';
import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { getQuestionBankById } from '@/dataProvider/questionbankApi';
import { getQuestionById } from "@/dataProvider/questionApi";

export default function index(props) {
  const [editData, setEditData] = useState({});

  const {
    query: { id }
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
        matchSubQuestionBanks: [],
        isPublic: q.isPublic,
        questionstype: q.questionstype
      };

      q.tags?.forEach(element => {
        transformData.tagId.push(element.id);
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
  }

  async function fetchQuestionByID(id) {
    // console.log(id);
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
        matchSubQuestionBanks: [],
        isPublic: q.isPublic,
        questionstype: q.questionsType
      };

      q.tags?.forEach(element => {
        transformData.tagId.push(element.id);
      });

      q.matchSubQuestions?.forEach(element => {
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
    if (urlParams.get('question')) {
      fetchQuestionByID(question);
    } else {
      fetchQuestionBankByID(id);
    }

  }, [id]);
  console.log(editData);

  return (
    <div>
      <Card sx={{ p: 3 }}>
        {editData?.questionstype === "Match" ? <Details currentLevel={editData}/> :
          <Typography>Câu Hỏi Không Đúng Định Dạng</Typography>
        }
      </Card>
    </div>
  )
}

index.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
