import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, CircularProgress } from '@mui/material';
import { viewAllOrders } from '../../../Services/allApi';

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await viewAllOrders();
        const sortedOrders = response.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sortedOrders.slice(0, 10));
      } catch (error) {
        setError('Failed to load orders');
      } finally {
        setLoading(false)
      }
    };
    fetchOrders();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Latest Orders
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: '#000' }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#000' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#000' }}>Pixels</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#000' }}>Payment</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#000' }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#000' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#000' }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id} sx={{ '& td': { borderColor: '#f0f0f0' } }}>
                  <TableCell sx={{ color: '#666' }}>{order.name}</TableCell>
                  <TableCell sx={{ color: '#666' }}>{order.email}</TableCell>
                  <TableCell sx={{ color: '#666' }}>{order.noOfPixels}</TableCell>

                  {/* Payment Method OR Payment Received Status */}
                  <TableCell sx={{ color: '#666' }}>
                    {order.isAdminOrder ? (
                      <Typography sx={{ fontWeight: 500, color: order.paymentReceived ? '#4CAF50' : '#F44336' }}>
                        {order.paymentReceived ? 'Received' : 'Not Received'}
                      </Typography>
                    ) : (
                      order.paymentMethod || 'N/A'
                    )}
                  </TableCell>

                  <TableCell sx={{ color: '#666' }}>{order.totalPrice} $</TableCell>
                  <TableCell>
                    <Typography sx={{ color: '#4CAF50', fontWeight: 500 }}>
                      {order.paymentStatus}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: '#666' }}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default OrdersTable;