import { IProduct } from "../../../types";

export class Catalog  {
  private productList!: IProduct[];
  private productSelected! : IProduct;

  getProductList(){
    return this.productList
  }

  setProductSelected(product: IProduct){
    this.productSelected = product;
  }

  getProductSelected(){
    return this.productSelected;
  }

  setProductList(products: IProduct[]){
     this.productList = products
  }

   productById(id: string, array: IProduct[]) :IProduct | undefined{
    return array.find((item) => item.id === id)
  }


  }



