import { Component } from "../../base/Component";


interface ICard {
  title: string;
  price: string
}

export abstract class  Card extends Component<ICard> {
protected abstract titleElement: HTMLElement;
protected abstract priceElement: HTMLElement;

constructor (protected container: HTMLElement){
  super(container)
}
 set title(value:string) {
    this.titleElement.textContent = value
  }

  set price (value:string) {
    this.priceElement.textContent = value
  }
}


