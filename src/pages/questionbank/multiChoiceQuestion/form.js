import { useMemo, useState, useEffect } from 'react';
import FormProvider from '@/components/form/FormProvider';
import RHFTextField from '@/components/form/RHFTextField';
import { Container, Button, Card, Divider, Grid, Stack, Typography, TextField, SvgIcon, Tooltip, IconButton, Box } from '@mui/material'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import snackbarUtils from '@/utils/snackbar-utils';
//import RHFSelect from '@/components/form/RHFSelect';
import _ from 'lodash';
import { getAllCate } from '@/dataProvider/categoryApi';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import RHFRadioGroup from '@/components/form/RHFRadioGroup';
import RHFSwitch from '@/components/form/RHFSwitch';
import { getTagByCategory } from '@/dataProvider/tagApi';
import RHFSelect from '@/components/form/RHFSelect';
import { create, update } from '@/dataProvider/multipchoiceApi';
import { id } from 'date-fns/locale';
//---------------------------------------------------

Form.propTypes = {
  isEdit: PropTypes.bool,
  currentLevel: PropTypes.object
};

export default function Form({ isEdit = false, currentLevel }) {
  const { push } = useRouter();
  const [cate, setCate] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [category, setCategory] = useState([]);
  const [ispublic, setIsPublic] = useState([]);
  const [tags, setTags] = useState([]);
  const [reRender, setReRender] = useState([]);
  const [fraction, setFraction] = useState([0, 0.2, 0.25, 1 / 3, 0.4, 0.5, 0.6, 2 / 3, 0.75, 0.8, 1]);
  const [answerChoose, setAnswerChoose] = useState([{
    id: 1,
    fraction: 0,
    feedback: '',
    answer: ''
  }]);

  const [tagChoose, setTagChoose] = useState([{
    id: 0,
    tags: ''
  }]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required('Tên không được trống'),
    content: Yup.string().trim().required('Content không được để trống'),
    generalfeedback: Yup.string().trim().required('generalfeedback không được để trống'),

    defaultMark: Yup.number()
      .min(1, 'Giá trị phải lớn hơn hoặc bằng 1')
      .max(100, 'Giá trị phải nhỏ hơn hoặc bằng 100')
      .required('generalfeedback không được để trống'),

    categoryId: Yup.number().required('Vui lòng chọn category'),

  });

  const defaultValues = useMemo(
    () => ({

      name: currentLevel?.name || '',
      content: currentLevel?.content || '',
      generalfeedback: currentLevel?.generalfeedback || '',
      defaultMark: currentLevel?.defaultMark || '',
      categoryId: currentLevel?.categoryId || '',
      tagId: currentLevel?.tagId || '',
      answer: {
        ...currentLevel?.answers,
      } || [],
      questionstype: 'MultiChoice',
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
  useEffect(() => {

  }, [tags]);

  async function fetchTagChoose(currentLevel) {
    if (currentLevel !== 'undefined') {

      if (currentLevel?.answers !== null && currentLevel?.answers !== "undefined") {
        currentLevel?.tagId?.forEach(element => {
          const tag = tags.find((tag) => tag.id === element);
          tagChoose.push(tag);
        });
      }

      if (currentLevel?.answers !== null && currentLevel?.answers !== "undefined") {
        currentLevel?.answers?.forEach(element => {
          const ans = {
            id: element.id,
            fraction: element.fraction,
            feedback: element.feedback,
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
    fetchAllCate()
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
      tags: selectedValue
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
  }

  const handleInputAnswerChange = (index, event) => {
    const updatedInputs = [...answerChoose];
    updatedInputs[index] = {
      ...updatedInputs[index],
      answer: event.target.value
    };
    setValue(event.target.name, event.target.value);
    setAnswerChoose(updatedInputs);
  };

  const handleFractionChange = (index, event) => {
    const updatedInputs = [...answerChoose];
    updatedInputs[index] = {
      ...updatedInputs[index],
      fraction: event.target.value
    };
    setValue(event.target.name, event.target.value);
    setAnswerChoose(updatedInputs);
  };

  const handleFeedbackChange = (index, event) => {
    const updatedInputs = [...answerChoose];
    updatedInputs[index] = {
      ...updatedInputs[index],
      feedback: event.target.value
    };
    setValue(event.target.name, event.target.value);
    setAnswerChoose(updatedInputs);
  };
  useEffect(() => {
  }, [answerChoose]);

  const handleAddInputAnswer = () => {
    const newInput = { id: answerChoose.length + 1, answer: '', fraction: 0 };
    setAnswerChoose([...answerChoose, newInput]);
  };

  const handleRemoveInputAnswer = (index) => {
    const updatedInputs = [...answerChoose];
    updatedInputs.splice(index, 1);
    setAnswerChoose(updatedInputs);
  };

  const handleAddInputTag = () => {
    const newInput = { id: tagChoose.length + 1, tags: '' };
    setTagChoose([...tagChoose, newInput]);
  };

  const handleRemoveInputTag = (index) => {
    const updatedInputs = [...tagChoose];
    updatedInputs.splice(index, 1);
    setTagChoose(updatedInputs);
  };

  //allquestiontype
  async function createNew(data) {
    try {
      console.log(data);
      const res = await create(
        {
          name: data.name,
          content: data.content,
          generalfeedback: data.generalfeedback,
          isPublic: data.isPublic,
          categoryId: data.categoryId,
          authorId: 2,
          defaultMark: data.defaultMark,
          isShuffle: 1,
          qbTags: data.tagId.map(tag => ({
            qbId: 0,
            TagId: parseInt(tag, 10)
          })),
          questionstype: "MultiChoice",
          answers: data.answer.map((item) => ({
            content: item.content,
            fraction: parseInt(item.fraction, 10),
            feedback: item.feedback,
            quizBankId: 0,
            questionId: 0,
            id: 0
          })),
        }
      );
      if (res.status < 400) {
        snackbarUtils.success(res.data.message);
        push('/questionbank');
      } else {
        snackbarUtils.error(res.data.title);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchUpdate(data) {
    console.log(data)
    try {
      const res = await update(
        currentLevel.id,
        {
          name: data.name,
          content: data.content,
          generalfeedback: data.generalfeedback,
          isPublic: data.isPublic,
          categoryId: data.categoryId,
          authorId: 2,
          defaultMark: data.defaultMark,
          isShuffle: 1,
          // qbTags: (data.tagId && data.tagId.every(tag => tag === 'undefined')) ? [] : data.tagId.map(tag => ({
          //   qbId: 0,
          //   TagId: parseInt(tag, 10)
          // })),
          qbTags: data.tagId.map(tag => ({
            qbId: 0,
            TagId: parseInt(tag, 10)
          })),
          questionstype: "MultiChoice",
          answers: data.answer.map((answer, index) => ({
            content: answer,
            fraction: parseInt(answer.fraction[index], 10),
            feedback: answer.feedback,
            quizBankId: 0,
            questionId: 0,
            id: 0
          })),
        }
      );
      if (res.status < 400) {
        snackbarUtils.success(res.data.message);
        push('/questionbank');
      } else {
        console.log(res.data.title);
        console.log("res.data.title");
        snackbarUtils.error(res.data.title);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = async (data) => {
    if (!isEdit) {
      console.log(data);
      createNew(data);
    } else {
      console.log(data);
      fetchUpdate(data);
    }
  };

  return (
    <Container maxWidth='100%'>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ p: 5 }}>
          <Typography variant="h4" sx={{ color: 'text.disabled', mb: 3 }}>
            {!isEdit ? 'Tạo mới MultiQuestionBank' : 'Cập nhật MultiQuestionBank'}
          </Typography>
          <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
            <Stack alignItems="flex-end" spacing={1.5}>
              <Stack spacing={2} sx={{ width: 1 }}>

                <RHFTextField
                  name="name"
                  label="Name"
                  id="name"
                />

                <RHFTextField
                  name="content"
                  label="Content"
                  id="content"
                />

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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 400, width: '200px' }}>QuestionType</span>
                  <RHFTextField
                    name="questionstype"
                    id="questionstype"
                    value="MultiChoice"
                    disabled
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 400, width: '200px' }}>Category</span>
                  <RHFSelect name="categoryId" placeholder="Category" onChange={handleCateChange}>
                    <option value="">-- Select Category --</option>
                    {!_.isEmpty(category) &&
                      category.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                  </RHFSelect>
                </div>


                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 400, width: '200px' }}>Tag</span>

                  <Stack spacing={2} sx={{ width: 1 }}>
                    {tagChoose.map((tagChooses, index) => (
                      <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'left' }}>
                        <RHFSelect
                          name={`tagId[${index}]`}
                          placeholder="Tag"
                          onChange={(event) => handleInputTagsChange(index, event)}
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
                            <IconButton variant="contained" color="success" onClick={handleAddInputTag}>
                              <AddCircleIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        {index !== 0 && (
                          <Tooltip arrow placement="right" title="Remove">
                            <IconButton variant="contained" color="error" onClick={() => handleRemoveInputTag(index)}>
                              <RemoveCircleOutlineIcon />
                            </IconButton>
                          </Tooltip>

                        )}
                      </div>
                    ))}
                  </Stack>
                </div>

                <Stack >
                  <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
                    Answers
                  </Typography>
                  <Stack spacing={2} sx={{ width: 1 }}>
                    {answerChoose.map((answerChooses, index) => (
                      <div key={answerChooses.id} style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        alignItems: 'stretch'
                      }}>

                        <Box
                          sx={{
                            '& > :not(style)': { m: 1, width: '35ch' },
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <RHFTextField
                            name={`answer[${index}].content`}
                            label="Answers Content"
                            id={`answer[${index}].content`}
                            value={answerChooses.answer}
                            onChange={(event) => handleInputAnswerChange(index, event)}
                          />
                          <RHFTextField
                            name={`feedbank[${index}]`}
                            label="Feed Back"
                            id={`feedbank[${index}]`}
                            value={answerChooses.feedback}
                            onChange={(event) => handleFeedbackChange(index, event)}
                          />
                          <RHFSelect
                            // id={`fraction[${index}]`}
                            name={`fraction[${index}]`}
                            value={answerChooses.fraction}
                            style={{ width: '80px' }}
                            onChange={(event) => handleFractionChange(index, event)}
                          >
                            {!_.isEmpty(fraction) &&
                              fraction.map((option) => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                          </RHFSelect>

                        </Box>

                        {index === answerChoose.length - 1 && (
                          <Tooltip arrow placement="left" title="Add">
                            <IconButton variant="contained" color="success" onClick={handleAddInputAnswer}>
                              <AddCircleIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        {index !== 0 && (
                          <Tooltip arrow placement="right" title="Remove">
                            <IconButton variant="contained" color="error" onClick={() => handleRemoveInputAnswer(index)}>
                              <RemoveCircleOutlineIcon />
                            </IconButton>
                          </Tooltip>

                        )}
                      </div>
                    ))}
                  </Stack>

                  <Stack sx={{ ml: 1.5 }}>
                    <RHFSwitch
                      name="isPublic"
                      label="Tài liệu công khai/ riêng tư"
                      labelPlacement="start"
                      sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
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
                xóa
              </Button>
            </Stack>
          </Stack>
          <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {!isEdit ? 'Create New' : 'Update'}
            </LoadingButton>
          </Stack>
        </Card>
      </FormProvider>
    </Container>
  );
};

Form.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

