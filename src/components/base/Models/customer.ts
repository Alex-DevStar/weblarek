import { IBuyer, TPayment } from "../../../types";

class Customer {
 private payment: TPayment;
  private address: string;
  private phone: string;
  private email: string;


  constructor({payment, address, phone, email}: IBuyer){
    this.payment = payment;
    this.address = address;
    this.phone = phone;
    this.email = email;
  }

   fill (email?: string, phone?: string, address?: string, payment?: TPayment){
    if (email) {this.email = email}
    if (phone){this.phone = phone}
    if (address){this.address = address}
    if (payment){this.payment = payment}
   }

   data(){
    return this.payment, this.address, this.phone, this.email
  }

  reset() {
  this.email = '';
  this.phone = '';
  this.address = '';
  this.payment = '';
}

validation(){
const emailRegEx = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^(\+7|8)\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
const addressRegex = /^[A-Za-zА-Яа-яЁё\s\-]{2,}\s[A-Za-zА-Яа-яЁё\s\-]{2,}\s\d+[A-Za-zА-Яа-я]?$/;
const mail = this.email;
const phone = this.phone;
const payment = this.payment;
const address = this.address;

  if (this.email && emailRegEx.test(this.email)) {}

  return {
    mail ? null : 'Адрес почты не указан',
    phone ? null : 'Номер телефона не указан',
    address ? null : 'Адрес доставки не указан',
    payment ? null : 'Не выбран вид оплаты'
  }
}

// выбор способа оплаты (способ оплаты может принимать значения “card”
// или “cash”);
// если адрес доставки не введён, появляется сообщение об ошибке;
// если способ оплаты не выбран, появляется сообщение об ошибке;
//  выбран способ оплаты и поле «адрес доставки» непустое;
// ввод почты и телефона покупателя;
// если одно из полей не заполнено, появляется сообщение об ошибке;
// кнопка «Оплатить» может быть активной, только если на форме нет ошибок ,
//  т.е. поля почты и телефона непустые;
}
