import { categoryMap } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Card } from "./Card";

export type CategoryKey = keyof typeof categoryMap;

export class CardPreview extends Card {
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;
  protected buttonElement: HTMLElement;
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;
  constructor(
    protected events: IEvents,
    container: HTMLElement,
  ) {
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
    this.titleElement = ensureElement<HTMLElement>(
      ".card__title",
      this.container,
    );
    this.priceElement = ensureElement<HTMLElement>(
      ".card__price",
      this.container,
    );

    this.buttonElement.addEventListener("click", () => {
      if (this.buttonElement.textContent === "В корзину") {
        this.events.emit("card:add");
      } else if (this.buttonElement.textContent === "Удалить из корзины") {
        this.events.emit("card:remove");
      }
    });
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

  // set category(value: ProductType) {

  //   switch (value) {
  //     case "софт-скил":
  //       this.categoryElement.classList.toggle("card__category_soft");
  //       break;
  //     case "другое":
  //       this.categoryElement.classList.toggle("card__category_other");
  //       break;
  //     case "дополнительное":
  //       this.categoryElement.classList.toggle("card__category_additional");
  //       break;
  //     case "кнопка":
  //       this.categoryElement.classList.toggle("card__category_button");
  //       break;
  //     case "хард-скил":
  //       this.categoryElement.classList.toggle("card__category_hard");
  //       break;
  //   }

  //       this.categoryElement.textContent = value;
  // }

  set image(value: string) {
    this.setImage(this.imageElement, value, this.title);
  }
}
