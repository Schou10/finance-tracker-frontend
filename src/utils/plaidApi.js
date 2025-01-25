import axios from 'axios';
import { baseUrl } from "./constants";

axios.defaults.baseURL = baseUrl;

// Interceptor to automatically include the Authorization header
axios.interceptors.request.use((config)=>{
  const token = localStorage.getItem("jwt");
  if (token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config
},
  (err) => Promise.reject(err)
);

// Centralized error handling
const handleError = (err) => {
  console.error('API Error:', err.response?.data || err.message);
};


// Gets Account Balances from api
const syncAccounts = async () => {
  try {
    const accountData = await axios.get('/accounts/sync'); // Route to get accounts from plaid api to connect to user account
    return accountData;
  } catch (err) {
    handleError(err);
  }
};
// Gets Transactions from api
const syncTransactions = async () =>{
  try {
    const transactionData = await axios.get('/transactions/sync'); // Route to get transactions from plaid api to connect to user account
    return transactionData.data;
  } catch (err) {
    handleError(err);
  }
};

const saveAccountData = async ({accounts, item_id}) => {
  console.log( accounts, item_id)
  try {
    const response = await axios.post('/accounts', { accountData:accounts, itemId:item_id });
    return await response.json()
  } catch (err) {
    console.error('Error saving account data:', err);
  }
};

const saveTransactionData = async (transactions) => {
  try {
    await axios.post('/transactions', { transactions });
  } catch (err) {
    console.error('Error saving transaction data:', err);
  }
};
// Gets Accounts from Local Server
const fetchAccountData = async () => {
  try {
    const response = await axios.get('/accounts');
    return response.data;
  } catch (err) {
    console.error('Error fetching account data:', err);
  }
};
//Gets Transactions from Local Server
const fetchTransactionData = async () => {
  try {
    const response = await axios.get('/transactions');
    return response.data;
  } catch (err) {
    console.error('Error fetching transaction data:', err);
  }
};


export { syncTransactions, syncAccounts, saveAccountData, saveTransactionData, fetchAccountData, fetchTransactionData}