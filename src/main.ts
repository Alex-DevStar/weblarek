import { Api } from "./components/base/Api";
import { ApiWrapper } from "./components/base/ApiWrapper";
import { EventEmitter } from "./components/base/Events";
import { Cart } from "./components/Models/cart";
import { Catalog } from "./components/Models/catalog";
import { Customer } from "./components/Models/customer";
import { Basket } from "./components/Views/Basket";
import { CardBasket } from "./components/Views/Card/CardBasket";
import { CardCatalog } from "./components/Views/Card/CardCatalog";
import { CardPreview } from "./components/Views/Card/CardPreview";
import { FormContacts } from "./components/Views/Form/FormContacts";
import { FormOrder } from "./components/Views/Form/FormOrder";
import { Gallery } from "./components/Views/Gallery";
import { Header } from "./components/Views/Header";
import { Modal } from "./components/Views/Modal";
import { Success } from "./components/Views/Success";
import "./scss/styles.scss";
import { IBuyer, IProduct } from "./types";
import { API_URL } from "./utils/constants";
import { cloneTemplate, ensureElement } from "./utils/utils";

const events = new EventEmitter();
const catalog = new Catalog(events);
const galleryElement = ensureElement<HTMLElement>(".gallery");
const gallery = new Gallery(galleryElement);
const modalElement = ensureElement<HTMLElement>(".modal");
const modal = new Modal(events, modalElement);
const basket = new Basket(cloneTemplate("#basket"), events);
const cart = new Cart(events);
const card = new CardPreview(cloneTemplate("#card-preview"), {
  onClick: () => events.emit("preview:toggle"),
});
const headerElement = ensureElement<HTMLElement>(".header");
const header = new Header(events, headerElement);
const customer = new Customer(events);
const orderForm = new FormOrder(cloneTemplate("#order"), events);
const contactsForm = new FormContacts(cloneTemplate("#contacts"), events);
const success = new Success(cloneTemplate("#success"), events);

const api = new Api(API_URL);
const comm = new ApiWrapper(api);
comm
  .getProducts()
  .then((items) => {
    catalog.setProductList(items);
    console.log(catalog.getProductList());
  })
  .catch((err) => {
    console.error("Ошибка при получении товаров:", err);
  });

events.on("catalog:change", () => {
  const cards = catalog.getProductList().map((item: IProduct) => {
    const card = new CardCatalog(cloneTemplate("#card-catalog"), {
      onClick: () => catalog.setProductSelected(item), // проверить
    });

    return card.render(item);
  });

  gallery.render({ catalog: cards });
});

events.on("preview:toggle", () => {
  const selectedCard = catalog.getProductSelected();
  if (!selectedCard) {
    return;
  }
  if (selectedCard.price === null) {
    modal.close();
    return;
  }
  const inCart = cart.availability(selectedCard.id);
  if (inCart) {
    cart.remove(selectedCard);
  } else {
    cart.add(selectedCard);
  }
  modal.close();
});

events.on("card:select", () => {
  const item = catalog.getProductSelected();
  if (!item) return;
  const inCart = cart.availability(item.id);
  if (item.price === null) {
    card.setEnable(false);
    card.buttonText = "Не доступно";
  } else {
    card.setEnable(true);
    card.buttonText = inCart ? "Удалить" : "Купить";
  }

  modal.content = card.render(item);
  modal.open();
  gallery.render();
});

events.on("card:add", (item: IProduct) => {
  cart.add(item);
});

events.on("cart:change", () => {
  const items = cart.getProductList();
  header.counter = cart.quantity();
  const cards = items.map((item, index) => {
    const card = new CardBasket(cloneTemplate("#card-basket"), {
      onClick: () => events.emit("card:remove", item),
    });
    card.index = index + 1;
    return card.render(item);
  });

  basket.list = cards;
  basket.total = cart.totalPrice() + " " + "синапсов";
  basket.setEnable(cart.quantity() !== 0);
  basket.render();
});

events.on("card:remove", (item: IProduct) => {
  cart.remove(item);
});

events.on("basket:open", () => {
  modal.content = basket.render();
  modal.open();
});

events.on("basket:order", () => {
  modal.content = orderForm.render();
});

events.on("order:change", (data: IBuyer) => {
  customer.setData(data);
});

events.on("form:order", () => {
  modal.content = contactsForm.render();
});

events.on("form:submit", () => {
  const order = Object.assign(
    {},
    customer.data(),
    { total: cart.totalPrice() },
    { items: cart.getProductList().map((item) => item.id) },
  );
  comm
    .postProducts(order)
    .then((data) => {
      success.total = data.total;
      modal.content = success.render();
      cart.clear();
      customer.reset();
    })
    .catch((err) => {
      console.error("Ошибка при получении товаров:", err);
    });
});

events.on("success:close", () => {
  modalElement.classList.remove("modal_active");
});

events.on("customer:change", () => {
  const buyer = customer.data();
  const errors = customer.validation();

  orderForm.address = buyer.address;
  orderForm.payment = buyer.payment;

  // ошибки только по  форме order
  orderForm.setErrors({
    address: errors.address,
    payment: errors.payment,
  });

  const isOrderValid = !errors.address && !errors.payment;
  orderForm.setButtonEnabled(isOrderValid);

  contactsForm.phone = buyer.phone;
  contactsForm.email = buyer.email;

  contactsForm.setErrors({
    email: errors.email,
    phone: errors.phone,
  });

  const isContactsValid = !errors.email && !errors.phone;
  contactsForm.setButtonEnabled(isContactsValid);
});
