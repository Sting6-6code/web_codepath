import axios from "axios";

const API_BASE_URL = "/api";

const getAllLocations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/locations`);
    return response.data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};

const getLocationById = async (id) => {
  // 添加 id 参数
  try {
    const response = await axios.get(`${API_BASE_URL}/locations/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching location:", error);
    throw error;
  }
};

const getEventsByLocation = async (locationId) => {
  // 新增功能
  try {
    const response = await axios.get(
      `${API_BASE_URL}/events?location=${locationId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching events by location:", error);
    throw error;
  }
};

const createLocation = async (locationData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/locations`,
      locationData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating location:", error);
    throw error;
  }
};

export default {
  getAllLocations,
  getLocationById,
  getEventsByLocation,
  createLocation,
};
