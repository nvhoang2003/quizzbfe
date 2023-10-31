import { Box, Button, Dialog, DialogContent, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ConfirmDialogQuestion from '../confirm-dialog/ConfirmDialogQuestion';
import { useRouter } from 'next/router';


//----------------------------------------------------------------

function CountdownTimer({ initialTime, question, sum }) {
  const {
    query: { id }
  } = useRouter();

  const [timeLeft, setTimeLeft] = useState(initialTime * 60);
  const [openConfirm, setOpenConfirm] = useState(true);
  const router = useRouter();

  const handleCloseConfirm = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpenConfirm(true);
    }
  };
  const handleSubmit = () => {
    router.push(`/ortherpage/` + id);

  }

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const displayHours = hours.toString().length == 1 ? "0" + hours : hours;
    const displayMinutes = minutes.toString().length == 1 ? "0" + minutes : minutes;
    const displaySeconds = seconds.toString().length == 1 ? "0" + seconds : seconds;

    return minutes <= 5 ?
      <>{displayHours}:{displayMinutes}:{displaySeconds}</>
      : <>{displayHours}:{displayMinutes}:{displaySeconds}</>;
  };

  return (
    <div>
      {timeLeft > 0 ? (
        <>{formatTime(timeLeft)}</>
      ) : (

        <ConfirmDialogQuestion
          open={openConfirm}
          onClose={handleCloseConfirm}
          title=""
          content={
            <h3>
              Đã hết giờ bạn đã làm được {question}/ {sum}
            </h3>
          }
          action={
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                handleSubmit(id);
              }}
            >
              Submit
            </Button>
          }
        />
      )}
    </div>
  );
}

export default CountdownTimer