import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Catalog  {
  private productList: IProduct[] = [];
  private productSelected : IProduct | null = null;

  constructor(protected events: IEvents){}

  getProductList(): IProduct[]{
    return this.productList
  }

  setProductSelected(product: IProduct){
    this.productSelected = product;
    this.events.emit('catalog:change', product)
  }

  getProductSelected(): IProduct | null{
    return this.productSelected;
  }

  setProductList(products: IProduct[]){
     this.productList = products
    this.events.emit('catalog:change', products)
  }

   productById(id: string, array: IProduct[]) :IProduct | undefined{
    return array.find((item) => item.id === id)
  }



  }



