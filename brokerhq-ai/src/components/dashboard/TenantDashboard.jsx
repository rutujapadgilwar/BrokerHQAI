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
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translateY(-1px)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  ...(priority === 'urgent' && {
    borderLeft: `4px solid ${theme.palette.error.main}`,
    backgroundColor: theme.palette.error.light + '10',
    '&:hover': {
      backgroundColor: theme.palette.error.light + '20',
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
  }),
  // No highlight for 'hot' or 'warm'
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
    headCountGrowthNumber: '+50',
    jobsGrowth: '+12%',
    revenueGrowthNumber: '+$2M',
    financeGrowth: '+18%',
    totalEmployeeCount: 350,
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
    headCountGrowthNumber: '+30',
    jobsGrowth: '+8%',
    revenueGrowthNumber: '+$1.2M',
    financeGrowth: '+15%',
    totalEmployeeCount: 120,
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
    headCountGrowthNumber: '+40',
    jobsGrowth: '+10%',
    revenueGrowthNumber: '+$1.5M',
    financeGrowth: '+16%',
    totalEmployeeCount: 200,
  },
  {
    id: 4,
    starred: false,
    company: 'Pacific Marketing Group',
    industry: 'Digital Marketing',
    location: 'Seattle, WA',
    subLocation: 'Fremont',
    expansionScore: 45,
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
    headCountGrowthNumber: '+10',
    jobsGrowth: '+5%',
    revenueGrowthNumber: '+$400K',
    financeGrowth: '+12%',
    totalEmployeeCount: 60,
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
    headCountGrowthNumber: '+35',
    jobsGrowth: '+11%',
    revenueGrowthNumber: '+$900K',
    financeGrowth: '+17%',
    totalEmployeeCount: 150,
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

  // Add GradientButton styled component
  const GradientButton = styled(Button)(({ theme }) => ({
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
    color: 'white',
    textTransform: 'none',
    fontWeight: 500,
    padding: '10px 24px',
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: theme.shadows[2],
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`,
      boxShadow: theme.shadows[4],
      transform: 'translateY(-1px)',
    },
  }));

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
            <GradientButton
              variant={viewMode === 'list' ? 'contained' : 'outlined'}
              startIcon={<ListIcon />}
              onClick={() => setViewMode('list')}
              sx={{
                ...(viewMode !== 'list' && {
                  background: 'transparent',
                  color: 'success.main',
                  boxShadow: 'none',
                  border: '1px solid',
                  borderColor: 'success.main',
                  '&:hover': {
                    background: 'rgba(76, 175, 80, 0.08)',
                  },
                }),
              }}
            >
              List View
            </GradientButton>
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
                    <TableCell sx={{ bgcolor: 'grey.50', fontWeight: 600, color: 'grey.700' }}>COMPANY</TableCell>
                    <TableCell sx={{ bgcolor: 'grey.50', fontWeight: 600, color: 'grey.700' }}>LOCATION</TableCell>
                    <TableCell sx={{ bgcolor: 'grey.50', fontWeight: 600, color: 'grey.700', textAlign: 'center' }}>MOVE PROBABILITY</TableCell>
                    <TableCell sx={{ bgcolor: 'grey.50', fontWeight: 600, color: 'grey.700', textAlign: 'center' }}>LEASE EXPIRATION</TableCell>
                    <TableCell sx={{ bgcolor: 'grey.50', fontWeight: 600, color: 'grey.700', textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
                          HEAD COUNT GROWTH
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'grey.500', fontSize: '0.7rem' }}>
                          (6 MONTHS)
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ bgcolor: 'grey.50', fontWeight: 600, color: 'grey.700', textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
                          REVENUE GROWTH
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'grey.500', fontSize: '0.7rem' }}>
                          (12 MO REVENUE)
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ bgcolor: 'grey.50', fontWeight: 600, color: 'grey.700', textAlign: 'center' }}>CONTACTS</TableCell>
                    <TableCell sx={{ bgcolor: 'grey.50', fontWeight: 600, color: 'grey.700', textAlign: 'center' }}>ACTION</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((tenant) => (
                    <StyledTableRow 
                      key={tenant.id} 
                      priority={tenant.priority}
                      onClick={() => handleTenantClick(tenant.id)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                          {tenant.company}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'grey.600' }}>
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
                      <TableCell sx={{ textAlign: 'center' }}>
                        <ScoreDisplay score={tenant.expansionScore}>
                          <Typography className="score-value">
                            {tenant.expansionScore}
                          </Typography>
                          <Typography className="score-label">
                            Move Probability
                          </Typography>
                        </ScoreDisplay>
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
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
                      <TableCell sx={{ textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {tenant.headCountGrowthNumber || '+0'}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'grey.600' }}>
                            {tenant.jobsGrowth || '+0%'}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {tenant.revenueGrowthNumber || '+$0'}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'grey.600' }}>
                            {tenant.financeGrowth || '+0%'}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getRelationshipIcon(tenant.relationship)}
                          <Typography variant="body2" sx={{ color: 'grey.600' }}>
                            {tenant.relationshipDetail}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        <Stack direction="row" spacing={0.75} flexWrap="wrap" justifyContent="center">
                          {tenant.priority === 'urgent' && (
                            <ActionButton 
                              variant="urgent" 
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle urgent call action
                              }}
                            >
                              Urgent Call
                            </ActionButton>
                          )}
                          {tenant.priority === 'hot' && (
                            <ActionButton 
                              variant="contact" 
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle follow up action
                              }}
                            >
                              Follow Up
                            </ActionButton>
                          )}
                          <ActionButton variant="details" size="small" onClick={(e) => {
                            e.stopPropagation();
                            handleTenantClick(tenant.id);
                          }}>
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