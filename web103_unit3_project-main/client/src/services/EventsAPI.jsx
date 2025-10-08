import axios from "axios";

const API_BASE_URL = "/api";

const getAllEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

const getEventsById = async (id) => {
  // 添加 id 参数
  try {
    const response = await axios.get(`${API_BASE_URL}/events/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};

const createEvent = async (eventData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/events`, eventData);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

// 使用 default export
export default {
  getAllEvents,
  getEventsById,
  createEvent,
};
