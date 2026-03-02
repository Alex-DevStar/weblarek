import { Api } from './components/base/Api';
import { ApiWrapper } from './components/base/ApiWrapper';
import { EventEmitter } from './components/base/Events';
import { Cart } from './components/Models/cart';
import { Catalog } from './components/Models/catalog';
import { Customer } from './components/Models/customer';
import { CardBasket } from './components/Views/Card/CardBasket';
import { CardCatalog } from './components/Views/Card/CardCatalog';
import { CardPreview } from './components/Views/Card/CardPreview';
import { Gallery } from './components/Views/Gallery';
import { Header } from './components/Views/Header';
import './scss/styles.scss';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';
import { cloneTemplate, ensureElement } from './utils/utils';

const catalog = new Catalog();
// catalog.setProductSelected(apiProducts.items[1]);
// console.log("Выбранный товар:", catalog.getProductSelected())
// catalog.setProductList([apiProducts.items[0], apiProducts.items[2]])
// console.log("Каталог: ", catalog.getProductList())
// console.log("Поиск по id", catalog.productById("412bcf81-7e75-4e70-bdb9-d3c73c9803b7", apiProducts.items))

// const cart = new Cart();
// cart.add(apiProducts.items[0]);
// cart.add(apiProducts.items[2]);
// console.log("Корзина:", cart.getProductList());
// console.log("Наличие товара:", cart.availability(apiProducts.items[2].id));
// cart.remove(apiProducts.items[0]);
// console.log("После удаления:", cart.getProductList());
// cart.clear();
// console.log("После очистки:", cart.getProductList());
// console.log("Количество:", cart.quantity());

// const customer = new Customer();
// customer.setData({payment: "card",  email: "irina_mozes@ya.ru"});
// console.log("Данные пользователя:", customer.data());
// console.log("Валидация:", customer.validation());
// customer.reset();
// console.log("После reset:", customer.data());

const api = new Api(API_URL)
const comm = new ApiWrapper(api)
comm.getProducts()
  .then((items) => {
    catalog.setProductList(items);
    console.log(catalog.getProductList());
  })
  .catch((err) => {
    console.error("Ошибка при получении товаров:", err);
  });


const events = new EventEmitter()
const cardBasketElement = ensureElement<HTMLTemplateElement>('#card-basket')
const BasketContainer = cardBasketElement.content.firstElementChild!.cloneNode(true) as HTMLElement;

const cardBasket = new CardBasket(events, BasketContainer)
console.log("Проверка рендер", cardBasket.render());


const galleryElement = ensureElement<HTMLElement>('.gallery');
export const gallery = new Gallery(galleryElement);
const div = ensureElement<HTMLElement>('#success');
gallery.catalog = [div]


const headerElement = ensureElement<HTMLElement>('.header__container');
const header = new Header(events , headerElement);
header.counter = 3

const cardCatalogElem = ensureElement<HTMLTemplateElement>('#card-catalog')
const CatalogContainer = cardCatalogElem.content.firstElementChild!.cloneNode(true) as HTMLElement;
const card = new CardCatalog(CatalogContainer, {
      onClick: () => events.emit('card:select', {})});
document.body.append(card.render());
events.on('card:select', (item) => {
  console.log('card:select отработал, item = ', item);
});

const cardPreviewElement = ensureElement<HTMLTemplateElement>('#card-preview')
const PreviewContainer = cardPreviewElement.content.firstElementChild!.cloneNode(true) as HTMLElement;
const preview = new CardPreview(events, PreviewContainer)


// events.on('catalog:changed', () => {
//   const itemCards = catalog.getProductList().map((item: any) => {
//     const card = new CardCatalog(
//       cloneTemplate('.card-catalog'),{
//       onClick: () => events.emit('card:select', item)}
//     );

//     return card.render(item);
//   });

//   gallery.render({ catalog: itemCards });
// });


