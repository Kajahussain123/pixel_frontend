import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Stack,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminMessages = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      subject: "Order Issue",
      message: "I haven't received my order yet.",
      date: "2024-02-07 10:30 AM",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      subject: "Payment Problem",
      message: "I was charged twice for my purchase.",
      date: "2024-02-06 02:45 PM",
    },
    {
      id: 3,
      name: "David Wilson",
      email: "davidwilson@example.com",
      subject: "Account Access",
      message: "I forgot my password and can't reset it.",
      date: "2024-02-05 08:15 AM",
    },
  ]);

  // Function to delete a message
  const handleDeleteMessage = (id) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        User Messages
      </Typography>

      {messages.length > 0 ? (
        <Stack spacing={2}>
          {messages.map((msg) => (
            <Paper
              key={msg.id}
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {msg.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {msg.email}
                  </Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  {msg.date}
                </Typography>
              </Stack>

              <Typography variant="h6" sx={{ mt: 1 }}>
                {msg.subject}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {msg.message}
              </Typography>

              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteMessage(msg.id)}
                >
                  Delete
                </Button>
              </Stack>
            </Paper>
          ))}
        </Stack>
      ) : (
        <Typography>No messages found</Typography>
      )}
    </Box>
  );
};

export default AdminMessages;
