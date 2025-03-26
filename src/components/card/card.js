export default class Card {
  _element = null;
  constructor({ id, title, image, description }) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.description = description;
  }

  set setTitle(value) {
    if (!value || this._element == null) return;

    this._element.querySelector("h2").innerText = value;
    this.title = value;
  }
  set setImage(value) {
    if (!value || this._element == null) return;

    this._element.querySelector("img").src = value;
    this.image = value;
  }
  set setDescription(value) {
    if (!value || this._element == null) return;

    this._element.querySelector("p").innerText = value;
    this.description = value;
    console.log(value);
  }

  init() {
    const container = document.querySelector(".cardlist");
    this._element = document.createElement("div");
    this._element.id = this.id;
    this._element.classList.add(
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

    this._element.innerHTML = `<img
      src="${this.image}"
          alt="Sample Image"
          class="w-full h-48 object-cover rounded-lg"
        />
        <div class="p-4">
          <h2 class="text-xl font-bold mb-2">${this.title}</h2>
          <p class="text-gray-600">${this.description.length > 100 ? this.description.slice(0, 100) + "..." : this.description}</p>
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
    </div>`;
    container.appendChild(this._element);
  }
}
