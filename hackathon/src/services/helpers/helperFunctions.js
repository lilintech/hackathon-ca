import { get, post } from "../api";

export const getCategories =  async() =>{
    const response = await get("/api/v1/get-categories")
    return response;
}

