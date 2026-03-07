import { ICardActions } from "../../../types";
import { categoryMap, CDN_URL } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";

export type CategoryKey = keyof typeof categoryMap;

export class CardPreview extends Card {
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;
  protected buttonElement: HTMLElement;
  protected descriptionElement: HTMLElement;
  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.categoryElement = ensureElement<HTMLElement>(
      ".card__category",
      this.container,
    );
    this.imageElement = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container,
    );
    this.buttonElement = ensureElement<HTMLElement>(
      ".card__button",
      this.container,
    );

    this.descriptionElement = ensureElement<HTMLElement>(
      ".card__text",
      this.container,
    );

    if (actions?.onClick) {
      this.container.addEventListener("click", actions.onClick);
    }
  }

  setEnable(value: boolean) {
    if (!value) {
      this.buttonElement.setAttribute("disabled", "");
    } else {
      this.buttonElement.removeAttribute("disabled");
    }
  }

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  set buttonText(value:string){
    this.buttonElement.textContent = value;
  }

  set category(value: CategoryKey) {
    for (const key in categoryMap) {
      this.categoryElement.classList.toggle(
        categoryMap[key as CategoryKey],
        key === value,
      );
    }
    this.categoryElement.textContent = value;
  }

  set image(value: string) {
    this.setImage(this.imageElement, CDN_URL + value, this.title);
  }
}
