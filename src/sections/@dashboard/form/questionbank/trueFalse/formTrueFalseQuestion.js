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
import { createQb, updateQb } from "@/dataProvider/questionbankApi";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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
  const [imageUrl, setImageUrl] = useState();
  const [answerChoose, setAnswerChoose] = useState(
    {
      feedback: "",
      answer_truefalse: "true",
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
    content: Yup.string().trim().required("Nội dung không được để trống"),
    generalfeedback: Yup.string()
      .trim()
      .required("Phản hồi không được để trống"),

    defaultMark: Yup.number()
      .typeError("Vui lòng nhập số điểm")
      .min(1, "Giá trị phải lớn hơn hoặc bằng 1")
      .max(100, "Giá trị phải nhỏ hơn hoặc bằng 100")
      .required(" không được để trống"),

    categoryId: Yup.number()
      .typeError("Vui lòng chọn danh mục")
      .required(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentLevel?.name || "",
      content: currentLevel?.content || "",
      generalfeedback: currentLevel?.generalfeedback || "",
      defaultMark: currentLevel?.defaultMark || "",
      categoryId: currentLevel?.categoryId || "",
      tagId: currentLevel?.tagId || [],
      answer: { answer_truefalse: currentLevel?.answers == 'True' ? true : false || null },
      questionstype: "TrueFalse",
      isPublic: currentLevel?.isPublic == 1 ? true : false,
      // imageUrl: currentLevel?.imageUrl || null
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
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const backBtnOnclick = () => {
    push("/questionbank");
  }

  useEffect(() => {
    if (categoryId) {
      fetchAlltags(categoryId);
    } else {
      setTags([]);
    }
  }, [categoryId]);

  async function fetchAlltags(cateId) {
    const res = await getTagByCategory(cateId);
    if (res.status < 400) {
      const transformData = res.data.data.map((tag) => {
        return {
          id: tag.id,
          tags: tag.name,
        };
      });
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
        if (isEdit) {
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
      setImageUrl(currentLevel?.imageUrl);
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
      tags: selectedValue,
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

  //allquestiontype
  async function createNew(data) {
    clearErrors();
    const transformData = {
      name: data.name,
      content: data.content,
      generalfeedback: data.generalfeedback,
      isPublic: data.isPublic ? 1 : 0,
      categoryId: data.categoryId,
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
      questionstype: "TrueFalse",
      imageFile: data.imageFile,
      rightAnswer: data.answer?.answer_truefalse === "true" ? true : false,
    };
    try {
      const res = await createQb(transformData, 1);
      if (res.data.status === true) {
        snackbarUtils.success(res.data.message);
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
      questionstype: "TrueFalse",
      imageFile: data.imageFile,
      rightAnswer: data.answer.answer_truefalse === "false" ? false : true,
      authorId: currentLevel?.authorId
    };

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


  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    setValue(event.target.name, event.target.files[0]);

    reader.readAsDataURL(file);
  };

  return (
    <Container maxWidth="100%">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ p: 5 }}>
          <Typography variant="h4" sx={{ color: "text.disabled", mb: 3 }}>
            {!isEdit
              ? "Tạo mới Câu hỏi Đúng/Sai"
              : "Cập nhật Câu hỏi Đúng/Sai"}
          </Typography>
          <Stack
            divider={<Divider flexItem sx={{ borderStyle: "dashed" }} />}
            spacing={3}
          >
            <Stack alignItems="flex-end" spacing={2}>
              <Stack spacing={2} sx={{ width: 1 }}>
                <RHFTextField name="name" label="Tên câu hỏi" id="name" />

                <RHFTextField name="content" label="Đề bài " id="content" />
                <label htmlFor="upload-image">
                  <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
                    Upload
                  </Button>
                  <input
                    id="upload-image"
                    name="imageFile"
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleFileUpload}
                  />
                </label>
                {imageUrl && <img src={imageUrl} alt="Uploaded Image" height="300" width="300" />}
                <RHFTextField
                  name="generalfeedback"
                  label="Phản hồi chung"
                  id="generalfeedback"
                />

                <RHFTextField
                  name="defaultMark"
                  label="Điểm mặc định"
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
                    Loại câu hỏi
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
                    Danh mục
                  </span>
                  <RHFSelect
                    name="categoryId"
                    placeholder="Danh mục"
                    onChange={handleCateChange}
                  >
                    <option value="">-- Vui lòng chọn danh mục --</option>
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
                    Từ khóa
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
                          placeholder="Từ khóa"
                          onChange={(event) =>
                            handleInputTagsChange(index, event)
                          }
                          disabled={!categoryId}
                        >
                          <option value="">-- Vui lòng chọn từ khóa --</option>
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
                        Đáp án
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
                        <FormControlLabel value="true" control={<Radio />} label="Đúng" />
                        <FormControlLabel value="false" control={<Radio />} label="Sai" />
                      </RadioGroup>
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
            </Stack>
          </Stack>
          <Divider sx={{ my: 3, borderStyle: "dashed" }} />

          <Stack direction="row" className="right-item" sx={{ mt: 3 }} spacing={3}>
            <Button
              variant="outlined"
              onClick={backBtnOnclick}
              // color="dark"
              sx={{ color: '#2A2D76', backgroundColor: '#FFFFFF', borderColor: '#2A2D76' }}
            >
              Trở Lại
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {!isEdit ? "Tạo mới" : "Cập nhật"}
            </LoadingButton>
          </Stack>
        </Card>
      </FormProvider>
    </Container>
  );
}

FormTrueFalseQuestionBank.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
