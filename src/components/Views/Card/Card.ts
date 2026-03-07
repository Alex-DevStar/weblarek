import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";


interface ICard {
  title: string;
  price: string
}

export abstract class  Card extends Component<ICard> {
protected  titleElement: HTMLElement;
protected  priceElement: HTMLElement;

constructor (protected container: HTMLElement){
  super(container)

 this.titleElement = ensureElement<HTMLElement>(
      ".card__title",
      this.container,
    );
    this.priceElement = ensureElement<HTMLElement>(
      ".card__price",
      this.container,
    );

}
 set title(value:string) {
    this.titleElement.textContent = value
  }

  set price (value:string | null) {
    this.priceElement.textContent = value === null
      ? 'Бесценно'
      : `${value} синапсов`;
  }
}


