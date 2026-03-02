import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Cart {
  private productList: IProduct[] = [];

  constructor(protected events: IEvents){}

  getProductList(){
    return this.productList
  }

  add(product: IProduct) {
    this.productList.push(product)
    this.events.emit('cart:change', product)
  }

  remove(product: IProduct){
    const index = this.productList.indexOf(product);
    this.productList.splice(index, 1)
    this.events.emit('cart:change', product)
  }

  clear(){
    this.productList = [];
    this.events.emit('cart:change')

  }

  totalPrice():number{
    const result = this.productList.reduce((acc: number, item: IProduct ): number => {
      if (item.price !== null) {
      acc += item.price }
      return acc
    }, 0)
    return result
  }

  quantity():number{
    return this.productList.length
  }

  availability(id: string): boolean{
    return this.productList.some((item) => item.id === id);
  }

}
