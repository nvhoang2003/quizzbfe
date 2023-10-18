import { useMemo, useState, useEffect } from 'react';
import FormProvider from '@/components/form/FormProvider';
import RHFTextField from '@/components/form/RHFTextField';
import { Container, Button, Card, Divider, Grid, Stack, Typography, TextField, SvgIcon } from '@mui/material'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import RHFSelect from '@/components/form/RHFSelect';
import _ from 'lodash';
import { getAllCate } from '@/dataProvider/categoryApi';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getAllQuestionbank, getQuestionType } from '@/dataProvider/questionbankApi';
import { Icon } from '@iconify/react';
import { format } from 'date-fns';
import snackbarUtils from '@/utils/snackbar-utils';
import { RotateLeft } from "@mui/icons-material";
//--------------------------------------------------

const SearchQuestionBank = ({ handleSearchSubmit, ...prop }) => {

  const { filter, setListQuiz } = prop;

  const [newData, setNewData] = useState([]);
  const { push } = useRouter();
  const [cate, setCate] = useState([]);
  const [type, setType] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [reRender, setReRender] = useState([]);

  const validationSchema = Yup.object().shape({});


  const defaultValues = useMemo(
    () => ({
      name: '',
      tags: '',
      authorName: '',
      categoryId: '',
      questiontype: '',
      startDate: null,
      endDate: null
    }),
    [filter]
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




  const handlerCategoryChange = (event, index) => {
    setCategoryId(parseInt(event.target.value));
    setValue(event.target.name, event.target.value);
    setReRender({ [event.target.name]: event.target.value });
  };


  const handlerTypeChange = (event, index) => {
    setValue(event.target.name, event.target.value);
    setReRender({ [event.target.name]: event.target.value });
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

  async function fetchAllQuestionType() {
    const res = await getQuestionType();
    if (res.status < 400) {
      const transformData = res.data.data.map((type) => {
        return {
          name: type.name,
          value: type.value
        };
      });
      setType(transformData);
    } else {
      return res;
    }
  }
  useEffect(() => {
    fetchAllQuestionType()
  }, []);


  async function fetchAllQuestion(data) {//filter
    //console.log(data);
    const res = await getAllQuestionbank(data);
    if (res.status < 400) {
      const transformData = res.data.data.map((qb, index) => {

        return {
          id: qb.id,
          num: index + 1,
          name: qb.name,
          questionstype: qb.questionstype,
          authorName: qb.authorName,
          tags: qb.tags,
          categoryName: qb.categoryName,
        };
      });
      setListQuiz(transformData);
    } else {
      return res;
    }
  }

  const onSubmit = async (data) => {
    try {

      let startDate = null;
      let endDate = null;

      if (data.startDate) {
        startDate = format(data.startDate, 'yyyy-MM-dd');
      }

      if (data.endDate) {
        endDate = format(data.endDate, 'yyyy-MM-dd');
      }

      const Data = {
        ...data,
        startDate,
        endDate,
      };
      fetchAllQuestion(Data);
    } catch (error) {
      snackbarUtils.error(error);
    }
  };

  const onReset = async () => {
    reset(defaultValues);
    await fetchAllQuestion(defaultValues);
  }

  return (
    <Container maxWidth='100%' sx={{ paddingTop: "20px" }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ p: 5 }}>
              <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
                <Stack alignItems="flex-end" spacing={1.5}>
                  <Stack direction="row" spacing={2} sx={{ width: 1 }}>
                    <RHFTextField
                      name="name"
                      label="Tên câu hỏi"
                      id="name"
                      sx={{ width: '250px' }}
                    />

                    <RHFTextField
                      name="tags"
                      label="Từ khóa"
                      id="tags"
                      sx={{ width: '250px' }}
                    />

                    <RHFTextField
                      name="authorName"
                      label="Tên tác giả"
                      id="authorName"
                      sx={{ width: '250px' }}
                    />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '250px' }}>
                      <RHFSelect name="questiontype" placeholder="Loại câu hỏi" onChange={handlerTypeChange}>
                        <option value="">--- Hãy chọn loại câu hỏi ---</option>
                        {!_.isEmpty(type) &&
                          type.map((option) => (
                            <option key={option.name} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                      </RHFSelect>
                    </div>
                  </Stack>
                  <Stack direction="row" spacing={2} sx={{ width: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '250px' }}>
                      <RHFSelect name="categoryId" placeholder="Danh mục" onChange={handlerCategoryChange}>
                        <option value="">--- Hãy chọn danh mục ---</option>
                        {!_.isEmpty(cate) &&
                          cate.map((option) => (
                            <option key={option.name} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                      </RHFSelect>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '250px' }}>
                      <Controller
                        control={control}
                        name="startDate"
                        render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                          <DatePicker
                            {...field}
                            label="Ngày bắt đầu"
                            renderInput={(inputProps) => (
                              <TextField
                                {...inputProps}
                                onBlur={onBlur}
                                name={startDate}
                                // error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                sx={{ width: '250px' }}
                              />
                            )}
                          />
                        )}
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '250px' }}>
                      <Controller
                        control={control}
                        name="endDate"
                        render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                          <DatePicker
                            {...field}
                            label="Ngày kết thúc"
                            renderInput={(inputProps) => (
                              <TextField
                                {...inputProps}
                                onBlur={onBlur}
                                name={endDate}
                                // error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                sx={{ width: '250px' }}
                              />
                            )}
                          />
                        )}
                      />
                    </div>
                  </Stack>

                  <Stack alignItems="flex-end" sx={{ mt: 3 }} spacing={2} direction="row" justifyContent="flex-end">
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}
                      startIcon={<Icon icon="ion:search" />}
                    >
                      Tìm kiếm
                    </LoadingButton>
                    <Button
                      color="error"
                      startIcon={
                        <SvgIcon fontSize="small">
                          <RotateLeft />
                        </SvgIcon>
                      }
                      variant="contained"
                      onClick={onReset}
                    >
                      Xóa
                    </Button>

                  </Stack>
                </Stack>
              </Stack >
              <Divider sx={{ my: 3, borderStyle: 'dashed' }} />


            </Card>
          </Grid>
        </Grid>


      </FormProvider>
    </Container>
  );
};
export default SearchQuestionBank;
