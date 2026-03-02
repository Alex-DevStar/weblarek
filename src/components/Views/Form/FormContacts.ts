import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

interface IContacts {
  email: string;
  phone: string;
}

export class FormContacts extends Component<IContacts> {
protected EmailElement: HTMLInputElement;
protected PhoneElement: HTMLInputElement;

constructor(container: HTMLElement) {
  super(container)

  this.EmailElement = ensureElement<HTMLInputElement>('[name=email]', this.container)
  this.PhoneElement = ensureElement<HTMLInputElement>('[name=phone]', this.container)
}
}
