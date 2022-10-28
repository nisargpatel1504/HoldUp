import React from 'react'
import './style.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import {TbCurrencyEthereum} from 'react-icons/tb';
import Button from '@mui/material/Button';

function StakedAssets({assets,withDraw}) {
  console.log(assets);
  return (
    <div className='main'>
      <Typography className='stake-headingText'>Staked Assets</Typography>
    <TableContainer component={Paper} className='stake-container'>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className='stake-head'>
          <TableRow>
            <TableCell align="center">Assets</TableCell>
            <TableCell align="center">Percent Interest</TableCell>
            <TableCell align="center">Staked</TableCell>
            <TableCell align="center">Interest</TableCell>
            <TableCell align="center">Days remaining</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assets.length > 0 ? assets.map((row,index) => (
            <TableRow
              key={row.name}
            //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" style={{width:'auto'}}>
              <TbCurrencyEthereum />
              </TableCell>
              <TableCell align="center">{row.percentInterest}</TableCell>
              <TableCell align="center">{row.etherStaked}</TableCell>
              <TableCell align="center">{row.etherInterest}</TableCell>
              <TableCell align="center">{row.daysRemaining}</TableCell>
              <TableCell align="center">
                { row.open ? (
                <Button onClick={()=>withDraw(row.positionId)}>Withdraw</Button>
              )
              :<div>Closed</div>
              }
              </TableCell>
            </TableRow>
          )):(
           <TableRow>
            <TableCell align='center'>No staked Assets</TableCell>
           </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default StakedAssets