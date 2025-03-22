import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
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
  CircularProgress,
  Modal,
  TablePagination,
} from "@mui/material";
import { Search, ArrowForward, Message, Close, Delete } from "@mui/icons-material";
import { viewUsers, sendNotification } from "../../../Services/allApi";
import { deleteUser } from "../../../Services/allApi"; // Import the deleteUser API function
import * as XLSX from "xlsx"; // Import the xlsx library

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // State for delete confirmation modal
  const [userToDelete, setUserToDelete] = useState(null); // State to store the user to delete
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [page, setPage] = useState(0); // Pagination state
  const [rowsPerPage, setRowsPerPage] = useState(20); // Rows per page state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await viewUsers();
        setUsers(data);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Filtered users based on search query
  const filteredUsers = users.filter((user) => {
    const searchText = searchQuery.toLowerCase();
    return (
      user.name?.toLowerCase().includes(searchText) ||
      user.email?.toLowerCase().includes(searchText) ||
      user.phone?.toLowerCase().includes(searchText)
    );
  });

  // Pagination handler
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page is changed
  };

  const stats = [
    { title: "Total Users", value: users.length },
    { title: "Active Users", value: users.filter((user) => user.is_active).length },
    { title: "Inactive Users", value: users.filter((user) => !user.is_active).length },
  ];

  const handleOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setMessage("");
  };

  const handleSendMessage = async () => {
    if (!selectedUser || !title || !message) return;

    setSending(true);
    try {
      const payload = {
        userId: selectedUser._id,
        title,
        message,
      };
      await sendNotification(payload);
      alert("Message sent successfully");
      handleClose();
    } catch (error) {
      alert("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  // Open delete confirmation modal
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  // Close delete confirmation modal
  const handleDeleteClose = () => {
    setDeleteModalOpen(false);
    setUserToDelete(null);
  };

  // Handle user deletion
  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser({}, userToDelete._id); // Call the deleteUser API
      setUsers(users.filter((user) => user._id !== userToDelete._id)); // Update the UI
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Failed to delete user");
    } finally {
      handleDeleteClose();
    }
  };

  // Export users to Excel
  const handleExport = () => {
    const worksheetData = users.map((user) => ({
      Name: user.name,
      Email: user.email,
      Phone: user.phone,
      "Is Verified": user.isVerified ? "Yes" : "No",
      "Active Member": user.is_active ? "Yes" : "No",
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "users.xlsx");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        User Management
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search users by name, email, or phone number etc..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: "#f5f5f5",
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "transparent" },
              "&:hover fieldset": { borderColor: "transparent" },
            },
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#4CAF50",
            "&:hover": { backgroundColor: "#45a049" },
          }}
          onClick={handleExport} // Add the export handler
        >
          Export
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
        {stats.map((stat, index) => (
          <Card key={index} sx={{ p: 2, minWidth: 150, borderRadius: 2 }}>
            <Typography color="text.secondary" variant="body2" sx={{ mb: 1 }}>
              {stat.title}
            </Typography>
            <Typography variant="h4" sx={{ mb: 1 }}>
              {stat.value}
            </Typography>
          </Card>
        ))}
      </Box>

      {loading ? (
        <Box sx={{ textAlign: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>#</b></TableCell>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>Message</b></TableCell>
                <TableCell><b>Is Verified</b></TableCell>
                <TableCell><b>Active Member</b></TableCell>
                <TableCell><b>Action</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {filteredUsers.length > 0 ? (
    filteredUsers
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((user, index, array) => (
        <TableRow key={user._id} sx={{ "& td": { borderColor: "#f0f0f0" } }}>
          <TableCell style={{ textAlign: "center" }}>
            {array.length - index + page * rowsPerPage}
          </TableCell>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>
            <IconButton onClick={() => handleOpen(user)}>
              <Message sx={{ color: "#666" }} />
            </IconButton>
          </TableCell>
          <TableCell>{user.isVerified ? "Yes" : "No"}</TableCell>
          <TableCell>{user.is_active ? "Yes" : "No"}</TableCell>
          <TableCell>
            <IconButton
              size="small"
              onClick={() => handleDeleteClick(user)}
              sx={{ color: "#ff4444" }}
            >
              <Delete />
            </IconButton>
          </TableCell>
        </TableRow>
      ))
  ) : (
    <TableRow>
      <TableCell colSpan={7} sx={{ textAlign: "center", color: "gray", py: 3 }}>
        No Data Found
      </TableCell>
    </TableRow>
  )}
</TableBody>

          </Table>
        </TableContainer>

      )}

      {/* Pagination */}
      <TablePagination
        component="div"
        count={filteredUsers.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Send Message Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">Send Message</Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
          <Typography variant="subtitle2" color="text.secondary">
            To: {selectedUser?.name}
          </Typography>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            sx={{ my: 2 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            fullWidth
            label="Message"
            variant="outlined"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#4CAF50" }}
            onClick={handleSendMessage}
            disabled={sending}
          >
            {sending ? <CircularProgress size={24} color="inherit" /> : "Send"}
          </Button>
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={deleteModalOpen} onClose={handleDeleteClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Confirm Deletion
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Are you sure you want to delete {userToDelete?.name}?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" onClick={handleDeleteClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteUser}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default UserManagement;