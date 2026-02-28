import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Card } from "./Card";

export class CardCatalog extends Card {
  protected indexElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;
  constructor(
    protected events: IEvents,
    container: HTMLElement,
  ) {
    super(container);

    this.indexElement = ensureElement<HTMLElement>(
      ".basket__item-index",
      this.container,
    );
    this.buttonElement = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container,
    );
    this.titleElement = ensureElement<HTMLElement>(
      ".card__title",
      this.container,
    );
    this.priceElement = ensureElement<HTMLElement>(
      ".card__price",
      this.container,
    );

    this.container.addEventListener("click", () => {
      this.events.emit("card:removeFromCart");
    });
  }
}
