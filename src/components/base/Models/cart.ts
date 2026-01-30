import { IProduct } from "../../../types";

export class Cart {
  private productList: IProduct[] = [];

  getProductList(){
    return this.productList
  }

  add(product: IProduct) {
    this.productList.push(product)
  }

  remove(product: IProduct){
    const index = this.productList.indexOf(product);
    this.productList.splice(index, 1)
  }

  clear(){
    this.productList = [];

  }

  totalPrice(){
    const result = this.productList.reduce((acc: number, item: IProduct ): number => {
      if (item.price !== null) {
      acc += item.price }
      return acc
    }, 0)
    return result
  }

  quantity(){
    return this.productList.length
  }

  availability(id: string): boolean{
    let item = this.productList.find((item) => item.id === id)
    if (item) {
      return true
    }
    return  false
  }

}
