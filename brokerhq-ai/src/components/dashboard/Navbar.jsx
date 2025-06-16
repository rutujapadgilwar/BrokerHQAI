import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  useTheme,
  useMediaQuery,
  styled,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  WatchLater as WatchlistIcon,
  Person as PersonIcon,
  Assignment as TasksIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  color: theme.palette.text.primary,
}));

const LogoImage = styled('img')(({ theme }) => ({
  height: '32px',
  width: '32px',
  objectFit: 'contain',
  transition: 'all 0.3s ease',
  [theme.breakpoints.up('sm')]: {
    height: '40px',
    width: '40px',
  },
}));

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState(3); // Example notification count
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Link 
            to="/dashboard/properties"
            style={{ 
              display: 'flex', 
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              padding: 1,
            }}
          >
            <LogoImage 
              src="/brokerhq_icon.png" 
              alt="BrokerHQ"
              loading="eager"
            />
          </Link>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Watchlist">
            <IconButton
              component={Link}
              to="/watchlist"
              size="small"
              sx={{
                color: location.pathname === '/watchlist' ? 'primary.main' : 'inherit',
                '&:hover': {
                  bgcolor: theme.palette.action.hover,
                  boxShadow: theme.shadows[2],
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <WatchlistIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Tasks">
            <IconButton
              component={Link}
              to="/tasks"
              size="small"
              sx={{
                color: location.pathname === '/tasks' ? 'primary.main' : 'inherit',
                '&:hover': {
                  bgcolor: theme.palette.action.hover,
                  boxShadow: theme.shadows[2],
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <TasksIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton
              onClick={handleNotificationMenuOpen}
              size="small"
              sx={{
                '&:hover': {
                  bgcolor: theme.palette.action.hover,
                  boxShadow: theme.shadows[2],
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <Badge badgeContent={notifications} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Profile">
            <IconButton
              onClick={handleProfileMenuOpen}
              size="small"
              sx={{
                ml: 2,
                '&:hover': {
                  bgcolor: theme.palette.action.hover,
                  boxShadow: theme.shadows[2],
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                <PersonIcon />
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => handleNavigation('/profile')}>Profile</MenuItem>
          <MenuItem onClick={() => handleNavigation('/settings')}>Settings</MenuItem>
          <MenuItem onClick={() => {
            localStorage.removeItem('demoLoggedIn');
            localStorage.removeItem('demoOnboardingComplete');
            window.location.reload();
          }}>Logout</MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationAnchorEl}
          open={Boolean(notificationAnchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleMenuClose}>New property alert</MenuItem>
          <MenuItem onClick={handleMenuClose}>Price change notification</MenuItem>
          <MenuItem onClick={handleMenuClose}>New message received</MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar; 