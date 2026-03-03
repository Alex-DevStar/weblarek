import { cloneTemplate, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IModal {
content: HTMLElement
}

export class Modal extends Component<IModal> {
  protected modalButton: HTMLButtonElement;
  protected contentElement: HTMLElement;
  constructor (protected events: IEvents, protected container: HTMLElement){
    super(container);

    this.modalButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
    this.modalButton.addEventListener('click', () => {
      this.events.emit("modal:close")
    })
    this.contentElement = ensureElement<HTMLElement>('.modal__content', this.container);
  }
  set content (value: HTMLElement){
  this.events.emit("modal:open")
  this.contentElement.replaceChildren(value)
}

}
