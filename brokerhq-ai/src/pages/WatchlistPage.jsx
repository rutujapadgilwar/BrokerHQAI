import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Tooltip,
  styled
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { watchlistService } from '../services/watchlistService';

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  overflow: 'hidden',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  background: 'rgba(255, 255, 255, 0.8)',
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
}));

const WatchlistPage = () => {
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: Replace with actual user ID from auth context
  const userId = 'current-user-id';

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      setLoading(true);
      const items = await watchlistService.getWatchlist(userId);
      setWatchlistItems(items);
      setError(null);
    } catch (err) {
      setError('Failed to fetch watchlist items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWatchlist = async (itemId) => {
    try {
      await watchlistService.removeFromWatchlist(userId, itemId);
      setWatchlistItems(items => items.filter(item => item.itemId !== itemId));
    } catch (err) {
      console.error('Error removing from watchlist:', err);
      // You might want to show a toast notification here
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading watchlist...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        My Watchlist
      </Typography>

      <StyledPaper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Type</StyledTableCell>
                <StyledTableCell>Location</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {watchlistItems.map((item) => (
                <TableRow key={item.itemId} hover>
                  <TableCell>{item.itemData.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.itemType}
                      color="primary"
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{item.itemData.location}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.itemData.status}
                      color={item.itemData.status === 'Active' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Remove from watchlist">
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveFromWatchlist(item.itemId)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {watchlistItems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography color="textSecondary">
                      No items in watchlist
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledPaper>
    </Box>
  );
};

export default WatchlistPage; 