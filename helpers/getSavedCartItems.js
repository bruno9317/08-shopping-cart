const getSavedCartItems = () => {
  const receba = localStorage.getItem('cartItems');
  return receba;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
