import { Stack } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";

//----------------------------------------------------------------

function CountdownTimer({
  deadline,
  //  completedCompoment,
  localVaraiableName,
}) {
  const [data, setData] = useState({ date: Date.now(), delay: deadline });
  const [wantedDelay, setWantedDelay] = useState(deadline);

  const formatTime = (hours, minutes, seconds) => {
    const displayHours = hours.toString().length == 1 ? "0" + hours : hours;
    const displayMinutes =
      minutes.toString().length == 1 ? "0" + minutes : minutes;
    const displaySeconds =
      seconds.toString().length == 1 ? "0" + seconds : seconds;

    return minutes <= 5 ? (
      <>
        {displayHours}:{displayMinutes}:{displaySeconds}
      </>
    ) : (
      <>
        {displayHours}:{displayMinutes}:{displaySeconds}
      </>
    );
  };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    console.log(completed);
    if (completed) {
      return <>Do quiz timeout</>;
    } else {
      console.log(formatTime(hours, minutes, seconds));
      return <>{formatTime(hours, minutes, seconds)}</>;
    }
  };

  useEffect(() => {
    const savedDate = localStorage.getItem(localVaraiableName);
    if (savedDate != null && !isNaN(savedDate)) {
      const currentTime = Date.now();
      const delta = parseInt(savedDate, 10) - currentTime;

      if (delta > wantedDelay) {
        if (localStorage.getItem(localVaraiableName).length > 0)
          localStorage.removeItem(localVaraiableName);
      } else {
        setData({ date: currentTime, delay: delta });
      }
    }
  }, []);

  return <Countdown date={data.date + data.delay} renderer={renderer} />;
}

CountdownTimer.propTypes = {
  deadline: PropTypes.number,
  // completedCompoment: PropTypes.node,
  localVaraiableName: PropTypes.string,
};

export default CountdownTimer;
