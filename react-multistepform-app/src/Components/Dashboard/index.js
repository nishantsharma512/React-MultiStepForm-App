import { Box, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const StyledBoxTab=styled(Paper)({
    width: '300px',
    height: '50px',
    display: 'flex',
    fontSize:"18px",
    fontWeight:600,
    padding:4,
    backgroundColor: 'coral',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
})

const DashBoard = () => {
    const navigate= useNavigate();
    const handleMultiStepFormTab=()=>{
        navigate('/multi-step-form')
    }

    const handleTableTab=()=>{
        navigate('/pagination-table')
    }
    return (
        <Grid sx={{display:"flex", justifyContent:"center", mt:4}}>
            <StyledBoxTab onClick={handleMultiStepFormTab} elevation={4} style={{mr:4}}>
               MultiStep form including single and multiple image upload
            </StyledBoxTab>
            <StyledBoxTab onClick={handleTableTab} style={{marginLeft:20}} elevation={4}>
               MultiStep form including single and multiple image upload
            </StyledBoxTab>
        </Grid>
    );
};

export default DashBoard;