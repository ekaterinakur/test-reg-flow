import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography } from '@mui/material';


function Success() {
  return (
    <div className="container success-container">
      <CheckCircleIcon sx={{ fontSize: 70 }} color='success' />
      <Typography variant='h3' color={'green'} >Thanks!</Typography>
    </div>
  );
}

export default Success;
