import { baseUrl } from "./constants";
import {  headers, request } from "./api";

// The register function accepts the necessary data as arguments,
// and sends a POST request to the given endpoint.
export const register = ({name, avatar, email, password}) => {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, avatar, email, password }),
  })
};

export const login = ({email, password}) => {
  try {
  // A POST request is sent to /signin
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: headers,
    // The parameters are wrapped in an object, converted to a JSON
    // string, and sent in the body of the request.
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    console.log("login success")
    localStorage.setItem("jwt", res.token);
    return res
    });
  }catch(err) {
    console.log("error")
    throw new Error(err.message || 'login failed');
  }
  
}

export const getUser = ({token}) => {
  // A Get request is sent to /users/me
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {...headers, Authorization: `Bearer ${token}`}
  })
}