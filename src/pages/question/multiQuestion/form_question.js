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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import RHFSwitch from '@/components/form/RHFSwitch';
import RHFSelect from '@/components/form/RHFSelect';
//---------------------------------------------------

Form.propTypes = {
  isEdit: PropTypes.bool,
  currentLevel: PropTypes.object
};

export default function Form({ isEdit = false, currentLevel }) {
  const { push } = useRouter();
  const [reRender, setReRender] = useState([]);
  const [fraction, setFraction] = useState([0, 0.2, 0.25, 1 / 3, 0.4, 0.5, 0.6, 2 / 3, 0.75, 0.8, 1]);
  const [answerChoose, setAnswerChoose] = useState([{
    id: 1,
    fraction: 0,
    feedback: '',
    answer: ''
  }]);


  const defaultValues = useMemo(
    () => ({
      name: currentLevel?.name || '',
      content: currentLevel?.content || '',
      generalfeedback: currentLevel?.generalfeedback || '',
      defaultMark: currentLevel?.defaultMark || '',
      answers: currentLevel?.answers || [],
      questionstype: currentLevel?.questionsType || ''
    }),
    [currentLevel]
  );

  const methods = useForm({
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


  async function fetchAnswerChoose(currentLevel) {
    if (currentLevel !== "undefined") {
      if (
        currentLevel?.answers !== null &&
        currentLevel?.answers !== "undefined"
      ) {

        currentLevel?.answers?.forEach((element) => {
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
      fetchAnswerChoose(currentLevel);
      console.log(currentLevel);
      reset(defaultValues);
    }
    if (!isEdit) {
      console.log(currentLevel);
      reset(defaultValues);
    }
  }, [isEdit, currentLevel]);



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
      push(`/question`);
    } else {
      console.log(data)
      // fetchUpdate(data);
    }
  };

  return (
    <Container maxWidth='100%'>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} >
            <Card sx={{ p: 5 }}>
              <Typography variant="h4" sx={{ color: 'text.disabled', mb: 3 }}>
                {!isEdit ? 'Chi Tiết Câu Hỏi' : 'Delete'}
              </Typography>
              <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
                <Stack alignItems="flex-end" spacing={1.5}>
                  <Stack spacing={2} sx={{ width: 1 }}>

                    <RHFTextField
                      name="name"
                      label="Name"
                      id="name"
                      InputProps={{
                        readOnly: !isEdit,
                      }}
                    />

                    <RHFTextField
                      name="content"
                      label="Content"
                      id="content"
                      InputProps={{
                        readOnly: !isEdit,
                      }}
                    />

                    <RHFTextField
                      name="generalfeedback"
                      label="General Feedback"
                      id="generalfeedback"
                      InputProps={{
                        readOnly: !isEdit,
                      }}
                    />

                    <RHFTextField
                      name="defaultMark"
                      label="Default Mark"
                      id="defaultMark"
                      InputProps={{
                        readOnly: !isEdit,
                      }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <RHFTextField
                        name="questionstype"
                        label="Question Type"
                        id="questionstype"
                        // value="MultiChoice"
                        // onChange={(e) => setValue(e.target.value)}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
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
                                InputProps={{
                                  readOnly: !isEdit,
                                }}
                              />
                              <RHFTextField
                                name={`feedbank[${index}]`}
                                label="Feed Back"
                                id={`feedbank[${index}]`}
                                value={answerChooses.feedback}
                                onChange={(event) => handleFeedbackChange(index, event)}
                                InputProps={{
                                  readOnly: !isEdit,
                                }}
                              />
                              <RHFSelect
                                name={`fraction[${index}]`}
                                value={answerChooses.fraction}
                                style={{ width: '65px' }}
                                onChange={(event) => handleFractionChange(index, event)}
                                // inputProps={{ readOnly: true }}
                                disabled={!isEdit}
                              >
                                {!_.isEmpty(fraction) &&
                                  fraction.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                  ))
                                  }
                              </RHFSelect>

                            </Box>

                            {index === answerChoose.length - 1 && (
                              <Tooltip arrow placement="left" title="Add">
                                <IconButton variant="contained" color="success" disabled={!isEdit} onClick={handleAddInputAnswer}>
                                  <AddCircleIcon />
                                </IconButton>
                              </Tooltip>
                            )}
                            {index !== 0 && (
                              <Tooltip arrow placement="right" title="Remove">
                                <IconButton variant="contained" color="error" disabled={!isEdit} onClick={() => handleRemoveInputAnswer(index)}>
                                  <RemoveCircleOutlineIcon />
                                </IconButton>
                              </Tooltip>

                            )}
                          </div>
                        ))}
                      </Stack>


                    </Stack>
                    <Stack sx={{ ml: 1.5 }}>

                      <RHFSwitch
                        name="public"
                        label="Tài liệu công khai/ riêng tư"
                        labelPlacement="start"
                        sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
                        inputProps={{ readOnly: true }}
                      />
                    </Stack>

                  </Stack>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => {
                      reset(defaultValues);
                    }}
                    disabled={!isEdit}
                  //startIcon={<Iconify icon="eva:trash-2-outline" />}
                  >
                    xóa
                  </Button>
                </Stack>
              </Stack>
              <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!isEdit ? 'Back List' : 'Delete'}
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

