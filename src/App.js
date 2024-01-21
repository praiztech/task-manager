import ModalProvider from "./context/ModalProvider";
import AppContent from "./Components/AppContent";

export default function App() {
  return (
    <ModalProvider>
      <AppContent />
    </ModalProvider>
  );
}