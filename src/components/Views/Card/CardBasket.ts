import { ICardActions } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";

export class CardBasket extends Card {
  protected indexElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;
  constructor(
    container: HTMLElement,
    actions?: ICardActions
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

    if (actions?.onClick){
      this.container.addEventListener('click', actions.onClick)
    }
  }
}
