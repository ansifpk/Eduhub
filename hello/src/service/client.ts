import axios from "axios";
import userRoutes from "./endPoints/userEndPoints";
import { store } from "@/redux/store";
import { removeUser } from "@/redux/authSlice";
import adminRoutes from "./endPoints/adminEndPoints";
import instructorRoutes from "./endPoints/instructorEndPoints";


export const tocken = async () => {
  try {
    const response = await ApiGatway.post(userRoutes.tocken);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const tockenAdmin = async () => {
  try {
    const response = await ApiGatway.post(adminRoutes.tocken);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const tockenInstructor = async () => {
  try {
    const response = await ApiGatway.post(instructorRoutes.tocken);
    return response.data;
  } catch (error) {
    return error;
  }
};

const ApiGatway = axios.create({
  baseURL: import.meta.env.VITE_APIGATEWAY,
  withCredentials: true,
});

ApiGatway.interceptors.response.use(
  (response) => response,
  async function (error) {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        let undPoints = originalRequest?.url?.split("/");
 
        if (undPoints?.includes("admin")) {
          await tockenAdmin()
        } else if (undPoints?.includes("user")) {
          await tocken();
        } else if (undPoints?.includes("instructor")) {

          await tockenInstructor()
        }
        return ApiGatway(originalRequest);
      } catch (err) {
        store.dispatch(removeUser());
        return Promise.reject(err);
      }
    }
    if (error.response.status === 403) {
      store.dispatch(removeUser());
    }
    return Promise.reject(error);
  }
);

export default ApiGatway;
