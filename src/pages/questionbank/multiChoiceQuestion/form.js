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
import { create, getQuestionType } from '@/dataProvider/questionbankApi';
import { getAllCate } from '@/dataProvider/categoryApi';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import RHFRadioGroup from '@/components/form/RHFRadioGroup';
import RHFSwitch from '@/components/form/RHFSwitch';
import { getTagByCategory } from '@/dataProvider/tagApi';
import RHFSelect from '@/components/form/RHFSelect';
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
  const [tags, setTags] = useState([]);
  const [reRender, setReRender] = useState([]);
  const [fraction, setFraction] = useState([0, 0.2, 0.25, 1 / 3, 0.4, 0.5, 0.6, 2 / 3, 0.75, 0.8, 1]);
  const [answerChoose, setAnswerChoose] = useState([{
    id: 1,
    fraction: 0,
    feedback: ''
  }]);

  const [tagChoose, setTagChoose] = useState([{
    id: 0,
    tags: ''
  }]);

  const SHUFFLE_OPTION = [
    { label: 'Yes', value: 1 },
    { label: 'No', value: 0 },
  ];

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required('Tên không được trống'),
    content: Yup.string().trim().required('Content không được để trống'),
    generalfeedback: Yup.string().trim().required('generalfeedback không được để trống'),

    defaultMark: Yup.number()
    .min(1, 'Giá trị phải lớn hơn hoặc bằng 1')
    .max(100, 'Giá trị phải nhỏ hơn hoặc bằng 100')
    .required('generalfeedback không được để trống'),

    isPublic: Yup.string()
    .trim()
    .required('generalfeedback không được để trống')
    .oneOf(['true', 'false'], 'Giá trị không hợp lệ'),

    isShuffle: Yup.number()
    .oneOf([0, 1], 'Giá trị isShuffle phải là 0 hoặc 1')
    .required('isShuffle là trường bắt buộc'),

    // categoryId: Yup.number().required('Vui lòng chọn category'),

    tagId: Yup.array()
    .min(1, 'Bạn phải chọn ít nhất một tag')
    .of(
      Yup.string().test('is-duplicate', 'Bạn phải chọn một tag khác', function (value) {
        const { path, createError } = this;
        const index = parseInt(path.split(',')[1], 10);

        if (!value) return true; // Cho phép giá trị rỗng (optional field)

        const isDuplicate = this.options.context.some((tag, i) => i !== index && tag === value);

        return !isDuplicate || createError({ path, message: 'Bạn phải chọn một tag khác' });
      })
    ),

    answer: Yup.array().of(
      Yup.object().shape({
        answer: Yup.string().trim().required('Nội dung câu trả lời không được để trống'),
        fraction: Yup.number().required('Vui lòng chọn phần trăm')
      })
    )
  });

  const defaultValues = useMemo(
    () => ({
      // gradeId: currentClass?.gradeId + '' || (grades && grades.length) ? grades[0].id + '' : '',
      name: currentLevel?.name || '',
      content: currentLevel?.content || '',
      generalfeedback: currentLevel?.generalfeedback || '',
      defaultMark: currentLevel?.defaultMark || '',
      categoryId: currentLevel?.categoryId + '',
      tagId : currentLevel?.tagId || []
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
    if (isEdit && currentLevel) {
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
      // console.log(data);
      const res = await create(
        {
          name: data.name,
          content: data.content,
          generalfeedback: data.generalfeedback,
          isPublic: data.isPublic,
          categoryId: data.categoryId,
          authorId: 2,
          defaultMark: data.defaultMark,
          isShuffle: data.isShuffle,
          qbTags: data.tagId.map(tag => ({
            qbId: 0,
            TagId: parseInt(tag, 10)
          })),
          questionstype: "MultiChoice",
          answers: data.answer.map((answer, index) => ({
            content: answer,
            fraction: data.fraction[index],
            feedback: "",
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
      snackbarUtils.error(error);
      // console.log(error);
    }
  };

  async function fetchUpdate(data) {
    try {
      //   const res = await updateCateByID(currentLevel.id, {
      //     name : data.name,
      //     description: data.description
      //   });
      // if (res.status < 400) {
      //   push('/questionbank');
      //   snackbarUtils.success(res.data.message);
      // } else {
      //   snackbarUtils.error(res.res.data.title);
      // }
    } catch (error) {
      snackbarUtils.error(error);
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
    <Container maxWidth='100%'>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} >
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
                        label="Question Type"
                        id="questionstype"
                        value="MultiChoice"
                        onChange={(e) => setValue(e.target.value)}
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
                          <div key={tagChooses.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'left' }}>
                            {/* <Stack spacing={2} sx={{ width: 1 }}> */}
                            <RHFSelect
                              name={`tagId[${index}]`}
                              placeholder="Tag"
                              value={tagChooses.fraction}
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
                            {/* </Stack> */}

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
                                name={`answer[${index}]`}
                                label="Answers Content"
                                id={`answer[${index}]`}
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
                                name={`fraction[${index}]`}
                                value={answerChooses.fraction}
                                style={{ width: '60px' }}
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
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary', mt: 1 }}>
                          Shuffle
                        </Typography>
                        <RHFRadioGroup
                          name="shuffle"
                          options={SHUFFLE_OPTION}
                          sx={{
                            mt: 0.5,
                            '& .MuiFormControlLabel-root': { mr: 4 },
                          }}
                        />
                      </Stack>
                    </Stack>
                    <Stack sx={{ ml: 1.5 }}>

                      <RHFSwitch
                        name="public"
                        label="Tài liệu công khai/ riêng tư"
                        labelPlacement="start"
                        sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
                      />
                    </Stack>

                  </Stack>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => {
                      reset(defaultValues);
                    }}
                  //startIcon={<Iconify icon="eva:trash-2-outline" />}
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
          </Grid>
        </Grid>


      </FormProvider>
    </Container>
  );
};

Form.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

