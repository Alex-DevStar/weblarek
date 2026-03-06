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
      this.events.emit("Contacts:change");
    });

    this.PhoneElement.addEventListener("input", () => {
      this.events.emit("Contacts:change");

    });

    if (this.EmailElement.value.trim() || this.PhoneElement.value.trim()) {
      this.ButtonElement.removeAttribute('disabled')
    }
      else {this.ButtonElement.setAttribute('disabled', '')
}
}
}
