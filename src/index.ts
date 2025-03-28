import "./style.css";
import CardController from "./components/card/card.controller";
import Modal from "./components/modal/modal";

const CreateModal = new Modal({
  id: "create-modal",
  label: "Create Card",
  onSave: () => {
    const titleInput =
      CreateModal.element?.querySelector<HTMLInputElement>(".modal-title");
    const imageInput =
      CreateModal.element?.querySelector<HTMLInputElement>(".modal-image-url");
    const descriptionInput =
      CreateModal.element?.querySelector<HTMLTextAreaElement>(
        ".modal-description",
      );

    if (titleInput && imageInput && descriptionInput) {
      CardController.create({
        title: titleInput.value,
        image: imageInput.value,
        description: descriptionInput.value,
      });

      titleInput.value = "";
      imageInput.value = "";
      descriptionInput.value = "";
    }
  },
});

const EditModal = new Modal({
  id: "edit-modal",
  label: "Edit Card",
});

CreateModal.init();
EditModal.init();
CardController.init();

document.querySelector("body")?.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement;

  if (target.classList.contains("close-modal")) return closeModal();
  if (target.classList.contains("createCard")) return createCard();
  if (target.classList.contains("changeCard")) return changeCard(e);
  if (target.classList.contains("deleteCard")) return deleteCard(e);
});

function createCard(): void {
  CreateModal.isOpen = true;
}

function closeModal(): void {
  CreateModal.isOpen = false;
  EditModal.isOpen = false;
}

function deleteCard(e: MouseEvent): void {
  const parent = (e.target as HTMLElement).closest(".cardlist > div");
  if (!parent) return;

  CardController.delete(parent.id);
}

function changeCard(e: MouseEvent): void {
  const parent = (e.target as HTMLElement).closest(".cardlist > div");
  if (!parent) return;

  const card = CardController.get(parent.id);
  if (!card) return;

  EditModal.onOpen = () => {
    const titleInput =
      EditModal.element?.querySelector<HTMLInputElement>(".modal-title");
    const imageInput =
      EditModal.element?.querySelector<HTMLInputElement>(".modal-image-url");
    const descriptionInput =
      EditModal.element?.querySelector<HTMLTextAreaElement>(
        ".modal-description",
      );

    if (titleInput && imageInput && descriptionInput) {
      titleInput.value = card.title;
      imageInput.value = card.image;
      descriptionInput.value = card.description;
    }
  };

  EditModal.onSave = () => {
    const titleInput =
      EditModal.element?.querySelector<HTMLInputElement>(".modal-title");
    const imageInput =
      EditModal.element?.querySelector<HTMLInputElement>(".modal-image-url");
    const descriptionInput =
      EditModal.element?.querySelector<HTMLTextAreaElement>(
        ".modal-description",
      );

    if (titleInput && imageInput && descriptionInput) {
      CardController.edit(parent.id, {
        title: titleInput.value,
        image: imageInput.value,
        description: descriptionInput.value,
      });
    }
  };

  EditModal.isOpen = true;
}
