import React,{useEffect,useCallback} from 'react'
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './style.css';
const drawerWidth = 240;

function NavBar(props) {
    const { window, isConnected,connect } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const checkConnection = useCallback(() => {
        return isConnected() ? "Connected" : (<div onClick={()=> connect()}>Connect</div>)
    })
    const navItems = ['Markets', 'Assets', checkConnection()];
  useEffect(()=>{
    checkConnection();
  },[checkConnection])
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
   
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            HoldUp
          </Typography>
          <Divider />
          <List>
            {navItems.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      );
    
  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: 'flex' }}>
    <AppBar component="nav" style={{backgroundColor:'#252626'}}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          HoldUp
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' ,color:'#FAFCFF'} }}>
          {navItems.map((item) => (
            <Button key={item} sx={{ color: '#fff' }}>
              {item}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
    <Box component="nav">
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          backgroundColor:'#0a0d79',
        }}
      >
        {drawer}
      </Drawer>
    </Box>
    <Box component="main">
      <Toolbar />
    </Box>
  </Box>
);
}

NavBar.propTypes = {
    window: PropTypes.func,
  };
export default NavBar