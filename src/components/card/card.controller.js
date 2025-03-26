import Card from "./card";
import cuid from "cuid";

class CardController {
  cards = [];

  init() {
    this.load();
  }

  addCard(card) {
    const newCard = new Card({
      id: cuid(),
      title: card.title,
      image: card.image,
      description: card.description,
    });
    newCard.init();
    this.cards.push(newCard);
    this.save();
  }

  get cards() {
    return this.cards;
  }

  getCard(id) {
    return this.cards.find((card) => card.id === id);
  }
  editCard(id, { title, image, description }) {
    const card = this.getCard(id);
    card.setTitle = title;
    card.setImage = image;
    card.setDescription = description;

    this.save();
  }

  deleteCard(id) {
    const card = this.getCard(id);
    card._element.remove();
    this.cards = this.cards.filter((card) => card.id !== id);

    this.save();
  }

  save() {
    localStorage.setItem("cards", JSON.stringify(this.cards));
  }

  load() {
    const cards = JSON.parse(localStorage.getItem("cards"));
    if (!cards) return;

    cards.forEach((card) => this.addCard(card));
  }
}

const newCardController = new CardController();
export default newCardController;
