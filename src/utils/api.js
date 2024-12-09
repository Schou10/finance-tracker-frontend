import { baseUrl } from "./constants";
export const headers = {Accept: "application/json",
  "Content-Type": "application/json",}

export function checkResponse(res){
  if(res.ok){
    return res.json();
  } 
  return Promise.reject(`Error: ${res.status}`);  
}

function request(url, options){
  return fetch(url, options).then(checkResponse);
}

// Gets transactions from current user
function getTransactions() {
  //Set up user api for this function
  return request(`${baseUrl}/transactions/sync`, {
    method: "GET",
    headers: headers,
  })
}

function updateUser({name, avatar}){
  const token = localStorage.getItem("jwt");
  
  return request(`${baseUrl}/users/me`,{
    method: "PATCH",
    headers: { ...headers, Authorization: `Bearer ${token}`},
    body: JSON.stringify({name, avatar}),
} )
} 

function addTransaction(data){
  const token = localStorage.getItem("jwt");
  // Have to find api or set up api that stores all the tranaction to POST the new Transactions
  return request(`${baseUrl}/transactions`, {
    method: "POST",
    headers: {...headers, Authorization: `Bearer ${token}`},
    body: JSON.stringify({
      date: data.date,
      amount: data.amount,
      type: data.type,
      category: data.category,
      description: data.description,
      payment_method: data.payment_method,
      currency: data.currency,
      account: data.account
    })
  });
}



export { getTransactions, updateUser, addTransaction};