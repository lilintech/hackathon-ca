import { get, post } from "../api";
import axios from 'axios';


export const getCategories = async () => {
  const response = await get("/api/v1/get-categories");
  return response;
};

