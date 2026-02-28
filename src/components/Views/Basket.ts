import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IBasket {
  total: string
}

export class Basket extends Component<IBasket> {
protected basketList: HTMLElement;
protected basketButton: HTMLButtonElement;
protected basketTotalElement: HTMLElement

constructor(protected container: HTMLElement){
  super(container)

  this.basketList = ensureElement<HTMLElement>('.basket__list' , this.container);
  this.basketButton = ensureElement<HTMLButtonElement>('.basket__button' , this.container)
  this.basketTotalElement = ensureElement<HTMLElement>('.basket__price' , this.container)

}

set list(elements: HTMLElement[]){
    this.basketList.replaceChildren(...elements);
}

set total(value: string) {
  this.basketTotalElement.textContent = value
}
}
