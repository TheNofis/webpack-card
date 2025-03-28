import "./style.css";

import CardController from "./components/card/card.controller";
import Modal from "./components/modal/modal";

const CreateModal = new Modal({
  id: "create-modal",
  label: "Create Card",
  onSave: () => {
    CardController.create({
      title: CreateModal.element.querySelector(".modal-title").value,
      image: CreateModal.element.querySelector(".modal-image-url").value,
      description:
        CreateModal.element.querySelector(".modal-description").value,
    });

    CreateModal.element.querySelector(".modal-title").value = "";
    CreateModal.element.querySelector(".modal-image-url").value = "";
    CreateModal.element.querySelector(".modal-description").value = "";
  },
});

const EditModal = new Modal({
  id: "edit-modal",
  label: "Edit Card",
});

CreateModal.init();
EditModal.init();
CardController.init();

document.querySelector("body").addEventListener("click", (e) => {
  if (e.target.classList.contains("close-modal")) return closeModal();
  if (e.target.classList.contains("createCard")) return createCard();
  if (e.target.classList.contains("changeCard")) return changeCard(e);
  if (e.target.classList.contains("deleteCard")) return deleteCard(e);
});
function createCard() {
  CreateModal.isOpen = true;
}

function closeModal() {
  CreateModal.isOpen = false;
  EditModal.isOpen = false;
}

function deleteCard(e) {
  const parent = e.target.parentElement.parentElement;
  const id = parent.id;

  CardController.delete(id);
}

function changeCard(e) {
  const parent = e.target.parentElement.parentElement;
  const card = CardController.get(parent.id);

  EditModal.onOpen = () => {
    EditModal.element.querySelector(".modal-title").value = card.title;
    EditModal.element.querySelector(".modal-image-url").value = card.image;
    EditModal.element.querySelector(".modal-description").value =
      card.description;
  };

  EditModal.onSave = () => {
    CardController.edit(parent.id, {
      title: EditModal.element.querySelector(".modal-title").value,
      image: EditModal.element.querySelector(".modal-image-url").value,
      description: EditModal.element.querySelector(".modal-description").value,
    });
  };

  EditModal.isOpen = true;
}
