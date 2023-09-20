import { useMemo, useState, useEffect } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const SearchQuizResults = ({ handleSearchSubmit, ...prop }) => {
  const { filter, setFilter, listScore, setListScore } = prop;
  const [cate, setCate] = useState([]);
  const defaultValues = useMemo(
    () => ({
      quizId: filter?.quizId || "",
      courseId: filter?.courseId || "",
    }),
    [filter]
  );
  const validationSchema = Yup.object().shape({});
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (filter) {
      reset(defaultValues);
    }
  }, [filter]);
  
  useEffect(() => {
    fetchListScoreForPepleDoQuiz();
  }, [defaultValues]);

  const fetchListScoreForPepleDoQuiz = async () => {
    const res = await getListResponseForPeopleDoQuiz(defaultValues);
    
    if (res.status < 400) {
      setPaging(JSON.parse(res.headers["x-pagination"]));
      setListScore(res.data.data);
    } else {
      console.log(res.message);
    }
  }
};
