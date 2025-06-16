import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Chip,
  Menu,
  Link,
  Tooltip,
  ListItemIcon,
} from '@mui/material';
import {
  Search as SearchIcon,
  Download as DownloadIcon,
  Email as EmailIcon,
  PictureAsPdf as PdfIcon,
  MoreVert as MoreVertIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Visibility as ViewDetailsIcon,
  MailOutline as MailOutlineIcon,
  Description as DescriptionIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Construction as ConstructionIcon,
} from '@mui/icons-material';
import { styled } from '@mui/system';

// Mock data for demonstration
const mockData = [
  {
    id: 1,
    address: '123 Main St, Anytown USA',
    owner: 'John Doe',
    sellProbability: 0.85,
    lastUpdated: '2024-03-15',
    submarket: 'Manhattan',
    assetType: 'Office',
    scoreBand: 'A',
    leaseExpiry: true,
    permitActivity: 'Active',
    imageUrl: '../public/property.jpeg',
  },
  {
    id: 2,
    address: '456 Oak Ave, Anytown USA',
    owner: 'Jane Smith',
    sellProbability: 0.60,
    lastUpdated: '2024-03-14',
    submarket: 'Brooklyn',
    assetType: 'Retail',
    scoreBand: 'B',
    leaseExpiry: false,
    permitActivity: 'None',
    imageUrl: '../public/property.jpeg',
  },
  {
    id: 3,
    address: '789 Pine Ln, Anytown USA',
    owner: 'Alice Johnson',
    sellProbability: 0.92,
    lastUpdated: '2024-03-13',
    submarket: 'Queens',
    assetType: 'Industrial',
    scoreBand: 'A',
    leaseExpiry: true,
    permitActivity: 'Pending',
    imageUrl: '../public/property.jpeg',
  },
  {
    id: 4,
    address: '101 Elm St, Anytown USA',
    owner: 'Bob Williams',
    sellProbability: 0.45,
    lastUpdated: '2024-03-12',
    submarket: 'Manhattan',
    assetType: 'Residential',
    scoreBand: 'C',
    leaseExpiry: false,
    permitActivity: 'Active',
    imageUrl: '../public/property.jpeg',
  },
  {
    id: 5,
    address: '202 Maple Dr, Anytown USA',
    owner: 'Charlie Brown',
    sellProbability: 0.70,
    lastUpdated: '2024-03-11',
    submarket: 'Bronx',
    assetType: 'Mixed-Use',
    scoreBand: 'B',
    leaseExpiry: true,
    permitActivity: 'None',
    imageUrl: '../public/property.jpeg',
  },
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[5],
  marginBottom: theme.spacing(3),
  background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`,
  padding: theme.spacing(3),
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[15],
    transform: 'translateY(-5px)',
  },
}));

const VibrantChip = styled(Chip)(({ theme, color = 'default' }) => ({
  fontWeight: 'bold',
  // Custom gradient for 'A' score band for example
  ...(color === 'success' && {
    background: `linear-gradient(45deg, ${theme.palette.success.light} 30%, ${theme.palette.success.main} 90%)`,
    color: theme.palette.common.white,
  }),
  ...(color === 'warning' && {
    background: `linear-gradient(45deg, ${theme.palette.warning.light} 30%, ${theme.palette.warning.main} 90%)`,
    color: theme.palette.common.white,
  }),
  ...(color === 'error' && {
    background: `linear-gradient(45deg, ${theme.palette.error.light} 30%, ${theme.palette.error.main} 90%)`,
    color: theme.palette.common.white,
  }),
}));

const getSellProbabilityColor = (probability) => {
  if (probability > 0.8) return 'success';
  if (probability > 0.5) return 'warning';
  return 'error';
};

const WatchlistPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    submarket: '',
    assetType: '',
    scoreBand: '',
    leaseExpiry: false,
    permitActivity: '',
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  // Filter options
  const submarkets = ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'];
  const assetTypes = ['Office', 'Retail', 'Industrial', 'Residential', 'Mixed-Use'];
  const scoreBands = ['A', 'B', 'C', 'D'];
  const permitActivities = ['Active', 'Pending', 'None'];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(mockData.map((row) => row.id));
    } else {
      setSelected([]);
    }
  };

  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleRowMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleRowMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const filteredData = mockData.filter((row) => {
    const matchesSearch = row.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilters = 
      (filters.submarket ? row.submarket === filters.submarket : true) &&
      (filters.assetType ? row.assetType === filters.assetType : true) &&
      (filters.scoreBand ? row.scoreBand === filters.scoreBand : true) &&
      (filters.leaseExpiry ? row.leaseExpiry : true) &&
      (filters.permitActivity ? row.permitActivity === filters.permitActivity : true);
    return matchesSearch && matchesFilters;
  });

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200">
                <BusinessIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Your Watchlist
                </h1>
                <p className="text-slate-600 mt-1">Track and manage your property interests</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                <DownloadIcon className="w-4 h-4" />
                <span className="font-medium">Export</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                <EmailIcon className="w-4 h-4" />
                <span className="font-medium">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by address or owner"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors hover:border-slate-300"
              />
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
            </div>
            
            <select
              value={filters.submarket}
              onChange={(e) => handleFilterChange('submarket', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors hover:border-slate-300"
            >
              <option value="">All Submarkets</option>
              {submarkets.map((submarket) => (
                <option key={submarket} value={submarket}>{submarket}</option>
              ))}
            </select>

            <select
              value={filters.assetType}
              onChange={(e) => handleFilterChange('assetType', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors hover:border-slate-300"
            >
              <option value="">All Asset Types</option>
              {assetTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={filters.scoreBand}
              onChange={(e) => handleFilterChange('scoreBand', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors hover:border-slate-300"
            >
              <option value="">All Score Bands</option>
              {scoreBands.map((band) => (
                <option key={band} value={band}>{band}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Properties List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-slate-200/50 bg-gradient-to-r from-slate-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selected.length === mockData.length}
                    onChange={handleSelectAllClick}
                    className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm font-medium text-slate-700">
                    Select All ({mockData.length})
                  </span>
                </label>
                {selected.length > 0 && (
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                    {selected.length} selected
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-200/50">
            {filteredData.map((row) => {
              const isItemSelected = isSelected(row.id);
              
              return (
                <div
                  key={row.id}
                  className="p-6 hover:bg-gradient-to-r hover:from-slate-50 hover:to-white transition-all duration-200"
                >
                  <div className="flex items-start space-x-4">
                    <label className="flex items-center mt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isItemSelected}
                        onChange={() => handleClick(row.id)}
                        className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                      />
                    </label>

                    {/* Property Image */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-all duration-200">
                      <img
                        src={row.imageUrl}
                        alt={row.address}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-semibold text-slate-900">{row.address}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              row.scoreBand === 'A' ? 'bg-green-100 text-green-800' :
                              row.scoreBand === 'B' ? 'bg-blue-100 text-blue-800' :
                              row.scoreBand === 'C' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              Score {row.scoreBand}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-1 text-slate-600">
                              <PersonIcon className="w-4 h-4" />
                              <span className="text-sm">{row.owner}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-slate-600">
                              <LocationIcon className="w-4 h-4" />
                              <span className="text-sm">{row.submarket}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-slate-600">
                              <BusinessIcon className="w-4 h-4" />
                              <span className="text-sm">{row.assetType}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-1">
                              <span className="text-sm font-medium text-slate-700">Sell Probability:</span>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                row.sellProbability > 0.8 ? 'bg-green-100 text-green-800' :
                                row.sellProbability > 0.5 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {Math.round(row.sellProbability * 100)}%
                              </span>
                            </div>
                            {row.leaseExpiry && (
                              <div className="flex items-center space-x-1 text-amber-600">
                                <CalendarIcon className="w-4 h-4" />
                                <span className="text-sm">Lease Expiring</span>
                              </div>
                            )}
                            {row.permitActivity !== 'None' && (
                              <div className="flex items-center space-x-1 text-blue-600">
                                <ConstructionIcon className="w-4 h-4" />
                                <span className="text-sm">{row.permitActivity} Permits</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => handleRowMenuOpen(e, row)}
                            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <MoreVertIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredData.length === 0 && (
            <div className="p-12 text-center">
              <div className="p-4 bg-slate-100 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BusinessIcon className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No properties found</h3>
              <p className="text-slate-600">Try adjusting your search or filters to find what you're looking for.</p>
            </div>
          )}
        </div>
      </div>

      {/* Row Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleRowMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            borderRadius: 2,
            mt: 1,
          },
        }}
      >
        <MenuItem onClick={handleRowMenuClose}>
          <ListItemIcon>
            <ViewDetailsIcon fontSize="small" />
          </ListItemIcon>
          View Details
        </MenuItem>
        <MenuItem onClick={handleRowMenuClose}>
          <ListItemIcon>
            <MailOutlineIcon fontSize="small" />
          </ListItemIcon>
          Contact Owner
        </MenuItem>
        <MenuItem onClick={handleRowMenuClose}>
          <ListItemIcon>
            <DescriptionIcon fontSize="small" />
          </ListItemIcon>
          View Documents
        </MenuItem>
      </Menu>
    </div>
  );
};

export default WatchlistPage; 