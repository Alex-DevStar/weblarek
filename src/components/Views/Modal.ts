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
    this.contentElement = ensureElement<HTMLElement>('.modal__content', this.container);
  }
  set content (value: HTMLTemplateElement){
  const template = cloneTemplate<HTMLElement>(value)
  this.contentElement.append(template)
}
}
