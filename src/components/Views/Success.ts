import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface ISuccess {
  total: string
}

export class Success extends Component<ISuccess> {
  protected successButton: HTMLButtonElement;
  protected titleElement: HTMLElement;
  protected totalDescriptionElement: HTMLElement;

  constructor(protected container: HTMLElement){
    super(container)

    this.successButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
    this.titleElement = ensureElement<HTMLElement>('.order-success__title', this.container);
    this.totalDescriptionElement = ensureElement<HTMLElement>('.order-success__description', this.container);
  }

  set total(value: string) {
    this.totalDescriptionElement.textContent = value;
  }
}
