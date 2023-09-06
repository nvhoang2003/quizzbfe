import { useMemo, useState, useEffect } from 'react';
import FormProvider from '@/components/form/FormProvider';
import RHFTextField from '@/components/form/RHFTextField';
import { Container, Button, Card, Divider, Grid, Stack, Typography, TextField, SvgIcon } from '@mui/material'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import snackbarUtils from '@/utils/snackbar-utils';
import RHFSelect from '@/components/form/RHFSelect';
import _ from 'lodash';
import { create } from '@/dataProvider/multipchoiceApi';
import { getAllCate } from '@/dataProvider/categoryApi';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import RHFRadioGroup from '@/components/form/RHFRadioGroup';
import RHFSwitch from '@/components/form/RHFSwitch';
//---------------------------------------------------

Form.propTypes = {
  isEdit: PropTypes.bool,
  currentLevel: PropTypes.object
};

export default function Form({ isEdit = false, currentLevel }) {
  const [newData, setNewData] = useState([]);
  const { push } = useRouter();
  const [cate, setCate] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [reRender, setReRender] = useState([]);
  const [fraction, setFraction] = useState([0, 0.2, 0.25, 1 / 3, 0.4, 0.5, 0.6, 2 / 3, 0.75, 0.8, 1]);
  const [answerChoose, setAnswerChoose] = useState([{
    content: "",
    fraction: 0
  }]);

  const SHUFFLE_OPTION = [
    { label: 'Yes', value: '1' },
    { label: 'No', value: '0' },
  ];

  const validationSchema = Yup.object().shape({

    // name: Yup.string().trim().required('Tên Category không được trống'),
    //   content:
    //   generalfeedback:
    //   category: select
    //   defaultMark:
    //   qbTags: select
    //   questionstype: select
    //   answers:
    //answers.content
    //answers.fraction

    //   description: Yup.string().trim().required('Tên Category không được trống'),
  });


  const defaultValues = useMemo(
    () => ({
      name: currentLevel?.name || '',
      description: currentLevel?.description || '',
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


  const handlerCategoryChange = (event, index) => {
    setCategoryId(parseInt(event.target.value));
    setValue(event.target.name, event.target.value);
    setReRender({ [event.target.name]: event.target.value });
  };
  const [inputs, setInputs] = useState([
    // Khởi tạo một câu trả lời ban đầu
    { id: 1, answer: '', fraction: '' }
  ]);

  const handleInputChange = (index, event) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = {
      ...updatedInputs[index],
      answer: event.target.value
    };
    setInputs(updatedInputs);
  };

  const handleFractionChange = (index, event) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = {
      ...updatedInputs[index],
      fraction: event.target.value
    };
    console.log(updatedInputs.fraction);
    setInputs(updatedInputs);
    console.log(inputs);
  };

  const handleAddInput = () => {
    const newInput = { id: inputs.length + 1, answer: '', fraction: '' };
    setInputs([...inputs, newInput]);
  };

  const handleRemoveInput = (index) => {
    const updatedInputs = [...inputs];
    updatedInputs.splice(index, 1);
    setInputs(updatedInputs);
  };


  //allcate

  async function fetchAll() {
    const res = await getAllCate();
    if (res.status < 400) {
      const transformData = res.data.data.map((cate, index) => {
        return {
          id: cate.id,
          num: index + 1,
          name: cate.name,
          description: cate.description
        };
      });
      setCate(transformData);
    } else {
      return res;
    }
  }
  useEffect(() => {
    fetchAll()
  }, []);

  //allquestiontype
  async function createNew(data) {
    try {
      console.log(data);
      // const res = await create({
      //   name: data.name,
      //   description: data.description

      // });
      // if (res.status < 400) {
      //   snackbarUtils.success(res.data.message);
      //   push('/questonbank');
      // } else {
      //   snackbarUtils.error(res.res.data.title);
      // }
    } catch (error) {
      snackbarUtils.error(error);
    }
  };

  async function fetchUpdateCateByID(data) {
    try {
      //   const res = await updateCateByID(currentLevel.id, {
      //     name : data.name,
      //     description: data.description
      //   });
      if (res.status < 400) {
        push('/category');
        snackbarUtils.success(res.data.message);
      } else {
        snackbarUtils.error(res.res.data.title);
      }
    } catch (error) {

      snackbarUtils.error(error);
    }

  }

  const onSubmit = async (data) => {
    if (!isEdit) {
      createNew(data);
    } else {
      fetchUpdateCateByID(data);
    }
  };

  return (
    <Container maxWidth='100%'>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} >
            <Card sx={{ p: 5 }}>
              <Typography variant="h4" sx={{ color: 'text.disabled', mb: 3 }}>
                {!isEdit ? 'Tạo mới QuestionBank' : 'Cập nhật'}
              </Typography>
              <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
                <Stack alignItems="flex-end" spacing={1.5}>
                  <Stack spacing={2} sx={{ width: 1 }}>

                    <RHFTextField
                      name="name"
                      required
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
                      <span style={{ fontSize: '1rem', fontWeight: 400, width: '200px' }}>Category</span>
                      <RHFSelect name="categoryId" placeholder="Category" onChange={handlerCategoryChange}>
                        {!_.isEmpty(cate) &&
                          cate.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                      </RHFSelect>
                    </div>



                    <Stack spacing={2} sx={{ width: 1 }}>
                      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
                        Answers
                      </Typography>
                      <Stack spacing={2} sx={{ width: 1 }}>
                        {inputs.map((input, index) => (
                          <div key={input.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'left' }}>
                            <RHFTextField
                              name={`answers_content[${index}]`}
                              label="Answers Content"
                              id={`answers_content[${index}]`}
                              value={input.answer}
                              onChange={(event) => handleInputChange(index, event)}
                            />
                            <div>
                              <RHFSelect
                                name={`fraction[${index}]`}
                                value={input.fraction}
                                onChange={(event) => handleFractionChange(index, event)}
                              >
                                {!_.isEmpty(fraction) &&
                                  fraction.map((option,index) => (
                                    <option key={index} value={option}>{option}</option>
                                  ))}
                              </RHFSelect>
                            </div>

                            {index === inputs.length - 1 && (
                              <Button
                                startIcon={(
                                  <SvgIcon fontSize="small">
                                    <PlusIcon />
                                  </SvgIcon>
                                )}
                                variant="contained"
                                onClick={handleAddInput}
                              >
                                Add
                              </Button>
                            )}
                            {index !== 0 && (
                              <Button
                                startIcon={(
                                  <SvgIcon fontSize="small">
                                    <RemoveCircleOutlineIcon />
                                  </SvgIcon>
                                )}
                                variant="contained"
                                onClick={() => handleRemoveInput(index)}
                              >
                                Remove
                              </Button>
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

