import PropTypes from "prop-types";
import { Card, Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { React, useEffect, useState } from "react";
import MatchingForm from '@/sections/@dashboard/form/questionbank/matching/form';
import { useRouter } from "next/router";
import { getQuestionBankById } from "@/dataProvider/questionbankApi";

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
        authorId: q.authorId,
        tagId: [],
        matchSubQuestionBanks: [],
        isPublic: q.isPublic,
        questionType: q.questionstype
      };

      q.tags?.filter((tag) => {
        if (!tag || tag == undefined || tag == "") {
          return false;
        }

        return true;
      }).map((element) => {
        transformData.tagId.push(element.id);
      });

      q.matchSubQuestionBanks?.forEach(element => {
        transformData.matchSubQuestionBanks.push({
          id: element.id,
          questionBankId: element?.questionBankId || 0,
          questionText: element?.questionText || "",
          answerText: element?.answerText || ""
        });
      });
      
      setEditData(transformData);
      props.changeLastPath(transformData.name)
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
