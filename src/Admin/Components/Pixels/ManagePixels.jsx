import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { addPixel, getPixels, updatePixel } from "../../../Services/allApi";

const PixelAdmin = () => {
  const [pixelCount, setPixelCount] = useState(0);
  const [totalPixelAdded, setTotalPixelAdded] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch the pixel count on component mount
  useEffect(() => {
    fetchPixels();
  }, []);

  const fetchPixels = async () => {
    try {
      const data = await getPixels();
      setPixelCount(data.pixelCount);
      setTotalPixelAdded(data.totalPixelAdded); // Store total pixels added
    } catch (error) {
      console.error("Error fetching pixel count:", error);
    }
  };

  // Handle input change
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // Add pixels (increment existing count)
  const handleAddPixels = async () => {
    const newPixelCount = parseInt(inputValue, 10);
    if (!isNaN(newPixelCount) && newPixelCount >= 0) {
      setLoading(true);
      try {
        await addPixel({ pixelCount: newPixelCount });
        fetchPixels();
        setInputValue(""); 
      } catch (error) {
        console.error("Error adding pixels:", error);
      }
      setLoading(false);
    }
  };

  // Show existing count in input field when "Update" is clicked
  const handlePrepareUpdate = () => {
    setInputValue(pixelCount);
    setIsUpdating(true);
  };

  // Update existing pixel count
  const handleUpdatePixels = async () => {
    const updatedCount = parseInt(inputValue, 10);
    if (!isNaN(updatedCount) && updatedCount >= 0) {
      setLoading(true);
      try {
        await updatePixel({ pixelCount: updatedCount });
        fetchPixels();
        setInputValue(""); 
        setIsUpdating(false);
      } catch (error) {
        console.error("Error updating pixels:", error);
      }
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, textAlign: "center", maxWidth: 400, mx: "auto" }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        Pixel Management
      </Typography>

      {/* Input Field */}
      <TextField
        type="number"
        label="Enter Pixels"
        value={inputValue}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />

      {/* Buttons for Add & Update */}
      <Stack spacing={2} direction="row" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddPixels}
          disabled={loading || isUpdating}
        >
          {loading ? "Updating..." : "Add Pixels"}
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={isUpdating ? handleUpdatePixels : handlePrepareUpdate}
          disabled={loading}
        >
          {isUpdating ? "Save Update" : "Update Pixels"}
        </Button>
      </Stack>

      {/* Display Pixel Counts */}
      <Box
        sx={{
          mt: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100px",
            border: "2px solid #000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            fontWeight: "bold",
            backgroundColor: "#f5f5f5",
          }}
        >
          Available Pixels: {pixelCount}
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "100px",
            border: "2px solid #ff9800",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            fontWeight: "bold",
            backgroundColor: "#ffecb3",
          }}
        >
          Total Pixels Added: {totalPixelAdded}
        </Box>
      </Box>
    </Box>
  );
};

export default PixelAdmin;
