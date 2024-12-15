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



const syncAccounts = async () => {
  try {
    const accountData = await axios.get('/accounts/sync'); // Route to get accounts from plaid api to connect to user account
    return accountData.data;
  } catch (error) {
    handleError(err);
  }
};

const syncTransactions = async () =>{
  try {
    const transactionData = await axios.get('/transactions/sync'); // Route to get transactions from plaid api to connect to user account
    return transactionData.data;
  } catch (error) {
    handleError(err);
  }
};

const saveAccountData = async ({accounts, item_id}) => {
  try {
    await axios.post('/accounts', { accountData:accounts, itemId:item_id });
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

const fetchAccountData = async () => {
  try {
    const response = await axios.get('/accounts');
    return response.data;
  } catch (err) {
    console.error('Error fetching account data:', err);
  }
};

const fetchTransactionData = async () => {
  try {
    const response = await axios.get('/transactions');
    return response.data;
  } catch (err) {
    console.error('Error fetching transaction data:', err);
  }
};


export { syncTransactions, syncAccounts, saveAccountData, saveTransactionData, fetchAccountData, fetchTransactionData }