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
  const cards = catalog.getProductList().map((item: any) => {
    const card = new CardCatalog(cloneTemplate("#card-catalog"), {
      onClick: () => events.emit("card:select", item),
    });
    return card.render(item);
  });

  gallery.render({ catalog: cards });
});

events.on("card:select", (item: any) => {
  const card = new CardPreview(cloneTemplate("#card-preview"), {
    onClick: () => events.emit("card:add", item),
  });
  // catalog.setProductSelected(item)
  card.setEnable(item.price !== null);
  const filledCard = card.render(item);
  modal.content = filledCard;
  modal.open()
  gallery.render();
});

events.on("card:add", (item: IProduct) => {
  // const card = new CardBasket(events, cloneTemplate("#card-basket"));
  // const filledCard = card.render(item)
  cart.add(item);
  // basket.list = [filledCard]//
  // const rbasket = basket.render() обработка корзины для вывода
  // modal.content = rbasket вывод корзины
});

events.on("cart:change", () => {
  const items = cart.getProductList();
  header.counter = cart.quantity();
  const cards = items.map((item: any) => {
    const card = new CardBasket(cloneTemplate("#card-basket"), {
      onClick: () => events.emit("card:remove", item),
    });
    return card.render(item);
  });
  basket.list = cards;
  basket.total = cart.totalPrice() + " " + "синапсов";
  basket.render();
});

events.on("card:remove", (item: any) => {
  cart.remove(item);
});

events.on("basket:open", () => {
  const basketState = cart.quantity() !== 0;
  basket.setEnable(basketState); // создать функцию
  modal.content = basket.render();
  modal.open()
});

events.on("basket:order", () => {
  modal.content = orderForm.render();
});

events.on("order:change", (data: IBuyer) => {
  customer.setData(data);
  const customerData = customer.data();
  const isEnable = Boolean(customerData.address && customerData.payment);
  orderForm.setButtonEnabled(isEnable);
  const isEnableContacts = Boolean(customerData.email && customerData.phone);
  contactsForm.setButtonEnabled(isEnableContacts);
});

events.on("form:order", () => {
  modal.content = contactsForm.render();
});

events.on("form:submit", () => {
  const errors = customer.validation();
  if (Object.keys(errors).length > 0) {
    throw errors;
  }

  const order = Object.assign(
    {},
    customer.data(),
    { total: cart.totalPrice() },
    { items: cart.getProductList().map((item) => item.id) },
  );
  comm
    .postProducts(order)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error("Ошибка при получении товаров:", err);
    });
  success.total = cart.totalPrice();
  modal.content = success.render();
});

events.on("success:close", () => {
  cart.clear();
  modalElement.classList.remove("modal_active");
});
