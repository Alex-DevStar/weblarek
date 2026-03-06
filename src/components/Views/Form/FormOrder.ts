import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

interface IOrder {
  address: string
}

export class FormOrder extends Component<IOrder> {
  protected AddressElement: HTMLInputElement;
  protected CardButtonElement: HTMLButtonElement; 
  protected CashButtonElement: HTMLButtonElement;
  protected ButtonElement : HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container)
    this.CardButtonElement = ensureElement<HTMLButtonElement>('[name=card]' , this.container)
    this.CashButtonElement = ensureElement<HTMLButtonElement>('[name=cash]' , this.container)
    this.ButtonElement = ensureElement<HTMLButtonElement>('.order__button' , this.container)
    this.AddressElement = ensureElement<HTMLInputElement>('[name=address]', this.container)

    this.AddressElement.addEventListener("input", () => {
      this.events.emit("Address:change");

      if (this.AddressElement.value.trim()) {
      this.ButtonElement.removeAttribute('disabled')
    }
      else {this.ButtonElement.setAttribute('disabled', '')
}
    });

    this.ButtonElement.addEventListener("click", () => {
      this.events.emit("form:order")
    })


  }
}
