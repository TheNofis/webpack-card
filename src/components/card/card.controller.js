import Card from "./card";
import cuid from "cuid";

class CardController {
  #cards = [];

  get cards() {
    return this.#cards;
  }

  init() {
    this.#load();
  }

  create(card) {
    const newCard = new Card({
      id: card.id || cuid(),
      title: card.title,
      image: card.image,
      description: card.description,
    });

    this.#cards.push(newCard.init());

    this.#save();
  }

  delete(id) {
    const card = this.getCard(id);
    card.element.remove();
    this.#cards = this.#cards.filter((card) => card.id !== id);

    this.#save();
  }

  edit(id, { title, image, description }) {
    const card = this.getCard(id);

    card.title = title;
    card.image = image;
    card.description = description;

    this.#save();
  }

  get(id) {
    return this.#cards.find((card) => card.id === id);
  }

  #save() {
    const data = this.#cards.map((card) => ({
      id: card.id,
      title: card.title,
      image: card.image,
      description: card.description,
    }));
    localStorage.setItem("cards", JSON.stringify(data));
  }

  #load() {
    const cards = JSON.parse(localStorage.getItem("cards"));
    if (!cards) return;

    cards.forEach((card) => this.create(card));
  }
}

const newCardController = new CardController();
export default newCardController;
