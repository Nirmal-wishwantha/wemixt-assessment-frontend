import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import routes from '../common/navigation/routes'
import { Button } from '@mui/material';
import { Toast } from '../common/funtion';
const drawerWidth = 240;

function Home(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };


    //routes
    const getRoutes = () =>
        routes.map((val, index) => (
            <Route key={index} path={val.path} element={val.Element} icon={val.icon} text={val.text} />
        ));


    const drawer = (
        <div>
            <Toolbar />

            <Divider />

            {
                routes.map((val, index) => (
                    <List>
                        <Link key={index} to={val.path} style={{ textDecoration: 'none', color: 'black' }}>

                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                        {val.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={val.text} />
                                </ListItemButton>
                            </ListItem>

                        </Link>


                    </List>


                ))
            }





        </div>
    );

    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () => window().document.body : undefined;



    // log out 


    const logOut = () => {
        localStorage.removeItem('wemixt');
    
        Toast.fire({
            icon: "success",
            title: "Logged out successfully"
        });
    
        setTimeout(() => {
            window.location.reload(); // Ensure this is correctly spelled
        }, 2000);
    
        console.log('Logged out');
    };
    
    
    


    return (
        <Box sx={{ display: 'flex' }}>
            {/* <CssBaseline /> */}

            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >


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
                    <Typography variant="h6" noWrap component="div">
                        Responsive drawer
                    </Typography>
                </Toolbar>




            </AppBar>

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >

                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    slotProps={{
                        root: {
                            keepMounted: true, // Better open performance on mobile.
                        },
                    }}
                >
                    {drawer}
                </Drawer>

                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}

                    
                        <Button onClick={logOut}>Logout</Button>
                    

                </Drawer>


            </Box>

            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >

                <Routes>
                    <Route path="*" element={<Navigate to={'/Members'} />} />
                    {getRoutes()}
                </Routes>



            </Box>
        </Box>
    );
}

Home.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window: PropTypes.func,
};

export default Home;
