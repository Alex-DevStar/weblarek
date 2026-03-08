import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { IBuyer } from "../../../types";

export abstract class Form<T> extends Component<T> {
  protected submitButton: HTMLButtonElement;
  protected errorsElement: HTMLElement;
  protected submitEventName = "form:submit";

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);
    this.submitButton = ensureElement<HTMLButtonElement>(
      '[type="submit"]',
      this.container,
    );

    this.errorsElement = ensureElement<HTMLElement>(".form__errors", this.container)

    this.submitButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.events.emit(this.submitEventName);
    });
  }

   setButtonEnabled(isEnabled: boolean) {
    if (isEnabled) {
      this.submitButton.removeAttribute("disabled");
    } else {
      this.submitButton.setAttribute("disabled", "");
    }
  }

  setErrors(errors:Partial<Record<keyof IBuyer, string>>){
    const msg = Object.values(errors).filter(Boolean);
      this.errorsElement.textContent = msg.join('. ');

  }
}
