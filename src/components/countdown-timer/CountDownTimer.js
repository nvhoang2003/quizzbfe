import { useEffect, useState } from 'react';

function CountdownTimer({ initialTime }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

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

    return <span>{hours}:{minutes}:{seconds}</span>;
  };

  return (
    <div>
      {timeLeft > 0 ? (
        <p>Thời gian còn lại: {formatTime(timeLeft)}</p>
      ) : (
        <p>Hết thời gian!</p>
      )}
    </div>
  );
}

export default CountdownTimer