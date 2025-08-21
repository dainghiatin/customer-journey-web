import axios from "axios";

// Base URL for API calls
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:1337/api";


const getWalletFromToken = async (authToken=localStorage.getItem("authToken")) => {
  try {
    const response = await axios.get(`${API_URL}/wallets/my-wallet`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

const getFavoriteWallets = async (authToken) => {
  try {
    const response = await axios.get(`${API_URL}/wallets/favorite-wallets`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

/**
 * Transfer funds from the authenticated user's wallet to another wallet
 * @param {string} authToken - The authentication token
 * @param {string|number} toWalletId - The ID of the recipient wallet
 * @param {number} amount - The amount to transfer
 * @returns {Promise<Object>} - The response from the API
 */
const transferFunds = async (authToken, toWalletId, amount) => {
  try {
    const response = await axios.post(
      `${API_URL}/wallet/transfer`,
      {
        toWalletId: toWalletId,
        amount: amount
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      }
    );
    return response;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data?.error?.message || "Transfer failed");
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error("Error setting up transfer request");
    }
  }
};

export { getWalletFromToken, getFavoriteWallets, transferFunds };