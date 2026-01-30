import { Api } from './components/base/Api';
import { ApiWrapper } from './components/base/class ApiWrapper';
import { Cart } from './components/base/Models/cart';
import { Catalog } from './components/base/Models/catalog';
import { Customer } from './components/base/Models/customer';
import './scss/styles.scss';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';

// const userModel = new Customer ()

const productsModel = new Catalog()
productsModel.setProductList(apiProducts.items)
// console.log("Массив товаров из каталога: ", productsModel.getProductList())
// productsModel.setProductSelected(apiProducts.items[1])
// console.log("Элемент массива", productsModel.getProductSelected())
// console.log("Поиск по id", productsModel.productById("412bcf81-7e75-4e70-bdb9-d3c73c9803b7", apiProducts.items))

const cartEx = new Cart();
cartEx.add(apiProducts.items[1])
// // cartEx.add(apiProducts.items[0])
// cartEx.add(apiProducts.items[3])
// //  console.log("Список покупок :", cartEx.getProductList())
// // cartEx.remove(apiProducts.items[1])
// // cartEx.clear()
// //  console.log("Список покупок :", cartEx.quantity())
//  console.log(cartEx.availability("854cef69-976d-4c2a-a18c-2aa45046c390"))

const user = new Customer();
user.fill("user@user.com", "123123", '', "cash")
// // user.reset()
// console.log(user.validation())
const pi = new Api(API_URL)
const comm =  new ApiWrapper(pi)

// console.log(comm.getProducts())

// try {
//  const res = await comm.postProducts([apiProducts.items[0]]);
// console.log(res)}
// catch (err) {
// console.log("Ошибка при отправке продукта:", err)
// }
