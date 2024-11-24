import { createContext } from 'react';

interface ModalContextType {
  modalData: any;
  openModal: (message: string, onConfirm: any) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export default ModalContext;
