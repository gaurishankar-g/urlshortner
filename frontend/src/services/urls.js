import axiosInstance from "./axiosInstace";

export async function getAllUrls() {
    const response = await axiosInstance.get("/url");
    return response.data;
}

export async function createUrl(url) {
    const response = await axiosInstance.post("/url", { url });
    return response.data;
}

export async function getAnalytics(shortId) {
    const response = await axiosInstance.get(`/url/analytics/${shortId}`);
    return response.data;
}