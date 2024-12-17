import axios from 'axios';

const getAccountBalances = async () => {
  try {
    const response = await axios.get('/budget/accounts', {
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching account balances:', error);
    throw error;
  }
};

const getBudgetOverview = async () => {
  try {
    const response = await axios.get('/budget/overview', {
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching budget overview:', error);
    throw error;
  }
};

export { getAccountBalances, getBudgetOverview };