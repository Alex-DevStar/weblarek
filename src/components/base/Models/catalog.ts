import { IProduct } from "../../../types";

class Catalog  {
  private _productList: IProduct[];
  private _productSelected : IProduct;

  constructor(productList: IProduct[], productSelected : IProduct) {
    this._productList = productList;
    this._productSelected  = productSelected;
  }

  get productList(){
    return this._productList
  }

  set productSelected(product: IProduct){
    this._productSelected = product;
  }

  get productSelected(){
    return this._productSelected;
  }

  set productList(products: IProduct[]){
     this._productList = products
  }

   productById(id: string) :IProduct | undefined{
    return this._productList.find((item) => item.id === id)
  }

  }

