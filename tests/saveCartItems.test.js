const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');
// const saveCartItems2 = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  test('se, ao executar saveCartItems, o método localStorage.setItem é chamado', async () => {
    // expect.assertions(2);
    saveCartItems(['MLB1937076326']);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenLastCalledWith('cartItems', ['MLB1937076326']);
  });
});
