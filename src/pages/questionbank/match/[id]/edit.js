import PropTypes from "prop-types";
import { Card, Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { React, useEffect, useState } from "react";
import MatchingForm from '@/sections/@dashboard/form/questionbank/matching/form';
import { useRouter } from "next/router";
import { getQuestionBankByID } from "@/dataProvider/questionbankApi";
import { getById } from "@/dataProvider/matchingQbApi";

// ----------------------------------------------------------------------

Edit.propTypes = {
  isEdit: PropTypes.bool,
  currentLevel: PropTypes.object,
};

export default function Edit(props) {
  const [editData, setEditData] = useState({});
  const {
    query: { id },
  } = useRouter();

  async function fetchQuestionByID(id) {
    const res = await getById(id);
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
        matchSubQuestions: [],
        matchSubAnswers: [],
        isPublic: q.isPublic,
      };

      q.tags?.forEach((element) => {
        transformData.tagId.push(element.id);
      });

      q.matchSubQuestions?.forEach((element) => {
        transformData.matchSubQuestions.push({
          id: element.id,
          questionText: element.questionText,
        });
      });

      q.matchSubAnswers?.forEach((element) => {
        transformData.matchSubAnswers.push(element);
      });

      // console.log(q);

      setEditData(transformData);
      props.changeLastPath(transformData.name);
    } else {
      return res;
    }
  }

  useEffect(() => {
    if (id) {
      fetchQuestionByID(id);
    }
  }, [id]);

  return (
    <div>
      <Card sx={{ p: 3 }}>
        <MatchingForm isEdit={true} currentLevel={editData} />
      </Card>
    </div>
  );
}

Edit.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
