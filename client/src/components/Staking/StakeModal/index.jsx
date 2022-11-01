import React from 'react'
import { Box, Button, Divider, Grid, InputBase, Modal, Paper, TextField, Typography } from '@mui/material';
import './style.css';
import { forwardRef } from 'react';
import { FaEthereum } from 'react-icons/fa';

const StakeModal = forwardRef((props,ref) => {
  const {stakingLength,stakingPercent,amount,setAmount,stakeEther,showStakeModal,setShowStakeModal} = props;
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 'auto',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: '12px',
        p: 4,
      };
    return(
      <Modal
        ref={ref}
        open={showStakeModal}
        onClose={()=>{setShowStakeModal(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
        <div  className='modal-heading'>
          <Typography className='modal-headerText'>Stake ether</Typography>
        </div>        
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <Paper
                  component="form"
                  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
              >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="0.00000000"
              inputProps={{ 'aria-label': '0' }}
              onChange={e => setAmount(e.target.value)}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <FaEthereum  className='main-etherLogo' size={30}/>
            </Paper>
          </Grid>
          <Grid item xs={12}>
          <Paper
                  component="form"
                  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
              >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={stakingLength + "Days"}
              inputProps={{ 'aria-label': '0' }}
              disabled
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Typography>Duration</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
          <Paper
                  component="form"
                  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
              >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={stakingPercent}
              inputProps={{ 'aria-label': '0' }}
              disabled
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Typography>APY</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Button className='btn-stakeEther' onClick={()=>stakeEther()}>Stake</Button>
          </Grid>

        </Grid>
      </Box>
      </Modal>
    )
}
)

export default StakeModal