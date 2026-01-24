import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
} from '@mui/material';
import {
  Map as MapIcon,
  ViewList as ListIcon,
  Business as BusinessIcon,
  Handshake as HandshakeIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import FilterPanel from '../filters/FilterPanel';
import MapPanel from '../map/MapPanel';
import PhoneIcon from '@mui/icons-material/Phone';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EmailIcon from '@mui/icons-material/Email';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ReplayIcon from '@mui/icons-material/Replay';
import Tooltip from '@mui/material/Tooltip';

// Styled components
// Update getRowColorBar to also return the light background color
function getRowColorBar(tenant) {
  const prob = Number(tenant.move_probability ?? 0);
  if (prob > 85) return '#FF3B30'; // Red
  if (prob >= 60 && prob <= 85) return '#FF9500'; // Orange
  return '#34C759'; // Green
}

// Update StyledTableRow to use 'rowcolor' instead of 'colorbar'
const StyledTableRow = styled(TableRow)({
  cursor: 'pointer',
});

const ScoreDisplay = styled(Box)(({ theme, score }) => ({
  textAlign: 'center',
  '& .score-value': {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: '2px',
    ...(score >= 85 && { color: theme.palette.error.main }),
    ...(score >= 60 && score < 85 && { color: theme.palette.warning.main }),
    ...(score >= 10 && score < 60 && { color: theme.palette.success.main }),
    ...(score < 10 && { color: theme.palette.grey[500] }),
  },
  '& .score-label': {
    fontSize: '0.75rem',
    color: theme.palette.grey[600],
  },
}));

const TenantDashboard = ({ viewMode, setViewMode }) => {
  // State for fetched tenant data
  const [tenantData, setTenantData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    urgent: false,
    hot: false,
    warm: false,
  });
  const navigate = useNavigate();
  const data = [
    {
      "company": "Evergreen Tech Solutions",
      "industry": "Software Development",
      "location": "Seattle, WA",
      "sub_location": "Downtown",
      "move_probability": 72,
      "lease_expiration": "Q2 2026",
      "months_until_expiration": 12,
      "headcount_growth_6mo": 18,
      "revenue_growth_12mo_percent": 14,
      "revenue_growth_12mo_amount": 2200000,
      "contacts": "Alex Kim (CTO)",
      "action": "Schedule meeting this quarter"
  },
  {
      "company": "Cascade BioScience",
      "industry": "Biotechnology",
      "location": "Redmond, WA",
      "sub_location": "Overlake",
      "move_probability": 58,
      "lease_expiration": "Q1 2027",
      "months_until_expiration": 20,
      "headcount_growth_6mo": 9,
      "revenue_growth_12mo_percent": 7,
      "revenue_growth_12mo_amount": 950000,
      "contacts": "Sophia Nguyen (VP of Operations)",
      "action": "Review in six months"
  },
  {
      "company": "Puget Sound Financial Group",
      "industry": "Financial Services",
      "location": "Bellevue, WA",
      "sub_location": "Downtown",
      "move_probability": 87,
      "lease_expiration": "Q4 2025",
      "months_until_expiration": 6,
      "headcount_growth_6mo": 12,
      "revenue_growth_12mo_percent": 11,
      "revenue_growth_12mo_amount": 1750000,
      "contacts": "Michael Chen (CFO)",
      "action": "Urgent follow-up"
  },
  {
      "company": "Sound AI Innovations",
      "industry": "Artificial Intelligence",
      "location": "Kirkland, WA",
      "sub_location": "Totem Lake",
      "move_probability": 65,
      "lease_expiration": "Q2 2026",
      "months_until_expiration": 11,
      "headcount_growth_6mo": 24,
      "revenue_growth_12mo_percent": 20,
      "revenue_growth_12mo_amount": 3100000,
      "contacts": "Liam Patel (CEO)",
      "action": "Meet next month"
  },
  {
      "company": "RainCity Marketing Group",
      "industry": "Marketing & Advertising",
      "location": "Seattle, WA",
      "sub_location": "Capitol Hill",
      "move_probability": 55,
      "lease_expiration": "Q3 2027",
      "months_until_expiration": 25,
      "headcount_growth_6mo": 5,
      "revenue_growth_12mo_percent": 4,
      "revenue_growth_12mo_amount": 450000,
      "contacts": "Isabella Wright (Director)",
      "action": "Check back next year"
    },
    {
      "company": "Pacific Robotics Lab",
      "industry": "Robotics",
      "location": "Redmond, WA",
      "sub_location": "Willows",
      "move_probability": 61,
      "lease_expiration": "Q1 2026",
      "months_until_expiration": 9,
      "headcount_growth_6mo": 15,
      "revenue_growth_12mo_percent": 12,
      "revenue_growth_12mo_amount": 1400000,
      "contacts": "Derek Lee (Head of Engineering)",
      "action": "Evaluate space options"
    },
    {
      "company": "Cascade Cloud Services",
      "industry": "Cloud Computing",
      "location": "Bellevue, WA",
      "sub_location": "Bel-Red",
      "move_probability": 91,
      "lease_expiration": "Q4 2025",
      "months_until_expiration": 6,
      "headcount_growth_6mo": 27,
      "revenue_growth_12mo_percent": 18,
      "revenue_growth_12mo_amount": 2800000,
      "contacts": "Hannah Morgan (COO)",
      "action": "Arrange broker meeting"
    },
    {
      "company": "Rainier MedTech",
      "industry": "Healthcare Technology",
      "location": "Seattle, WA",
      "sub_location": "South Lake Union",
      "move_probability": 69,
      "lease_expiration": "Q2 2027",
      "months_until_expiration": 22,
      "headcount_growth_6mo": 20,
      "revenue_growth_12mo_percent": 9,
      "revenue_growth_12mo_amount": 1200000,
      "contacts": "Amara Jones (Director)",
      "action": "Check back next quarter"
    },
    {
      "company": "Emerald City Cybersecurity",
      "industry": "Cybersecurity",
      "location": "Seattle, WA",
      "sub_location": "Belltown",
      "move_probability": 82,
      "lease_expiration": "Q3 2025",
      "months_until_expiration": 7,
      "headcount_growth_6mo": 17,
      "revenue_growth_12mo_percent": 15,
      "revenue_growth_12mo_amount": 1900000,
      "contacts": "Victor Reyes (CTO)",
      "action": "Prepare proposal"
    },
    {
      "company": "Northshore Data Analytics",
      "industry": "Data Analytics",
      "location": "Kirkland, WA",
      "sub_location": "Juanita",
      "move_probability": 57,
      "lease_expiration": "Q1 2028",
      "months_until_expiration": 30,
      "headcount_growth_6mo": 8,
      "revenue_growth_12mo_percent": 6,
      "revenue_growth_12mo_amount": 750000,
      "contacts": "Emily Zhao (VP of Data Science)",
      "action": "Review next year"
    }
  ]
  
  // Fetch data from backend API on mount
  // useEffect(() => {
  //   setLoading(true);
  //   fetch("http://localhost:8000/api/tenants")
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Network response was not ok");
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setTenantData(data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    setTenantData(data);
    setLoading(false);
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleTenantClick = (tenantId) => {
    navigate(`/tenant/${tenantId}`);
  };

  const getRelationshipIcon = (relationship) => {
    switch (relationship) {
      case 'Warm Intro': return <HandshakeIcon sx={{ color: 'success.main', fontSize: '1.2rem' }} />;
      case 'Previous Contact': return <EmailIcon sx={{ color: 'warning.main', fontSize: '1.2rem' }} />;
      case 'Cold Prospect': return <BusinessIcon sx={{ color: 'grey.500', fontSize: '1.2rem' }} />;
      default: return <BusinessIcon sx={{ color: 'grey.500', fontSize: '1.2rem' }} />;
    }
  };

  // Filter data based on selected filters
  const filteredData = tenantData.filter(tenant => {
    if (filters.urgent && tenant.priority === 'urgent') return true;
    if (filters.hot && tenant.priority === 'hot') return true;
    if (filters.warm && tenant.priority === 'warm') return true;
    return !filters.urgent && !filters.hot && !filters.warm; // Show all if no filters selected
  });

  // Update the counts for urgent, hot, and warm using move_probability only
  const urgentCount = tenantData.filter(t => Number(t.move_probability ?? 0) > 85).length;
  const hotCount = tenantData.filter(t => {
    const prob = Number(t.move_probability ?? 0);
    return prob >= 60 && prob <= 85;
  }).length;
  const warmCount = tenantData.filter(t => Number(t.move_probability ?? 0) < 60).length;

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

  // Loading and error states
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

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
                    <TableCell sx={{ width: 5, p: 0, bgcolor: 'grey.50' }} />
                    <TableCell sx={{ bgcolor: 'grey.50', fontWeight: 600, color: 'grey.900', verticalAlign: 'top' }}>COMPANY</TableCell>
                    <TableCell sx={{ bgcolor: 'grey.50', fontWeight: 600, color: 'grey.900', verticalAlign: 'top' }}>LOCATION</TableCell>
                    <TableCell sx={{ bgcolor: 'grey.50', fontWeight: 600, color: 'grey.900', textAlign: 'center', verticalAlign: 'top' }}>MOVE PROBABILITY</TableCell>
                    <TableCell sx={{ bgcolor: 'grey.50', fontWeight: 600, color: 'grey.900', textAlign: 'center', verticalAlign: 'top' }}>LEASE EXPIRATION</TableCell>
                    <TableCell sx={{ bgcolor: 'grey.50', fontWeight: 600, color: 'grey.900', textAlign: 'center', verticalAlign: 'top' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, verticalAlign: 'top' }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
                          HEAD COUNT GROWTH
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'grey.500', fontSize: '0.7rem' }}>
                          (6 MONTHS)
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ bgcolor: 'grey.50', fontWeight: 600, color: 'grey.900', textAlign: 'center', verticalAlign: 'top' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
                          REVENUE GROWTH
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'grey.500', fontSize: '0.7rem' }}>
                          (12 MO REVENUE)
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ bgcolor: 'grey.50', fontWeight: 600, color: 'grey.900', textAlign: 'center', width: '120px', verticalAlign: 'top' }}>CONTACTS</TableCell>
                    <TableCell sx={{ bgcolor: 'grey.50', fontWeight: 600, color: 'grey.900', textAlign: 'center', verticalAlign: 'top' }}>ACTION</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((tenant, idx) => {
                    const rowcolor = getRowColorBar(tenant);
                    return (
                      <StyledTableRow
                        key={tenant.id || idx}
                        onClick={() => handleTenantClick(tenant.id || idx)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell
                          sx={{
                            width: 12,
                            p: 0,
                            background: rowcolor,
                            border: 'none',
                          }}
                        />
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
                              {tenant.subLocation || tenant.sub_location}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <ScoreDisplay score={tenant.expansionScore || tenant.move_probability}>
                            <Typography className="score-value">
                              {tenant.expansionScore || tenant.move_probability}%
                            </Typography>
                            <Typography className="score-label">
                              Move Probability
                            </Typography>
                          </ScoreDisplay>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          {(() => {
                            const months = Number(tenant.months_until_expiration ?? 99);
                            let chipColor = 'success';
                            if (months < 6) chipColor = 'error';
                            else if (months >= 6 && months <= 15) chipColor = 'warning';
                            // else success (green)
                            return (
                              <>
                                <Chip
                                  label={tenant.leaseTiming || tenant.lease_expiration}
                                  size="small"
                                  color={chipColor}
                                  sx={{ fontWeight: 500 }}
                                />
                                <Typography variant="caption" sx={{ display: 'block', color: 'grey.600', mt: 0.5 }}>
                                  {tenant.timingDetail || tenant.months_until_expiration + ' months'}
                                </Typography>
                              </>
                            );
                          })()}
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Tooltip
                            title={`Headcount Growth: Number of employees added in past 6 months. ${(tenant.headCountGrowthNumber || tenant.headcount_growth_6mo) ? (tenant.headCountGrowthNumber || tenant.headcount_growth_6mo) : ''}`}
                            arrow
                          >
                            <span style={{ cursor: 'help' }}>
                              {(tenant.jobsGrowth || (tenant.revenue_growth_12mo_percent ? `+${tenant.revenue_growth_12mo_percent}%` : ''))}
                              {(tenant.headCountGrowthNumber || tenant.headcount_growth_6mo) ? ` (${tenant.headCountGrowthNumber || tenant.headcount_growth_6mo})` : ''}
                            </span>
                          </Tooltip>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Tooltip
                            title={`Revenue Growth: 12-month trailing revenue increase. ${(tenant.revenueGrowthNumber || tenant.revenue_growth_12mo_amount) ? (tenant.revenueGrowthNumber || (tenant.revenue_growth_12mo_amount ? `+$${(tenant.revenue_growth_12mo_amount/1000).toLocaleString()}K` : '')) : ''}`}
                            arrow
                          >
                            <span style={{ cursor: 'help' }}>
                              {(tenant.financeGrowth || (tenant.revenue_growth_12mo_percent ? `+${tenant.revenue_growth_12mo_percent}%` : ''))}
                              {(tenant.revenueGrowthNumber || tenant.revenue_growth_12mo_amount) ? ` (${tenant.revenueGrowthNumber || (tenant.revenue_growth_12mo_amount ? `+$${(tenant.revenue_growth_12mo_amount/1000).toLocaleString()}K` : '')})` : ''}
                            </span>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                            <Typography variant="body2" sx={{ color: 'grey.800' }}>
                              { tenant.contacts}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Stack direction="row" spacing={0.5} flexWrap="wrap" justifyContent="center">
                            {/* Primary CTA: Call */}
                            <Tooltip title="Call">
                              <Button
                                variant="contained"
                                sx={{
                                  minWidth: 0,
                                  backgroundColor: '#0F62FE',
                                  color: '#fff',
                                  borderRadius: 6,
                                  p: '6px',
                                  '&:hover': { backgroundColor: '#0043CE' },
                                }}
                                size="small"
                                onClick={e => { e.stopPropagation(); /* Handle Call action */ }}
                              >
                                <PhoneIcon fontSize="small" />
                              </Button>
                            </Tooltip>
                            {/* Primary CTA: Add to Call List */}
                            <Tooltip title="Add to Call List">
                              <Button
                                variant="contained"
                                sx={{
                                  minWidth: 0,
                                  backgroundColor: '#0F62FE',
                                  color: '#fff',
                                  borderRadius: 6,
                                  p: '6px',
                                  '&:hover': { backgroundColor: '#0043CE' },
                                }}
                                size="small"
                                onClick={e => { e.stopPropagation(); /* Handle Add to Call List action */ }}
                              >
                                <AddCircleOutlineIcon fontSize="small" />
                              </Button>
                            </Tooltip>
                            {/* Secondary CTA: Follow Up */}
                            <Tooltip title="Follow Up">
                              <Button
                                variant="outlined"
                                sx={{
                                  minWidth: 0,
                                  border: '1px solid #0F62FE',
                                  color: '#0F62FE',
                                  backgroundColor: '#fff',
                                  borderRadius: 6,
                                  p: '6px',
                                  '&:hover': {
                                    backgroundColor: '#E3F0FF',
                                    border: '1px solid #0F62FE',
                                    color: '#0F62FE',
                                  },
                                }}
                                size="small"
                                onClick={e => { e.stopPropagation(); /* Handle Follow Up action */ }}
                              >
                                <ReplayIcon fontSize="small" />
                              </Button>
                            </Tooltip>
                            {/* Secondary CTA: Email */}
                            <Tooltip title="Email">
                              <Button
                                variant="outlined"
                                sx={{
                                  minWidth: 0,
                                  border: '1px solid #0F62FE',
                                  color: '#0F62FE',
                                  backgroundColor: '#fff',
                                  borderRadius: 6,
                                  p: '6px',
                                  '&:hover': {
                                    backgroundColor: '#E3F0FF',
                                    border: '1px solid #0F62FE',
                                    color: '#0F62FE',
                                  },
                                }}
                                size="small"
                                onClick={e => { e.stopPropagation(); /* Handle Email action */ }}
                              >
                                <EmailIcon fontSize="small" />
                              </Button>
                            </Tooltip>
                            {/* Secondary CTA: Save for Later */}
                            <Tooltip title="Save for Later">
                              <Button
                                variant="outlined"
                                sx={{
                                  minWidth: 0,
                                  border: '1px solid #0F62FE',
                                  color: '#0F62FE',
                                  backgroundColor: '#fff',
                                  borderRadius: 6,
                                  p: '6px',
                                  '&:hover': {
                                    backgroundColor: '#E3F0FF',
                                    border: '1px solid #0F62FE',
                                    color: '#0F62FE',
                                  },
                                }}
                                size="small"
                                onClick={e => { e.stopPropagation(); /* Handle Save for Later action */ }}
                              >
                                <BookmarkBorderIcon fontSize="small" />
                              </Button>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </StyledTableRow>
                    );
                  })}
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
                Showing {filteredData.length} of {tenantData.length} results
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