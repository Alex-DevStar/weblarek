import { IBuyer, TPayment } from "../../../types";

export class Customer {
 private payment!: TPayment;
  private address!: string;
  private phone!: string;
  private email!: string;


   fill (email?: string, phone?: string, address?: string, payment?: TPayment){
    if (email) {this.email = email}
    if (phone){this.phone = phone}
    if (address){this.address = address}
    if (payment){this.payment = payment}
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

validation(){
// const emailRegEx = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
// const phoneRegex = /^(\+7|8)\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
// const addressRegex = /^[A-Za-zА-Яа-яЁё\s\-]{2,}\s[A-Za-zА-Яа-яЁё\s\-]{2,}\s\d+[A-Za-zА-Яа-я]?$/;
  let result: { [key: string]: string } = {};
    if (!this.email) {result.email = 'Адрес почты не указан'};
    if (!this.phone){result.phone = 'Номер телефона не указан'};
    if (!this.address){result.address = 'Адрес доставки не указан'};
    if (!this.payment){result.payment = 'Не выбран вид оплаты'}
    return result
  // if (this.email && emailRegEx.test(this.email)) {}

  } /// сделать отлельный метод валидации для полей через regexp

}

