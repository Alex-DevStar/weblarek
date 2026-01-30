import { Api } from './components/base/Api';
import { ApiWrapper } from './components/base/ApiWrapper';
import { Cart } from './components/Models/cart';
import { Catalog } from './components/Models/catalog';
import { Customer } from './components/Models/customer';
import './scss/styles.scss';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';

const catalog = new Catalog();
catalog.setProductSelected(apiProducts.items[1]);
console.log("Выбранный товар:", catalog.getProductSelected())
catalog.setProductList([apiProducts.items[0], apiProducts.items[2]])
console.log("Каталог: ", catalog.getProductList())
console.log("Поиск по id", catalog.productById("412bcf81-7e75-4e70-bdb9-d3c73c9803b7", apiProducts.items))

const cart = new Cart();
cart.add(apiProducts.items[0]);
cart.add(apiProducts.items[2]);
console.log("Корзина:", cart.getProductList());
console.log("Наличие товара:", cart.availability(apiProducts.items[2].id));
cart.remove(apiProducts.items[0]);
console.log("После удаления:", cart.getProductList());
cart.clear();
console.log("После очистки:", cart.getProductList());
console.log("Количество:", cart.quantity());

const customer = new Customer();
customer.setData({payment: "card",  email: "irina_mozes@ya.ru"});
console.log("Данные пользователя:", customer.data());
console.log("Валидация:", customer.validation());
customer.reset();
console.log("После reset:", customer.data());

const api = new Api(API_URL)
const comm = new ApiWrapper(api)
console.log("Результат запроса", comm.getProducts());





