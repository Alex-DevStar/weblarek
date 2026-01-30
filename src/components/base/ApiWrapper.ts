import { IApi, Iorder, IProduct, IProductsResponse, IOrderRequest } from "../../types";
export class ApiWrapper {
  private api: IApi;
  constructor(api: IApi) {
    this.api = api;
  }
 async getProducts(): Promise<IProduct[]> {
    const response = await this.api.get<IProductsResponse>('/product/');
    return response.items;
}

  async postProducts(data: IOrderRequest): Promise<Iorder>{
    return await this.api.post("/order/", data)
  }

}
