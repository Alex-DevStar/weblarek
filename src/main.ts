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
import "./scss/styles.scss";
import { IProduct } from "./types";
import { API_URL } from "./utils/constants";
import { apiProducts } from "./utils/data";
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
const customer = new Catalog(events)
const orderForm = new FormOrder(cloneTemplate("#order"), events)
const contactsForm = new FormContacts(cloneTemplate("#contacts"), events)


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

events.on("card:select", (item:any) => {
  const card = new CardPreview(cloneTemplate("#card-preview"), {
    onClick: () => events.emit("card:add", item),
  });
  // catalog.setProductSelected(item)
  card.setEnable(item.price !== null)
  const filledCard = card.render(item);
  modal.content = filledCard;
  gallery.render();
});

events.on("modal:open", () => {
  modalElement.classList.add("modal_active");
});

events.on("modal:close", () => {
  modalElement.classList.remove("modal_active");
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
  basket.render()
});

events.on("card:remove", (item:any) => {
  cart.remove(item)
});

events.on("basket:open", () => {
const basketState = cart.quantity() !== 0
basket.setEnable(basketState)
  modal.content = basket.render();
  // events.emit("modal:open")
});

events.on("basket:order", () => {
modal.content = orderForm.render()
})

events.on("form:order", () => {
  modal.content = contactsForm.render()
})


