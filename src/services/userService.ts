import axios from "axios";
import { Avatarapi } from "../constants/constants";
import {
  loginRoute,
  registerRoute,
  setAvatarRoute,
  allUsersRoute,
} from "../utils/APIRoutes";

export const getUserLogin = (username: any, password: any) => {
  try {
    return axios.post(loginRoute, { username, password });
  } catch (error) {
    console.log(error);
  }
};

export const getUserRegister = (
  username: any,
  password: any,
  email: string
) => {
  try {
    return axios.post(registerRoute, { username, password, email });
  } catch (error) {
    console.log(error);
  }
};

export const setUserProfile = () => {
  try {
    return axios.get(`${Avatarapi}/${Math.round(Math.random() * 1000)}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateUserIProfile = (id: string, image: any) => {
  try {
    return axios.post(`${setAvatarRoute}/${id}`, image);
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = (userId: any) => {
  try {
    return axios.get(`${allUsersRoute}/${userId}`);
  } catch (error) {
    console.log(error);
  }
};
