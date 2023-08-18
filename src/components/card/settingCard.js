import React from 'react';
import { Card, Typography, Link } from "@mui/material"

export default function SettingCard(props) {
  return (
    <Link 
      href={props.link}
      underline="hover"
      variant="body2"
    >
      <Card variant="outlined" sx={{p: 1.5, mx: 1.5, borderStyle: "sold", borderWidth: "thin"}}>
        <Typography sx={{fontWeight: "bold"}}>
          {props.title}
        </Typography>
        <Typography>
          {props.content}
        </Typography>
      </Card>
    </Link> 
  )
}
