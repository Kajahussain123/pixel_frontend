import axios from "axios";

export const commonApi = async (method, url, data, options = {}) => {
  try {
    // Get stored tokens
    const userToken = localStorage.getItem("token") || "";
    const adminToken = localStorage.getItem("adminToken") || "";

    let token = ""; // Default empty token

    // Assign the token based on availability
    if (adminToken) {
      token = adminToken; // Use admin token if available
    } else if (userToken) {
      token = userToken; // Otherwise, use user token
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      ...options.headers, // Merge additional headers if any
    };

    const response = await axios({
      method,
      url,
      data,
      headers,
    });

    return response;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};
