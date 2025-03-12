import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Badge, Box, Divider } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupIcon from '@mui/icons-material/Group';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WidgetsIcon from '@mui/icons-material/Widgets';
import logo from '../../assets/pixel_logo.png'

const Sidebar = () => {
    const location = useLocation();
    const [unreadCount, setUnreadCount] = useState(5);

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/adminHome' },
        { text: 'Users', icon: <GroupIcon />, path: '/users' },
        { text: 'Orders', icon: <ShoppingCartIcon />, path: '/orders' },
        { text: 'Pixels', icon: <WidgetsIcon />, path: '/pixels' },
        { text: 'Buy Pixels', icon: <WidgetsIcon />, path: '/buy-pixels' },
        // { text: 'Messages', icon: <Badge badgeContent={unreadCount} color="error"><NotificationsIcon /></Badge>, path: '/user-messages' },



    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                overflow: 'hidden', // Prevent horizontal scrolling
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    backgroundColor: '#ffffff', // Changed to white
                    color: '#000000', // Changed text color to black
                    overflow: 'hidden', // Prevent horizontal scrolling
                },
            }}
        >
            <Box sx={{ padding: '16px', textAlign: 'center' }}>
                <img
                    src={logo}
                    alt="Logo"
                    style={{ width: '100%', maxWidth: '120px', height: '50px' }}
                />
            </Box>
            <Divider sx={{ borderColor: '#e0e0e0' }} /> {/* Changed divider color to match the white theme */}
            <List sx={{ overflowY: 'auto', overflowX: 'hidden' }}> {/* Ensure vertical scrolling only */}
                {menuItems.map((item) => (
                    <ListItem
                        button
                        component={Link}
                        to={item.path}
                        key={item.text}
                        selected={location.pathname === item.path}
                        sx={{
                            borderRadius: '4px',
                            backgroundColor: location.pathname === item.path ? '#f0f0f0' : 'transparent', // Light background for active item
                            color: location.pathname === item.path ? '#000000' : '#757575', // Black text for active item
                            '&:hover': {
                                backgroundColor: '#f0f0f0',
                                color: '#000000',
                            },
                            padding: '8px 16px',
                            margin: '4px 8px',
                        }}
                    >
                        <ListItemIcon sx={{ color: location.pathname === item.path ? '#000000' : '#757575' }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
