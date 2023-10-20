import PropTypes from "prop-types";
import { Card } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { React, useEffect, useState } from "react";
import ShortAnswerForm from "@/sections/@dashboard/form/questionbank/shortAnswer/form";
import { useRouter } from "next/router";
import { getById } from "@/dataProvider/questionbankApi";

// ----------------------------------------------------------------------

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
        answers: [],
        isPublic: q.isPublic,
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
        transformData.answers.push({
          id: element.id,
          content: element.content,
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

  useEffect(() => {
    if (id) {
      fetchQuestionByID(id);
    }
  }, [id]);

  return (
    // <Grid container spacing={3}>
    //     <Grid item xs={12} >
    <Card sx={{ p: 3 }}>
      <ShortAnswerForm isEdit={true} currentLevel={editData} />
    </Card>
    //     </Grid>
    // </Grid>
  );
}

Edit.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
