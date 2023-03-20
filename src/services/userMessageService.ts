import axios from "axios";
import { addFileUploadRoute, recieveMessageRoute } from "../utils/APIRoutes";

const config = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

export const recieveAllMessages = (userInfoId: any, currentChat: any) => {
  try {
    return axios.post(recieveMessageRoute, {
      from: userInfoId,
      to: currentChat,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addFileUpload = (formData: any) => {
  try {
    return axios.post(addFileUploadRoute, formData, config);
  } catch (error) {
    console.log(error);
  }
};

export const sendMessages = (
  from: any,
  to: string,
  message: string,
  image: any
) => {
  try {
    return axios.post(recieveMessageRoute, {
      from: from,
      to,
      message,
      image: null,
    });
  } catch (error) {
    console.log(error);
  }
};
