import { createContext, useContext, useState } from "react";

const ShowModalSetterContext = createContext(null);
const ShowModalContext = createContext(null);

export default function ModalProvider({ children }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <ShowModalSetterContext.Provider value={setShowModal}>
      <ShowModalContext.Provider value={showModal}>
        {children}
      </ShowModalContext.Provider>
    </ShowModalSetterContext.Provider>
  );
}

export function useShowModalSetter() {
  return useContext(ShowModalSetterContext);
}

export function useShowModal() {
  return useContext(ShowModalContext);
}