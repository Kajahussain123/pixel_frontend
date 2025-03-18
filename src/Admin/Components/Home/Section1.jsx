import React, { useEffect, useState } from "react";
import { Grid, Typography, Paper, Box, CircularProgress } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { graphOverview } from "../../../Services/allApi";

const COLORS = ["#2CA35C", "#D1F2E5"];

const Graphs = () => {
  const [pieData, setPieData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const data = await graphOverview();
        setPieData(data.pieData || []);
        setRevenueData(data.revenueData || []);
        setTotalOrders(data.totalOrders || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGraphData();
  }, []);

  const renderLabel = ({ cx, cy }) => {
    return (
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize="18px" fontWeight="bold" fill="#2CA35C">
        {pieData.length > 0 ? `${pieData[0].value}%` : "0%"}
      </text>
    );
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Grid container spacing={3} sx={{ maxWidth: 900, width: "100%", padding: "30px"  }}>
      
      {/* Orders Increment (Pie Chart) */}
      <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "stretch" }}>
  <Paper elevation={3} sx={{ p: 3, borderRadius: 3, display: "flex", flexDirection: "column", flexGrow: 1 }}>
    <Box>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Orders Increment
      </Typography>
      <Typography variant="body2" sx={{ color: "gray" }}>
        This pie chart shows the total number of order increments this month.
      </Typography>
    </Box>
    <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <ResponsiveContainer width={150} height={150}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={50}
            fill="#2CA35C"
            dataKey="value"
            label={renderLabel}
            labelLine={false}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Box>
  </Paper>
</Grid>

<Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "stretch" }}>
  <Paper elevation={3} sx={{ p: 3, borderRadius: 3, display: "flex", flexDirection: "column", flexGrow: 1 }}>
    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
      Total Revenue
    </Typography>
    <Box sx={{ flexGrow: 1 }}>
      <ResponsiveContainer width="100%" height={150}>
        <LineChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `$ ${value / 1000}k`} />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#2CA35C" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  </Paper>
</Grid>


    </Grid>
  );
};

export default Graphs;
