/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
 const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};
const elementoPrice = document.getElementsByClassName('total-price')[0];
/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
let totalPrice = 0;
async function cartItemClickListener(e) {
  const item = e.target;
  console.log('entrei');
  item.parentNode.removeChild(item);
  const salvar = JSON.parse(getSavedCartItems());
  saveCartItems(JSON.stringify(salvar.filter((p) => p !== item.id)));
  const receba = await fetchItem(item.id);
  const preço = receba.price;
  totalPrice -= preço;
  elementoPrice.innerText = `Total: ${totalPrice}`;
  console.log(totalPrice);
}
 const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.id = id;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

async function chamaNoBotao(e) {
  const local = document.getElementsByClassName('cart__items')[0];
  const id = e.target.parentNode.firstChild.innerText;
  local.appendChild(createCartItemElement(await fetchItem(id)));
  const salvar = JSON.parse(getSavedCartItems());
  if (salvar === null) {
    saveCartItems(JSON.stringify([id]));
  } else {
    saveCartItems(JSON.stringify([...salvar, id]));
  }
  const receba = await fetchItem(id);
  const preço = receba.price;
  totalPrice += preço;
  elementoPrice.innerText = `Total: ${totalPrice}`;
}

const createCustomBotao = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  e.addEventListener('click', chamaNoBotao);
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.id = id;

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomBotao('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

async function criaLista() {
  const local = document.getElementsByClassName('items')[0];
  const receba = await fetchProducts('computador');
  const receba2 = receba.results;
  receba2.forEach((p) => local.appendChild(createProductItemElement(p)));
}

async function salvaAoCarregar() {
    const local = document.getElementsByClassName('cart__items')[0];
    const id = JSON.parse(getSavedCartItems());
    if (id !== null) {
      id.forEach(async (p) => local.appendChild(createCartItemElement(await fetchItem(p))));
    }
}

function eventoEsvaziar() {
  const lista = document.getElementsByClassName('cart__item');
  for (let index = lista.length - 1; index >= 0; index -= 1) {
    lista[index].remove();
  }
  saveCartItems(JSON.stringify([]));
}

function botaoCarrinho() {
  const botao = document.getElementsByClassName('empty-cart')[0];
  botao.addEventListener('click', eventoEsvaziar);
}

window.onload = () => { 
  criaLista();
  salvaAoCarregar();
  botaoCarrinho();
};
