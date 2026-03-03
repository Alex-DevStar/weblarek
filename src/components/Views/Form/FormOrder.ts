import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

interface IOrder {
  address: string
}

export class FormOrder extends Component<IOrder> {
  protected AddressElement: HTMLInputElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container)

    this.AddressElement = ensureElement<HTMLInputElement>('[name=address]', this.container)

    this.AddressElement.addEventListener("change", () => {
      this.events.emit("Address:change");
    });
  }
}
