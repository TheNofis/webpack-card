const JUST_FUNCTION = () => {};

export default class Modal {
  _element = null;

  onSave = JUST_FUNCTION;
  onOpen = JUST_FUNCTION;

  constructor({
    id,
    state = false,
    label = "Modal",
    onSave = JUST_FUNCTION,
    onOpen = JUST_FUNCTION,
  }) {
    this.id = id;
    this.label = label;
    this.state = state;
    this.onSave = onSave;
    this.onOpen = onOpen;
  }

  get isOpen() {
    return this.state;
  }

  set isOpen(value) {
    this.state = value;
    if (value) {
      this.onOpen();
      this._element.classList.remove("hidden");
    } else this._element.classList.add("hidden");
  }

  get element() {
    return this._element;
  }

  init() {
    const container = document.querySelector(".container");
    this._element = document.createElement("div");
    this._element.classList.add(
      "fixed",
      "inset-0",
      "bg-black",
      "bg-opacity-50",
      "flex",
      "items-center",
      "justify-center",
    );
    if (!this.state) this._element.classList.add("hidden");

    this._element.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md" id=${this.id}>
        <div class="flex justify-between">
          <h2 class="text-2xl font-bold mb-4 my-auto">${this.label}</h2>
          <button class="close-modal mb-auto text-slate-400 text-3xl">×</button>
        </div>

        <form>
          <div class="mb-4">
            <label class="block text-gray-700">Title</label>
            <input
              type="text"
              class="modal-title w-full px-3 py-2 border rounded-lg"
              placeholder="Enter card title"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Image URL</label>
            <input
              type="text"
              class="modal-image-url w-full px-3 py-2 border rounded-lg"
              placeholder="Enter image URL"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Description</label>
            <textarea
              class="modal-description w-full px-3 py-2 border rounded-lg"
              rows="3"
              placeholder="Enter description"
            ></textarea>
          </div>
          <button
            type="submit"
            class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Save
          </button>
        </form>
      </div>`;
    this._element.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      this.isOpen = false;
      this.onSave();
    });
    container.appendChild(this._element);
  }
}
