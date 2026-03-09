import { TPayment } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form } from "./Form";

interface IOrder {
  address: string;
  payment: "card" | "cash";
}

export class FormOrder extends Form<IOrder> {
  protected addressElement: HTMLInputElement;
  protected cardButtonElement: HTMLButtonElement;
  protected cashButtonElement: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container, events);

    this.submitEventName = "form:order";

    this.cardButtonElement = ensureElement<HTMLButtonElement>(
      "[name=card]",
      this.container,
    );
    this.cashButtonElement = ensureElement<HTMLButtonElement>(
      "[name=cash]",
      this.container,
    );

    this.addressElement = ensureElement<HTMLInputElement>(
      "[name=address]",
      this.container,
    );

    this.addressElement.addEventListener("input", () => {
      (this.events.emit("order:change", { address: this.addressElement.value })
        );
    });

    this.cardButtonElement.addEventListener("click", () => {
      this.events.emit("order:change", {payment: "card"});
    });

    this.cashButtonElement.addEventListener("click", () => {
      this.events.emit("order:change", {payment: "cash"});
    });

  }

  set address(value:string) {
      this.addressElement.value = value;
    }

    set payment(value: TPayment) {
  const isCard = value === "card";
  const isCash = value === "cash";

  this.cardButtonElement.classList.toggle("button_alt-active", isCard);
  this.cashButtonElement.classList.toggle("button_alt-active", isCash);

  this.cardButtonElement.setAttribute("aria-pressed", String(isCard));
  this.cashButtonElement.setAttribute("aria-pressed", String(isCash));
}

}
