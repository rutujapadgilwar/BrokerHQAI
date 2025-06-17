import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Stack,
  Avatar,
  Divider,
  Grid,
  Card,
  CardContent,
  Badge,
} from '@mui/material';
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Search as SearchIcon,
  FileDownload as ExportIcon,
  Map as MapIcon,
  ViewList as ListIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Info as InfoIcon,
  TrendingUp as TrendingUpIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  Schedule as ScheduleIcon,
  AttachMoney as MoneyIcon,
  Handshake as HandshakeIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import DashboardNavigation from '../common/DashboardNavigation';
import FilterPanel from '../filters/FilterPanel';
import MapPanel from '../map/MapPanel';

// Styled components
const StyledTableRow = styled(TableRow)(({ theme, priority }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  ...(priority === 'urgent' && {
    borderLeft: `4px solid ${theme.palette.error.main}`,
    backgroundColor: theme.palette.error.light + '10',
    '&:hover': {
      backgroundColor: theme.palette.error.light + '20',
    },
  }),
  ...(priority === 'hot' && {
    borderLeft: `4px solid ${theme.palette.warning.main}`,
    backgroundColor: theme.palette.warning.light + '10',
    '&:hover': {
      backgroundColor: theme.palette.warning.light + '20',
    },
  }),
}));

const PriorityChip = styled(Chip)(({ theme, priority }) => ({
  ...(priority === 'urgent' && {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.main,
    animation: 'pulse 2s infinite',
  }),
  ...(priority === 'hot' && {
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.warning.main,
  }),
  ...(priority === 'warm' && {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.main,
  }),
  ...(priority === 'cool' && {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.grey[600],
  }),
}));

const ActionButton = styled(Button)(({ theme, variant }) => ({
  minWidth: 'auto',
  padding: '6px 12px',
  fontSize: '0.8rem',
  fontWeight: 500,
  textTransform: 'none',
  ...(variant === 'urgent' && {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  }),
  ...(variant === 'contact' && {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  }),
  ...(variant === 'nurture' && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(variant === 'details' && {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.grey[700],
    border: `1px solid ${theme.palette.grey[300]}`,
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  }),
}));

const ScoreDisplay = styled(Box)(({ theme, score }) => ({
  textAlign: 'center',
  '& .score-value': {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: '2px',
    ...(score >= 80 && { color: theme.palette.error.main }),
    ...(score >= 60 && score < 80 && { color: theme.palette.warning.main }),
    ...(score >= 40 && score < 60 && { color: theme.palette.success.main }),
    ...(score < 40 && { color: theme.palette.grey[500] }),
  },
  '& .score-label': {
    fontSize: '0.75rem',
    color: theme.palette.grey[600],
  },
}));

const SpaceSituation = styled(Box)(({ theme }) => ({
  lineHeight: 1.4,
  '& .current-space': {
    color: theme.palette.grey[600],
    fontSize: '0.85rem',
  },
  '& .space-arrow': {
    color: theme.palette.success.main,
    fontWeight: 700,
    margin: '0 5px',
  },
  '& .target-space': {
    color: theme.palette.text.primary,
    fontWeight: 600,
  },
  '& .space-pressure': {
    fontSize: '0.75rem',
    color: theme.palette.error.main,
    fontWeight: 600,
    marginTop: '2px',
  },
}));

const mockTenantData = [
  {
    id: 1,
    starred: true,
    company: 'TechFlow Dynamics',
    industry: 'Software Development',
    location: 'Seattle, WA',
    subLocation: 'South Lake Union',
    expansionScore: 91,
    priority: 'urgent',
    currentSpace: '15.5K SF',
    targetSpace: '25-30K SF',
    spacePressure: 'Severely overcrowded',
    leaseTiming: 'Expires Q2 2025',
    timingDetail: '4 months',
    keyDriver: 'Series B funding + 67 job postings in Q4',
    budgetLevel: 'Premium',
    relationship: 'Warm Intro',
    relationshipDetail: 'Sarah Kim (CEO)',
  },
  {
    id: 2,
    starred: true,
    company: 'Northwest Legal Partners',
    industry: 'Law Firm',
    location: 'Seattle, WA',
    subLocation: 'Downtown Core',
    expansionScore: 78,
    priority: 'hot',
    currentSpace: '28K SF',
    targetSpace: '32-40K SF',
    spacePressure: 'Conference room constraints',
    leaseTiming: 'Expires Q4 2025',
    timingDetail: '10 months',
    keyDriver: 'Partner promotions + new practice groups',
    budgetLevel: 'Market',
    relationship: 'Previous Contact',
    relationshipDetail: 'Contacted 6mo ago',
  },
  {
    id: 3,
    starred: true,
    company: 'HealthTech Solutions',
    industry: 'Healthcare Technology',
    location: 'Bellevue, WA',
    subLocation: 'Bellevue CBD',
    expansionScore: 84,
    priority: 'hot',
    currentSpace: '18K SF',
    targetSpace: '35-45K SF',
    spacePressure: 'Rapid growth mode',
    leaseTiming: 'Month-to-Month',
    timingDetail: 'Immediate',
    keyDriver: 'FDA approval + Series A funding',
    budgetLevel: 'Premium',
    relationship: 'Warm Intro',
    relationshipDetail: 'Mike Chen (CTO)',
  },
  {
    id: 4,
    starred: false,
    company: 'Pacific Marketing Group',
    industry: 'Digital Marketing',
    location: 'Seattle, WA',
    subLocation: 'Fremont',
    expansionScore: 65,
    priority: 'warm',
    currentSpace: '8K SF',
    targetSpace: '12-15K SF',
    spacePressure: 'Growing team',
    leaseTiming: 'Expires Q1 2026',
    timingDetail: '15 months',
    keyDriver: 'New client acquisitions',
    budgetLevel: 'Market',
    relationship: 'Cold Prospect',
    relationshipDetail: 'No previous contact',
  },
  {
    id: 5,
    starred: false,
    company: 'Green Energy Innovations',
    industry: 'Clean Technology',
    location: 'Redmond, WA',
    subLocation: 'Microsoft Campus Area',
    expansionScore: 72,
    priority: 'hot',
    currentSpace: '22K SF',
    targetSpace: '40-50K SF',
    spacePressure: 'Manufacturing expansion',
    leaseTiming: 'Expires Q3 2025',
    timingDetail: '7 months',
    keyDriver: 'Government contract + new product line',
    budgetLevel: 'Premium',
    relationship: 'Warm Intro',
    relationshipDetail: 'Lisa Park (COO)',
  },
];

const TenantDashboard = ({ viewMode, setViewMode }) => {
  const [filters, setFilters] = useState({
    urgent: false,
    hot: false,
    warm: false,
  });
  const navigate = useNavigate();

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleStarToggle = (id) => {
    console.log('Toggle star for tenant:', id);
  };

  const handleTenantClick = (tenantId) => {
    navigate(`/tenant/${tenantId}`);
  };

  const getPriorityLabel = (priority) => {
    return priority;
  };

  const getBudgetColor = (budget) => {
    switch (budget) {
      case 'Premium': return 'success';
      case 'Market': return 'warning';
      case 'Value': return 'error';
      default: return 'default';
    }
  };

  const getRelationshipIcon = (relationship) => {
    switch (relationship) {
      case 'Warm Intro': return <HandshakeIcon sx={{ color: 'success.main', fontSize: '1.2rem' }} />;
      case 'Previous Contact': return <EmailIcon sx={{ color: 'warning.main', fontSize: '1.2rem' }} />;
      case 'Cold Prospect': return <BusinessIcon sx={{ color: 'grey.500', fontSize: '1.2rem' }} />;
      default: return <BusinessIcon sx={{ color: 'grey.500', fontSize: '1.2rem' }} />;
    }
  };

  const filteredData = mockTenantData.filter(tenant => {
    if (filters.urgent && tenant.priority === 'urgent') return true;
    if (filters.hot && tenant.priority === 'hot') return true;
    if (filters.warm && tenant.priority === 'warm') return true;
    return !filters.urgent && !filters.hot && !filters.warm; // Show all if no filters selected
  });

  const urgentCount = mockTenantData.filter(t => t.priority === 'urgent').length;
  const hotCount = mockTenantData.filter(t => t.priority === 'hot').length;
  const warmCount = mockTenantData.filter(t => t.priority === 'warm').length;

  return (
    <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
      {/* Left Sidebar - Using FilterPanel */}
      <Box sx={{ width: 300, p: 2, flexShrink: 0 }}>
        <FilterPanel 
          selectedRole="tenant" 
          onFilterChange={handleFilterChange}
        />
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
        {/* Content Header */}
        <Paper
          sx={{
            bgcolor: 'white',
            p: 2.5,
            borderBottom: 1,
            borderColor: 'grey.200',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', gap: 3.75, alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: 'grey.600' }}>
              {filteredData.length} tenants found
            </Typography>
            <Box sx={{ display: 'flex', gap: 2.5 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ color: 'error.main', fontWeight: 700 }}>
                  {urgentCount}
                </Typography>
                <Typography variant="caption" sx={{ color: 'grey.600' }}>
                  Urgent
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ color: 'warning.main', fontWeight: 700 }}>
                  {hotCount}
                </Typography>
                <Typography variant="caption" sx={{ color: 'grey.600' }}>
                  Hot
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ color: 'success.main', fontWeight: 700 }}>
                  {warmCount}
                </Typography>
                <Typography variant="caption" sx={{ color: 'grey.600' }}>
                  Warm
                </Typography>
              </Box>
            </Box>
          </Box>
          <Stack direction="row" spacing={1.25}>
            <Button
              variant={viewMode === 'list' ? 'contained' : 'outlined'}
              startIcon={<ListIcon />}
              onClick={() => setViewMode('list')}
              sx={{
                ...(viewMode === 'list' && {
                  bgcolor: 'success.main',
                  '&:hover': { bgcolor: 'success.dark' },
                }),
              }}
            >
              List View
            </Button>
            <Button
              variant={viewMode === 'map' ? 'contained' : 'outlined'}
              startIcon={<MapIcon />}
              onClick={() => setViewMode('map')}
              sx={{
                ...(viewMode === 'map' && {
                  bgcolor: 'success.main',
                  '&:hover': { bgcolor: 'success.dark' },
                }),
              }}
            >
              Map View
            </Button>
          </Stack>
        </Paper>

        {/* Content Area - Table or Map */}
        {viewMode === 'list' ? (
          <>
            {/* Table */}
            <TableContainer sx={{ flex: 1, bgcolor: 'white', width: '100%' }}>
              <Table stickyHeader sx={{ width: '100%' }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ bgcolor: 'grey.50', fontWeight: 600, color: 'grey.700' }}>★</TableCell>
                    <TableCell sx={{ bgcolor: 'grey.50', fontWeight: 600, color: 'grey.700' }}>Company</TableCell>
                    <TableCell sx={{ bgcolor: 'grey.50', fontWeight: 600, color: 'grey.700' }}>Industry</TableCell>
                    <TableCell sx={{ bgcolor: 'grey.50', fontWeight: 600, color: 'grey.700' }}>Location</TableCell>
                    <TableCell sx={{ bgcolor: 'grey.50', fontWeight: 600, color: 'grey.700' }}>Current Space</TableCell>
                    <TableCell sx={{ bgcolor: 'grey.50', fontWeight: 600, color: 'grey.700' }}>Target Space</TableCell>
                    <TableCell sx={{ bgcolor: 'grey.50', fontWeight: 600, color: 'grey.700' }}>Expansion Score</TableCell>
                    <TableCell sx={{ bgcolor: 'grey.50', fontWeight: 600, color: 'grey.700' }}>Lease Timing</TableCell>
                    <TableCell sx={{ bgcolor: 'grey.50', fontWeight: 600, color: 'grey.700' }}>Key Driver</TableCell>
                    <TableCell sx={{ bgcolor: 'grey.50', fontWeight: 600, color: 'grey.700' }}>Budget</TableCell>
                    <TableCell sx={{ bgcolor: 'grey.50', fontWeight: 600, color: 'grey.700' }}>Relationship</TableCell>
                    <TableCell sx={{ bgcolor: 'grey.50', fontWeight: 600, color: 'grey.700' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((tenant) => (
                    <StyledTableRow key={tenant.id} priority={tenant.priority}>
                      <TableCell>
                        <IconButton
                          onClick={() => handleStarToggle(tenant.id)}
                          sx={{ color: tenant.starred ? 'warning.main' : 'grey.400' }}
                        >
                          {tenant.starred ? <StarIcon /> : <StarBorderIcon />}
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main', cursor: 'pointer' }} onClick={() => handleTenantClick(tenant.id)}>
                          {tenant.company}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: 'grey.600' }}>
                          {tenant.industry}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {tenant.location}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'grey.500' }}>
                            {tenant.subLocation}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <ScoreDisplay score={tenant.expansionScore}>
                          <Typography className="score-value">
                            {tenant.expansionScore}
                          </Typography>
                          <Typography className="score-label">
                            Expansion Score
                          </Typography>
                        </ScoreDisplay>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {tenant.currentSpace}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {tenant.targetSpace}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: 'grey.600' }}>
                          {tenant.spacePressure}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={tenant.leaseTiming}
                          size="small"
                          color={tenant.priority === 'urgent' ? 'error' : 
                                 tenant.priority === 'hot' ? 'warning' : 'success'}
                          sx={{ fontWeight: 500 }}
                        />
                        <Typography variant="caption" sx={{ display: 'block', color: 'grey.600', mt: 0.5 }}>
                          {tenant.timingDetail}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ 
                          color: tenant.priority === 'urgent' ? 'error.main' :
                                 tenant.priority === 'hot' ? 'warning.main' : 'success.main',
                          fontWeight: tenant.priority === 'urgent' ? 600 : 500,
                        }}>
                          {tenant.keyDriver}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={`💰 ${tenant.budgetLevel}`}
                          size="small"
                          color={getBudgetColor(tenant.budgetLevel)}
                          sx={{ fontWeight: 500 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getRelationshipIcon(tenant.relationship)}
                          <Typography variant="body2" sx={{ color: 'grey.600' }}>
                            {tenant.relationshipDetail}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.75} flexWrap="wrap">
                          {tenant.priority === 'urgent' && (
                            <ActionButton variant="urgent" size="small">
                              Urgent Call
                            </ActionButton>
                          )}
                          {tenant.priority === 'hot' && (
                            <ActionButton variant="contact" size="small">
                              Follow Up
                            </ActionButton>
                          )}
                          <ActionButton variant="details" size="small" onClick={() => handleTenantClick(tenant.id)}>
                            Details
                          </ActionButton>
                        </Stack>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Footer */}
            <Paper
              sx={{
                bgcolor: 'white',
                borderTop: 1,
                borderColor: 'grey.200',
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography variant="body2" sx={{ color: 'grey.600' }}>
                Showing {filteredData.length} of {mockTenantData.length} results
              </Typography>
              <Button
                variant="contained"
                sx={{ bgcolor: 'success.main', '&:hover': { bgcolor: 'success.dark' } }}
              >
                Load More
              </Button>
            </Paper>
          </>
        ) : (
          /* Map View */
          <Box sx={{ flex: 1, p: 1, bgcolor: 'white', width: '100%' }}>
            <MapPanel selectedRole="tenant" />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TenantDashboard; 