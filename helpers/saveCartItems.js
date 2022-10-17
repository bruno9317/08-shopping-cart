const saveCartItems = (arr) => {
  localStorage.setItem('cartItems', arr);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
