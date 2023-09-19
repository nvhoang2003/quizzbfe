import React from 'react'
import Countdown, { zeroPad, calcTimeDelta, formatTimeDelta } from 'react-countdown'

export default function CountDownTimer({ hours, minutes, seconds }) {

  return (
    <span>
      {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
    </span>
  )
}
