import { IBuyer, TPayment } from "../../../types";

export class Customer {
  private payment: TPayment = '';
  private address: string = '';
  private phone: string = '';
  private email: string = '';


   setData(data: Partial<IBuyer>): void {
        if (data.payment !== undefined) {
            this.payment = data.payment;
        }
        if (data.email !== undefined) {
            this.email = data.email;
        }
        if (data.phone !== undefined) {
            this.phone = data.phone;
        }
        if (data.address !== undefined) {
            this.address = data.address;
        }
  }

   data(): IBuyer {
  return {
    email: this.email,
    phone: this.phone,
    address: this.address,
    payment: this.payment
  };
}

  reset() {
  this.email = '';
  this.phone = '';
  this.address = '';
  this.payment = '';
}

validation():Partial<Record<keyof IBuyer, string>>{
  const result: Partial<Record<keyof IBuyer, string>> = {};
    if (!this.email) {result.email = 'Адрес почты не указан'};
    if (!this.phone){result.phone = 'Номер телефона не указан'};
    if (!this.address){result.address = 'Адрес доставки не указан'};
    if (!this.payment){result.payment = 'Не выбран вид оплаты'}
    return result
  }
}

