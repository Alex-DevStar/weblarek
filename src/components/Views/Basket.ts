import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IBasket {
  total: string
}

export class Basket extends Component<IBasket> {
protected basketList: HTMLElement;
protected buttonElement: HTMLButtonElement;
protected basketTotalElement: HTMLElement

constructor(protected container: HTMLElement, protected events: IEvents){
  super(container)

  this.basketList = ensureElement<HTMLElement>('.basket__list' , this.container);
  this.buttonElement = ensureElement<HTMLButtonElement>('.basket__button' , this.container)
  this.basketTotalElement = ensureElement<HTMLElement>('.basket__price' , this.container)

  this.buttonElement.setAttribute('disabled', '')

  this.buttonElement.addEventListener("click", () => {
      this.events.emit("basket:order");
    });
}

setEnable(enabled:boolean) {
  if (!enabled)
{this.buttonElement.setAttribute('disabled', '')}
  else {this.buttonElement.removeAttribute('disabled')}
    }



set list(elements: HTMLElement[]){
    this.basketList.replaceChildren(...elements);
}

set total(value: string) {
  this.basketTotalElement.textContent = value
}
}
