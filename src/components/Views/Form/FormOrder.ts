import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

interface IOrder {
  address: string;
}

export class FormOrder extends Component<IOrder> {
  protected AddressElement: HTMLInputElement;
  protected CardButtonElement: HTMLButtonElement;
  protected CashButtonElement: HTMLButtonElement;
  protected buttonElement: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);
    this.CardButtonElement = ensureElement<HTMLButtonElement>(
      "[name=card]",
      this.container,
    );
    this.CashButtonElement = ensureElement<HTMLButtonElement>(
      "[name=cash]",
      this.container,
    );
    this.buttonElement = ensureElement<HTMLButtonElement>(
      ".order__button",
      this.container,
    );
    this.AddressElement = ensureElement<HTMLInputElement>(
      "[name=address]",
      this.container,
    );

    this.AddressElement.addEventListener("input", () => {
      (this.events.emit("order:change", { address: this.AddressElement.value })
        );
    });

    this.CardButtonElement.addEventListener("click", () => {
      this.events.emit("order:change", {payment: "card"});
    });

    this.CashButtonElement.addEventListener("click", () => {
      this.events.emit("order:change", {payment: "cash"});
    });

    this.buttonElement.addEventListener("click", (e) => {
        e.preventDefault();

      this.events.emit("form:order");
    });
  }

  setEnable(item:boolean) {
  if (!item)
{this.buttonElement.setAttribute('disabled', '')}
  else {this.buttonElement.removeAttribute('disabled')}
    }
}
