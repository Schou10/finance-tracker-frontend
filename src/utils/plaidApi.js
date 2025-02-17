import { baseUrl } from "./constants";
import {request } from "./api";
// Centralized error handling
const handleError = (err) => {
  return('API Error:', err.response?.data || err.message);
};

const create_link_token = async (clientUserId) => {
  try {
    const response = await request(`${baseUrl}/create_link_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({ clientUserId })
  });
  const data = await response;
  return data.link_token;
}catch (err) {
  handleError(err);
};
};

const exchange_public_token = async (public_token) => {
  try{
    const response = await fetch(`${baseUrl}/exchange_public_token`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'body': JSON.stringify({ public_token }), // Route to exchange public token for access token
      }})
      const accessToken = response.data.access_token;
      return accessToken;
  }catch (err) {
    handleError(err); 
};
};


// Gets Account Balances from api
const syncAccounts = async () => {
  try {
    const response = await fetch(`${baseUrl}/accounts/sync`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }}); // Route to get accounts from plaid api to connect to user account
    const accountData =  await response.json();
    return accountData.accounts;
  } catch (err) {
    handleError(err);
  }
};
// Gets Transactions from api
const syncTransactions = async () =>{
  try {
    const response = await fetch(`${baseUrl}/transactions/sync`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }}); // Route to get transactions from plaid api to connect to user account
    const transactionData = await response.json();
    return transactionData;
  } catch (err) {
    handleError(err);
  }
};

const saveAccountData = async ({accounts, item_id}) => {
  console.log( accounts, item_id)
  try {
    const response = await fetch(`${baseUrl}/accounts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'body': JSON.stringify({ accounts, item_id }), // Route to save accounts to local server
      },
    });
    return await response.json()
  } catch (err) {
    return(err.message || 'Error saving account data');
  }
};

const saveTransactionData = async (transactions) => {
  try {
    await request(`${baseUrl}/transactions`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'body': JSON.stringify({ transactions }), // Route to save transactions to local server 
     }});
  } catch (err) {
    return(err.message || 'Error saving transaction data');
  }
};
// Gets Accounts from Local Server
const fetchAccountData = async () => {
  try {
    const response = await request(`${baseUrl}/accounts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      }}); // Route to get accounts from local server
    return response.data;
  } catch (err) {
    return(err.message ||'Error fetching account data');
  }
};
//Gets Transactions from Local Server
const fetchTransactionData = async () => {
  try {
    const response = await request(`${baseUrl}/transactions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`, 
    }}); // Route to get transactions from local server
    return response.data;
  } catch (err) {
    return(err.message || 'Error fetching transaction data');
  }
};

const getBudgetOverview = async () => {
  try {
    const response = await request(`${baseUrl}/budget/overview`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',   // Route to get budget overview from local server 
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    });
    const budgetData = response;
    return budgetData;
  } catch (err) {
    console.error(err);
    return(err.message || 'Error fetching budget overview')
  }
};



export { create_link_token, exchange_public_token, syncTransactions, syncAccounts, saveAccountData, saveTransactionData, fetchAccountData, fetchTransactionData, getBudgetOverview}