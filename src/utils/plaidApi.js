import { baseUrl } from "./constants";

// Centralized error handling
const handleError = (err) => {
  console.error('API Error:', err.response?.data || err.message);
};

const create_link_token = async () => {
  try {
    const response = await fetch(`${baseUrl}/create_link_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({ clientUserId: currentUser._id })
  });
  const data = await response.json();
  setLinkToken(data.link_token);
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
    .then((response) => {
      const accessToken = response.data.access_token;
      return accessToken;
    });
  }catch (err) {
    handleError(err); 
};
};


// Gets Account Balances from api
const syncAccounts = async () => {
  try {
    const accountData = await fetch('/accounts/sync',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }}); // Route to get accounts from plaid api to connect to user account
    return accountData;
  } catch (err) {
    handleError(err);
  }
};
// Gets Transactions from api
const syncTransactions = async () =>{
  try {
    const transactionData = await fetch(`${baseUrl}/transactions/sync`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }}); // Route to get transactions from plaid api to connect to user account
    return transactionData.data;
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