require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');
  // expect.assertions(1);
  test('fetchProducts é uma função', () => {
    // expect.assertions(1);
    const actual = typeof fetchProducts;
    const expected = 'function';
    expect(actual).toEqual(expected);
  });
  test('se fetch foi chamada', async () => {
    // expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  test('a função fetch utiliza o endpoint certo', async () => {
    // expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenLastCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  test('se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    // expect.assertions(1);
    const actual = await fetchProducts('computador');
    const expected = computadorSearch;
    expect(actual).toEqual(expected);
  });
  test('se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    // expect.assertions(1);
    // const actual = await fetchProducts();
    // const expected = 'You must provide an url';
    // expect(actual).toThrow(expected);
    // await expect(fetchProducts()).rejects.toMatch('You must provide an url');
    expect(await fetchProducts()).toEqual(Error('You must provide an url'));
  });
});
// console.log(computadorSearch);
