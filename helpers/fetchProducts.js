// const fetch = require('node-fetch');

const fetchProducts = async (product) => {
  if (product === undefined) {
    return new Error('You must provide an url');
  }
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
// async function criaLista() {
//   const receba = await fetchProducts('computador');
//   const receba2 = receba.results;
//   receba2.forEach((p) => console.log(p));
//   }

  // criaLista();
// fetchProducts('computador')
// .then((data) => console.log(data.results[0]));

// const aqui = fetchProducts('computador')
// .then((data) => data.results)
// .then((data) => data.map((p) => p.id));

// aqui
// .then((data) => console.log(data));

// async function recebas() {
//   const receba = await fetchProducts('computador');
//   const receba2 = await receba.results;
//   const receba3 = await receba2.map((e) => ({ id: e.id, title: e.title, thumbnail: e.thumbnail }));
//   return receba3;
//   }

// recebas()
// .then((data) => data.forEach((e) => console.log(e)));