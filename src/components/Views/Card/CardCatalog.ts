import { categoryMap } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Card } from "./Card";
import { CategoryKey } from "./CardPreview";



export class CardCatalog extends Card {
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;
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
    this.titleElement = ensureElement<HTMLElement>(
      ".card__title",
      this.container,
    );
    this.priceElement = ensureElement<HTMLElement>(
      ".card__price",
      this.container,
    );

    this.container.addEventListener('click', () => {
	  this.events.emit('card:click');
	});

  }
set category (value: CategoryKey) {

for (const key in categoryMap){
this.categoryElement.classList.toggle(
categoryMap[key as CategoryKey],
   key === value);
  }
  this.categoryElement.textContent = value;

}

  set image (value: string) {
    this.setImage(this.imageElement, value, this.title)
  }

}
