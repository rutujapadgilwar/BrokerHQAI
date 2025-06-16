import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Button, Stack, styled } from '@mui/material';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import OnboardingWizard from './components/onboarding/OnboardingWizard';
import FilterPanel from './components/filters/FilterPanel';
import MapPanel from './components/map/MapPanel';
import Navbar from './components/dashboard/Navbar';
import WatchlistPage from './components/dashboard/WatchlistPage';
import AlertsPage from './components/dashboard/AlertsPage';
import SettingsPage from './components/dashboard/SettingsPage';
import TasksPage from './components/dashboard/TasksPage';
import DashboardTable from './components/dashboard/DashboardTable';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import { MessageCircle, Maximize2, Minimize2, X, Send } from 'lucide-react';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

// Create a theme instance
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff4081',
      dark: '#9a0036',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          minHeight: '100vh',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

const RoleButton = styled(Button)(({ theme, active }) => ({
  minWidth: '160px',
  height: '48px',
  borderRadius: '12px',
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 600,
  padding: '8px 24px',
  transition: 'all 0.3s ease',
  backgroundColor: active ? theme.palette.primary.main : 'transparent',
  color: active ? theme.palette.primary.contrastText : theme.palette.text.primary,
  border: active ? 'none' : `1px solid ${theme.palette.divider}`,
  '&:hover': {
    backgroundColor: active ? theme.palette.primary.dark : theme.palette.action.hover,
    transform: 'translateY(-2px)',
    boxShadow: active ? theme.shadows[4] : 'none',
  },
  '& .MuiButton-startIcon': {
    marginRight: '8px',
  },
}));

function App() {
  const [selectedRole, setSelectedRole] = useState('properties');
  const [filters, setFilters] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isMapCollapsed, setIsMapCollapsed] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  // Chatbot states
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatMessage, setChatMessage] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('demoLoggedIn') === 'true';
    if (loggedIn) {
      setIsLoggedIn(true);
      const onboardingDone = localStorage.getItem('demoOnboardingComplete') === 'true';
      setIsOnboardingComplete(onboardingDone);
    }
  }, []);

  const handleLoginSuccess = (isFirstLogin) => {
    setIsLoggedIn(true);
    if (isFirstLogin) {
      setIsOnboardingComplete(false);
    } else {
      setIsOnboardingComplete(true);
    }
    localStorage.setItem('demoLoggedIn', 'true');
  };

  const handleOnboardingComplete = () => {
    console.log('Onboarding completed');
    setIsOnboardingComplete(true);
    localStorage.setItem('demoOnboardingComplete', 'true');
    navigate('/dashboard/properties');
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSendMessage = () => {
    if (chatMessage.trim() === '') return;

    const newUserMessage = { type: 'user', message: chatMessage };
    setChatMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setChatMessage('');

    // Simulate AI response
    setTimeout(() => {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { type: 'ai', message: 'Hello! How can I help you with property insights today?' },
      ]);
    }, 1000);
  };

  if (!isLoggedIn) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      </ThemeProvider>
    );
  }

  if (!isOnboardingComplete) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <OnboardingWizard onComplete={handleOnboardingComplete} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, pt: 8 }}>
          <Routes>
            <Route path="/dashboard/properties" element={
              <>
                <Box 
                  sx={{ 
                    bgcolor: 'background.paper', 
                    p: 3, 
                    borderBottom: 1, 
                    borderColor: 'divider',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Stack 
                    direction="row" 
                    spacing={2} 
                    sx={{ 
                      maxWidth: '800px',
                      width: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    <RoleButton
                      active={selectedRole === 'properties'}
                      onClick={() => setSelectedRole('properties')}
                      startIcon={<BusinessIcon />}
                    >
                      Properties
                    </RoleButton>
                    <RoleButton
                      active={selectedRole === 'tenant'}
                      onClick={() => setSelectedRole('tenant')}
                      startIcon={<PeopleIcon />}
                    >
                      Tenants
                    </RoleButton>
                    <RoleButton
                      active={selectedRole === 'buyer'}
                      onClick={() => setSelectedRole('buyer')}
                      startIcon={<AccountBalanceIcon />}
                    >
                      Buyers
                    </RoleButton>
                  </Stack>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
                  <Box sx={{ width: '300px' }}>
                    <FilterPanel
                      selectedRole={selectedRole}
                      onFilterChange={handleFilterChange}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <DashboardTable
                      selectedRole={selectedRole}
                      filters={filters}
                    />
                  </Box>
                  <Box sx={{ width: '400px' }}>
                    <MapPanel selectedRole={selectedRole} />
                  </Box>
                </Box>
              </>
            } />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/property/:id" element={<PropertyDetailsPage />} />
            <Route path="/" element={<Navigate to="/dashboard/properties" replace />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
