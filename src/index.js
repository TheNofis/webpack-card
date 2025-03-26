import "./style.css";

import CardController from "./components/card/card.controller";
import Modal from "./components/modal/modal";

const CreateModal = new Modal({
  id: "create-modal",
  label: "Create Card",
  state: false,
  onSave: () => {
    CardController.addCard({
      title: CreateModal.element.querySelector(".modal-title").value,
      image: CreateModal.element.querySelector(".modal-image-url").value,
      description:
        CreateModal.element.querySelector(".modal-description").value,
    });

    CreateModal.element.querySelector(".modal-title").value = "";
    CreateModal.element.querySelector(".modal-image-url").value = "";
    CreateModal.element.querySelector(".modal-description").value = "";
  },
  onOpen: () => {},
});

const EditModal = new Modal({
  id: "edit-modal",
  label: "Edit Card",
  state: false,
  onSave: () => {},
  onOpen: () => {},
});

CreateModal.init();
EditModal.init();
CardController.init();

document
  .querySelector(".createCard")
  .addEventListener("click", () => (CreateModal.isOpen = true));

document.querySelector(".cardlist").addEventListener("click", (e) => {
  if (!e.target.classList.contains("deleteCard")) return;

  const parent = e.target.parentElement.parentElement;
  const id = parent.id;

  CardController.deleteCard(id);
});

document.querySelector(".container").addEventListener("click", (e) => {
  if (!e.target.classList.contains("changeCard")) return;

  const parent = e.target.parentElement.parentElement;
  const card = CardController.getCard(parent.id);

  EditModal.onOpen = () => {
    EditModal.element.querySelector(".modal-title").value = card.title;
    EditModal.element.querySelector(".modal-image-url").value = card.image;
    EditModal.element.querySelector(".modal-description").value =
      card.description;
  };

  EditModal.onSave = () => {
    CardController.editCard(parent.id, {
      title: EditModal.element.querySelector(".modal-title").value,
      image: EditModal.element.querySelector(".modal-image-url").value,
      description: EditModal.element.querySelector(".modal-description").value,
    });
  };

  EditModal.isOpen = true;
});
