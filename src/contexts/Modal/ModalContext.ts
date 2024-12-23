import { createContext, MouseEventHandler } from 'react';

interface ModalDataType {
  message: string;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
}

export interface ModalContextType {
  modalData: ModalDataType | null;
  openModal: (
    message: ModalDataType['message'],
    onConfirm: ModalDataType['onConfirm']
  ) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export default ModalContext;
