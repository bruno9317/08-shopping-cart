const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');
  test('se, ao executar saveCartItems, o método localStorage.setItem é chamado', async () => {
    // expect.assertions(2);
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.getItem).toHaveBeenLastCalledWith('cartItems');
  });
});
