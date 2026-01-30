import { IApi, Iorder, IProduct } from "../../types";
export class ApiWrapper {
  private api: IApi;
  constructor(api: IApi) {
    this.api = api;
  }
 async getProducts():Promise<IProduct[]>{
   return await this.api.get<IProduct[]>("/product/")
  }

  async postProducts(data: IProduct[]): Promise<Iorder>{
    return await this.api.post("/order/", data)
  }

}
