import React from 'react';
import { Box, Typography } from '@mui/material';

// This component now acts as a placeholder or can be removed if not needed.
// Its original layout logic has been moved to App.jsx.
const ProspectingDashboard = ({ selectedRole }) => {
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h5" color="text.secondary">
        Properties Dashboard Content
      </Typography>
    </Box>
  );
};

export default ProspectingDashboard; 