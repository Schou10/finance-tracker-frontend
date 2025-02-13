import { baseUrl } from "./constants";
console.log(baseUrl);
// Centralized error handling
const handleError = (err) => {
  console.error('API Error:', err.response?.data || err.message);
};

const create_link_token = async (clientUserId) => {
  try {
    const response = await fetch(`${baseUrl}/create_link_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({ clientUserId })
  });
  const data = await response.json();
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
      console.log(accessToken);
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
    console.log("Account Data", accountData.accounts);
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
    console.log("Transaction Data", transactionData);
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
    console.error('Error saving account data:', err);
  }
};

const saveTransactionData = async (transactions) => {
  try {
    await fetch(`${baseUrl}/transactions`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'body': JSON.stringify({ transactions }), // Route to save transactions to local server 
     }});
  } catch (err) {
    console.error('Error saving transaction data:', err);
  }
};
// Gets Accounts from Local Server
const fetchAccountData = async () => {
  try {
    const response = await fetch('/accounts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      }}); // Route to get accounts from local server
    return response.data;
  } catch (err) {
    console.error('Error fetching account data:', err);
  }
};
//Gets Transactions from Local Server
const fetchTransactionData = async () => {
  try {
    const response = await fetch('/transactions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`, 
    }}); // Route to get transactions from local server
    return response.data;
  } catch (err) {
    console.error('Error fetching transaction data:', err);
  }
};



export { create_link_token, exchange_public_token, syncTransactions, syncAccounts, saveAccountData, saveTransactionData, fetchAccountData, fetchTransactionData}