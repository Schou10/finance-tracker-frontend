import axios from 'axios';


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

export { getBudgetOverview };