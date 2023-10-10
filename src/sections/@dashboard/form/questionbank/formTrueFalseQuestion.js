import { useMemo, useState, useEffect } from "react";
import FormProvider from "@/components/form/FormProvider";
import RHFTextField from "@/components/form/RHFTextField";
import {
  Container,
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  Typography,
  TextField,
  SvgIcon,
  Tooltip,
  IconButton,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import snackbarUtils from "@/utils/snackbar-utils";
//import RHFSelect from '@/components/form/RHFSelect';
import _, { set } from "lodash";
import { getAllCate } from "@/dataProvider/categoryApi";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import RHFRadioGroup from "@/components/form/RHFRadioGroup";
import RHFSwitch from "@/components/form/RHFSwitch";
import { getTagByCategory } from "@/dataProvider/tagApi";
import RHFSelect from "@/components/form/RHFSelect";
import { create, update } from "@/dataProvider/multipchoiceApi";
import { id } from "date-fns/locale";
import { createTFQestionBank, updateTFQuestionBank } from "@/dataProvider/questionbankApi";
//---------------------------------------------------

FormTrueFalseQuestionBank.propTypes = {
  isEdit: PropTypes.bool,
  currentLevel: PropTypes.object,
};

export default function FormTrueFalseQuestionBank({ isEdit = false, currentLevel }) {
  const { push } = useRouter();
  const [cate, setCate] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [category, setCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const [reRender, setReRender] = useState([]);

  const [answerChoose, setAnswerChoose] = useState(
    {
      feedback: "",
      answer_truefalse: null,
    },
  );

  const [tagChoose, setTagChoose] = useState([
    {
      id: 0,
      tags: "",
    },
  ]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required("Tên không được trống"),
    content: Yup.string().trim().required("Content không được để trống"),
    generalfeedback: Yup.string()
      .trim()
      .required("generalfeedback không được để trống"),

    defaultMark: Yup.number()
      .min(1, "Giá trị phải lớn hơn hoặc bằng 1")
      .max(100, "Giá trị phải nhỏ hơn hoặc bằng 100")
      .required("generalfeedback không được để trống"),

    categoryId: Yup.number().required("Vui lòng chọn category"),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentLevel?.name || "",
      content: currentLevel?.content || "",
      generalfeedback: currentLevel?.generalfeedback || "",
      defaultMark: currentLevel?.defaultMark || "",
      categoryId: currentLevel?.categoryId || "",
      tagId: currentLevel?.tagId || "",
      answer: currentLevel?.answers == 'True' ? true : false || null,
      questionstype: "TrueFalse",
      isPublic: currentLevel?.isPublic == 1 ? true : false,
    }),
    [currentLevel]
  );

  console.log(currentLevel);

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
    if (categoryId) {
      fetchAlltags(categoryId);
    } else {
      setTags([]);
    }
  }, [categoryId]);

  async function fetchAlltags(cateId) {
    const res = await getTagByCategory(cateId);
    console.log("sahgdjsad" + res);
    if (res.status < 400) {
      const transformData = res.data.data.map((tag) => {
        return {
          id: tag.id,
          tags: tag.name,
        };
      });
      console.log(transformData);
      setTags([...transformData]);
    } else {
      return res;
    }
  }

  async function fetchTagChoose(currentLevel) {
    if (currentLevel !== "undefined") {
      if (
        currentLevel?.categoryId !== null &&
        currentLevel?.categoryId !== "undefined"
      ) {
        if(isEdit){
          tagChoose.shift();
        }

        currentLevel?.tagId?.forEach((element) => {
          const tag = tags.find((tag) => tag.id === element);

          tagChoose.push({
            id: tag?.id,
            tags: tag?.id
          });
        });
      }

      if (
        currentLevel?.answers !== null &&
        currentLevel?.answers !== "undefined"
      ) {
        currentLevel?.answers?.forEach((element) => {
          const ans = {
            feedback: element.feedback === null ? "" : element.feedback,
            answer_truefalse: element.answer == "True" ? true : false,
          };
          setAnswerChoose(ans);
        });
      }
    }
    return;
  }
  useEffect(() => {
  }, [answerChoose, tagChoose]);

  useEffect(() => {
    if (isEdit && currentLevel) {
      setCategoryId(currentLevel?.categoryId);
       reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentLevel]);

  useEffect(() => {
    if (categoryId) {
      fetchAlltags(categoryId);
    }
   
  }, [categoryId]);

  useEffect(() => {
    if (categoryId) {
      fetchTagChoose(currentLevel);
    }
   
  }, [tags]);

  useEffect(() => {
    async function fetchAllCate() {
      const res = await getAllCate();
      if (res.status < 400) {
        const transformData = res.data.data.map((cate) => {
          return {
            id: cate.id,
            name: cate.name,
          };
        });
        setCategory(transformData);
      } else {
        return res;
      }
    }
    fetchAllCate();
  }, []);

  const handleCateChange = (event) => {
    setCategoryId(parseInt(event.target.value));
    setValue(event.target.name, event.target.value);
    setReRender({ [event.target.name]: event.target.value });
  };

  const handleInputTagsChange = (index, event) => {
    const selectedValue = event.target.value;
    const updatedInputs = [...tagChoose];
    updatedInputs[index] = {
      ...updatedInputs[index],
      tags: selectedValue,
    };
    const isDuplicate = updatedInputs.some((input, i) => {
      return i !== index && input?.tags == selectedValue;
    });

    if (!isDuplicate) {
      setValue(event.target.name, selectedValue);
      setTagChoose(updatedInputs);
    } else {
      setValue(event.target.name, null)
      snackbarUtils.warning("Bạn nên chọn một tag khác");
    }

  };

  const handleInputAnswerChange = (event) => {
    const updatedInput = {
      ...answerChoose,
      answer_truefalse: event.target.value,
    };
    setValue(event.target.name, event.target.value);
    setAnswerChoose(updatedInput);
  };

  const handleFeedbackChange = (event) => {
    const updatedInputs = {
      ...answerChoose,
      feedback: event.target.value,
    };
    setValue(event.target.name, event.target.value);
    setAnswerChoose(updatedInputs);
  };
  useEffect(() => { }, [answerChoose]);


  const handleAddInputTag = () => {
    const newInput = { id: tagChoose.length + 1, tags: "" };
    setTagChoose([...tagChoose, newInput]);
  };

  const handleRemoveInputTag = (index) => {
    const updatedInputs = [...tagChoose];
    updatedInputs.splice(index, 1);
    setTagChoose(updatedInputs);
  };

  //allquestiontype
  async function createNew(data) {
    const transformData = {
      name: data.name,
      content: data.content,
      generalfeedback: data.generalfeedback,
      isPublic: data.isPublic ? 1 : 0,
      categoryId: data.categoryId,
      defaultMark: data.defaultMark,
      isShuffle: 1,
      qbTags: data.tagId.filter((tag) => {
        if (!tag || tag == undefined || tag == '') {
          return false;
        }
        return true;
      }).map((tag) => {
        return {
          qbId: 0,
          tagId: parseInt(tag, 10),
        };
      }),
      questionstype: "TrueFalse",
      answers: [
        //   {
        //   // content: data.answer.answer_truefalse,
        //   // fraction: data.answer.answer_truefalse === "true" ? 1 : 0,
        //   feedback: data.answer.feedback,
        //   // quizBankId: 0,
        //   // questionId: 0,
        //   // id: 0,
        // }
      ],
      rightAnswer: data.answer.answer_truefalse === "true" ? true : false,
    };
    try {
      const res = await createTFQestionBank(transformData);
      if (res.status < 400) {
        snackbarUtils.success(res.data.message);
        push("/questionbank");
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchUpdate(data) {

    const transformData = {
      name: data.name,
      content: data.content,
      generalfeedback: data.generalfeedback,
      isPublic: data.isPublic ? 1 : 0,
      categoryId: data.categoryId,
      defaultMark: data.defaultMark,
      isShuffle: 1,
      qbTags: data.tagId.filter((tag) => {
        if (!tag || tag == undefined || tag == '') {
          return false;
        }

        return true;
      }).map((tag) => {
        return {
          qbId: 0,
          tagId: parseInt(tag, 10),
        };
      }),
      questionstype: "TrueFalse",
      answers: [],
      // data.answer.map((answer, index) => {
      //   return {
      //     content: answer.answer,
      //     fraction: parseInt(answer.fraction, 10),
      //     feedback: answer.feedback,
      //     quizBankId: 0,
      //     questionId: 0,
      //     id: 0,
      //   };
      // }),

      rightAnswer: data.answer.answer_truefalse === "true" ? true : false,
      authorId: currentLevel?.authorId
    };

    try {
      console.log(transformData);
      const res = await updateTFQuestionBank(currentLevel.id, transformData);
      if (res.status < 400) {
        snackbarUtils.success(res.data.message);
        push("/questionbank");
      } else {
        snackbarUtils.success(res.message);
      }
    } catch (error) {
      snackbarUtils.success(error);
    }
  }

  const onSubmit = async (data) => {
    if (!isEdit) {
      createNew(data);
    } else {
      fetchUpdate(data);
    }
  };

  return (
    <Container maxWidth="100%">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ p: 5 }}>
          <Typography variant="h4" sx={{ color: "text.disabled", mb: 3 }}>
            {!isEdit
              ? "Tạo mới TrueFalseQuestionBank"
              : "Cập nhật TrueFalseQuestionBank"}
          </Typography>
          <Stack
            divider={<Divider flexItem sx={{ borderStyle: "dashed" }} />}
            spacing={3}
          >
            <Stack alignItems="flex-end" spacing={2}>
              <Stack spacing={2} sx={{ width: 1 }}>
                <RHFTextField name="name" label="Name" id="name" />

                <RHFTextField name="content" label="Content" id="content" />

                <RHFTextField
                  name="generalfeedback"
                  label="General Feedback"
                  id="generalfeedback"
                />

                <RHFTextField
                  name="defaultMark"
                  label="Default Mark"
                  id="defaultMark"
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1rem",
                      fontWeight: 400,
                      width: "200px",
                    }}
                  >
                    QuestionType
                  </span>
                  <RHFTextField
                    name="questionstype"
                    id="questionstype"
                    value="TrueFalse"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1rem",
                      fontWeight: 400,
                      width: "200px",
                    }}
                  >
                    Category
                  </span>
                  <RHFSelect
                    name="categoryId"
                    placeholder="Category"
                    onChange={handleCateChange}
                  >
                    <option value="">-- Select Category --</option>
                    {!_.isEmpty(category) &&
                      category.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                  </RHFSelect>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1rem",
                      fontWeight: 400,
                      width: "200px",
                    }}
                  >
                    Tag
                  </span>

                  <Stack spacing={2} sx={{ width: 1 }}>
                    {tagChoose.map((tagChooses, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "left",
                        }}
                      >
                        <RHFSelect
                          name={`tagId[${index}]`}
                          placeholder="Tag"
                          onChange={(event) =>
                            handleInputTagsChange(index, event)
                          }
                          disabled={!categoryId}
                        >
                          <option value="">-- Select Tag --</option>
                          {!_.isEmpty(tags) &&
                            tags.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.tags}
                              </option>
                            ))}
                        </RHFSelect>

                        {index === tagChoose.length - 1 && (
                          <Tooltip arrow placement="left" title="Add">
                            <IconButton
                              variant="contained"
                              color="success"
                              onClick={handleAddInputTag}
                            >
                              <AddCircleIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        {index !== 0 && (
                          <Tooltip arrow placement="right" title="Remove">
                            <IconButton
                              variant="contained"
                              color="error"
                              onClick={() => handleRemoveInputTag(index)}
                            >
                              <RemoveCircleOutlineIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </div>
                    ))}
                  </Stack>
                </div>

                <Stack>

                  <Stack spacing={2} sx={{ width: 1, paddingTop: "30px", paddingBottom: "25px" }}>


                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        flexDirection: "row",
                        alignItems: "stretch",
                      }}
                    >

                      <Typography
                        variant="h6"
                        sx={{ color: "text.disabled", mb: 3 }}
                      >
                        Correct Answer
                      </Typography>


                      <RadioGroup
                        key={`answer.answer_truefalse`}
                        name={`answer.answer_truefalse`}
                        value={answerChoose.answer_truefalse}
                        onChange={(event) =>
                          handleInputAnswerChange(event)
                        }
                        sx={{ paddingLeft: "35px" }}
                      >
                        <FormControlLabel value="true" control={<Radio />} label="True" />
                        <FormControlLabel value="false" control={<Radio />} label="False" />
                      </RadioGroup>

                      <RHFTextField
                        name={`answer.feedback`}
                        label="Feed Back"
                        id={`answer.feedback`}
                        // key={`answer.feedback`}
                        // name={`answer.feedback`}
                        // label="Feed Back"
                        // id={`answer.feedback`}
                        // value={answerChoose.feedback}
                        onChange={(event) =>
                          handleFeedbackChange(event)
                        }
                        multiline
                        rows={3}
                        sx={{ width: "60%", height: "100%", margin: "10px" }}

                      />
                    </div>
                  </Stack>

                  <Stack sx={{ ml: 1.5 }}>
                    <RHFSwitch
                      name="isPublic"
                      label="Tài liệu công khai/ riêng tư"
                      labelPlacement="start"
                      sx={{
                        mb: 1,
                        mx: 0,
                        width: 1,
                        justifyContent: "space-between",
                      }}
                      checked={defaultValues.isPublic}
                      onClick={(event) => {
                        event.target.value = !event.target.value;
                      }}
                    />
                  </Stack>
                </Stack>
              </Stack>
              <Button
                size="small"
                color="error"
                onClick={() => {
                  reset(defaultValues);
                }}
              >
                Xóa
              </Button>
            </Stack>
          </Stack>
          <Divider sx={{ my: 3, borderStyle: "dashed" }} />

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {!isEdit ? "Create New" : "Update"}
            </LoadingButton>
          </Stack>
        </Card>
      </FormProvider>
    </Container>
  );
}

FormTrueFalseQuestionBank.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
