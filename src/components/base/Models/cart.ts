import { IProduct } from "../../../types";

class Cart {
  private _productList: IProduct[];

  constructor(productList: IProduct[] = []) {
    this._productList = productList;
  }
  get productList(){
    return this._productList
  }

  add(product: IProduct) {
    this._productList.push(product)
  }

  remove(product: IProduct){
    const index = this._productList.indexOf(product);
    this._productList.splice(index, 1)
  }

  clear(){
    this._productList = [];

  }

  totalPrice(){
    const result = this._productList.reduce((acc: number, item: IProduct ): number => {
      if (item.price !== null) {
      acc += item.price }
      return acc
    }, 0)
    return result
  }

  quantity(){
    return this._productList.length
  }

  availability(id: string): boolean{
    let item = this._productList.find((item) => item.id === id)
    if (item) {
      return true
    }
    return false
  }
  // return this._productList.some(item => item.id === id);

}
