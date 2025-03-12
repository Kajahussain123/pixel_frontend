import React, { useEffect, useState } from "react";
import { Box, Card, Typography, Link, CircularProgress } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { getPixels } from "../../../Services/allApi";

const StatCard = ({ title, value, linkText }) => (
  <Card
    sx={{
      p: 3,
      borderRadius: 4,
      boxShadow: "0 14px 12px rgba(0,0,0,0.05)",
      minWidth: 250,
      backgroundColor: "white",
      textAlign: "center",
    }}
  >
    <Box sx={{ mb: 2 }}>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography
        variant="h3"
        component="div"
        sx={{
          fontWeight: "bold",
          fontSize: "2.5rem",
        }}
      >
        {value}
      </Typography>
    </Box>
    {/* <Link
      href="#"
      underline="none"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        color: "#4CAF50",
        "&:hover": {
          color: "#388E3C",
        },
      }}
    >
      {linkText}
      <ArrowForward sx={{ fontSize: 18 }} />
    </Link> */}
  </Card>
);

const PixelStatsCards = () => {
  const [pixelData, setPixelData] = useState({
    pixelCount: 0,
    totalPixelAdded: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPixelData();
  }, []);

  const fetchPixelData = async () => {
    try {
      const data = await getPixels();
      setPixelData(data);
    } catch (error) {
      console.error("Error fetching pixel data:", error);
    }
    setLoading(false);
  };

  const stats = [
    {
      title: "Total Pixels",
      value: loading ? <CircularProgress size={24} /> : pixelData.totalPixelAdded,
      linkText: "View all Products",
    },
    {
      title: "Current Pixels",
      value: loading ? <CircularProgress size={24} /> : pixelData.pixelCount,
      linkText: "View all Products",
    },
    {
      title: "Total Bought Pixels",
      value: loading ? <CircularProgress size={24} /> : pixelData.totalPixelAdded - pixelData.pixelCount,
      linkText: "View all Products",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        p: 3,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {stats.map((stat, index) => (
        <StatCard key={index} title={stat.title} value={stat.value} linkText={stat.linkText} />
      ))}
    </Box>
  );
};

export default PixelStatsCards;
