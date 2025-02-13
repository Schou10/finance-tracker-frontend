const getBudgetOverview = async () => {
  try {
    const response = await fetch('/budget/overview', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',   // Route to get budget overview from local server 
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching budget overview:', error);
    throw error;
  }
};

export { getBudgetOverview };