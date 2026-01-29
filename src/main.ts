import { Cart } from './components/base/Models/cart';
import { Catalog } from './components/base/Models/catalog';
import './scss/styles.scss';
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
// cartEx.add(apiProducts.items[0])
cartEx.add(apiProducts.items[3])
//  console.log("Список покупок :", cartEx.getProductList())
// cartEx.remove(apiProducts.items[1])
// cartEx.clear()
//  console.log("Список покупок :", cartEx.quantity())
 console.log(cartEx.availability("854cef69-976d-4c2a-a18c-2aa45046c390"))

