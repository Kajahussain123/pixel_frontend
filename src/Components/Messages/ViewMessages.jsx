import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Stack, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility"; // Eye icon for "Mark as Read"
import { styled } from "@mui/system";
import { getNotifications, deleteNotification, markNotificationAsRead } from "../../Services/allApi";

const SideArrow = styled("img")({
  position: "absolute",
  width: "150px",
  height: "auto",
});

const UserMessages = () => {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setUserId(userId);
      fetchNotifications(userId);
    }
  }, []);

  const fetchNotifications = async (id) => {
    try {
      const data = await getNotifications(id);
      if (data && data.notifications) {
        setMessages(data.notifications);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Mark a notification as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === notificationId ? { ...msg, isRead: true } : msg
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  // Open confirmation modal
  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  // Close confirmation modal
  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  // Confirm delete notification
  const confirmDelete = async () => {
    try {
      await deleteNotification(selectedId);
      setMessages(messages.filter((msg) => msg._id !== selectedId));
    } catch (error) {
      console.error("Failed to delete notification:", error);
    } finally {
      handleClose();
    }
  };

  return (
    <Box sx={{ p: 4, position: "relative", marginBottom: "25px" }}>
      {/* Left side arrow */}
      <SideArrow src="https://i.postimg.cc/FRtkkdsz/image.png" alt="Left arrows" style={{ left: 5 }} />
      {/* Right side arrow */}
      <SideArrow src="https://i.postimg.cc/ZqzJrr3G/image.png" alt="Right arrows" style={{ right: 5 }} />

      <Typography variant="h5" sx={{ mb: 3, fontFamily: "'Playfair Display', serif" }}>
        Admin Messages
      </Typography>

      {messages.length > 0 ? (
        <Stack spacing={2}>
          {messages.map((msg) => (
            <Paper
              key={msg._id}
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: msg.isRead ? "#f0f0f0" : "white",
              }}
            >
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Admin Team
                  </Typography>
                  <Typography variant="body2" color="textSecondary" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {new Date(msg.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </Stack>

              <Typography variant="h6" sx={{ mt: 1, fontFamily: "'Playfair Display', serif" }}>
                {msg.title}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1, fontFamily: "'Playfair Display', serif" }}>
                {msg.message}
              </Typography>

              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }} spacing={2}>
                {!msg.isRead && (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleMarkAsRead(msg._id)}
                  >
                    Mark as Read
                  </Button>
                )}
                <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => handleDeleteClick(msg._id)}>
                  Delete
                </Button>
              </Stack>
            </Paper>
          ))}
        </Stack>
      ) : (
        <Typography style={{ fontFamily: "'Playfair Display', serif" }}>No messages from admin.</Typography>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this notification? This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserMessages;
