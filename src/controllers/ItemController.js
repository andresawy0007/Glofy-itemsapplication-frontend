import axios from "axios";
import LocalStorageController from "./LocalStorageController";

const API_BASE_URL = "https://reqres.in/api"; // Replace with your backend API URL



const ItemController = {
  
  // Fetch all items with pagination
  getItems: async (page = 1) => {
    let askApi = false;
    const usersData = JSON.parse(localStorage.getItem('users'));
    const localPage = parseInt(localStorage.getItem('page'))
    const totalPages = parseInt(localStorage.getItem('total_pages'))

    if (usersData && totalPages && localPage == page){
      return {
        "users": usersData,
        "total_pages": totalPages
      }
    }
    
    try {
      const response = await axios.get(`${API_BASE_URL}/users`, {
        params: { page},
      });
      
      localStorage.setItem('users', JSON.stringify(response.data.data));
      localStorage.setItem('total_pages', response.data.total_pages);
      localStorage.setItem('page', page);
      return {
        "users": response.data.data,
        "total_pages": response.data.total_pages
      }
    } catch (error) {
      console.error("Error fetching items:", error);
      throw error;
    }
  },

  // Fetch a single item by ID
  getItemById: async (id) => {
    const localItem = LocalStorageController.getWithExpiry("user_"+id);
    if(localItem){
      return JSON.parse(localItem);
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/users/${id}`);
      LocalStorageController.setWithExpiry("user_"+id, JSON.stringify(response.data.data))
      return response.data.data;
    } catch (error) {
      console.error("Error fetching item:", error);
      throw error;
    }
  },
};

export default ItemController;