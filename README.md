# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами
- src/components/Models/ — папка с классами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run dev
```

или

```
yarn
yarn dev
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Интернет-магазин «Web-Larёk»
«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и  отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component
Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`


#### Класс Api
Содержит в себе базовую логику отправки запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter
Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` -  хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.

#### Класс Catalog
Класс реализует хранение массива карточек товаров и конкретной выбранной карточки для дальнейшего взаимодействия с ними, позволяет как добавлять так и удалять массив либо саму карточку.
  
Поля класса: 
`productList: IProduct[]` - массив карточек товаров.  
`productSelected : IProduct` - карточка выбранного товара.  

Методы класса:  
`getProductList()` - возвращает массив карточек товаров.  
`setProductSelected(product: IProduct)` - возвращает карточку выбранного товара.  
`getProductSelected()` - сохраеняет карточку выбранного товара.  
`setProductList(products: IProduct[])` - сохраняет массив карточек товаров.  
`productById(id: string) :IProduct | undefined` - получение одного товара по его id.  

#### Класс Cart

Класс выполняет хранение карточек товаров в корзине ввиде массива, так же предоставляет все необходимые методы для управления товарами в корзине: добавление, удаление, очистка, подсчёт и проверка наличия.    

Поля класса:  

`productList: IProduct[]` - массив корзины для товаров. 

Методы класса:  
`getProductList()` - получение массива товаров, которые находятся в корзине  
`add(product: IProduct)` - добавление товара, который был получен в параметре, в массив корзины.  
`remove(product: IProduct)` - удаление товара, полученного в параметре из массива корзины.  
`clear()` - очистка корзины.  
`totalPrice(): number` - получение стоимости всех товаров в корзине.  
`quantity(): number` - получение количества товаров в корзине.  
`availability(id: string): boolean` - проверка наличия товара в корзине по его id, полученного в параметр метода.  

#### Класс Customer

Класс `Customer` представляет покупателя и хранит данные, необходимые для оформления заказа: способ оплаты, адрес доставки, телефон и e-mail.   

Поля класса: 

`payment: TPayment` - вариант оплаты.  
`address: string` - адрес покупателя.  
`phone: string` - номер телефона.  
`email: string` - адрес электронной почты.  

Методы класса: 
`setData(data: Partial<IBuyer>): void` - сохранение данных в модели, позволяет частично обновить любые поля покупателя.  
  
`data(): IBuyer` - получение всех данных покупателя.  
`reset()` - очистка данных покупателя.  
`validation()` -  валидация данных, поле является валидным, если оно не пустое.  

### Данные (Модели данных)

#### Интерфейс IProduct

Интерфейс описывает структуру объекта товара. Используется для типизации данных при работе с каталогом продуктов, обеспечивая единообразие и надёжность обращения к полям объекта.

```ts
interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}
```

Поля интерфейса: 
`id: string;` - уникальный индентификационный номер.  
`description: string` - подробное описание товара.  
`image: string` - ссылка на исходное изображение.  
`title: string` - Заголовок товара.  
`category: string` - категория, которой относится товар.  
`price: number | null` - цена товара, либо null, если цена отсутствует.  

#### Интерфейс IBuyer

Интерфейс описывает структуру объекта покупателя. Используется для типизации и обработки информации при оформлении заказа.

```ts
interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}
```

Поля интерфейса:

`payment: TPayment` тип оплаты, может быть "card", "cash" или пустой строкой. Основан на типе:  
``` ts 
type TPayment = "card" | "cash" | "";
```
`email: string` - электронная почта  
`phone: string` - телнфонный номер  
`address: string` - адрес покупателя  

#### Интерфейс Iorder

Интерфейс описывает структуру ответа от сервара.  

```ts
interface Iorder {
  id: string;
  total: number;
}
```

#### Интерфейс IProductsResponse

Интерфейс описывает структуру ответа от сервера при получении списка товаров.  

```ts
interface IProductsResponse {
  total: number;
  items: IProduct[];
}
```

Поля интерфейса:  

`total: number` — общее количество карточек товаров, полученных с сервера.  
`items: IProduct[]` — массив товаров, каждый из которых соответствует интерфейсу IProduct.  

Используется для типизации данных при GET-запросе на эндпоинт /product/.  

#### Интерфейс IOrderRequest

Интерфейс описывает структуру данных, отправляемых на сервер при оформлении заказа.
Расширяет интерфейс IBuyer, добавляя необходимые поля для заказа.    

```ts
interface IOrderRequest extends IBuyer {
  total: number;
  items: string[];
}
```

Наследуется от:  
`IBuyer` — включает поля:  
`email: string`  
`phone: string`  
`address: string`  
`payment: TPayment`  

Дополнительные поля:  
`total: number` — общая стоимость заказа  
`items: string[]` — массив идентификаторов товаров, выбранных пользователем.  

Используется для отправки данных на эндпоинт /order/ через POST-запрос.  

#### Тип TPayment

```ts 
type TPayment = "" | "card" | "cash"
```
Тип содержит варинаты оплаты для интерфейса IBuyer.  


### Слой коммуникации

#### Класс ApiWrapper  

Класс ApiWrapper реализует композицию — принимает в конструктор объект, соответствующий интерфейсу IApi, и делегирует ему сетевые запросы. Предназначен для работы с товарами и оформлением заказов. Используется для упрощения и инкапсуляции API-логики.    

Конструктор:
```ts
constructor(api: IApi) - Принимает экземпляр класса, реализующего интерфейс IApi.  
```

 Поля:
`api: IApi` — приватное поле, содержащее ссылку на внешний объект API, через который будут выполняться запросы.  

 Методы:
`getProducts(): Promise<IProduct[]>` — делает GET-запрос к /product/ и возвращает массив товаров с сервера.    
`postProducts(data: IProduct[]): Promise<IOrder>` — делает POST-запрос на /order/, передаёт массив выбранных товаров и получает данные по заказу.  

## Слой презентера (Presenter, `main.ts`)

Слой презентера реализован в файле `src/main.ts`.  
Он:
- создаёт экземпляры моделей (`Catalog`, `Cart`, `Customer`);
- создаёт экземпляры представлений (`Gallery`, `Modal`, `Basket`, `Header`, `CardPreview`, `FormOrder`, `FormContacts`, `Success`);
- инициализирует слой коммуникации (`Api`, `ApiWrapper`);
- подписывается на события `EventEmitter` и реализует бизнес-сценарии.

Основные обязанности презентера:
- загрузка каталога через `ApiWrapper.getProducts()` и передача данных в модель `Catalog`;
- связывание `Catalog` и `Gallery` через событие `catalog:change`;
- управление модальным окном превью (`card:select` → настройка `CardPreview` → показ модалки);
- обработка переключения товара в корзине из превью (`preview:toggle` → `cart.add` / `cart.remove`);
- реакция на изменения корзины (`cart:change` → обновление `Basket` и `Header`);
- открытие корзины (`basket:open`) и переход к оформлению (`basket:order`);
- синхронизация моделей и форм заказа (`order:change` → обновление `Customer`, далее `customer:change` → обновление `FormOrder` и `FormContacts`);
- отправка заказа (`form:submit` → сбор `IOrderRequest`, вызов `ApiWrapper.postProducts`, показ `Success`, очистка `Cart` и `Customer`);
- закрытие окна успеха (`success:close` → скрытие модального окна).

Таким образом, презентер остаётся единственным местом, где находится «склейка» между Model и View:  
ни модели, ни представления не знают друг о друге напрямую и общаются только через события.

---

## Слой представления (Views)

Слой представления отвечает только за работу с DOM:
- получает данные от презентера,
- обновляет разметку,
- генерирует пользовательские события (через `EventEmitter` или переданные обработчики).

Никакой бизнес-логики и запросов к серверу здесь нет.

---

### Интерфейс `ICard`

Минимальный набор данных для любой карточки товара:
- `title: string` — заголовок карточки;
- `price: string` — цена в текстовом виде.

Используется в абстрактном классе `Card` как дженерик-тип данных.

---

### Абстрактный класс `Card`

Базовый класс для карточек товаров.

Поля:
- `titleElement: HTMLElement` — заголовок карточки;
- `priceElement: HTMLElement` — элемент цены;
- `buttonElement?: HTMLButtonElement` — кнопка действия (опционально).

Методы:
- `set title(value: string)` — устанавливает заголовок;
- `set price(value: number | null)` — устанавливает цену, обрабатывая случай `null` (например, «Бесценно»);
- `set buttonText(value: string)` — текст кнопки.

Навешивание обработчиков из `ICardActions` (например, `onClick`) выполняется в наследниках.

---

### Класс `CardCatalog`

```ts
export class CardCatalog extends Card<IProduct> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;

  constructor(container: HTMLElement, actions?: ICardActions) { ... }

  set category(value: string) { ... }
  set image(value: string) { ... }
}
```

Назначение: карточка товара в общем каталоге.

Дополнительные поля:
- `imageElement` — изображение товара;
- `categoryElement` — элемент категории.

---

### Класс `CardPreview`

```ts
export class CardPreview extends Card<IProduct> {
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;
  protected descriptionElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) { ... }

  set description(value: string) { ... }
  set image(value: string) { ... }
  set buttonText(value: string) { ... }
  setEnable(enabled: boolean) { ... }
}
```

Назначение: карточка предпросмотра товара внутри модального окна.

Дополнительные элементы:
- `categoryElement` — категория товара в превью;
- `imageElement` — большое изображение в модалке;
- `descriptionElement` — описание товара (`.card__text`);
- `buttonElement` — кнопка основного действия («Купить» / «Удалить» / «Не доступно»).

Методы:
- `set description(value: string)` — устанавливает текст описания;
- `set image(value: string)` — подставляет ссылку на картинку через `CDN_URL`;
- `set buttonText(value: string)` — управляет текстом кнопки;
- `setEnable(enabled: boolean)` — включает/выключает кнопку (через атрибут `disabled`).

Обработчики действий приходят через `ICardActions` и навешиваются в конструкторе.  
В частности, кнопка вызывает переданный `onClick`, который в презентере эмитит событие `preview:toggle`.

---

### Класс `CardBasket`

```ts
export class CardBasket extends Card<IProduct> {
  protected indexElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) { ... }

  set index(value: number) { ... }
}
```

Назначение: отображение товара внутри корзины.

Дополнительные элементы:
- `indexElement` — порядковый номер позиции в корзине (`.basket__item-index`);
- `buttonElement` — кнопка удаления позиции (`.card__button`).

Методы:
- `set index(value: number)` — устанавливает порядковый номер товара в списке корзины.

---

### Интерфейс `IGallery` и компонент `Gallery`

```ts
interface IGallery {
  catalog: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
  protected catalogElement: HTMLElement;

  set catalog(items: HTMLElement[]) { ... }
  render(data?: Partial<IGallery>): HTMLElement { ... }
}
```

Назначение: компонент-контейнер для списка карточек каталога на главной странице.

Поля:
- `catalogElement` — DOM-элемент контейнера галереи (`.gallery`).

Методы:
- `set catalog(items: HTMLElement[])` — полностью заменяет содержимое галереи массивом карточек (`replaceChildren(...items)`);
- `render(data?: Partial<IGallery>)` — обновляет состояние компонента и возвращает корневой контейнер.

---

### Интерфейс `IModal` и компонент `Modal`

```ts
interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  protected modalButton: HTMLButtonElement;
  protected contentElement: HTMLElement;

  open(): void { ... }
  close(): void { ... }

  set content(value: HTMLElement) { ... }
}
```

Назначение: общее модальное окно, через которое показываются превью, корзина, формы и экран успеха.

Поля:
- `modalButton` — кнопка закрытия модалки (`.modal__close`);
- `contentElement` — контейнер для содержимого (`.modal__content`).

Поведение:
- `open()` — добавляет класс активности (например, `modal_active`);
- `close()` — убирает класс активности;
- сеттер `content` заменяет содержимое модалки на переданный `HTMLElement`.

---

### Интерфейс `IBasket` и класс `Basket`

```ts
interface IBasket {
  list: HTMLElement[];
  total: string;
}

export class Basket extends Component<IBasket> {
  protected basketList: HTMLElement;
  protected basketTotalElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  set list(items: HTMLElement[]) { ... }
  set total(value: string) { ... }
  setEnable(value: boolean) { ... }
}
```

Назначение: представление корзины с товарами, итоговой суммой и кнопкой оформления заказа.

Поля:
- `basketList` — контейнер для списка товаров (`.basket__list`);
- `basketTotalElement` — элемент с итоговой суммой (`.basket__price`);
- `buttonElement` — кнопка перехода к оформлению (`.basket__button`).

Методы:
- `set list(items: HTMLElement[])` — полностью заменяет содержимое списка корзины;
- `set total(value: string)` — устанавливает итоговую сумму (в том числе с единицей измерения);
- `setEnable(value: boolean)` — включает/отключает кнопку оформления (например, если корзина пуста).

---

### Интерфейс `IHeader` и класс `Header`

```ts
interface IHeader {
  counter: number;
}

export class Header extends Component<IHeader> {
  protected basketCounter: HTMLElement;

  set counter(value: number) { ... }
}
```

Назначение: отображение шапки сайта с индикатором количества товаров в корзине.

Поля:
- `basketCounter` — элемент счётчика товаров (`.header__basket-counter`).

Методы:
- `set counter(value: number)` — обновляет значение счётчика в DOM.

В конструкторе также навешивается обработчик клика по иконке корзины, который эмитит событие `basket:open`.

---

### Интерфейс `IOrder` и класс `FormOrder`

```ts
interface IOrder {
  address: string;
}

export class FormOrder extends Component<IOrder> {
  protected AddressElement: HTMLInputElement;
  protected CardButtonElement: HTMLButtonElement;
  protected CashButtonElement: HTMLButtonElement;
  protected ButtonElement: HTMLButtonElement;
}
```

Назначение: форма первого шага оформления заказа (выбор способа оплаты и адреса доставки).

Поля:
- `AddressElement` — поле ввода адреса (`[name=address]`);
- `CardButtonElement` — кнопка выбора оплаты картой (`[name=card]`);
- `CashButtonElement` — кнопка выбора оплаты наличными (`[name=cash]`);
- `ButtonElement` — кнопка перехода к следующему шагу (`.order__button`).

Поведение:
- при вводе адреса эмитит событие `order:change` с частичными данными `{ address }`;
- при выборе способа оплаты эмитит `order:change` с `{ payment: 'card' }` или `{ payment: 'cash' }`;
- при клике по `ButtonElement` эмитит событие `form:order` (переход ко второй форме).

---

### Интерфейс `IContacts` и класс `FormContacts`

```ts
interface IContacts {
  email: string;
  phone: string;
}

export class FormContacts extends Component<IContacts> {
  protected EmailElement: HTMLInputElement;
  protected PhoneElement: HTMLInputElement;
  protected ButtonElement: HTMLButtonElement;
}
```

Назначение: форма второго шага оформления заказа (контактные данные покупателя).

Поля:
- `EmailElement` — поле ввода email (`[name=email]`);
- `PhoneElement` — поле ввода телефона (`[name=phone]`);
- `ButtonElement` — кнопка отправки заказа (`.contacts__button`).

Поведение:
- на ввод в полях `email` и `phone` эмитит событие `order:change` с частичными данными покупателя (например, `{ email }` или `{ phone }`);
- при клике по кнопке отправки формы эмитит событие `form:submit` (через базовый класс `Form`), после чего презентер собирает объект заказа и отправляет его на сервер.

---

### Интерфейс `ISuccess` и класс `Success`

```ts
interface ISuccess {
  total: string;
}

export class Success extends Component<ISuccess> {
  protected totalElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  set total(value: string) { ... }
}
```

Назначение: экран/модалка успешного оформления заказа.

Поля:
- `totalElement` — элемент с финальной суммой заказа (например, `.order-success__description`);
- `buttonElement` — кнопка «За новыми покупками».

Методы:
- `set total(value: string)` — подставляет итоговую сумму в текст сообщения;
- обработчик клика по `buttonElement` эмитит событие `success:close`.

---

## Цепочки событий (View → Presenter → Model)

Ниже — основные цепочки взаимодействия между слоями через `EventEmitter` (файл `main.ts`).

1. **Загрузка каталога**

   - Presenter:
     - запрашивает товары через `ApiWrapper.getProducts()`;
   - Model `Catalog`:
     - сохраняет список товаров `setProductList(items)` и эмитит `catalog:change`;
   - View `Gallery`:
     - обработчик `events.on('catalog:change', ...)`;
     - создаёт карточки `CardCatalog` на основе данных;
     - вызывает `gallery.render({ catalog: cards })`.

2. **Выбор товара из каталога**

   - View `CardCatalog`:
     - по клику вызывает обработчик `onClick`;
     - презентер эмитит `events.emit('card:select', item)`;
   - Presenter (в `main.ts`):
     - на `card:select` сохраняет выбранный товар через `catalog.setProductSelected(item)`;
     - проверяет, находится ли товар в корзине (`cart.availability(item.id)`);
     - настраивает `CardPreview`:
       - включает/выключает кнопку через `card.setEnable(...)`;
       - выставляет текст `card.buttonText` в зависимости от наличия товара в корзине («Купить» / «Удалить» или «Не доступно»);
     - рендерит превью и подставляет его в `Modal`;
     - открывает модалку с выбранным товаром.

3. **Добавление/удаление товара из корзины из превью**

   - View `CardPreview`:
     - по клику по кнопке вызывает переданный обработчик `onClick`;
     - обработчик `onClick`, заданный в презентере, эмитит `events.emit('preview:toggle')`.
   - Presenter:
     - обработчик `events.on('preview:toggle', ...)`:
       - получает текущий товар через `catalog.getProductSelected()`;
       - если товар не выбран или у него `price === null`, просто закрывает модальное окно;
       - если товар уже находится в корзине (`cart.availability(id)` возвращает `true`), удаляет его через `cart.remove(...)`;
       - если товара ещё нет в корзине, добавляет его через `cart.add(...)`;
       - после выполнения операции закрывает модальное окно.

4. **Обновление корзины и шапки**

   - Model `Cart`:
     - при изменениях эмитит `cart:change`;
   - Presenter на `cart:change`:
     - берёт `cart.getProductList()` и создаёт список `CardBasket`;
     - передаёт карточки в `basket.list`;
     - считает сумму через `cart.totalPrice()` и записывает в `basket.total`;
     - включает/отключает кнопку оформления через `basket.setEnable(cart.quantity() !== 0)`;
     - обновляет счётчик в `Header` через `header.counter`.

5. **Открытие корзины**

   - View `Header`:
     - по клику по иконке корзины эмитит `basket:open`;
   - Presenter:
     - на `basket:open` подставляет в `Modal` `basket.render()` и открывает модалку.

6. **Первый шаг оформления заказа (способ оплаты + адрес)**

   - View `FormOrder`:
     - на ввод в адрес эмитит `order:change` с частичными данными `{ address }`;
     - на выбор способа оплаты (кнопки «Картой» / «Наличными») эмитит `order:change` с `{ payment: 'card' }` или `{ payment: 'cash' }`;
     - на кнопку «Далее» эмитит `form:order`.
   - Presenter:
     - на `order:change` вызывает `customer.setData(...)`;
     - рассчитывает валидность первого шага (адрес + способ оплаты) и управляет кнопкой через `orderForm.setButtonEnabled(...)`;
     - дополнительно может рассчитывать валидность второго шага (email + phone) и управлять кнопкой во `FormContacts` через `contactsForm.setButtonEnabled(...)`;
     - на `form:order` подставляет во `Modal` вторую форму `FormContacts`.

7. **Второй шаг оформления заказа (контакты)**

   - View `FormContacts`:
     - на ввод `email`/телефона эмитит `order:change` с частичными данными `{ email }` / `{ phone }`;
     - на кнопку отправки эмитит `form:submit` (через базовый класс `Form`).
   - Model `Customer`:
     - внутри `setData` эмитит `customer:change`.
   - Presenter:
     - на `customer:change` получает актуальные данные `customer.data()` и результат валидации `customer.validation()`;
     - через сеттеры обновляет значения полей в `FormOrder` и `FormContacts`, а также передаёт ошибки в `setErrors(...)` для обеих форм;
     - включает или выключает кнопки шагов через `setButtonEnabled(...)`;
     - на `form:submit` собирает объект `IOrderRequest` из `Customer` и `Cart`, отправляет заказ через `ApiWrapper`, при успехе очищает `Cart` и `Customer` и подставляет в модальное окно компонент `Success` с итоговой суммой.

8. **Экран успеха**

   - View `Success`:
     - показывает финальную сумму заказа;
     - по клику по кнопке эмитит событие `success:close`.
   - Presenter:
     - на `success:close` закрывает модальное окно и возвращает пользователя к каталогу.
