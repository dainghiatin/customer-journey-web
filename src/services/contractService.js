import axios from "axios";

// Base URL for API calls
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:1337/api";

/**
 * Download contract file
 * @returns {Promise<Blob>} - The contract file as a blob
 */
const downloadContract = async () => {
  try {
    // Mock implementation - serve file from public directory
    const response = await axios.get('/hop-dong-mau.docx', {
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/pdf'
      }
    });
    
    return response;
    
    // Original API call (commented out for mock)
    /*
    const response = await axios.get(
      `${API_URL}/contract/download`,
      {
        responseType: 'blob', // Important for file downloads
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response;
    */
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.error?.message || "Contract download failed");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error("Error setting up contract download request");
    }
  }
};

/**
 * Upload signature file
 * @param {File} signatureFile - The signature file to upload
 * @param {string} authToken - The authentication token
 * @returns {Promise<Object>} - The response from the API
 */
const uploadSignature = async (signatureFile, authToken) => {
  try {
    const formData = new FormData();
    formData.append('signature', signatureFile);

    const response = await axios.post(
      `${API_URL}/signature/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${authToken}`
        }
      }
    );
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.error?.message || "Signature upload failed");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error("Error setting up signature upload request");
    }
  }
};

export { downloadContract, uploadSignature };