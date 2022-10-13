require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');
  test('se fetchItem é uma função', () => {
    // expect.assertions(1);
    const actual = typeof fetchItem;
    const expected = 'function';
    expect(actual).toEqual(expected);
  });
  test('se fetch foi chamada', async () => {
    // expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  test('se a função fetch utiliza o endpoint certo', async () => {
    // expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenLastCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  test('se o retorno da função fetchItem com "MLB1615760527" é igual ao objeto item', async () => {
    // expect.assertions(1);
    // await fetchItem('MLB1615760527');
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });
  test('se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    // expect.assertions(1);
    expect(await fetchItem()).toEqual(Error('You must provide an url'));
  });
});
