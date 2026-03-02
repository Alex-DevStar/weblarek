import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

interface IOrder {
  address: string
}

export class FormOrder extends Component<IOrder> {
  protected AddressElement: HTMLInputElement;

  constructor(container: HTMLElement) {
    super(container)

    this.AddressElement = ensureElement<HTMLInputElement>('[name=address]', this.container)
  }
}
