import { IProduct } from "../../../types";

class Catalog  {
  private productList: IProduct[];
  private productSelected : IProduct;

  constructor(productList: IProduct[], productSelected: IProduct) {
    this.productList = productList;
    this.productSelected  = productSelected;
  }

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

   productById(id: string) :IProduct | undefined{
    return this.productList.find((item) => item.id === id)
  }


  }



