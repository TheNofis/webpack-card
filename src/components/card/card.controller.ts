import Card from "./card";
import { CardData } from "./card.interface";

import cuid from "cuid";

class CardController {
  #cards: Card[] = [];

  get cards(): Card[] {
    return this.#cards;
  }

  init(): void {
    this.#load();
  }

  create(card: Omit<CardData, "id"> & { id?: string }): void {
    const newCard = new Card({
      id: card.id || cuid(),
      title: card.title,
      image: card.image,
      description: card.description,
    });

    this.#cards.push(newCard.init());
    this.#save();
  }

  delete(id: string): void {
    const card: Card | null = this.get(id)!;
    if (!card.element) return;

    card.element.remove();
    this.#cards = this.#cards.filter((card: Card) => card.id !== id);
    this.#save();
  }

  edit(
    id: string,
    { title, image, description }: Partial<Omit<CardData, "id">>,
  ): void {
    const card = this.get(id)!;
    card.title = title;
    card.image = image;
    card.description = description;
    this.#save();
  }

  get(id: string): Card | undefined {
    return this.#cards.find((card) => card.id === id);
  }

  #save(): void {
    const data: CardData[] = this.#cards.map((card) => ({
      id: card.id,
      title: card.title,
      image: card.image,
      description: card.description,
    }));
    localStorage.setItem("cards", JSON.stringify(data));
  }

  #load(): void {
    const cards = JSON.parse(localStorage.getItem("cards")!) as CardData[];
    cards?.forEach((card) => this.create(card));
  }
}

const newCardController = new CardController();
export default newCardController;
