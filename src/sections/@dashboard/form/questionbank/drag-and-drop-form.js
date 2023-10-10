import { useMemo, useState, useEffect } from "react";
import FormProvider from "@/components/form/FormProvider";
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
import { useForm, Controller } from "react-hook-form";
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
import RHFTextField from "@/components/form/RHFTextField";
import { getTagByCategory } from "@/dataProvider/tagApi";
import RHFSelect from "@/components/form/RHFSelect";
import { create, update } from "@/dataProvider/dragAndDropApi";
import { id } from "date-fns/locale";
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
  const [reRender, setReRender] = useState([]);
  const [valid, setIsValid] = useState([]);

  const [answerChoose, setAnswerChoose] = useState([
    {
      answer: ""
    }
  ]);

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
      choice: currentLevel?.answers || [],
      questionstype: "DragAndDropIntoText",
      isPublic: currentLevel?.isPublic == 1 ? true : false,
    }),
    [currentLevel]
  );

  const { setError, clearErrors, formState: { errors } } = useForm();

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
        currentLevel?.tagId?.forEach((element) => {
          const tag = tags.find((tag) => tag.id === element);
          tagChoose.push(tag);
        });
      }

      if (
        currentLevel?.answers !== null &&
        currentLevel?.answers !== "undefined"
      ) {
        answerChoose.shift();
        currentLevel?.answers?.forEach((element) => {
          const ans = {
            id: element.id,
            // fraction: element.fraction,
            //feedback: element.feedback,
            answer: element.answer,
          };
          answerChoose.push(ans);
        });
      }
    }
    return;
  }

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
  };

  const handleInputTagsChange = (index, event) => {
    const selectedValue = event.target.value;
    const updatedInputs = [...tagChoose];
    updatedInputs[index] = {
      ...updatedInputs[index],
      tags: selectedValue,
    };

    const isDuplicate = updatedInputs.some((input, i) => {
      return i !== index && input.tags === selectedValue;
    });

    if (!isDuplicate) {
      setValue(event.target.name, selectedValue);
      setTagChoose(updatedInputs);
    } else {
      snackbarUtils.warning("Bạn nên chọn một tag khác");
    }
  };

  const handleInputAnswerChange = (index, event) => {
    const updatedInputs = [...answerChoose];
    updatedInputs[index] = {
      answer: event.target.value,
    };

    setValue(event.target.name, event.target.value);
    setAnswerChoose(updatedInputs);
  };

  const handleAddInputAnswer = () => {
    const newInput = { answer: "" };
    setAnswerChoose([...answerChoose, newInput]);
  };



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
    clearErrors();

    const transformData = {
      name: data.name,
      content: data.content,
      generalfeedback: data.generalfeedback,
      isPublic: data.isPublic ? 1 : 0,
      categoryId: data.categoryId,
      authorId: 0,
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
      questionstype: "DragAndDropIntoText",
      choice: data.choice.map((answer, index) => {
        return {
          position: index + 1,
          answer: {
            content: answer.answer,
            fraction: answer?.fraction && answer.fraction != 0 ? parseInt(answer.fraction, 10) : 0,
            feedback: answer.feedback,
            quizBankId: 0,
            questionId: 0,
            id: 0,
          }
        };
      }),
    };

    transformData.choice = transformData.choice.filter(item => item.answer.content);

    try {
      const res = await create(transformData);

      if (res.status < 400) {
        snackbarUtils.success(res.data.message);
        push("/questionbank");
      } else {
        const responseData = res.errors;
        snackbarUtils.error("Tạo Mới Thất Bại");

        Object.entries(responseData).forEach(([fieldKey, errorMessage]) => {
          setError(fieldKey, {
            type: "manual",
            message: errorMessage,
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchUpdate(data) {
    clearErrors();

    const transformData = {
      name: data.name,
      content: data.content,
      generalfeedback: data.generalfeedback,
      isPublic: data.isPublic ? 1 : 0,
      categoryId: data.categoryId,
      authorId: currentLevel?.authorId,
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
      questionstype: "DragAndDropIntoText",
      choice: data.choice.map((answer, index) => {
        return {
          position: index + 1,
          answer: {
            content: answer.answer,
            fraction: answer?.fraction && answer.fraction != 0 ? parseInt(answer.fraction, 10) : 0,
            feedback: answer.feedback,
            quizBankId: 0,
            questionId: 0,
            id: 0,
          }
        };
      }),
    };

    transformData.choice = transformData.choice.filter(item => item.answer.content);

    try {
      const res = await update(currentLevel.id, transformData);
      if (res.status < 400) {
        snackbarUtils.success(res.data.message);
        push("/questionbank");
      } else {
        snackbarUtils.error("Cập Nhật Thất Bại");
        const responseData = res.errors;

        Object.entries(responseData).forEach(([fieldKey, errorMessage]) => {
          setError(fieldKey, {
            type: "manual",
            message: errorMessage,
          });
        });
      }
    } catch (error) {
      console.log(error);
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
          <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3 }}>
            {!isEdit
              ? "Tạo Mới Câu Hỏi"
              : "Cập nhật Câu Hỏi"}
          </Typography>
          <Stack
            divider={<Divider flexItem sx={{ borderStyle: "dashed" }} />}
            spacing={3}
          >
            <Stack alignItems="flex-end" spacing={1.5}>
              <Stack spacing={2} sx={{ width: 1 }}>
                <RHFTextField name="name" label="Tên câu hỏi" id="name" />

                <RHFTextField
                  name="content"
                  label="Nội dung"
                  id="content"
                  error={errors.Content || errors.Choice}
                  helperText={errors.Content?.message || errors.Choice?.message}
                />

                <RHFTextField
                  name="generalfeedback"
                  label="Phản Hồi Chung"
                  id="generalfeedback"
                />

                <RHFTextField
                  name="defaultMark"
                  label="Điểm"
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
                    Loại Câu Hỏi
                  </span>
                  <RHFTextField
                    name="questionstype"
                    id="questionstype"
                    value="DragAndDropIntoText"
                    disabled
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
                    Danh Mục
                  </span>
                  <RHFSelect
                    name="categoryId"
                    placeholder="Category"
                    onChange={handleCateChange}
                  >
                    <option value="">Vui Lòng Chọn Danh Mục</option>
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
                    Từ Khóa
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
                          <option value="">Vui Lòng Chọn Từ Khóa</option>
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


                <Stack sx={{ borderTop: 1, borderColor: 'grey.500' }}>
                  <Typography
                    variant="h6"
                    sx={{ color: "text.disabled", my: 3 }}
                  >
                    Lựa Chọn
                  </Typography>
                  <Stack spacing={2} sx={{ width: 1 }}>
                    {answerChoose.map((answerChooses, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "left",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "1rem",
                            fontWeight: 400,
                            width: "200px",
                          }}
                        >
                          Câu Trả Lời &#91;&#91;{index + 1}&#93;&#93;
                        </span>
                        <Stack direction='row' spacing={2} sx={{ width: 1 }}>
                          <Box
                            sx={{
                              "& > :not(style)": { m: 1 },
                              width: 1
                            }}
                            noValidate
                            autoComplete="off"
                          >

                            <RHFTextField
                              key={`choice[${index}].answer`}
                              name={`choice[${index}].answer`}
                              label="Nội Dung Lựa Chọn"
                              id={`choice[${index}].answer`}
                              value={answerChooses.answer}
                              onChange={(event) =>
                                handleInputAnswerChange(index, event)
                              }
                              sx={{ width: 1 }}
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
                        </Stack>
                      </div>
                    ))}
                  </Stack>
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
    </Container >
  );
}

Form.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
