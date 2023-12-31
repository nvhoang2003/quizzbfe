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
import _ from "lodash";
import { getAllCate } from "@/dataProvider/categoryApi";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import RHFRadioGroup from "@/components/form/RHFRadioGroup";
import RHFSwitch from "@/components/form/RHFSwitch";
import { getTagByCategory } from "@/dataProvider/tagApi";
import RHFSelect from "@/components/form/RHFSelect";
import { createQb, updateQb } from "@/dataProvider/questionbankApi";
//---------------------------------------------------

Form.propTypes = {
  isEdit: PropTypes.bool,
  currentLevel: PropTypes.object,
};

export default function Form({ isEdit = false, currentLevel }) {
  const { push } = useRouter();
  const [cate, setCate] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [category, setCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const [answerChoose, setAnswerChoose] = useState([
    {
      id: 0,
      questionBankId: 0,
      questionText: "",
      answerText: "",
    },
  ]);
  const [reRender, setReRender] = useState([]);

  const {
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

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
    matchSubs: Yup.array(
      Yup.object({
        answerText: Yup.string().required("Thông tin không được trống"),
      })
    ),
    defaultMark: Yup.number()
      .typeError("Vui lòng nhập số")
      .min(1, "Giá trị phải lớn hơn hoặc bằng 1")
      .max(100, "Giá trị phải nhỏ hơn hoặc bằng 100")
      .required("generalfeedback không được để trống"),

    categoryId: Yup.number()
      .typeError("Vui lòng chọn danh mục")
      .required("Vui lòng chọn category"),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentLevel?.name || "",
      content: currentLevel?.content || "",
      generalfeedback: currentLevel?.generalfeedback || "",
      defaultMark: currentLevel?.defaultMark || "",
      categoryId: currentLevel?.categoryId || "",
      authorId: currentLevel?.authorid || 0,
      tagId: currentLevel?.tagId || [],
      matchSubs: currentLevel?.matchSubQuestionBanks
        ? currentLevel.matchSubQuestionBanks
        : [],
      questionstype: "Match",
      isPublic: currentLevel?.isPublic == 1 ? true : false,
    }),
    [currentLevel]
  );

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    async function fetchAlltags(categoryId) {
      const res = await getTagByCategory(categoryId);
      if (res.status < 400) {
        const transformData = res.data.data.map((cate) => {
          return {
            id: cate.id,
            name: cate.name,
          };
        });
        setTags(transformData);
      } else {
        return res;
      }
    }
    if (categoryId) {
      fetchAlltags(categoryId);
    } else {
      setTags([]);
    }
  }, [categoryId]);
  useEffect(() => { }, [tags]);

  async function fetchTagChoose(currentLevel) {
    if (currentLevel !== "undefined") {
      if (
        currentLevel?.categoryId !== null &&
        currentLevel?.categoryId !== "undefined"
      ) {
        tagChoose.shift();
        currentLevel?.tagId?.forEach((element) => {
          const tag = tags.find((tag) => tag.id === element);
          tagChoose.push(tag);
        });
      }

      if (
        currentLevel?.matchSubQuestionBanks !== null &&
        currentLevel?.matchSubQuestionBanks !== undefined
      ) {
        answerChoose.shift();
        const matchSubQuestionBanks = currentLevel.matchSubQuestionBanks;
        setAnswerChoose([...matchSubQuestionBanks]);
      }
    }
    return;
  }
  useEffect(() => { }, [tagChoose]);

  useEffect(() => {
    if (isEdit && currentLevel) {
      setCategoryId(currentLevel?.categoryId);
      fetchTagChoose(currentLevel);
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentLevel]);

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

    const listTags = getValues("tagId");

    listTags.map((item, index) => {
      setValue(`tagId[${index}]`, "");
    })

    setTagChoose([
      {
        id: 1,
        name: "",
      },
    ]);
  };

  const handleInputTagsChange = (index, event) => {
    const selectedValue = event.target.value;
    const updatedInputs = [...tagChoose];
    updatedInputs[index] = {
      ...updatedInputs[index],
      name: selectedValue,
    };

    const isDuplicate = updatedInputs
      .filter((element) => !element?.tags)
      .some(
        (input, i) =>
          i !== index && selectedValue != "" && input.name === selectedValue
      );

    if (!isDuplicate) {
      setValue(event.target.name, selectedValue);
      setTagChoose(updatedInputs);
    } else {
      snackbarUtils.warning("Bạn nên chọn một tag khác");
      setValue(event.target.name, "");
    }
  };
  useEffect(() => { }, [tagChoose]);

  const handleQuestionTextChange = (index, event) => {
    const updatedInputs = [...answerChoose];
    updatedInputs[index] = {
      ...updatedInputs[index],
      questionText: event.target.value,
    };
    setValue(event.target.name, event.target.value);
    setAnswerChoose(updatedInputs);
  };

  const handleAnswerTextChange = (index, event) => {
    const updatedInputs = [...answerChoose];
    updatedInputs[index] = {
      ...updatedInputs[index],
      answerText: event.target.value,
    };
    setValue(event.target.name, event.target.value);
    setAnswerChoose(updatedInputs);
  };
  useEffect(() => { }, [answerChoose]);

  const handleAddInputAnswer = () => {
    const newInput = {
      id: 0,
      questionBankId: 0,
      questionText: "",
      answerText: "",
    };
    setAnswerChoose([...answerChoose, newInput]);
  };

  const handleRemoveInputAnswer = (index) => {
    const updatedInputs = [...answerChoose];
    updatedInputs.splice(index, 1);
    setValue("answer", updatedInputs);
    setAnswerChoose(updatedInputs);
  };

  const handleAddInputTag = () => {
    const newInput = { id: tagChoose.length + 1, name: "" };
    setTagChoose([...tagChoose, newInput]);
  };

  const handleRemoveInputTag = (index) => {
    const updatedInputs = [...tagChoose];
    updatedInputs.splice(index, 1);
    setTagChoose(updatedInputs);

    updatedInputs.map((item, idx) => {
      setValue(`tagId[${idx}]`, item?.name);
    })

    const listTags = getValues("tagId");

    listTags.map((item, index) => {
      if (index === listTags.length - 1) {
        setValue(`tagId[${index}]`, "");
      }
    });
  };

  const convertToRequestData = (data) => {
    return {
      name: data.name,
      content: data.content,
      generalfeedback: data.generalfeedback,
      isPublic: data.isPublic ? 1 : 0,
      categoryId: data.categoryId,
      authorId: data?.authorid || 0,
      defaultMark: data.defaultMark,
      isShuffle: 1,
      qbTags: data.tagId
        .filter((tag) => {
          if (!tag || tag == undefined || tag === "") {
            return false;
          }

          return true;
        })
        .map((tag) => {
          return {
            qbId: 0,
            tagId: parseInt(tag, 10),
          };
        }),
      questionstype: "Match",
      matchSubQuestionBanks: data.matchSubs.map((matchSub, index) => {
        return {
          id: 0,
          questionBankId: 0,
          questionText: matchSub.questionText,
          answerText: matchSub.answerText,
        };
      }),
    };
  };

  //allquestiontype
  async function createNew(data) {
    const transformData = convertToRequestData(data);

    try {
      const res = await createQb(transformData, 1);
      if (res.data.status === true) {
        snackbarUtils.success(res?.data?.message || "Tạo Mới Thành Công");
        push("/questionbank");
      } else {
        const responseData = res.data;
        snackbarUtils.error("Tạo Mới Thất Bại");

        Object.entries(responseData).forEach(([fieldKey, errorMessage]) => {
          setError(fieldKey, {
            type: "manual",
            message: errorMessage,
          });
        });
      }
    } catch (error) {
      snackbarUtils.error(error);    }
  }

  async function fetchUpdate(data) {
    const transformData = convertToRequestData(data);

    try {
      const res = await updateQb(currentLevel.id, transformData, 1);
      if (res.data.status === true) {
        snackbarUtils.success(res.data.message);
        push("/questionbank");
      } else {
        const responseData = res.data;
        snackbarUtils.error("Cập Nhật Thất Bại");

        Object.entries(responseData).forEach(([fieldKey, errorMessage]) => {
          setError(fieldKey, {
            type: "manual",
            message: errorMessage,
          });
        });
      }
    } catch (error) {
      snackbarUtils.error(error);    }
  }
  const backBtnOnclick = () => {
    push("/questionbank");
  }

  const onSubmit = async (data) => {
    clearErrors();
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
            {!isEdit ? "Tạo mới Câu Hỏi Ghép Đôi" : "Cập nhật Câu Hỏi Ghép Đôi"} Matching Question
          </Typography>
          <Stack
            divider={<Divider flexItem sx={{ borderStyle: "dashed" }} />}
            spacing={3}
          >
            <Stack alignItems="flex-end" spacing={1.5}>
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
                {/* <div
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
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div> */}

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
                                {option.name}
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
                  <Typography
                    variant="h6"
                    sx={{ color: "text.disabled", mb: 3 }}
                  >
                    Answers
                  </Typography>
                  <Stack spacing={2} sx={{ width: 1 }}>
                    {answerChoose.map((answerChooses, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          flexDirection: "row",
                          alignItems: "stretch",
                        }}
                      >
                        <Box
                          sx={{
                            "& > :not(style)": { m: 1, width: "35ch" },
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <RHFTextField
                            key={`matchSubs[${index}].questionText`}
                            name={`matchSubs[${index}].questionText`}
                            label={`Question ${index + 1}`}
                            id={`matchSubs[${index}].questionText`}
                            value={answerChooses.questionText}
                            onChange={(event) =>
                              handleQuestionTextChange(index, event)
                            }
                            isError={errors.Answer}
                            errorMessage={errors.Answer?.message}

                          />
                          <RHFTextField
                            key={`matchSubs[${index}].answerText`}
                            name={`matchSubs[${index}].answerText`}
                            label="Answer"
                            id={`matchSubs[${index}].answerText`}
                            value={answerChooses.answerText}
                            onChange={(event) =>
                              handleAnswerTextChange(index, event)
                            }
                            isError={errors.Answer}
                          />
                        </Box>

                        {index === answerChoose.length - 1 && (
                          <Tooltip arrow placement="left" title="Add">
                            <IconButton
                              variant="contained"
                              color="success"
                              onClick={handleAddInputAnswer}
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
                              onClick={() => handleRemoveInputAnswer(index)}
                            >
                              <RemoveCircleOutlineIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </div>
                    ))}
                    {errors.MatchSubQuestionBanks && (
                      <Stack>
                        <Typography color={"orangered"}>
                          {errors.MatchSubQuestionBanks?.message}
                        </Typography>
                      </Stack>
                    )}
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
            </Stack>
          </Stack>
          <Divider sx={{ my: 3, borderStyle: "dashed" }} />

          <Stack direction="row" className="right-item" sx={{ mt: 3 }} spacing={3}>
            <Button
              variant="outlined"
              onClick={backBtnOnclick}
              // color="dark"
              sx={{ color: '#000000', backgroundColor: '#FFFFFF', borderColor: '#000000' }}
            >
              Trở Lại
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {!isEdit ? "Tạo Mới" : "Cập Nhật"}
            </LoadingButton>
          </Stack>
        </Card>
      </FormProvider>
    </Container>
  );
}

Form.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
