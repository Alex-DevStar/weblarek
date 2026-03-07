import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

interface IContacts {
  email: string;
  phone: string;
}

export class FormContacts extends Component<IContacts> {
protected EmailElement: HTMLInputElement;
protected PhoneElement: HTMLInputElement;
protected ButtonElement: HTMLButtonElement;


constructor(container: HTMLElement, protected events: IEvents) {
  super(container)

  this.EmailElement = ensureElement<HTMLInputElement>('[name=email]', this.container)
  this.PhoneElement = ensureElement<HTMLInputElement>('[name=phone]', this.container)
  this.ButtonElement = ensureElement<HTMLButtonElement>('.button' , this.container)


    this.EmailElement.addEventListener("input", () => {
      this.events.emit("order:change", {email: this.EmailElement.value});
    });

    this.PhoneElement.addEventListener("input", () => {
      this.events.emit("order:change", {phone: this.PhoneElement.value});

    });

    this.ButtonElement.addEventListener("click", (e) => {
      e.preventDefault();
      this.events.emit("form:submit");

    });

}
setEnable(item:boolean) {
  if (!item)
{this.ButtonElement.setAttribute('disabled', '')}
  else {this.ButtonElement.removeAttribute('disabled')}
    }
}
