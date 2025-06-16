import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Menu,
  MenuItem,
  Typography,
  Tooltip,
  Chip,
  Button,
  useTheme,
  ListItemIcon,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon,
  Download as DownloadIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Share as ShareIcon,
  MailOutline as EmailIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const ROWS_PER_PAGE = 10;

// Add styled components
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`,
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[5],
  '& .MuiTable-root': {
    borderCollapse: 'separate',
    borderSpacing: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: '16px',
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:first-of-type': {
    paddingLeft: '24px',
  },
  '&:last-child': {
    paddingRight: '24px',
  },
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  '& .MuiTableCell-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    fontWeight: 600,
    color: theme.palette.text.primary,
    borderBottom: `2px solid ${theme.palette.divider}`,
    padding: '16px',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'rgba(99, 102, 241, 0.04)',
    transition: 'background-color 0.2s ease-in-out',
  },
  '& td': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  color: 'white',
  textTransform: 'none',
  fontWeight: 500,
  padding: '8px 16px',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`,
    boxShadow: theme.shadows[4],
    transform: 'translateY(-1px)',
  },
}));

const SearchTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: theme.shape.borderRadius * 2,
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
    },
  },
}));

const ProspectsTable = ({ selectedRole }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [watchlist, setWatchlist] = useState(new Set());
  const [displayCount, setDisplayCount] = useState(ROWS_PER_PAGE);

  // Load watchlist from localStorage on component mount
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('watchlist');
    if (savedWatchlist) {
      setWatchlist(new Set(JSON.parse(savedWatchlist)));
    }
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify([...watchlist]));
  }, [watchlist]);

  // Mock data for different roles
  const mockData = {
    properties: [
      {
        id: 1,
        address: '3821 Stone Way N',
        owner: 'Fremont Properties LLC',
        sf: 25100,
        occupancy: 95,
        sellProb: 92,
      },
      {
        id: 2,
        address: '1201 2nd Ave',
        owner: 'Northwest Holdings',
        sf: 140300,
        occupancy: 85,
        sellProb: 87,
      },
      {
        id: 3,
        address: '2909 1st Ave',
        owner: 'Market Street Capital',
        sf: 33200,
        occupancy: 73,
        sellProb: 76,
      },
      {
        id: 4,
        address: '219 Broadway E',
        owner: 'Market Street Capital',
        sf: 12900,
        occupancy: 100,
        sellProb: 71,
      },
      {
        id: 5,
        address: '7001 26th Ave NW',
        owner: 'Branford Investment',
        sf: 58700,
        occupancy: 60,
        sellProb: 65,
      },
      {
        id: 6,
        address: '100 Main St, Seattle, WA',
        owner: 'Property Co.',
        sf: 10000,
        occupancy: 70,
        sellProb: 78,
      },
      {
        id: 7,
        address: '200 Elm St, Bellevue, WA',
        owner: 'Invest Group',
        sf: 15000,
        occupancy: 80,
        sellProb: 82,
      },
      {
        id: 8,
        address: '300 Oak Ave, Redmond, WA',
        owner: 'Devs Inc.',
        sf: 20000,
        occupancy: 90,
        sellProb: 89,
      },
      {
        id: 9,
        address: '400 Pine Ln, Kirkland, WA',
        owner: 'Builders LLC',
        sf: 25000,
        occupancy: 65,
        sellProb: 68,
      },
      {
        id: 10,
        address: '500 Cedar Dr, Tacoma, WA',
        owner: 'Urban Dev.',
        sf: 30000,
        occupancy: 75,
        sellProb: 73,
      },
      {
        id: 11,
        address: '600 Fir Rd, Lakewood, WA',
        owner: 'Pacific Properties',
        sf: 40000,
        occupancy: 88,
        sellProb: 91,
      },
      {
        id: 12,
        address: '700 Spruce Blvd, Puyallup, WA',
        owner: 'Green Spaces',
        sf: 45000,
        occupancy: 93,
        sellProb: 80,
      },
    ],
    tenant: [
      {
        id: 1,
        company: 'Microsoft Corporation',
        demandScore: 95,
        currentSqFtOccupied: '850,000 SF',
        leaseExpiryTiming: 'Expiring Q3 2025',
        minMaxSizeNeeded: '800K–1M SF',
        preferredSubmarkets: 'Redmond, Bellevue',
      },
      {
        id: 2,
        company: 'Amazon Web Services',
        demandScore: 92,
        currentSqFtOccupied: '1.2M SF',
        leaseExpiryTiming: 'Expiring Q4 2024',
        minMaxSizeNeeded: '1M–1.5M SF',
        preferredSubmarkets: 'South Lake Union, Downtown Seattle',
      },
      {
        id: 3,
        company: 'Meta Platforms',
        demandScore: 88,
        currentSqFtOccupied: '450,000 SF',
        leaseExpiryTiming: 'Expiring Q1 2026',
        minMaxSizeNeeded: '400K–600K SF',
        preferredSubmarkets: 'Belltown, South Lake Union',
      },
      {
        id: 4,
        company: 'Google Cloud',
        demandScore: 85,
        currentSqFtOccupied: '300,000 SF',
        leaseExpiryTiming: 'Expiring Q2 2025',
        minMaxSizeNeeded: '250K–400K SF',
        preferredSubmarkets: 'Kirkland, Bellevue',
      },
      {
        id: 5,
        company: 'Salesforce',
        demandScore: 82,
        currentSqFtOccupied: '200,000 SF',
        leaseExpiryTiming: 'Expiring Q4 2025',
        minMaxSizeNeeded: '150K–300K SF',
        preferredSubmarkets: 'Downtown Seattle, South Lake Union',
      },
      {
        id: 6,
        company: 'Adobe Systems',
        demandScore: 78,
        currentSqFtOccupied: '150,000 SF',
        leaseExpiryTiming: 'Expiring Q3 2026',
        minMaxSizeNeeded: '100K–200K SF',
        preferredSubmarkets: 'Bellevue, Redmond',
      },
      {
        id: 7,
        company: 'Oracle Cloud',
        demandScore: 75,
        currentSqFtOccupied: '120,000 SF',
        leaseExpiryTiming: 'Expiring Q1 2025',
        minMaxSizeNeeded: '100K–150K SF',
        preferredSubmarkets: 'Seattle, Bellevue',
      },
    ],
    buyer: [
      {
        id: 1,
        buyerName: 'Blackstone Real Estate',
        demandScore: 98,
        targetAssetTypes: 'Office, Industrial, Multifamily',
        preferredMarkets: 'Seattle, Bellevue, Redmond',
        preferredDealSize: '100K–500K SF',
        historicalClosingPace: '12 deals in 2024',
      },
      {
        id: 2,
        buyerName: 'Brookfield Properties',
        demandScore: 95,
        targetAssetTypes: 'Office, Retail, Mixed-Use',
        preferredMarkets: 'Seattle, Bellevue, Kirkland',
        preferredDealSize: '50K–300K SF',
        historicalClosingPace: '8 deals in 2024',
      },
      {
        id: 3,
        buyerName: 'PGIM Real Estate',
        demandScore: 92,
        targetAssetTypes: 'Office, Industrial',
        preferredMarkets: 'Seattle, Tacoma, Everett',
        preferredDealSize: '75K–400K SF',
        historicalClosingPace: '6 deals in 2024',
      },
      {
        id: 4,
        buyerName: 'Invesco Real Estate',
        demandScore: 90,
        targetAssetTypes: 'Multifamily, Office, Retail',
        preferredMarkets: 'Seattle, Bellevue, Redmond',
        preferredDealSize: '50K–250K SF',
        historicalClosingPace: '5 deals in 2024',
      },
      {
        id: 5,
        buyerName: 'AEW Capital Management',
        demandScore: 88,
        targetAssetTypes: 'Office, Industrial, Mixed-Use',
        preferredMarkets: 'Seattle, Tacoma, Bellevue',
        preferredDealSize: '100K–350K SF',
        historicalClosingPace: '4 deals in 2024',
      },
      {
        id: 6,
        buyerName: 'Clarion Partners',
        demandScore: 85,
        targetAssetTypes: 'Office, Retail, Multifamily',
        preferredMarkets: 'Seattle, Bellevue, Kirkland',
        preferredDealSize: '75K–300K SF',
        historicalClosingPace: '3 deals in 2024',
      },
      {
        id: 7,
        buyerName: 'Heitman Real Estate',
        demandScore: 82,
        targetAssetTypes: 'Office, Industrial',
        preferredMarkets: 'Seattle, Tacoma, Everett',
        preferredDealSize: '50K–200K SF',
        historicalClosingPace: '2 deals in 2024',
      },
    ],
  };

  const filteredData = mockData[selectedRole].filter(row => {
    const searchableFields = Object.values(row).map(String).join(' ').toLowerCase();
    return searchableFields.includes(searchQuery.toLowerCase());
  });

  const displayedData = filteredData.slice(0, displayCount);
  const hasMore = displayCount < filteredData.length;

  const handleMenuClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleWatchlistToggle = (id) => {
    setWatchlist((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
    handleMenuClose();
  };

  const handleExportFlyer = (row) => {
    console.log('Export Flyer for:', row);
    handleMenuClose();
  };

  const handleEmailOwner = (row) => {
    console.log('Email Owner for:', row);
    handleMenuClose();
  };

  const handleViewDetails = (row) => {
    console.log('View details for:', row);
    handleMenuClose();
  };

  const getSellProbColor = (score) => {
    if (score >= 75) return 'success';
    if (score >= 50) return 'warning';
    return 'error';
  };

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + ROWS_PER_PAGE);
  };

  const tableCellStyle = {
    padding: '16px',
    '&:first-of-type': {
      paddingLeft: '24px',
    },
    '&:last-child': {
      paddingRight: '24px',
    },
  };

  const headerCellStyle = {
    ...tableCellStyle,
    backgroundColor: theme.palette.background.paper,
    fontWeight: 600,
    color: theme.palette.text.primary,
    borderBottom: `2px solid ${theme.palette.divider}`,
  };

  const renderPropertiesTable = () => (
    <>
      <TableHead>
        <TableRow>
          <TableCell sx={headerCellStyle}>Address</TableCell>
          <TableCell sx={headerCellStyle}>Owner</TableCell>
          <TableCell align="right" sx={headerCellStyle}>SF</TableCell>
          <TableCell align="right" sx={headerCellStyle}>Occupancy %</TableCell>
          <TableCell align="center" sx={headerCellStyle}>Sell-Prob</TableCell>
          <TableCell align="center" sx={headerCellStyle}>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {displayedData.map((row) => (
          <TableRow 
            key={row.id}
            hover
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
              '&:last-child td': {
                borderBottom: 0,
              },
            }}
          >
            <TableCell sx={tableCellStyle}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => handleWatchlistToggle(row.id)}
                  sx={{
                    color: watchlist.has(row.id) ? 'warning.main' : 'action.active',
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  {watchlist.has(row.id) ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
                <Typography
                  component="a"
                  href="#"
                  sx={{ 
                    textDecoration: 'none', 
                    color: 'primary.main',
                    fontWeight: 500,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {row.address}
                </Typography>
              </Box>
            </TableCell>
            <TableCell sx={tableCellStyle}>
              <Typography
                component="a"
                href="#"
                sx={{ 
                  textDecoration: 'none', 
                  color: 'primary.main',
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {row.owner}
              </Typography>
            </TableCell>
            <TableCell align="right" sx={tableCellStyle}>{row.sf.toLocaleString()}</TableCell>
            <TableCell align="right" sx={tableCellStyle}>{row.occupancy}%</TableCell>
            <TableCell align="center" sx={tableCellStyle}>
              <Chip
                label={row.sellProb}
                color={getSellProbColor(row.sellProb)}
                size="small"
                sx={{ 
                  fontWeight: 600,
                  minWidth: '60px',
                }}
              />
            </TableCell>
            <TableCell align="center" sx={tableCellStyle}>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                <IconButton 
                  size="small" 
                  onClick={(event) => handleMenuClick(event, row)}
                  sx={{ 
                    color: 'action.active',
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {renderMenu()}
    </>
  );

  const renderTenantTable = () => (
    <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
      <Table sx={{ minWidth: 650 }} aria-label="tenant table">
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
            <TableCell sx={{ fontWeight: 'bold', padding: '12px 16px' }}>Company Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold', padding: '12px 16px' }}>Demand Score</TableCell>
            <TableCell sx={{ fontWeight: 'bold', padding: '12px 16px' }}>Current Sq Ft Occupied</TableCell>
            <TableCell sx={{ fontWeight: 'bold', padding: '12px 16px' }}>Lease Expiry Timing</TableCell>
            <TableCell sx={{ fontWeight: 'bold', padding: '12px 16px' }}>Min/Max Size Needed</TableCell>
            <TableCell sx={{ fontWeight: 'bold', padding: '12px 16px' }}>Preferred Submarkets</TableCell>
            <TableCell sx={{ fontWeight: 'bold', padding: '12px 16px' }} align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.slice(0, displayCount).map((row) => (
            <TableRow
              key={row.id}
              sx={{
                '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover },
                '&:last-child td, &:last-child th': { border: 0 },
                '&:hover': { backgroundColor: theme.palette.action.selected },
              }}
            >
              <TableCell component="th" scope="row" sx={{ padding: '12px 16px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => handleWatchlistToggle(row.id)}
                    sx={{
                      color: watchlist.has(row.id) ? 'warning.main' : 'action.active',
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    {watchlist.has(row.id) ? <StarIcon /> : <StarBorderIcon />}
                  </IconButton>
                  {row.company}
                </Box>
              </TableCell>
              <TableCell sx={{ padding: '12px 16px' }}>
                <Tooltip title="AI-driven demand score based on market activity, growth, and trends.">
                  <Chip
                    label={row.demandScore}
                    size="small"
                    sx={{
                      backgroundColor: getSellProbColor(row.demandScore),
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  />
                </Tooltip>
              </TableCell>
              <TableCell sx={{ padding: '12px 16px' }}>{row.currentSqFtOccupied}</TableCell>
              <TableCell sx={{ padding: '12px 16px' }}>{row.leaseExpiryTiming}</TableCell>
              <TableCell sx={{ padding: '12px 16px' }}>{row.minMaxSizeNeeded}</TableCell>
              <TableCell sx={{ padding: '12px 16px' }}>{row.preferredSubmarkets}</TableCell>
              <TableCell align="right" sx={{ padding: '12px 16px' }}>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={(event) => handleMenuClick(event, row)}
                >
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {filteredData.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} align="center" sx={{ padding: '20px' }}>
                No tenants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {displayCount < filteredData.length && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <Button onClick={handleLoadMore} variant="outlined">
            Load More
          </Button>
        </Box>
      )}
      {renderMenu()}
    </TableContainer>
  );

  const renderBuyerTable = () => (
    <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
      <Table sx={{ minWidth: 650 }} aria-label="buyer table">
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
            <TableCell sx={{ fontWeight: 'bold', padding: '12px 16px' }}>Buyer Name/Investment Company</TableCell>
            <TableCell sx={{ fontWeight: 'bold', padding: '12px 16px' }}>Demand Score</TableCell>
            <TableCell sx={{ fontWeight: 'bold', padding: '12px 16px' }}>Target Asset Types</TableCell>
            <TableCell sx={{ fontWeight: 'bold', padding: '12px 16px' }}>Preferred Markets</TableCell>
            <TableCell sx={{ fontWeight: 'bold', padding: '12px 16px' }}>Preferred Deal Size</TableCell>
            <TableCell sx={{ fontWeight: 'bold', padding: '12px 16px' }}>Historical Closing Pace</TableCell>
            <TableCell sx={{ fontWeight: 'bold', padding: '12px 16px' }} align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.slice(0, displayCount).map((row) => (
            <TableRow
              key={row.id}
              sx={{
                '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover },
                '&:last-child td, &:last-child th': { border: 0 },
                '&:hover': { backgroundColor: theme.palette.action.selected },
              }}
            >
              <TableCell component="th" scope="row" sx={{ padding: '12px 16px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => handleWatchlistToggle(row.id)}
                    sx={{
                      color: watchlist.has(row.id) ? 'warning.main' : 'action.active',
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    {watchlist.has(row.id) ? <StarIcon /> : <StarBorderIcon />}
                  </IconButton>
                  {row.buyerName}
                </Box>
              </TableCell>
              <TableCell sx={{ padding: '12px 16px' }}>
                <Tooltip title="AI-driven demand score based on investment criteria, past activity, and market signals.">
                  <Chip
                    label={row.demandScore}
                    size="small"
                    sx={{
                      backgroundColor: getSellProbColor(row.demandScore),
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  />
                </Tooltip>
              </TableCell>
              <TableCell sx={{ padding: '12px 16px' }}>{row.targetAssetTypes}</TableCell>
              <TableCell sx={{ padding: '12px 16px' }}>{row.preferredMarkets}</TableCell>
              <TableCell sx={{ padding: '12px 16px' }}>{row.preferredDealSize}</TableCell>
              <TableCell sx={{ padding: '12px 16px' }}>{row.historicalClosingPace}</TableCell>
              <TableCell align="right" sx={{ padding: '12px 16px' }}>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={(event) => handleMenuClick(event, row)}
                >
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {filteredData.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} align="center" sx={{ padding: '20px' }}>
                No buyers found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {displayCount < filteredData.length && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <Button onClick={handleLoadMore} variant="outlined">
            Load More
          </Button>
        </Box>
      )}
      {renderMenu()}
    </TableContainer>
  );

  const renderMenu = () => (
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
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
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
      <MenuItem onClick={() => handleViewDetails(selectedRow)}>
        <ListItemIcon>
          <InfoIcon fontSize="small" />
        </ListItemIcon>
        View Details
      </MenuItem>
      <MenuItem onClick={() => handleEmailOwner(selectedRow)}>
        <ListItemIcon>
          <EmailIcon fontSize="small" />
        </ListItemIcon>
        Send Email
      </MenuItem>
      <MenuItem onClick={() => handleExportFlyer(selectedRow)}>
        <ListItemIcon>
          <DownloadIcon fontSize="small" />
        </ListItemIcon>
        Export Flyer
      </MenuItem>
      <MenuItem onClick={() => handleWatchlistToggle(selectedRow?.id)}>
        <ListItemIcon>
          {watchlist.has(selectedRow?.id) ? (
            <StarIcon fontSize="small" />
          ) : (
            <StarBorderIcon fontSize="small" />
          )}
        </ListItemIcon>
        {watchlist.has(selectedRow?.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
      </MenuItem>
    </Menu>
  );

  const getTableContent = () => {
    if (selectedRole === 'properties') {
      return renderPropertiesTable();
    } else if (selectedRole === 'tenant') {
      return renderTenantTable();
    } else if (selectedRole === 'buyer') {
      return renderBuyerTable();
    }
    return null;
  };

  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      background: `linear-gradient(145deg, ${theme.palette.background.default}, ${theme.palette.grey[50]})`,
      borderRadius: theme.shape.borderRadius * 2,
      overflow: 'hidden',
    }}>
      {/* Top Bar - Search and Export */}
      <Box 
        sx={{ 
          p: 2, 
          borderBottom: 1, 
          borderColor: 'divider', 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <SearchTextField
          fullWidth
          placeholder={`Search ${selectedRole}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
          }}
        />
        <GradientButton 
          startIcon={<DownloadIcon />}
        >
          Export CSV
        </GradientButton>
      </Box>

      {/* Table */}
      <StyledTableContainer>
        <Table>
          <StyledTableHead>
            {/* ... existing table head content ... */}
          </StyledTableHead>
          <TableBody>
            {displayedData.map((row) => (
              <StyledTableRow key={row.id}>
                {/* ... existing table cell content ... */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      {hasMore && (
        <Box 
          sx={{ 
            p: 2, 
            textAlign: 'center', 
            borderTop: 1, 
            borderColor: 'divider',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <GradientButton 
            onClick={() => setDisplayCount(prev => prev + ROWS_PER_PAGE)}
            variant="outlined"
            sx={{
              background: 'transparent',
              border: `1px solid ${theme.palette.primary.main}`,
              color: theme.palette.primary.main,
              '&:hover': {
                background: 'rgba(99, 102, 241, 0.04)',
                border: `1px solid ${theme.palette.primary.dark}`,
                color: theme.palette.primary.dark,
              },
            }}
          >
            Load More
          </GradientButton>
        </Box>
      )}
    </Box>
  );
};

export default ProspectsTable; 