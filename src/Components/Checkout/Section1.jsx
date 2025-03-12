import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  Typography,
  IconButton,
  CircularProgress,
  Modal,
  Box,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { viewOrders } from "../../Services/allApi";

const SideArrow = styled("img")({
  position: "absolute",
  width: "150px",
  height: "auto",
});

const OrderCard = styled(Card)({
  padding: "16px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
  },
});

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (userId) {
        const ordersData = await viewOrders(userId);
        setOrders(ordersData);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Container
      maxWidth="lg"
      style={{ marginTop: "30px", marginBottom: "30px", position: "relative" }}
    >
      {/* Left and Right Arrows */}
      <SideArrow
        src="https://i.postimg.cc/FRtkkdsz/image.png"
        alt="Left arrows"
        style={{ left: -20 }}
      />
      <SideArrow
        src="https://i.postimg.cc/ZqzJrr3G/image.png"
        alt="Right arrows"
        style={{ right: -20 }}
      />

      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Your Orders
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order._id}>
              <OrderCard onClick={() => handleOrderClick(order)}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Order ID: {order._id}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Name:</strong> {order.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Total Price:</strong> $ {order.totalPrice}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color:
                      order.paymentStatus === "completed" ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  <strong>Payment Status:</strong> {order.paymentStatus}
                </Typography>
              </OrderCard>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Order Details Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "400px" },
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "12px",
            p: 4,
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Order Details
          </Typography>
          {selectedOrder && (
            <>
              <Typography variant="body1" gutterBottom>
                <strong>Order ID:</strong> {selectedOrder._id}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Name:</strong> {selectedOrder.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {selectedOrder.email}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>No. of Pixels:</strong> {selectedOrder.noOfPixels}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Total Price:</strong> $ {selectedOrder.totalPrice}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Payment Status:</strong>{" "}
                <span
                  style={{
                    color:
                      selectedOrder.paymentStatus === "completed"
                        ? "green"
                        : "red",
                    fontWeight: "bold",
                  }}
                >
                  {selectedOrder.paymentStatus}
                </span>
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Created At:</strong>{" "}
                {new Date(selectedOrder.createdAt).toLocaleDateString()}
              </Typography>
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCloseModal}
                >
                  Close
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default OrdersPage;