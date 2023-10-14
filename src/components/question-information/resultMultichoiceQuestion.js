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
              <span>Câu trả lời của bạn đã đúng 1 phần.</span>
              <br />
              <span>Bạn đã chọn đúng {selected.length} câu  </span>
              {answerResult.answer.map((items, index) => {
                 {items.fraction !==0 ? (
                  <span key={index}>{items.answer}</span>
                ) : (
                  <span key={index}></span>
                )}
              })}
            </span>

          ) : (
            <span>Câu trả lời của bạn  {answerResult.status}.</span>
          )
        ) : (
          <span>Bạn cần chọn câu trả lời trước .</span>
        )}

        <br />
        <span>Đáp án của câu hỏi : </span><br />
        {questionResult.answer_content.map((item, index) => {
          if (item.fraction > 0) {
            return <span key={index} style={{ paddingLeft: '30px' }}>{item.answer}<br /></span>;
          }
        })}


      </Card> : <Card></Card>}
    </Stack>
  )

}




