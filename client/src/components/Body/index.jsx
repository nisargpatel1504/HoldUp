import React ,{useContext} from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import './style.css'
import { experimentalStyled as styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { FaEthereum } from 'react-icons/fa';
import {RiMoneyDollarBoxLine} from 'react-icons/ri';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Body(props) {
  const {oepnStakingModal} = props;
  const data =[
    {
      month: 1,
      interestRate:'7%',
      days:30,
    },
    {
      month: 3,
      interestRate:'10%',
      days:90,
    },
    {
      month: 6,
      interestRate:'12%',
      days:120,
    }
  ]
  return (
  <>
    <div className='main'>
      <div className='main-head'>
      <FaEthereum  className='main-etherLogo' size={30}/>
      <Typography className='main-header'>Ethereum Market</Typography>
      </div>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} className='main-grid'>
        {data.map((item, index) => (
          <Grid item xs={3} sm={4} md={4} key={index}>
            <Item className='main-item' onClick={() =>oepnStakingModal(item.days,item.interestRate)}>
             <RiMoneyDollarBoxLine size={60} className='main-dollarIcon'/>
             <div className='main-itemDetails'>
             <Typography>{item.month} Months</Typography>
             <Typography style={{fontSize:'20px',fontWeight:'bold',textAlign:'center'}}>{item.interestRate}</Typography>
             </div>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
    </div>
  </>
  )
}

export default Body