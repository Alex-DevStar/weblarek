import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form } from "./Form";

interface IOrder {
  address: string;
  payment: "card" | "cash";
}

export class FormOrder extends Form<IOrder> {
  protected AddressElement: HTMLInputElement;
  protected CardButtonElement: HTMLButtonElement;
  protected CashButtonElement: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container, events);
    this.CardButtonElement = ensureElement<HTMLButtonElement>(
      "[name=card]",
      this.container,
    );
    this.CashButtonElement = ensureElement<HTMLButtonElement>(
      "[name=cash]",
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

  }

}
