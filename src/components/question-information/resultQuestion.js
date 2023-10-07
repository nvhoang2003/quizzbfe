import { Card, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

//---------------------------------------------------

export default function ResultQuestion(props) {
  const { questionResult, isSubmit, answerResult } = props;
  const [selected, setSelected] = useState([]);


  const checkAnswer = () => {
    console.log(answerResult);
    const selectedAnswer = answerResult?.find(item => item.fraction !== 0);
    if (selectedAnswer) {
      setSelected(selectedAnswer);
    }
    //    answerResult?.map((item, index)=>{
    //   if(item.fraction !== 0){
    //     setSelected(item);
    //   }
    // })
  }

  useEffect(() => {
    if(isSubmit == true){
      checkAnswer();
    }
  
  }, [selected]);
  // useEffect(() => {
  //   answerResult?.map((item, index)=>{
  //     if(item.fraction !== 0){
  //       setSelected(item);
  //     }
  //   })
  //   console.log(selected);
  // }, [selected]);


  return (

    <Stack spacing={3} sx={{ paddingTop: '20px' }} >
      {isSubmit === true ? <Card sx={{ p: 5, backgroundColor: '#FCEEEE' }} >

        {answerResult.status ? (
          answerResult.mark > 0 && answerResult.mark < 1 ? (
            <span>
              <span>Your answer is is partially correct.</span>
              <br />
              <span>You have correctly selected  {selected.length} </span>
              {answerResult.answer.map((items, index) => {
                 {items.fraction !==0 ? (
                  <span key={index}>{items.answer}</span>
                ) : (
                  <span key={index}></span>
                )}
              })}
            </span>

          ) : (
            <span>Your answer is {answerResult.status}.</span>
          )
        ) : (
          <span>You did not choose an answer.</span>
        )}

        <br />
        <span>The correct answer is: </span><br />
        {questionResult.answer_content.map((item, index) => {
          if (item.fraction > 0) {
            return <span key={index} style={{ paddingLeft: '30px' }}>{item.answer}<br /></span>;
          }
        })}


      </Card> : <Card></Card>}
    </Stack>
  )

}




