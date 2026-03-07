import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface ISuccess {
  total: number
}

export class Success extends Component<ISuccess> {
  protected successButton: HTMLButtonElement;
  protected titleElement: HTMLElement;
  protected totalDescriptionElement: HTMLElement;

  constructor(protected container: HTMLElement, protected events: IEvents){
    super(container)

    this.successButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
    this.titleElement = ensureElement<HTMLElement>('.order-success__title', this.container);
    this.totalDescriptionElement = ensureElement<HTMLElement>('.order-success__description', this.container);

    this.successButton.addEventListener("click", () => {
      this.events.emit("success:close");
    });
  }

  set total(value: number) {
    this.totalDescriptionElement.textContent = `${value} синапсов`;
  }
}
