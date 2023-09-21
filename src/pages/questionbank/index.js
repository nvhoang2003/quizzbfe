import React, { useMemo, useState } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Paper } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import QuestionBankTable from './questionbank_table';
import SearchQuestionBank from '@/components/search/search_questionBank';

const links = [
  { label: 'Multichoice', href: '/questionbank/multiChoiceQuestion/create' },
  { label: 'Numerical', href: '/link2' },
  { label: 'ShortAnswer', href: '/link3' },
  { label: 'DragAndDrop', href: '/link4' },
  { label: 'Matching', href: '/link1' },
  { label: 'TrueFalse', href: '/link2' },
];
const item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Item({ children }) {
  return (
    <Box sx={{ border: '1px', p: [2], m: 2, padding: '5px' }}>
      {children}
    </Box>
  );
}

const Page = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleOpenClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [questionData, setQuestionData] = useState([]);

  const handleSubmit = (data) => {
    setQuestionData(data);
  };

  const handleAddClick = () => {
    router.push('questionbank/new');
  };

  return (
    <>
      <Head>
        <title>
          QuestionBank
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={1}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Question Bank
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Stack>
                  <Button
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    )}
                    variant="contained"
                    onClick={handleAddClick}
                  >
                    Add Question
                  </Button>
                </Stack>
                <Stack>
                  <Button
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    )}
                    variant="contained"
                    onClick={handleOpenClick}
                  >
                    Create New
                  </Button>


                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                  >
                    <DialogTitle id="responsive-dialog-title">
                    </DialogTitle>
                    <DialogContent>
                    <Grid container >
                        <Typography content='center' textAlign='center' id="modal-modal-title" variant="h6" component="h2" paddingBottom='10px'>
                          Chọn loại câu hỏi bạn muốn tạo mới
                        </Typography>
                        <Grid container spacing={2}>
                          {links.map((link, index) => (
                            <Grid item xs={6} key={index} md={4}>
                              <Button href={link.href}>
                                <Item>{link.label}</Item>
                              </Button>
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    </DialogContent>
                  </Dialog>

                </Stack>


              </Stack>
            </Stack>

            <SearchQuestionBank handleSearchSubmit={handleSubmit}/>
            <QuestionBankTable questionData={questionData}/>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
