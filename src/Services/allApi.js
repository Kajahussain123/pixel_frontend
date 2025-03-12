import axios from "axios";
import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonApi";

// admin login
export const register = async (reqBody) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/auth/register`, reqBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to register', error);
    throw error;
  }
};

// otp verification 
export const verifyOTP = async (reqBody) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/auth/verify-otp`, reqBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to register', error);
    throw error;
  }
};

// user login
export const login = async (reqBody) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/user/auth/login`, reqBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to login', error);
      throw error;
    }
};

// admin login
export const adminLogin = async (reqBody) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/admin/auth/login`, reqBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to login', error);
    throw error;
  }
};

// add to cart 
export const buyNow  = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token is missing");
      }
      const response = await commonApi('POST', `${BASE_URL}/api/user/cart/buy-now`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }  catch (error) {
      console.error('Failed to get cart', error);
      throw error;
    }
};

// add to cart 
export const verifyPayment = async (paymentData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token is missing");
    }

    const response = await commonApi('POST', `${BASE_URL}/api/user/cart/verify-payment`, paymentData, {
      headers: {
        'Content-Type': 'multipart/form-data',  // ✅ Set as multipart form-data
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to get cart', error);
    throw error;
  }
};

// view user cart
export const viewCart = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token is missing");
      }
      const response = await commonApi('GET', `${BASE_URL}/api/user/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }  catch (error) {
      console.error('Failed to get cart', error);
      throw error;
    }
};

// delete user cart
export const deleteCart = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token is missing");
    }
    const response = await commonApi('DELETE', `${BASE_URL}/api/user/cart/remove/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }  catch (error) {
    console.error('Failed to get cart', error);
    throw error;
  }
};

// checkout
export const checkout = async (reqBody) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token is missing");
    }
    const response = await commonApi('POST', `${BASE_URL}/api/user/checkout/create`,reqBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get cart', error);
    throw error;
  }
};

// view orders
export const viewOrders = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token is missing");
    }
    const response = await commonApi('GET', `${BASE_URL}/api/user/orders/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }  catch (error) {
    console.error('Failed to get cart', error);
    throw error;
  }
};

// view all orders
export const viewAllOrders = async()=>{
  try{
  const token = localStorage.getItem("adminToken");
  if(!token){
    throw new Error("Authentication token is missing")
  }
  const response = await commonApi('GET',`${BASE_URL}/api/admin/orders/view`,{
    headers : {
      Authorization:`Bearer ${token}`
    },
  });
  return response.data;
  }  catch (error) {
    console.error('Failed to get cart', error);
    throw error;
  }
}

// view all users 
export const viewUsers = async()=>{
  try{
    const token = localStorage.getItem("adminToken");
    if(!token){
      throw new Error("Authentication token is missing");
    }
    const response = await commonApi('GET',`${BASE_URL}/api/admin/users/view`,{
      headers:{
        Authorization:`Bearer ${token}`,
      },
    })
    return response.data;
  }   catch (error) {
    console.error('Failed to get cart', error);
    throw error;
  }
};

// add pixel
export const addPixel = async(reqBody)=>{
  try{
    const token = localStorage.getItem("adminToken");
    if(!token){
      throw new Error("Authentication token is missing");
    }
    const response = await commonApi('POST',`${BASE_URL}/api/admin/pixel/add`,reqBody,{
      headers:{
        Authorization:`Bearer ${token}`,
      }
    })
    return response.data;
  }  catch (error) {
    console.error('Failed to get cart', error);
    throw error;
  }
};

// get pixels count
export const getPixels = async()=>{
  try{
    const token = localStorage.getItem("adminToken");
    if(!token){
      throw new Error("Authentication token is missing");
    }
    const response = await commonApi('GET',`${BASE_URL}/api/admin/pixel/view`,{
      headers:{
        Authorization:`Bearer ${token}`,
      },
    })
    return response.data;
  }   catch (error) {
    console.error('Failed to get cart', error);
    throw error;
  }
};

// update pixel count
export const updatePixel = async(reqBody)=>{
  try{
    const token = localStorage.getItem("adminToken");
    if(!token){
      throw new Error("Authentication token is missing");
    }
    const response = await commonApi('PUT',`${BASE_URL}/api/admin/pixel/update`,reqBody,{
      headers:{
        Authorization:`Bearer ${token}`,
      },
    })
    return response.data;
  }  catch (error) {
    console.error('Failed to get cart', error);
    throw error;
  }
};

// send message to user
export const sendNotification = async(reqBody)=>{
  try{
    const token = localStorage.getItem("adminToken");
    if(!token){
      throw new Error("Authentication token is missing");
    }
    const response = await commonApi('POST',`${BASE_URL}/api/admin/notification/send`,reqBody,{
      headers:{
        Authorization:`Bearer ${token}`,
      }
    })
    return response.data;
  } catch (error) {
    console.error('Failed to get cart', error);
    throw error;
  }
};

// delete user
export const deleteUser = async(reqBody , id)=>{
  try{
    const token = localStorage.getItem("adminToken");
    if(!token){
      throw new Error("Authentication token is missing");
    }
    const response = await commonApi('DELETE',`${BASE_URL}/api/admin/users/delete/${id}`,reqBody,{
      headers:{
        Authorization:`Bearer ${token}`,
      }
    })
    return response.data;
  }   catch (error) {
    console.error('Failed to get cart', error);
    throw error;
  }
};

// graphs
export const graphOverview = async()=>{
  try{
    const token = localStorage.getItem("adminToken");
    if(!token){
      throw new Error("Authentication token is missing");
    }
    const response = await commonApi ('GET',`${BASE_URL}/api/admin/orders/graphs`,{
      headers:{
        Authorization:`Bearer ${token}`
      },
    })
    return response.data;
  }  catch (error) {
    console.error('Failed to get cart', error);
    throw error;
  }
}

// gte user notifications
export const getNotifications = async(id)=>{
  try{
    const token = localStorage.getItem("token");
    if(!token){
      throw new Error("Authentication token is missing");
    }
    const response = await commonApi ('GET',`${BASE_URL}/api/user/notifications/view/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      },
    })
    return response.data;
  }   catch (error) {
    console.error('Failed to get cart', error);
    throw error;
  }
}

// delete notification 
export const deleteNotification = async(id)=>{
  try{
    const token = localStorage.getItem("token");
    if(!token){
      throw new Error ("Authentication token is missing");
    }
    const response = await commonApi('DELETE',`${BASE_URL}/api/user/notifications/delete/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      },
    });
    return response.data;
  }  catch (error) {
    console.error('Failed to get cart', error);
    throw error;
  }
}

export const markNotificationAsRead  = async(id)=>{
  try{
    const token = localStorage.getItem("token");
    if(!token){
      throw new Error ("Authentication token is missing");
    }
    const response = await commonApi('PUT',`${BASE_URL}/api/user/notifications/read/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      },
    });
    return response.data;
  }  catch (error) {
      console.error('Failed to get cart', error);
      throw error;
    }
}

// admin buy pixel 
export const adminBuyPixel = async(formData)=>{
  try{
    const token = localStorage.getItem("adminToken");
    if(!token){
      throw new Error ("Authentication token is missing");
    }
    const response = await commonApi('POST',`${BASE_URL}/api/admin/buy/pixel`, formData,{
      headers:{
        'Content-Type': 'multipart/form-data',
        Authorization:`Bearer ${token}`
      },
    });
    return response.data;
  }   catch (error) {
      console.error('Failed to get cart', error);
      throw error;
    }
}

// google authentication 
export const googleAuth = async () => {
  try {
    // Redirect the user to the Google OAuth URL
    window.location.href = `${BASE_URL}/api/user/auth/google`;
  } catch (error) {
    console.error("Error during Google authentication:", error);
    throw error;
  }
};

// excel download
export const excelDownload = async()=>{
  try{
    const token = localStorage.getItem("adminToken");
    if(!token){
      throw new Error("Authentication token is missing");
    }
    const response = await commonApi ('GET',`${BASE_URL}/api/admin/orders/export-excel`,{
      headers:{
        Authorization:`Bearer ${token}`
      },
    })
    return response.data;
  }   catch (error) {
      console.error('Failed to get cart', error);
      throw error;
    }
}

// excel download
export const deleteOrder = async(reqBody,orderId)=>{
  try{
    const token = localStorage.getItem("adminToken");
    if(!token){
      throw new Error("Authentication token is missing");
    }
    const response = await commonApi ('DELETE',`${BASE_URL}/api/admin/orders/delete/${orderId}`,reqBody,{
      headers:{
        Authorization:`Bearer ${token}`
      },
    })
    return response.data;
  }  
  // catch (error) {
  //   if (error.response && error.response.status === 401) {
  //     alert("Session expired. Please log in again.");
  //     localStorage.removeItem("adminToken");
  //     localStorage.removeItem("adminId");
  //     window.location.href = "/adminLogin";
  //   } else {
  //     console.error('Failed to get cart:', error);
  //   }
  //   throw error;
  // }
   catch (error) {
      console.error('Failed to get cart', error);
      throw error;
    }
}

