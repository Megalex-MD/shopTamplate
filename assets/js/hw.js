const contentContainer = document.querySelector('#content-container')
const cartCounterLabel = document.querySelector('#cart-counter-label')

let cartCounter = 0;
let cartPrice = 0;

const incrementCounter = () => {

  cartCounterLabel.innerText = `${++cartCounter}`
  if (cartCounter === 1) cartCounterLabel.style.display = 'block';
  if (cartCounter === 0) cartCounterLabel.style.display = 'none';
}

const getMockData = (t) => {
  return +t.parentElement
  .previousElementSibling
  .innerText
  .replace(/\$(\d+)\s(\d+)/, '$1.$2')
}

const getPrice = (t, price) => Math.round((price + getMockData(t)) * 100) / 100;

const disableControls = (t, fn) => {
  t.disabled = true;
  contentContainer.removeEventListener('click', fn);
}

const enableControls = (t, fn) => {
  t.disabled = false;
  contentContainer.addEventListener('click', fn);
}

const btnClickHandler = (e) => {
const target = e.target;
const interval = 2000;

let restorHTML = null;

if (target && target.matches('.item-actions__cart')){
  incrementCounter();

  const mockData = getMockData(target);
  cartPrice = getPrice(target, cartPrice);
  restorHTML = target.innerHTML;
  target.innerHTML = `${cartPrice.toFixed(2)} $`;
  
  disableControls(target, btnClickHandler);

  setTimeout(() => {
    target.innerHTML = restorHTML;
    enableControls(target, btnClickHandler)
  }, interval);
};
};

contentContainer.addEventListener('click', btnClickHandler);