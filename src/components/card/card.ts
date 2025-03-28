import { CardData } from "./card.interface";

export default class Card {
  #element: HTMLElement | null = null;

  public id: string;
  private _title: string;
  private _image: string;
  private _description: string;

  constructor({ id, title, image, description }: CardData) {
    this.id = id;
    this._title = title;
    this._image = image;
    this._description = description;
  }

  set title(value: string | undefined) {
    if (!value || this.#element == null) return;

    this.#element.querySelector("h2")!.innerText = value;
    this._title = value;
  }

  set image(value: string | undefined) {
    if (!value || this.#element == null) return;

    this.#element.querySelector("img")!.src = value;
    this._image = value;
  }

  set description(value: string | undefined) {
    if (!value || this.#element == null) return;

    this.#element.querySelector("p")!.innerText = value;
    this._description = value;
  }

  get title(): string {
    return this._title;
  }

  get image(): string {
    return this._image;
  }

  get description(): string {
    return this._description;
  }

  get element(): HTMLElement | null {
    return this.#element;
  }

  #createCard(): void {
    if (this.#element != null) return;

    const container = document.querySelector(".cardlist")!;

    this.#element = document.createElement("div");
    this.#element.id = this.id;
    this.#element.classList.add(
      "bg-white",
      "shadow-md",
      "rounded-lg",
      "overflow-hidden",
      "max-w-sm",
      "mx-auto",
      "p-2",
      "min-w-[230px]",
      "max-w-[230px]",
    );

    this.#element.innerHTML = `
      <img
        src="${this.image}"
        alt="Sample Image"
        class="w-full h-48 object-cover rounded-lg"
      />
      <div class="p-4">
        <h2 class="text-xl font-bold mb-2">${this.title}</h2>
        <p class="text-gray-600">${
          this.description.length > 100
            ? this.description.slice(0, 100) + "..."
            : this.description
        }</p>
      </div>
      <div class="flex gap-2">
        <button
          class="changeCard mt-4 bg-indigo-600 text-white w-full py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Edit
        </button>
        <button class="deleteCard mt-4 bg-red-600 text-white w-full py-2 rounded-lg hover:bg-red-700 transition">
          Delete
        </button>
      </div>
    `;

    container.appendChild(this.#element);
  }

  init(): this {
    this.#createCard();
    return this;
  }
}
