import * as SecureStore from "expo-secure-store";

// stor etokens in expo secure storage
const tokenStore = async (accessToken, refreshToken) => {
  try {
    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", refreshToken);
  } catch (error) {
    console.log("Failed to store token" + error);
  }
};

// get tokes
const getTokens = async () => {
  try {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    return { accessToken: null, refreshToken: null };
  }
};

export {tokenStore, getTokens};