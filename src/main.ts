import { Api } from "./components/base/Api";
import { ApiWrapper } from "./components/base/ApiWrapper";
import { EventEmitter } from "./components/base/Events";
import { Cart } from "./components/Models/cart";
import { Catalog } from "./components/Models/catalog";
import { Customer } from "./components/Models/customer";
import { CardBasket } from "./components/Views/Card/CardBasket";
import { CardCatalog } from "./components/Views/Card/CardCatalog";
import { CardPreview } from "./components/Views/Card/CardPreview";
import { Gallery } from "./components/Views/Gallery";
import { Header } from "./components/Views/Header";
import { Modal } from "./components/Views/Modal";
import "./scss/styles.scss";
import { API_URL } from "./utils/constants";
import { apiProducts } from "./utils/data";
import { cloneTemplate, ensureElement } from "./utils/utils";

const events = new EventEmitter();
const catalog = new Catalog(events);
const galleryElement = ensureElement<HTMLElement>(".gallery");
const gallery = new Gallery(galleryElement);
const modalElement = ensureElement<HTMLElement>(".modal");
const modal = new Modal(events, modalElement)

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

events.on("card:select", (item) => {

  const card = new CardPreview(events, cloneTemplate("#card-preview"))
  const filledCard = card.render(item)
  modal.content = filledCard
  gallery.render()
})

events.on("modal:open", ()=> {
  modalElement.classList.add('modal_active')
})

events.on("modal:close", ()=> {
  modalElement.classList.remove('modal_active')
})


