import { baseUrl } from "./constants";
import {  headers, checkResponse } from "./api";

// The register function accepts the necessary data as arguments,
// and sends a POST request to the given endpoint.
export const register = ({name, avatar, email, password}) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, avatar, email, password }),
  })
    .then((res) => checkResponse(res))
};

export const login = ({email, password}) => {
  // A POST request is sent to /signin
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: headers,
    // The parameters are wrapped in an object, converted to a JSON
    // string, and sent in the body of the request.
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    localStorage.setItem("jwt", res.token);
    return checkResponse(res);
  });
}

export const getUser = ({token}) => {
  // A Get request is sent to /users/me
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {...headers, Authorization: `Bearer ${token}`}
  }).then((res)=>{
    return checkResponse(res);
  })
}