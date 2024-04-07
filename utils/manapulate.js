export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("token");
    // console.log("Token for access: " + accessToken);
    return accessToken;
  }
};

export const removeAccessToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    // console.log("Token for access: " + accessToken);
  }
};