import { IProduct } from "../../types";

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
