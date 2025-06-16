import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  Typography,
  styled,
  IconButton,
  Tooltip,
  Chip,
  Link,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Button,
  useTheme,
  CircularProgress
} from '@mui/material';
import {
  Search as SearchIcon,
  Download as DownloadIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Warning as WarningIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import { watchlistService } from '../../services/watchlistService';
import { propertiesData, tenantData, buyerData } from '../../data/mockData';

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  overflow: 'hidden',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const DashboardTable = ({ selectedRole, filters = {} }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [watchlist, setWatchlist] = useState(new Set());
  const [loadingWatchlist, setLoadingWatchlist] = useState(true);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // TODO: Replace with actual user ID from auth context
  const userId = 'current-user-id';

  useEffect(() => {
    fetchWatchlistStatus();
  }, []);

  useEffect(() => {
    setLoading(true);
    // Simulate data loading
    setTimeout(() => {
      switch (selectedRole) {
        case 'properties':
          setData(propertiesData || []);
          break;
        case 'tenant':
          setData(tenantData || []);
          break;
        case 'buyer':
          setData(buyerData || []);
          break;
        default:
          setData([]);
      }
      setLoading(false);
    }, 100);
  }, [selectedRole]);

  const fetchWatchlistStatus = async () => {
    try {
      setLoadingWatchlist(true);
      const watchlistItems = await watchlistService.getWatchlist(userId);
      const watchlistSet = new Set(watchlistItems.map(item => item.itemId));
      setWatchlist(watchlistSet);
    } catch (error) {
      console.error('Error fetching watchlist status:', error);
    } finally {
      setLoadingWatchlist(false);
    }
  };

  useEffect(() => {
    let filtered = [...data];

    // Apply filters
    if (filters.type) {
      filtered = filtered.filter(item => item.type === filters.type);
    }

    if (filters.location) {
      filtered = filtered.filter(item => item.location?.includes(filters.location));
    }

    if (selectedRole === 'properties' && filters.priceRange) {
      const [min, max] = filters.priceRange;
      filtered = filtered.filter(item => {
        const price = item.price;
        return price >= min && price <= max;
      });
    }

    if (filters.scoreRange) {
      const [min, max] = filters.scoreRange;
      filtered = filtered.filter(item => {
        const score = selectedRole === 'properties' ? item.sellProb : item.demandScore;
        return score >= min && score <= max;
      });
    }

    if (filters.status) {
      filtered = filtered.filter(item => item.status === filters.status);
    }

    if (filters.dateRange && filters.dateRange[0] && filters.dateRange[1]) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.lastContact);
        return itemDate >= filters.dateRange[0] && itemDate <= filters.dateRange[1];
      });
    }

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        Object.values(item).some(value =>
          value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    setFilteredData(filtered);
  }, [data, filters, searchQuery, selectedRole]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleWatchlistToggle = async (itemId) => {
    try {
      const item = data.find(i => i.id === itemId);
      if (!item) return;

      if (watchlist.has(itemId)) {
        await watchlistService.removeFromWatchlist(userId, itemId);
        setWatchlist(prev => {
          const next = new Set(prev);
          next.delete(itemId);
          return next;
        });
      } else {
        await watchlistService.addToWatchlist(userId, {
          ...item,
          type: selectedRole
        });
        setWatchlist(prev => new Set([...prev, itemId]));
      }
    } catch (error) {
      console.error('Error toggling watchlist:', error);
    }
  };

  const handleMenuClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleAction = (action) => {
    console.log(`Action ${action} for item:`, selectedItem);
    handleMenuClose();
  };

  const getTableHeaders = () => {
    return [
      'Address',
      'Owner / Company',
      'Building Sq Ft',
      'Occupancy %',
      'Sell Probability',
      'Lease Expiry',
      'Watchlist',
      'Actions'
    ];
  };

  const getLeaseExpiryText = (expirationDate) => {
    if (!expirationDate) return '-';
    const expiry = new Date(expirationDate);
    const now = new Date();
    const monthsRemaining = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24 * 30));
    
    if (monthsRemaining <= 0) return 'Expired';
    if (monthsRemaining < 1) return '< 1 mo';
    return `${monthsRemaining} mo`;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'success';
    if (score >= 80) return 'primary';
    return 'warning';
  };

  const handleRowClick = (itemId) => {
    navigate(`/property/${itemId}`);
  };

  const renderCellContent = (item, header) => {
    switch (header) {
      case 'Address':
        return (
          <StyledLink href={`/property/${item.id}`}>
            {item.location}
          </StyledLink>
        );
      case 'Owner / Company':
        return (
          <StyledLink href={`/company/${item.id}`}>
            {item.name}
          </StyledLink>
        );
      case 'Building Sq Ft':
        return item.size || '-';
      case 'Occupancy %':
        return item.occupancy || '-';
      case 'Sell Probability':
        return (
          <Tooltip title={`AI Score: ${item.score}% - Based on market conditions, property performance, and historical data`}>
            <Chip
              label={`${item.score}%`}
              color={getScoreColor(item.score)}
              size="small"
            />
          </Tooltip>
        );
      case 'Lease Expiry':
        const expiryText = getLeaseExpiryText(item.leaseExpiration);
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {expiryText !== '-' && (
              <Chip
                label={expiryText}
                color={expiryText === 'Expired' ? 'error' : expiryText.includes('<') ? 'warning' : 'default'}
                size="small"
                variant={expiryText === 'Expired' ? 'filled' : 'outlined'}
              />
            )}
          </Box>
        );
      case 'Watchlist':
        return (
          <IconButton
            size="small"
            onClick={() => handleWatchlistToggle(item.id)}
            disabled={loadingWatchlist}
            sx={{
              color: watchlist.has(item.id) ? 'warning.main' : 'action.active',
            }}
          >
            {watchlist.has(item.id) ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        );
      case 'Actions':
        return (
          <>
            <IconButton
              size="small"
              onClick={(e) => handleMenuClick(e, item)}
              sx={{ color: 'action.active' }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  mt: 1,
                  minWidth: 180,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                },
              }}
            >
              <MenuItem onClick={() => handleAction('edit')}>
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handleAction('share')}>
                <ListItemIcon>
                  <ShareIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Share</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handleAction('delete')} sx={{ color: 'error.main' }}>
                <ListItemIcon>
                  <DeleteIcon fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
            </Menu>
          </>
        );
      default:
        return '-';
    }
  };

  const renderPropertiesTable = () => (
    <>
      <TableHead>
        <TableRow>
          <TableCell>Address</TableCell>
          <TableCell>Owner</TableCell>
          <TableCell align="right">SF</TableCell>
          <TableCell align="right">Occupancy %</TableCell>
          <TableCell align="center">Sell-Prob</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
          <TableRow
            key={row.id}
            hover
            onClick={() => handleRowClick(row.id)}
            sx={{ cursor: 'pointer' }}
          >
            <TableCell>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWatchlistToggle(row.id);
                  }}
                  sx={{ 
                    color: watchlist.has(row.id) ? 'warning.main' : 'action.active',
                  }}
                >
                  {watchlist.has(row.id) ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
                {row.address}
              </Box>
            </TableCell>
            <TableCell>{row.owner}</TableCell>
            <TableCell align="right">{row.sf?.toLocaleString() || '0'}</TableCell>
            <TableCell align="right">{row.occupancy || '0'}%</TableCell>
            <TableCell align="center">
              <Chip
                label={row.sellProb || '0'}
                color={row.sellProb >= 75 ? 'success' : row.sellProb >= 50 ? 'warning' : 'error'}
                size="small"
              />
            </TableCell>
            <TableCell align="center">
              <IconButton size="small">
                <DownloadIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );

  const renderTenantTable = () => (
    <>
      <TableHead>
        <TableRow>
          <TableCell>Company</TableCell>
          <TableCell>Location</TableCell>
          <TableCell align="right">Required SF</TableCell>
          <TableCell align="right">Budget</TableCell>
          <TableCell align="center">Demand Score</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
          <TableRow
            key={row.id}
            hover
            onClick={() => handleRowClick(row.id)}
            sx={{ cursor: 'pointer' }}
          >
            <TableCell>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWatchlistToggle(row.id);
                  }}
                  sx={{ 
                    color: watchlist.has(row.id) ? 'warning.main' : 'action.active',
                  }}
                >
                  {watchlist.has(row.id) ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
                {row.company}
              </Box>
            </TableCell>
            <TableCell>{row.location}</TableCell>
            <TableCell align="right">{row.requiredSF?.toLocaleString() || '0'}</TableCell>
            <TableCell align="right">${row.budget?.toLocaleString() || '0'}</TableCell>
            <TableCell align="center">
              <Chip
                label={row.demandScore || '0'}
                color={row.demandScore >= 75 ? 'success' : row.demandScore >= 50 ? 'warning' : 'error'}
                size="small"
              />
            </TableCell>
            <TableCell align="center">
              <IconButton size="small">
                <DownloadIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );

  const renderBuyerTable = () => (
    <>
      <TableHead>
        <TableRow>
          <TableCell>Company</TableCell>
          <TableCell>Investment Type</TableCell>
          <TableCell align="right">Target Size</TableCell>
          <TableCell align="right">Budget</TableCell>
          <TableCell align="center">Interest Score</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
          <TableRow
            key={row.id}
            hover
            onClick={() => handleRowClick(row.id)}
            sx={{ cursor: 'pointer' }}
          >
            <TableCell>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWatchlistToggle(row.id);
                  }}
                  sx={{ 
                    color: watchlist.has(row.id) ? 'warning.main' : 'action.active',
                  }}
                >
                  {watchlist.has(row.id) ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
                {row.company}
              </Box>
            </TableCell>
            <TableCell>{row.investmentType}</TableCell>
            <TableCell align="right">{row.targetSize?.toLocaleString() || '0'}</TableCell>
            <TableCell align="right">${row.budget?.toLocaleString() || '0'}</TableCell>
            <TableCell align="center">
              <Chip
                label={row.interestScore || '0'}
                color={row.interestScore >= 75 ? 'success' : row.interestScore >= 50 ? 'warning' : 'error'}
                size="small"
              />
            </TableCell>
            <TableCell align="center">
              <IconButton size="small">
                <DownloadIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          size="small"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          sx={{
            width: '300px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.9)',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <GradientButton onClick={() => console.log('Exporting data...')}>
          <DownloadIcon />
          Export CSV
        </GradientButton>
      </Box>

      <StyledPaper>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            {selectedRole === 'properties' && renderPropertiesTable()}
            {selectedRole === 'tenant' && renderTenantTable()}
            {selectedRole === 'buyer' && renderBuyerTable()}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </StyledPaper>
    </Box>
  );
};

export default DashboardTable; 