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
