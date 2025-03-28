export interface ModalOptions {
  id: string;
  state?: boolean;
  label?: string;
  onSave?: () => void;
  onOpen?: () => void;
}
