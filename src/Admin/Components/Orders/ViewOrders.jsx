import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  InputAdornment,
  Modal,
  TablePagination,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Search, Delete } from '@mui/icons-material';
import { deleteOrder, viewAllOrders } from '../../../Services/allApi';
import { BASE_URL } from '../../../Services/baseUrl';
import * as XLSX from 'xlsx'; // Import the xlsx library

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0); // Pagination state
  const [rowsPerPage, setRowsPerPage] = useState(20); // Rows per page state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isAdminOrderFilter, setIsAdminOrderFilter] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState(null); // State to store the order ID to delete
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State to control the delete confirmation dialog
  const [expandedMessageId, setExpandedMessageId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await viewAllOrders();
        setOrders(data);
        setFilteredOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const filtered = orders.filter((order) => {
      const searchText = searchQuery.toLowerCase();
      const matchesSearch =
        order.name?.toLowerCase().includes(searchText) ||
        order.email?.toLowerCase().includes(searchText) ||
        order.phone?.toLowerCase().includes(searchText);

      const matchesDateRange =
        (!startDate || new Date(order.createdAt) >= new Date(startDate)) &&
        (!endDate || new Date(order.createdAt) <= new Date(endDate));

      const matchesAdminOrder = !isAdminOrderFilter || order.isAdminOrder === true;

      return matchesSearch && matchesDateRange && matchesAdminOrder;
    });
    setFilteredOrders(filtered);
  }, [searchQuery, orders, startDate, endDate, isAdminOrderFilter]);

  const handleViewFiles = (files) => {
    setSelectedFiles(files);
    setOpenModal(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page is changed
  };

  const handleExport = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert filteredOrders to a worksheet
    const worksheetData = filteredOrders.map((order) => ({
      Name: order.name,
      'Mobile Number': order.phone,
      Email: order.email,
      Country: order.country,
      'No. of Pixels': order.noOfPixels,
      Company: order.companyName,
      'Organic Lead': order.organicLead,
      'Order Date': order.createdAt,
      Message: order.message,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');

    // Generate the Excel file and trigger download
    XLSX.writeFile(workbook, 'orders.xlsx');
  };

  const handleDeleteOrder = async () => {
    if (!deleteOrderId) return;

    try {
      await deleteOrder({}, deleteOrderId); // Call the delete API
      setOrders(orders.filter((order) => order._id !== deleteOrderId)); // Update the orders state
      setFilteredOrders(filteredOrders.filter((order) => order._id !== deleteOrderId)); // Update the filtered orders state
      setOpenDeleteDialog(false); // Close the confirmation dialog
    } catch (error) {
      console.error('Failed to delete order:', error);
    }
  };

  const handleDeleteClick = (orderId) => {
    setDeleteOrderId(orderId); // Set the order ID to delete
    setOpenDeleteDialog(true); // Open the confirmation dialog
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Orders
      </Typography>

      {/* Filters Section */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          fullWidth
          placeholder="Search orders by name, email, or phone number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: '#f5f5f5',
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'transparent' },
              '&:hover fieldset': { borderColor: 'transparent' },
            },
            flex: 1,
            minWidth: '200px',
          }}
        />

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{
            padding: '12px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            minWidth: '150px',
          }}
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{
            padding: '12px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            minWidth: '150px',
          }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={isAdminOrderFilter}
              onChange={(e) => setIsAdminOrderFilter(e.target.checked)}
              color="primary"
            />
          }
          label="Admin Orders Only"
          sx={{ ml: 2 }}
        />

        <Button
          variant="contained"
          sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45a049' } }}
          onClick={handleExport} // Add the export handler
        >
          Export
        </Button>
      </Box>

      {/* Orders Table */}
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell style={{ whiteSpace: 'nowrap', textAlign: 'center' }}><b>#</b></TableCell>
              <TableCell style={{ whiteSpace: 'nowrap', textAlign: 'center' }}><b>Name</b></TableCell>
              <TableCell style={{ whiteSpace: 'nowrap', textAlign: 'center' }}><b>Mobile Number</b></TableCell>
              <TableCell style={{ whiteSpace: 'nowrap', textAlign: 'center' }}><b>Email</b></TableCell>
              <TableCell style={{ whiteSpace: 'nowrap', textAlign: 'center' }}><b>Country</b></TableCell>
              <TableCell style={{ whiteSpace: 'nowrap', textAlign: 'center' }}><b>No. of Pixels</b></TableCell>
              <TableCell style={{ whiteSpace: 'nowrap', textAlign: 'center' }}><b>Company</b></TableCell>
              <TableCell style={{ whiteSpace: 'nowrap', textAlign: 'center' }}><b>Organic Lead</b></TableCell>
              <TableCell style={{ whiteSpace: 'nowrap', textAlign: 'center' }}><b>Order Date</b></TableCell>
              <TableCell style={{ whiteSpace: 'nowrap', textAlign: 'center' }}><b>Message</b></TableCell>
              <TableCell style={{ whiteSpace: 'nowrap', textAlign: 'center' }}><b>Files</b></TableCell>
              <TableCell style={{ whiteSpace: 'nowrap', textAlign: 'center' }}><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order, index, array) => (
                <TableRow key={order._id} sx={{ '& td': { borderColor: '#f0f0f0' } }}>
                  <TableCell style={{ textAlign: 'center' }}>
                    {array.length - index + page * rowsPerPage}
                  </TableCell>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>{order.phone}</TableCell>
                  <TableCell>{order.email}</TableCell>
                  <TableCell>{order.country}</TableCell>
                  <TableCell>{order.noOfPixels}</TableCell>
                  <TableCell>{order.companyName}</TableCell>
                  <TableCell>{order.organicLead}</TableCell>
                  <TableCell>{order.organicLead}</TableCell>
                  <TableCell>
                    {order.message.length > 50 ? (
                      <>
                        {expandedMessageId === order._id ? (
                          <>
                            {order.message}
                            <Button size="small" onClick={() => setExpandedMessageId(null)}>View Less</Button>
                          </>
                        ) : (
                          <>
                            {order.message.slice(0, 50)}...
                            <Button size="small" onClick={() => setExpandedMessageId(order._id)}>View More</Button>
                          </>
                        )}
                      </>
                    ) : (
                      order.message
                    )}
                  </TableCell>
                  <TableCell>
                    {order.file.length > 0 ? (
                      <Button variant="outlined" size="small" onClick={() => handleViewFiles(order.file)}>
                        View Files
                      </Button>
                    ) : (
                      'No Files'
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      sx={{ color: '#d32f2f', ml: 1 }}
                      onClick={() => handleDeleteClick(order._id)} // Trigger delete confirmation
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={filteredOrders.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modal for File Preview */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ p: 4, backgroundColor: 'white', width: '60%', margin: 'auto', mt: 5, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>File Previews</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {selectedFiles.map((file, index) => {
              const fileExtension = file.split('.').pop().toLowerCase();
              const isVideo = ['mp4', 'webm', 'ogg'].includes(fileExtension);

              return (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {isVideo ? (
                    <video controls style={{ width: 100, height: 100, borderRadius: 1, objectFit: 'cover', marginBottom: '8px' }}>
                      <source src={`${BASE_URL}/${file}`} type={`video/${fileExtension}`} />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img src={`${BASE_URL}/${file}`} alt={`Preview ${index}`} style={{ width: 100, height: 100, borderRadius: 1, objectFit: 'cover', marginBottom: '8px' }} />
                  )}
                  <Button variant="contained" size="small" href={`${BASE_URL}/${file}`} target="_blank" download>
                    Download
                  </Button>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this order?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteOrder} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewOrders;