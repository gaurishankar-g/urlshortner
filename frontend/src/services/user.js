import axiosInstance from "./axiosInstace";

export async function signup(user) {
    const response = await axiosInstance.post("/user/signup", user);
    return response.data;
}

export async function login(credentials) {
    const response = await axiosInstance.post("/user/login", credentials);
    return response.data;
}

export async function getCurrentUser() {
    const response = await axiosInstance.get("/user/me");
    return response.data;
}

export async function logout() {
    const response = await axiosInstance.post("/user/logout");
    return response.data;
}