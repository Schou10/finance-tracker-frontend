import { baseUrl } from "./constants";
export const headers = {Accept: "application/json",
  "Content-Type": "application/json",}

function checkResponse(res){
  if(res.ok){
    return res.json();
  } 
  return Promise.reject(`Error: ${res.status}`);  
}

export function request(url, options){
  return fetch(url, options).then(checkResponse);
}

function updateUser({name, avatar}){
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/users/me`,{
    method: "PATCH",
    headers: { ...headers, Authorization: `Bearer ${token}`},
    body: JSON.stringify({name, avatar}),
} )
} 

// Goals
function createGoal(data){
  console.log(data)
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/goals`, {
    method:"POST",
    headers: {...headers, Authorization: `Bearer ${token}`},
    body: JSON.stringify({
      goalData: data,
    })
  })
}

function fetchGoals(){
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/goals`, {
    method:"GET",
    headers: {...headers, Authorization: `Bearer ${token}`},
  
  })
}

function updateGoal(goalId, data){
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/goals/${goalId}`, {
    method: "PATCH",
    headers: {...headers, Authorization: `Bearer ${token}`},
    body: JSON.stringify({
      name: data.name,
      description: data.description,
      date: data.date,
      amount:data.amount
    })
  });
}

function deleteGoal(goalId){
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/goals/${goalId}`, {
    method: "DELETE",
    headers: {...headers, Authorization: `Bearer ${token}`},
  })
}

function saveToGoal(goalId, amount ){
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/goals/${goalId}/save`, {
    method: "PATCH",
    headers: {...headers, Authorization: `Bearer ${token}`},
    body: JSON.stringify({amount}),
  });
}




export { updateUser, createGoal, fetchGoals, updateGoal, deleteGoal, saveToGoal};