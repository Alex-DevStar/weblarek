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

constructor(container: HTMLElement, protected events: IEvents) {
  super(container)

  this.EmailElement = ensureElement<HTMLInputElement>('[name=email]', this.container)
  this.PhoneElement = ensureElement<HTMLInputElement>('[name=phone]', this.container)

    this.EmailElement.addEventListener("change", () => {
      this.events.emit("Contacts:change");
    });

    this.PhoneElement.addEventListener("change", () => {
      this.events.emit("Contacts:change");
    });
}
}
